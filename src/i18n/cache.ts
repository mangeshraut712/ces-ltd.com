const cache = new Map<string, Map<string, string>>();
const STORAGE_PREFIX = 'ces-translations:';

const isBrowser = typeof window !== 'undefined';

export function getCachedTranslation(lang: string, key: string) {
  const languageCache = cache.get(lang);
  return languageCache?.get(key) ?? null;
}

export function setCachedTranslation(lang: string, key: string, value: string) {
  if (!cache.has(lang)) {
    cache.set(lang, new Map());
  }
  cache.get(lang)!.set(key, value);
}

export function setCachedTranslations(lang: string, entries: Record<string, string>) {
  if (!cache.has(lang)) {
    cache.set(lang, new Map());
  }

  const languageCache = cache.get(lang)!;
  Object.entries(entries).forEach(([key, value]) => languageCache.set(key, value));

  if (isBrowser) {
    try {
      const serialized = JSON.stringify(Object.fromEntries(languageCache.entries()));
      window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, serialized);
    } catch (error) {
      console.warn('Failed to persist translation cache', error);
    }
  }
}

export function getCachedTranslationsForLang(lang: string) {
  return cache.get(lang) ?? new Map();
}

export function hydrateCacheFromStorage(lang: string) {
  if (!isBrowser) {
    return;
  }
  const serialized = window.localStorage.getItem(`${STORAGE_PREFIX}${lang}`);
  if (!serialized) {
    return;
  }
  try {
    const parsed = JSON.parse(serialized) as Record<string, string>;
    setCachedTranslations(lang, parsed);
  } catch (error) {
    console.warn('Failed to hydrate translation cache', error);
  }
}

export function clearLanguageCache(lang: string) {
  cache.delete(lang);
  if (isBrowser) {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${lang}`);
  }
}
