'use client';

import Link from 'next/link';

import { businessLines, companyInfo } from '@/lib/cesData';

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
    title: 'AI-Driven Personalization',
    description: 'Adaptive experiences tuned to real-time demand, user behavior, and market conditions.',
  },
  {
    title: 'Immersive Collaboration',
    description: 'VR-ready project walkthroughs and IoT telemetry keep distributed teams aligned.',
  },
  {
    title: 'Trustless Transactions',
    description: 'Web3-based certification and smart contracts secure project milestones and audits.',
  },
  {
    title: 'Operational Intelligence',
    description: 'Edge analytics and predictive dashboards surface the next best action automatically.',
  },
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const normalizedLocale = (locale ?? 'en-US').toUpperCase();
  const businessHighlights = businessLines.filter(line => line.adoptionRate).slice(0, 3);

  return <HeroSectionContent normalizedLocale={normalizedLocale} businessHighlights={businessHighlights} />;
}

function HeroSectionContent({ normalizedLocale, businessHighlights }: { normalizedLocale: string; businessHighlights: BusinessHighlight[] }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-16 text-white shadow-xl sm:px-10 lg:px-16">
      <HeroMainGrid normalizedLocale={normalizedLocale} />
      <BusinessHighlightsPanel highlights={businessHighlights} />
    </section>
  );
}

function HeroMainGrid({ normalizedLocale }: { normalizedLocale: string }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
      <HeroHeadline normalizedLocale={normalizedLocale} />
      <InnovationPillars highlights={heroHighlights} />
    </div>
  );
}

function HeroHeadline({ normalizedLocale }: { normalizedLocale: string }) {
  return (
    <div>
      <HeroBadge normalizedLocale={normalizedLocale} />
      <HeroTitle />
      <HeroDescription />
      <HeroActions />
    </div>
  );
}

function HeroBadge({ normalizedLocale }: { normalizedLocale: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-blue-100 uppercase">
      {companyInfo.tagline} · {normalizedLocale}
    </span>
  );
}

function HeroTitle() {
  return (
    <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
      Customized Energy Solutions for a Transparent, Efficient Future
    </h1>
  );
}

function HeroDescription() {
  return (
    <p className="mt-6 text-lg text-blue-100 sm:text-xl">
      Since {companyInfo.founded}, CES Ltd. has partnered with market operators, retailers, and innovators to analyze complex energy
      landscapes, simplify decision-making, and implement scaled solutions across the globe.
    </p>
  );
}

function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href="#solutions"
        className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-blue-50"
      >
        View Solutions
      </Link>
      <Link
        href="#contact"
        className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        Talk to an Expert
      </Link>
    </div>
  );
}

function InnovationPillars({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
      <InnovationPillarsHeader />
      <InnovationPillarsList highlights={highlights} />
    </div>
  );
}

function InnovationPillarsHeader() {
  return (
    <>
      <h3 className="text-lg font-semibold text-white">Innovation Pillars</h3>
      <p className="mt-2 text-sm text-blue-100">
        CES Nexus 3.0 orchestrates the technologies that will define the next decade of energy transformation.
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
