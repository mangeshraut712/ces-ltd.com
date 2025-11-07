'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { companyInfo, solutions } from '@/lib/cesData';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const navItems = [
  { key: 'home', labelKey: 'navigation.home', defaultLabel: 'Home', href: '/' },
  { key: 'about', labelKey: 'navigation.about', defaultLabel: 'About', href: '#about' },
  { key: 'solutions', labelKey: 'navigation.solutions', defaultLabel: 'Solutions', href: '#solutions' },
  { key: 'industries', labelKey: 'navigation.industries', defaultLabel: 'Industries', href: '#industries' },
  { key: 'innovation', labelKey: 'navigation.innovation', defaultLabel: 'Innovation', href: '#innovation' },
  { key: 'experts', labelKey: 'navigation.experts', defaultLabel: 'Experts', href: '#experts' },
  { key: 'news', labelKey: 'navigation.news', defaultLabel: 'News', href: '#news' },
  { key: 'careers', labelKey: 'navigation.careers', defaultLabel: 'Careers', href: '#careers' },
  { key: 'contact', labelKey: 'navigation.contact', defaultLabel: 'Contact', href: '#contact' },
];

export default function PrimaryNavigation() {
  const { t, i18n } = useAppTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguage = i18n.language ?? 'en';
  const wideSpacingLanguages = new Set(['en', 'ja', 'hi', 'ar']);
  const useWideSpacing = wideSpacingLanguages.has(currentLanguage);

  const solutionsPreview = solutions.slice(0, 3);

  const handleNavigate = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-slate-900 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={handleNavigate}
          aria-label={t('navigation.logoLabel', '{{company}} home', { company: companyInfo.name })}
        >
          <div className="relative h-12 w-[156px] sm:w-[200px]">
            <Image
              src="/images/logo.png"
              alt={`${companyInfo.name} logo`}
              fill
              sizes="(max-width: 640px) 156px, 200px"
              priority
              className="object-contain"
            />
          </div>
        </Link>

        <div
          className={`hidden flex-1 items-center gap-4 overflow-hidden lg:ml-12 lg:flex ${
            useWideSpacing ? 'justify-between' : 'justify-center'
          }`}
        >
          <div
            className={`flex flex-1 flex-wrap items-center gap-4 ${
              useWideSpacing ? 'justify-between' : 'justify-center'
            }`}
          >
            {navItems.map(item => {
              const label = t(item.labelKey, item.defaultLabel);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={handleNavigate}
                  className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/admin"
              onClick={handleNavigate}
              className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
            >
              {t('navigation.login.label', 'Login')}
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:text-blue-600 lg:hidden"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle main menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-4 text-slate-900 shadow-lg lg:hidden">
          <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {solutionsPreview.map(solution => {
              const name = t(`solutions.preview.${solution.id}.name`, solution.name);
              const description = t(`solutions.preview.${solution.id}.description`, solution.description);

              return (
                <div key={solution.id} className="flex items-start gap-3">
                  <div className="text-xl">{solution.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-600">{description}</p>
                  </div>
                </div>
              );
            })}
            <Link
              href="#solutions"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              onClick={handleNavigate}
            >
              {t('navigation.exploreSolutions', 'Explore all solutions →')}
            </Link>
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            {navItems.map(item => (
              <Link
                key={item.key}
                href={item.href}
                onClick={handleNavigate}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {t(item.labelKey, item.defaultLabel)}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher />
            <Link
              href="/admin"
              onClick={handleNavigate}
              className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
            >
              {t('navigation.login.label', 'Login')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
