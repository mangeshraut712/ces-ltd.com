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

const serverCache = new Map<string, string>();
const translationCacheTtlMs = Number(process.env.TRANSLATION_CACHE_TTL_MS ?? 12 * 60 * 60 * 1000);

const buildRedisKey = (lang: string, text: string) =>
  `translate:${lang}:${createHash('sha256').update(text).digest('hex')}`;

function isSupportedLanguage(code: string) {
  return supportedLanguages.some(language => language.code === code);
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
  const missingEntries: TranslationEntry[] = [];

  const redisRequests: Array<Promise<void>> = [];

  entries.forEach(entry => {
    const cacheKey = `${targetLanguage}:${entry.key}`;
    if (serverCache.has(cacheKey)) {
      translations[entry.key] = serverCache.get(cacheKey)!;
      return;
    }

    if (hasRedis()) {
      const redisKey = buildRedisKey(targetLanguage, entry.text);
      redisRequests.push(
        (async () => {
          const cached = await redisGet<string>(redisKey);
          if (cached) {
            translations[entry.key] = cached;
            serverCache.set(cacheKey, cached);
          } else {
            missingEntries.push(entry);
          }
        })(),
      );
    } else {
      missingEntries.push(entry);
    }
  });

  if (redisRequests.length > 0) {
    await Promise.all(redisRequests);
  }

  // Redis operations may have populated translations but also appended to missingEntries via async race.
  // Filter out any duplicates that were resolved subsequently.
  if (missingEntries.length > 0) {
    const unresolved: TranslationEntry[] = [];
    missingEntries.forEach(entry => {
      if (!translations[entry.key]) {
        unresolved.push(entry);
      }
    });
    missingEntries.length = 0;
    missingEntries.push(...unresolved);
  }

  const hasKey = await hasOpenRouterKey();

  if (missingEntries.length > 0 && hasKey) {
    const promptPayload = missingEntries.map(entry => ({
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

    const cacheKey = `translate:${targetLanguage}:${missingEntries.map(entry => `${entry.key}:${entry.text}`).join('|')}`;

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

    let unresolvedEntries: TranslationEntry[] = [];

    if (translationResult.ok) {
      try {
        const parsed = JSON.parse(translationResult.message) as TranslationResponse;
        const parsedTranslations = parsed?.translations ?? {};

        missingEntries.forEach(entry => {
          const translated = parsedTranslations[entry.key];
          if (typeof translated === 'string' && translated.trim().length > 0) {
            translations[entry.key] = translated;
            const cacheKey = `${targetLanguage}:${entry.key}`;
            serverCache.set(cacheKey, translated);
            if (hasRedis()) {
              const redisKey = buildRedisKey(targetLanguage, entry.text);
              void redisSet(redisKey, translated, translationCacheTtlMs);
            }
          } else {
            unresolvedEntries.push(entry);
          }
        });
      } catch (error) {
        console.warn('Failed to parse translation payload:', error);
        unresolvedEntries = missingEntries;
      }
    } else {
      console.warn('Translation call failed:', translationResult.error);
      unresolvedEntries = missingEntries;
    }

    if (unresolvedEntries.length > 0) {
      const googleTranslations = await translateViaGoogle(targetLanguage, unresolvedEntries);
      unresolvedEntries.forEach(entry => {
        const fallback = googleTranslations[entry.key];
        const value = fallback ?? entry.text;
        translations[entry.key] = value;
        const cacheKey = `${targetLanguage}:${entry.key}`;
          if (fallback) {
            serverCache.set(cacheKey, fallback);
            if (hasRedis()) {
              const redisKey = buildRedisKey(targetLanguage, entry.text);
              void redisSet(redisKey, fallback, translationCacheTtlMs);
            }
          }
      });
    }
  }

  if (missingEntries.length > 0 && !hasKey) {
    const googleTranslations = await translateViaGoogle(targetLanguage, missingEntries);

    missingEntries.forEach(entry => {
      const fallback = googleTranslations[entry.key];
      const value = fallback ?? entry.text;
      translations[entry.key] = value;
      if (fallback) {
        serverCache.set(`${targetLanguage}:${entry.key}`, fallback);
        if (hasRedis()) {
          const redisKey = buildRedisKey(targetLanguage, entry.text);
          void redisSet(redisKey, fallback, translationCacheTtlMs);
        }
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
