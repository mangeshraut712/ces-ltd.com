'use client';

import { useEffect, useMemo, useState } from 'react';

import { addLanguageResources, changeLanguage, getI18nInstance, supportedLanguages } from '@/i18n/config';
import { getCachedTranslationsForLang, hydrateCacheFromStorage, setCachedTranslations } from '@/i18n/cache';
import { getRegisteredTranslationEntries } from '@/i18n/registry';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function LanguageSwitcher() {
  const { i18n } = useAppTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => i18n.language ?? 'en');
  const [loading, setLoading] = useState(false);

  const sortedLanguages = useMemo(() => supportedLanguages, []);

  useEffect(() => {
    setCurrentLanguage(i18n.language ?? 'en');
  }, [i18n.language]);

  async function handleLanguageChange(lang: string) {
    if (lang === currentLanguage) {
      return;
    }

    setLoading(true);

    try {
      if (lang === 'en') {
        await changeLanguage('en');
        setCurrentLanguage('en');
        return;
      }

      const i18nInstance = getI18nInstance();

      hydrateCacheFromStorage(lang);

      const registryEntries = getRegisteredTranslationEntries();
      const cached = getCachedTranslationsForLang(lang);
      let mergedTranslations: Record<string, string> = Object.fromEntries(cached.entries());

      const pending = registryEntries.filter(entry => !cached.has(entry.key));

      if (pending.length > 0) {
        try {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetLanguage: lang,
              entries: pending,
            }),
          });

          if (response.ok) {
            const payload = (await response.json()) as { translations: Record<string, string> };
            const newTranslations = payload.translations ?? {};
            if (Object.keys(newTranslations).length > 0) {
              setCachedTranslations(lang, newTranslations);
              mergedTranslations = {
                ...mergedTranslations,
                ...newTranslations,
              };
            }
          } else {
            console.warn('Translation request failed with status', response.status);
          }
        } catch (error) {
          console.warn('Translation request failed', error);
        }
      }

      if (Object.keys(mergedTranslations).length > 0) {
        addLanguageResources(lang, mergedTranslations);
      }

      await i18nInstance.changeLanguage(lang);
      setCurrentLanguage(lang);
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-600" aria-label="Language selector">
      <select
        className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-70"
        value={currentLanguage}
        onChange={event => {
          void handleLanguageChange(event.target.value);
        }}
        disabled={loading}
      >
        {sortedLanguages.map(language => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
