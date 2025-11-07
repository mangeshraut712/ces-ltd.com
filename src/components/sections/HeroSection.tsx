'use client';

import Link from 'next/link';
import { businessLines } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const heroHighlights = [
  {
    icon: '📊',
    title: 'Expertise & Market Intelligence',
    description:
      'Cross-market ISO/RTO intelligence, regulatory monitoring, and advisory depth spanning wholesale, retail, and emerging technologies.',
  },
  {
    icon: '🖥️',
    title: 'Hosted Software Solutions',
    description:
      'Performance-guaranteed platforms such as CES | GOLD and CES | BLUE covering forecasting, billing, settlements, and analytics.',
  },
  {
    icon: '🛰️',
    title: 'Operational Reliability',
    description:
      '24/7 Market Operations Centers, CES | SecureNet communications, and continuum-of-operations runbooks for mission-critical assets.',
  },
  {
    icon: '⚙️',
    title: 'Innovation & Emerging Tech',
    description:
      'Acceleration of storage, EV, hydrogen, and smart-grid deployments with interconnection, dispatch, and monetization expertise.',
  },
  {
    icon: '🤝',
    title: 'Client Empowerment & Service',
    description:
      'Transparent engagements, knowledge transfer, and cost-optimization strategies that prioritize client goals and stakeholder alignment.',
  },
];

export default function HeroSection() {
  const { t } = useAppTranslation();
  const businessHighlights = businessLines.filter(line => line.adoptionRate).slice(0, 3);
  const utilityPillars = ['Safety', 'Quality', 'Efficiency'];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-16 text-white shadow-xl sm:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-blue-100 uppercase">
            {t('hero.tagline', 'ANALYZE. SIMPLIFY. IMPLEMENT.')}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {t('hero.title', 'Customized Energy Solutions for a Transparent, Efficient Future')}
          </h1>
          <p className="mt-6 text-lg text-blue-100 sm:text-xl">
            {t(
              'hero.description',
              'Since 1998, CES Ltd. has partnered with market operators, retailers, and innovators to analyze complex energy landscapes, simplify decision-making, and implement scaled solutions across the globe.',
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#solutions"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-blue-50"
            >
              {t('hero.ctaPrimary', 'View Solutions')}
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t('hero.ctaSecondary', 'Talk to an Expert')}
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">{t('hero.pillars.title', 'Innovation Pillars')}</h3>
          <p className="mt-2 text-sm text-blue-100">
            {t(
              'hero.pillars.description',
              'CES delivers comprehensive energy solutions through market intelligence, regulatory expertise, and emerging technologies.',
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-200">
            {utilityPillars.map(pillar => (
              <span key={pillar} className="rounded-full border border-white/20 px-3 py-1 text-blue-50">
                {t(`hero.utilityPillars.${pillar.toLowerCase()}`, pillar)}
              </span>
            ))}
          </div>
          <ul className="mt-6 space-y-4 text-sm text-blue-50">
            {heroHighlights.map((highlight, index) => (
              <li key={highlight.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                <span className="text-2xl" aria-hidden>
                  {t(`hero.highlights.${index}.icon`, highlight.icon)}
                </span>
                <div>
                  <p className="text-base font-semibold text-white">
                    {t(`hero.highlights.${index}.title`, highlight.title)}
                  </p>
                  <p className="mt-1 text-blue-100">
                    {t(`hero.highlights.${index}.description`, highlight.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {businessHighlights.length > 0 && (
        <div className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex flex-col gap-2 text-blue-100 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
              {t('hero.business.title', 'Operational Impact')}
            </p>
            <p className="text-sm text-blue-100">
              {t('hero.business.subtitle', 'Measured adoption across demand, renewable, and market intelligence programs.')}
            </p>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessHighlights.map(highlight => {
              const adoptionRate = highlight.adoptionRate ?? 0;
              const progressWidth = Math.min(adoptionRate, 120);
              const normalizedWidth = `${(progressWidth / 120) * 100}%`;

              return (
                <div key={highlight.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
                    {t(`hero.business.${highlight.id}.category`, highlight.category)}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2 text-white">
                    <p className="text-3xl font-semibold">{highlight.adoptionRate ? `${highlight.adoptionRate}%` : '2025'}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-200">
                      {t('hero.business.metricLabel', 'Adoption')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-blue-100">
                    {t(`hero.business.${highlight.id}.description`, highlight.description)}
                  </p>
                  {highlight.adoptionRate && (
                    <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300"
                        style={{ width: normalizedWidth }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
