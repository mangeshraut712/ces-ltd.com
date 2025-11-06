'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getI18nInstance } from '@/i18n/config';

interface TranslationProviderProps {
  children: React.ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
  const i18n = getI18nInstance();
  const [ready, setReady] = useState(() => i18n.isInitialized);

  useEffect(() => {
    if (i18n.isInitialized) {
      return;
    }

    let mounted = true;
    i18n
      .init()
      .then(() => {
        if (mounted) {
          setReady(true);
        }
      })
      .catch(error => {
        console.error('Failed to initialize i18n instance:', error);
      });

    return () => {
      mounted = false;
    };
  }, [i18n]);

  if (!ready) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
