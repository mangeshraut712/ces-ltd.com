'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import { companyInfo, solutions } from '@/lib/cesData';

interface PrimaryNavigationProps {
  locale: string;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Experts', href: '#experts' },
  { label: 'News', href: '#news' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

export default function PrimaryNavigation({ locale }: PrimaryNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const solutionsPreview = solutions.slice(0, 3);

  const handleNavigate = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3"
          onClick={handleNavigate}
          aria-label={`${companyInfo.name} home`}
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

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavigate}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
          <LocaleSwitcher currentLocale={locale} />
          <Link
            href="#contact"
            onClick={handleNavigate}
            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Request Consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100 lg:hidden"
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
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-4 shadow-lg lg:hidden">
          <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {solutionsPreview.map(solution => (
              <div key={solution.id} className="flex items-start gap-3">
                <div className="text-xl">{solution.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{solution.name}</p>
                  <p className="text-xs text-slate-600">{solution.description}</p>
                </div>
              </div>
            ))}
            <Link
              href="#solutions"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              onClick={handleNavigate}
            >
              Explore all solutions →
            </Link>
          </div>

          <div className="mt-4 flex flex-col space-y-2">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavigate}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <LocaleSwitcher currentLocale={locale} />
            <Link
              href="#contact"
              onClick={handleNavigate}
              className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
