'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { businessLines } from '@/lib/cesData';

interface HeroSectionProps {
  locale?: string;
}

interface Highlight {
  title: string;
  description: string;
}

interface BusinessHighlight {
  id: string;
  category: string;
  adoptionRate?: number;
  description: string;
}

export const heroHighlights: Highlight[] = [
  {
    title: 'Market Intelligence & Analytics',
    description: 'Real-time energy market data, regulatory tracking, and predictive analytics for informed decision-making.',
  },
  {
    title: 'Energy Storage & Microgrids',
    description: 'Advanced battery storage solutions, microgrid design, and distributed energy resource management.',
  },
  {
    title: 'Demand Response & Load Management',
    description: 'Automated demand response programs, load forecasting, and grid flexibility optimization.',
  },
  {
    title: 'Renewable Energy Integration',
    description: 'Solar, wind, and hybrid renewable project development with grid interconnection expertise.',
  },
  {
    title: 'Regulatory Compliance & Advocacy',
    description: 'FERC, NERC, and international regulatory compliance with policy development and stakeholder advocacy.',
  },
  {
    title: 'Emerging Technologies',
    description: 'Hydrogen, e-mobility, blockchain for energy trading, and next-generation smart grid solutions.',
  },
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const businessHighlights = businessLines.filter(line => line.adoptionRate).slice(0, 3);
  const tHero = useTranslations('hero');

  return <HeroSectionContent businessHighlights={businessHighlights} locale={locale} tHero={tHero} />;
}

function HeroSectionContent({
  businessHighlights,
  locale,
  tHero,
}: {
  businessHighlights: BusinessHighlight[];
  locale?: string;
  tHero: ReturnType<typeof useTranslations>;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-16 text-white shadow-xl sm:px-10 lg:px-16">
      <HeroMainGrid locale={locale} tHero={tHero} />
      <BusinessHighlightsPanel highlights={businessHighlights} />
    </section>
  );
}

function HeroMainGrid({ locale, tHero }: { locale?: string; tHero: ReturnType<typeof useTranslations> }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
      <HeroHeadline locale={locale} tHero={tHero} />
      <InnovationPillars highlights={heroHighlights} tHero={tHero} />
    </div>
  );
}

function HeroHeadline({ locale, tHero }: { locale?: string; tHero: ReturnType<typeof useTranslations> }) {
  return (
    <div>
      <HeroBadge locale={locale} />
      <HeroTitle tHero={tHero} />
      <HeroDescription tHero={tHero} />
      <HeroActions tHero={tHero} />
    </div>
  );
}

function HeroBadge({ locale }: { locale?: string }) {
  const normalizedLocale = locale?.toUpperCase();

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-blue-100 uppercase">
      ANALYZE. SIMPLIFY. IMPLEMENT.
      {normalizedLocale ? ` · ${normalizedLocale}` : null}
    </span>
  );
}

function HeroTitle({ tHero }: { tHero: ReturnType<typeof useTranslations> }) {
  return (
    <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
      {tHero('title')}
    </h1>
  );
}

function HeroDescription({ tHero }: { tHero: ReturnType<typeof useTranslations> }) {
  return (
    <p className="mt-6 text-lg text-blue-100 sm:text-xl">
      {tHero('subtitle')}
    </p>
  );
}

function HeroActions({ tHero }: { tHero: ReturnType<typeof useTranslations> }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href="#solutions"
        className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-blue-50"
      >
        {tHero('viewSolutions')}
      </Link>
      <Link
        href="#contact"
        className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        {tHero('talkToExpert')}
      </Link>
    </div>
  );
}

function InnovationPillars({
  highlights,
  tHero,
}: {
  highlights: Highlight[];
  tHero: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
      <InnovationPillarsHeader tHero={tHero} />
      <InnovationPillarsList highlights={highlights} />
    </div>
  );
}

function InnovationPillarsHeader({ tHero }: { tHero: ReturnType<typeof useTranslations> }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-white">{tHero('innovationPillars')}</h3>
      <p className="mt-2 text-sm text-blue-100">
        {tHero('innovationDescription')}
      </p>
    </>
  );
}

function InnovationPillarsList({ highlights }: { highlights: Highlight[] }) {
  return (
    <ul className="mt-6 space-y-4 text-sm text-blue-50">
      {highlights.map(highlight => (
        <li key={highlight.title} className="flex items-start gap-3">
          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-300" />
          <div>
            <p className="font-semibold text-white">{highlight.title}</p>
            <p className="mt-1 text-blue-100">{highlight.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function BusinessHighlightsPanel({ highlights }: { highlights: BusinessHighlight[] }) {
  if (!highlights.length) {
    return null;
  }

  return (
    <div className="mt-12 grid gap-6 rounded-2xl bg-black/20 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map(highlight => (
        <BusinessHighlightCard key={highlight.id} highlight={highlight} />
      ))}
    </div>
  );
}

function BusinessHighlightCard({ highlight }: { highlight: BusinessHighlight }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm uppercase tracking-[0.3em] text-blue-200">{highlight.category}</p>
      <p className="mt-3 text-3xl font-semibold text-white">
        {highlight.adoptionRate ? `${highlight.adoptionRate}%` : '2025'}
      </p>
      <p className="mt-2 text-sm text-blue-100">{highlight.description}</p>
    </div>
  );
}
