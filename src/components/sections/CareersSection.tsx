'use client';

import Link from 'next/link';

import { useAppTranslation } from '@/hooks/useAppTranslation';

const careerHighlights = [
  {
    title: 'Energy Market Strategist',
    location: 'Philadelphia, USA · Hybrid',
    perk: 'Mentored certification pathways & analytics sandbox access',
  },
  {
    title: 'Web3 Compliance Engineer',
    location: 'Tokyo, Japan · Remote',
    perk: 'ZK proof research budget and joint patent program',
  },
  {
    title: 'VR/AR Experience Designer',
    location: 'Pune, India · On-site',
    perk: 'Collaborate with global project teams and hardware lab',
  },
];

export default function CareersSection() {
  const { t } = useAppTranslation();

  return (
    <section id="careers" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('careers.title', 'Careers & Growth')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'careers.description',
              'Join global teams shaping deregulated energy markets, scaling decarbonization, and building the future of energy intelligence.',
            )}
          </p>
        </div>
        <Link href="/careers" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          {t('careers.cta', 'View all openings →')}
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {careerHighlights.map((role, index) => (
          <div key={role.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
              {t('careers.featuredLabel', 'Featured role')}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {t(`careers.roles.${index}.title`, role.title)}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {t(`careers.roles.${index}.location`, role.location)}
            </p>
            <p className="mt-3 text-sm text-slate-600">
              {t(`careers.roles.${index}.perk`, role.perk)}
            </p>
            <Link href="/careers" className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
              {t('careers.apply', 'Apply now →')}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
