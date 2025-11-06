'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { registerTranslationKey } from '@/i18n/registry';

type TranslateOptions = {
  defaultValue?: string;
  count?: number;
  [key: string]: unknown;
};

export function useAppTranslation() {
  const { t, i18n } = useTranslation();

  const translate = useCallback(
    (key: string, defaultValue?: string, options?: TranslateOptions) => {
      if (defaultValue) {
        registerTranslationKey(key, defaultValue);
      }

      return t(key, { defaultValue: defaultValue ?? key, ...(options ?? {}) });
    },
    [t],
  );

  return {
    t: translate,
    i18n,
  };
}
