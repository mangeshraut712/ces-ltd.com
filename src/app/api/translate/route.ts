import { NextRequest, NextResponse } from 'next/server';

import { callOpenRouterChat, hasOpenRouterKey } from '@/lib/openrouter';
import { supportedLanguages } from '@/i18n/config';

type TranslationEntry = {
  key: string;
  text: string;
};

type TranslationResponse = {
  translations: Record<string, string>;
};

const serverCache = new Map<string, string>();

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

  entries.forEach(entry => {
    const cacheKey = `${targetLanguage}:${entry.key}`;
    if (serverCache.has(cacheKey)) {
      translations[entry.key] = serverCache.get(cacheKey)!;
    } else {
      missingEntries.push(entry);
    }
  });

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
            serverCache.set(`${targetLanguage}:${entry.key}`, translated);
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
        translations[entry.key] = fallback ?? entry.text;
        if (fallback) {
          serverCache.set(`${targetLanguage}:${entry.key}`, fallback);
        }
      });
    }
  }

  if (missingEntries.length > 0 && !hasKey) {
    const googleTranslations = await translateViaGoogle(targetLanguage, missingEntries);

    missingEntries.forEach(entry => {
      translations[entry.key] = googleTranslations[entry.key] ?? entry.text;
      if (googleTranslations[entry.key]) {
        serverCache.set(`${targetLanguage}:${entry.key}`, googleTranslations[entry.key]);
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
