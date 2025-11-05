import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import PrimaryNavigation from '@/components/layout/PrimaryNavigation';

const supportedLocales = ['en-US', 'ja-JP', 'hi-IN'];

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PrimaryNavigation locale={locale} />
      <main className="pb-20">{children}</main>
    </div>
  );
}
