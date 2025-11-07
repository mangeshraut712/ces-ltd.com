'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa6';

import { expertProfiles, presidentProfile } from '@/lib/expertProfiles';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function ExpertsSection() {
  const { t } = useAppTranslation();
  const presidentDetails = [presidentProfile.bio, presidentProfile.achievements, presidentProfile.education].filter(
    Boolean,
  ) as string[];
  const leadershipStats = [
    {
      label: t('experts.metrics.offices', '10 Global offices'),
      detail: t('experts.metrics.officesDetail', 'Regulatory + operations coverage'),
    },
    {
      label: t('experts.metrics.experts', `${expertProfiles.length}+ subject-matter experts`),
      detail: t('experts.metrics.expertsDetail', 'Market design, software, and operations leaders'),
    },
    {
      label: t('experts.metrics.languages', '8+ languages'),
      detail: t('experts.metrics.languagesDetail', 'Client delivery in local markets'),
    },
  ];

  return (
    <section id="experts" className="mt-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <header className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            {t('experts.title', 'CES Leadership')}
          </h2>
          <p className="text-sm text-slate-600">
            {t(
              'experts.description',
              'Cross-disciplinary leaders who bring market operations, regulatory insight, and emerging technology expertise to every engagement.',
            )}
          </p>
        </header>

        <article className="mt-8 flex w-full flex-col gap-6 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-white via-blue-50 to-white p-10 text-center shadow-xl lg:flex-row lg:items-center lg:gap-12 lg:text-left">
          <Image
            src="/images/stephen-fernands.png"
            alt={presidentProfile.name}
            width={240}
            height={240}
            className="mx-auto h-70 w-60 rounded-[32px] border-4 border-blue-200 object-cover shadow-2xl lg:mx-0"
            priority
          />
          <div className="flex flex-1 flex-col items-center gap-4 lg:items-start">
            <h3 className="text-2xl font-semibold text-slate-900">
              {t('experts.president.name', presidentProfile.name)}
            </h3>
            {presidentProfile.role && (
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-700">
                {t('experts.president.role', presidentProfile.role)}
              </p>
            )}
            {presidentDetails.length > 0 && (
              <div className="max-w-3xl space-y-4 rounded-2xl border border-blue-100 bg-white/80 p-6 text-sm leading-relaxed text-slate-700 shadow-sm">
                {presidentDetails.map((detail, index) => (
                  <p key={index} className="text-justify">
                    {t(`experts.president.details.${index}`, detail)}
                  </p>
                ))}
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {presidentProfile.linkedin && (
                <a
                  href={presidentProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                >
                  <FaLinkedin className="h-4 w-4" aria-hidden />
                  {t('experts.links.linkedin', 'LinkedIn')}
                </a>
              )}
              {presidentProfile.email && (
                <a
                  href={`mailto:${presidentProfile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
                >
                  <FaEnvelope className="h-4 w-4" aria-hidden />
                  {t('experts.links.email', 'Email Stephen')}
                </a>
              )}
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-sm text-blue-900 sm:grid-cols-3">
          {leadershipStats.map(stat => (
            <div key={stat.label} className="rounded-xl border border-white/70 bg-white/70 p-4 shadow-sm">
              <p className="text-base font-semibold text-slate-900">{stat.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-blue-500">{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/experts"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {t('experts.cta', 'Meet the full team →')}
          </Link>
        </div>
      </div>
    </section>
  );
}
