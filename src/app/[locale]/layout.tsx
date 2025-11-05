import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PrimaryNavigation from '@/components/layout/PrimaryNavigation';
import SiteFooter from '@/components/layout/SiteFooter';

const supportedLocales = ['en-US', 'ja-JP', 'hi-IN', 'nl-NL', 'ar-AE', 'es-MX', 'fr-CA', 'vi-VN'];

export const dynamic = 'force-static';

export function generateStaticParams() {
  return supportedLocales.map(locale => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <PrimaryNavigation locale={locale} />
        <main className="flex-1 pb-20">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
