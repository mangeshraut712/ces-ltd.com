'use client';

import { FaCircleCheck } from 'react-icons/fa6';

import { industryShowcase } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function IndustriesSection() {
  const { t } = useAppTranslation();

  return (
    <section id="industries" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('industries.title', 'Industries We Empower')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'industries.description',
              'Market-tested playbooks for asset owners, retailers, and innovators pursuing growth in deregulated grids.',
            )}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
            {t('industries.regional', 'Localized delivery frameworks for the USA, Japan, and India.')}
          </p>
        </div>
        <a href="#contact" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          {t('industries.cta', 'Schedule a strategy session →')}
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {industryShowcase.map((industry, index) => (
          <div
            key={industry.name}
            className="flex flex-col rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:ring-blue-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{industry.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                  {t(`industries.cards.${index}.label`, 'Industry Focus')}
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  {t(`industries.cards.${index}.title`, industry.name)}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {t(`industries.cards.${index}.description`, industry.description)}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {industry.highlights.map((highlight, highlightIndex) => (
                <li key={highlight} className="flex items-start gap-2">
                  <FaCircleCheck className="mt-0.5 h-4 w-4 text-blue-500" aria-hidden />
                  <span>{t(`industries.cards.${index}.highlights.${highlightIndex}`, highlight)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex-1" />
            <a
              href="#contact"
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              {t('industries.viewCapabilities', 'Schedule a briefing →')}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 rounded-3xl border border-blue-100 bg-blue-50/50 p-6 text-sm text-slate-700 md:grid-cols-3">
        {[
          t('industries.metrics.clients', '400+ global clients across wholesale and retail markets'),
          t('industries.metrics.opsCenters', '24/7 operations centers in Philadelphia, Pune, Tokyo, and Ho Chi Minh City'),
          t('industries.metrics.experience', '25+ years accelerating participation in deregulated markets'),
        ].map(metric => (
          <div key={metric} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
            <p className="font-semibold text-slate-900">{metric}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
