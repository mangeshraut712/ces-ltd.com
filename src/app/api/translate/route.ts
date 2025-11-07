import { createHash } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { callOpenRouterChat, hasOpenRouterKey } from '@/lib/openrouter';
import { supportedLanguages } from '@/i18n/config';
import { hasRedis, redisGet, redisSet } from '@/lib/redisClient';

type TranslationEntry = {
  key: string;
  text: string;
};

type TranslationResponse = {
  translations: Record<string, string>;
};

const serverKeyCache = new Map<string, string>();
const serverTextCache = new Map<string, string>();
const translationCacheTtlMs = Number(process.env.TRANSLATION_CACHE_TTL_MS ?? 12 * 60 * 60 * 1000);

const buildRedisKey = (lang: string, text: string) =>
  `translate:${lang}:${createHash('sha256').update(text).digest('hex')}`;

function isSupportedLanguage(code: string) {
  return supportedLanguages.some(language => language.code === code);
}

function safeParseJSON<T>(payload: string): T | null {
  const attemptParse = (text: string) => {
    try {
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  };

  const parsed = attemptParse(payload);
  if (parsed) {
    return parsed;
  }

  const start = payload.indexOf('{');
  const end = payload.lastIndexOf('}');

  if (start !== -1 && end !== -1 && end > start) {
    let braces = 0;
    let startIndex = -1;

    for (let i = start; i <= end; i += 1) {
      const char = payload[i];
      if (char === '{') {
        if (braces === 0) {
          startIndex = i;
        }
        braces += 1;
      } else if (char === '}') {
        braces -= 1;
        if (braces === 0 && startIndex !== -1) {
          const candidate = payload.slice(startIndex, i + 1);
          const recovered = attemptParse(candidate);
          if (recovered) {
            return recovered;
          }
          startIndex = -1;
        }
      }
    }
  }

  console.warn('Failed to parse translation payload');
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const targetLanguage = body?.targetLanguage;
  const entries: TranslationEntry[] = Array.isArray(body?.entries)
    ? body.entries.filter((entry: TranslationEntry) => entry?.key && entry?.text)
    : [];

  if (!targetLanguage || !isSupportedLanguage(targetLanguage)) {
    return NextResponse.json({ error: 'Unsupported language request.' }, { status: 400 });
  }

  if (targetLanguage === 'en' || entries.length === 0) {
    const passthrough = Object.fromEntries(entries.map(entry => [entry.key, entry.text]));
    return NextResponse.json({ translations: passthrough }, { status: 200 });
  }

  const translations: Record<string, string> = {};
  const pendingEntries: TranslationEntry[] = [];

  const redisRequests: Array<Promise<void>> = [];

  entries.forEach(entry => {
    const cacheKey = `${targetLanguage}:${entry.key}`;
    const textCacheKey = buildRedisKey(targetLanguage, entry.text);

    if (serverKeyCache.has(cacheKey)) {
      translations[entry.key] = serverKeyCache.get(cacheKey)!;
      return;
    }

    if (serverTextCache.has(textCacheKey)) {
      const cached = serverTextCache.get(textCacheKey)!;
      translations[entry.key] = cached;
      serverKeyCache.set(cacheKey, cached);
      return;
    }

    if (hasRedis()) {
      const redisKey = textCacheKey;
      redisRequests.push(
        (async () => {
          const cached = await redisGet<string>(redisKey);
          if (cached) {
            translations[entry.key] = cached;
            serverKeyCache.set(cacheKey, cached);
            serverTextCache.set(redisKey, cached);
          } else {
            pendingEntries.push(entry);
          }
        })(),
      );
    } else {
      pendingEntries.push(entry);
    }
  });

  if (redisRequests.length > 0) {
    await Promise.all(redisRequests);
  }

  // Redis operations may have populated translations but also appended to missingEntries via async race.
  // Filter out any duplicates that were resolved subsequently.
  if (pendingEntries.length > 0) {
    const unresolved: TranslationEntry[] = [];
    pendingEntries.forEach(entry => {
      if (!translations[entry.key]) {
        unresolved.push(entry);
      }
    });
    pendingEntries.length = 0;
    pendingEntries.push(...unresolved);
  }

  const dedupeMap = new Map<string, TranslationEntry[]>();
  const entriesToTranslate: TranslationEntry[] = [];

  pendingEntries.forEach(entry => {
    const textKey = buildRedisKey(targetLanguage, entry.text);
    const bucket = dedupeMap.get(textKey);
    if (bucket) {
      bucket.push(entry);
    } else {
      dedupeMap.set(textKey, [entry]);
      entriesToTranslate.push(entry);
    }
  });

  const applyTranslation = (entry: TranslationEntry, value: string) => {
    if (!value?.trim()) {
      return;
    }

    const textKey = buildRedisKey(targetLanguage, entry.text);
    const bucket = dedupeMap.get(textKey) ?? [entry];
    bucket.forEach(bucketEntry => {
      translations[bucketEntry.key] = value;
      const cacheKey = `${targetLanguage}:${bucketEntry.key}`;
      serverKeyCache.set(cacheKey, value);
    });
    serverTextCache.set(textKey, value);
    if (hasRedis()) {
      void redisSet(textKey, value, translationCacheTtlMs);
    }
  };

  const hasKey = await hasOpenRouterKey();

  if (entriesToTranslate.length > 0 && hasKey) {
    const promptPayload = entriesToTranslate.map(entry => ({
      key: entry.key,
      text: entry.text,
    }));

    const messages = [
      {
        role: 'system' as const,
        content:
          'You are a professional translator for Customized Energy Solutions. Translate the provided text snippets into the requested language while preserving the original meaning, tone, formatting, and any interpolation placeholders such as {{variable}}. Return only valid JSON with a "translations" object whose keys match the provided keys exactly.',
      },
      {
        role: 'user' as const,
        content: JSON.stringify({
          targetLanguage,
          entries: promptPayload,
        }),
      },
    ];

    const cacheKey = `translate:${targetLanguage}:${entriesToTranslate.map(entry => `${entry.key}:${entry.text}`).join('|')}`;

    const translationResult = await callOpenRouterChat({
      messages,
      maxTokens: 1200,
      temperature: 0.2,
      responseFormat: 'json_object',
      cacheKey,
      cacheTtlMs: 30 * 60 * 1000,
      purpose: 'translation',
      metadata: {
        module: 'translation',
        targetLanguage,
      },
    });

    const unresolvedEntries: TranslationEntry[] = [];

    if (translationResult.ok) {
      const parsed = safeParseJSON<TranslationResponse>(translationResult.message);
      if (parsed) {
        const parsedTranslations = parsed.translations ?? {};
        entriesToTranslate.forEach(entry => {
          const translated = parsedTranslations[entry.key];
          if (typeof translated === 'string' && translated.trim().length > 0) {
            applyTranslation(entry, translated);
          } else {
            const textKey = buildRedisKey(targetLanguage, entry.text);
            const bucket = dedupeMap.get(textKey) ?? [entry];
            unresolvedEntries.push(...bucket);
          }
        });
      } else {
        entriesToTranslate.forEach(entry => {
          const textKey = buildRedisKey(targetLanguage, entry.text);
          const bucket = dedupeMap.get(textKey) ?? [entry];
          unresolvedEntries.push(...bucket);
        });
      }
    } else {
      console.warn('Translation call failed:', translationResult.error);
      entriesToTranslate.forEach(entry => {
        const textKey = buildRedisKey(targetLanguage, entry.text);
        const bucket = dedupeMap.get(textKey) ?? [entry];
        unresolvedEntries.push(...bucket);
      });
    }

    if (unresolvedEntries.length > 0) {
      const googleTranslations = await translateViaGoogle(targetLanguage, unresolvedEntries);
      unresolvedEntries.forEach(entry => {
        const fallback = googleTranslations[entry.key];
        if (fallback) {
          applyTranslation(entry, fallback);
        } else {
          translations[entry.key] = entry.text;
        }
      });
    }
  }

  if (entriesToTranslate.length > 0 && !hasKey) {
    const googleTranslations = await translateViaGoogle(targetLanguage, entriesToTranslate);

    entriesToTranslate.forEach(entry => {
      const fallback = googleTranslations[entry.key];
      if (fallback) {
        applyTranslation(entry, fallback);
      } else {
        translations[entry.key] = entry.text;
      }
    });
  }

  return NextResponse.json({ translations }, { status: 200 });
}

async function translateViaGoogle(targetLanguage: string, entries: TranslationEntry[]) {
  const results: Record<string, string> = {};

  for (const entry of entries) {
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.searchParams.set('client', 'gtx');
    url.searchParams.set('sl', 'auto');
    url.searchParams.set('tl', targetLanguage);
    url.searchParams.set('dt', 't');
    url.searchParams.set('q', entry.text);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'CES-Translation-Service',
        },
      });

      if (!response.ok) {
        console.warn('Google translation fallback failed with status', response.status);
        continue;
      }

      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0]) && Array.isArray(data[0][0])) {
        const translated = String(
          data[0]
            .map((chunk: unknown[]) => chunk?.[0])
            .filter(Boolean)
            .join(''),
        ).trim();
        if (translated.length > 0) {
          results[entry.key] = translated;
        }
      }
    } catch (error) {
      console.warn('Google translation fallback encountered an error', error);
    }
  }

  return results;
}
