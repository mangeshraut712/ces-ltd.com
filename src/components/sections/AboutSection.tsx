'use client';

import { companyInfo } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function AboutSection() {
  const { t } = useAppTranslation();
  const impactStats = [
    {
      label: t('about.metrics.clients', '400+ Clients'),
      detail: t('about.metrics.clientsDetail', 'Across wholesale, retail, and emerging tech programs'),
    },
    {
      label: t('about.metrics.markets', '30+ Markets & ISOs'),
      detail: t('about.metrics.marketsDetail', 'PJM, ERCOT, IESO, CAISO, SPP, WEMM, WEIM, and beyond'),
    },
    {
      label: t('about.metrics.ops', '24/7 Ops Centers'),
      detail: t('about.metrics.opsDetail', 'Philadelphia · Pune · Tokyo · Ho Chi Minh City'),
    },
  ];

  return (
    <section id="about" className="mt-20">
      <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 text-slate-800 shadow-md lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('about.title', 'About Customized Energy Solutions')}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-blue-600">
            {t('about.subtitle', 'Providing energy management solutions since {{year}}', {
              year: String(companyInfo.founded),
            })}
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            {companyInfo.about?.map((paragraph, index) => (
              <p key={index}>{t(`about.paragraphs.${index}`, paragraph)}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              {t('about.mission.title', 'Our Mission')}
            </h3>
            <p className="mt-3 text-sm text-slate-700">
              {t('about.mission.body', companyInfo.mission)}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              {t('about.vision.title', 'Our Vision')}
            </h3>
            <p className="mt-3 text-sm text-slate-700">
              {t('about.vision.body', companyInfo.vision)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              {t('about.awards.title', 'Awards & Recognition')}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {companyInfo.awards?.map((award, index) => (
                <li key={`${award.name}-${index}`} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>
                    <span className="font-semibold text-slate-900">
                      {t(`about.awards.items.${index}.name`, award.name)}
                    </span>
                    {award.description
                      ? ` – ${t(`about.awards.items.${index}.description`, award.description)}`
                      : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-sm text-slate-800">
            {impactStats.map(stat => (
              <div key={stat.label} className="rounded-xl border border-white/60 bg-white/70 p-4 shadow-sm">
                <p className="text-base font-semibold text-slate-900">{stat.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-blue-500">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
