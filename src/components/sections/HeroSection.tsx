'use client';

import Link from 'next/link';
import { businessLines } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const heroHighlights = [
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

export default function HeroSection() {
  const { t } = useAppTranslation();
  const businessHighlights = businessLines.filter(line => line.adoptionRate).slice(0, 3);

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
          <ul className="mt-6 space-y-4 text-sm text-blue-50">
            {heroHighlights.slice(0, 3).map((highlight, index) => (
              <li key={highlight.title} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-300" />
                <div>
                  <p className="font-semibold text-white">
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
        <div className="mt-12 grid gap-6 rounded-2xl bg-black/20 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessHighlights.map(highlight => (
            <div key={highlight.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-200">
                {t(`hero.business.${highlight.id}.category`, highlight.category)}
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {highlight.adoptionRate ? `${highlight.adoptionRate}%` : '2025'}
              </p>
              <p className="mt-2 text-sm text-blue-100">
                {t(`hero.business.${highlight.id}.description`, highlight.description)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
