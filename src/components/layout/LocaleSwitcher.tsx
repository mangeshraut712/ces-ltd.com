'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const locales = [
  { value: 'en-US', label: 'USA' },
  { value: 'ja-JP', label: '日本' },
  { value: 'hi-IN', label: 'भारत' },
];

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;

    const segments = pathname?.split('/') ?? [];

    if (segments.length > 1 && locales.some(l => l.value === segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    const nextPath = segments.join('/') || `/${locale}`;

    startTransition(() => {
      router.push(nextPath);
    });
  };

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="locale-switcher">
        Change language
      </label>
      <select
        id="locale-switcher"
        className="rounded-md border border-white/10 bg-black/40 px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
      >
        {locales.map(locale => (
          <option key={locale.value} value={locale.value} className="text-gray-900">
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
}
