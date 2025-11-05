'use client';

import { useTranslations } from 'next-intl';

export default function SiteFooter() {
  const tFooter = useTranslations('footer');

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          <p>{tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
