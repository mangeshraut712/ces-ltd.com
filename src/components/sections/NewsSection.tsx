'use client';

import Link from 'next/link';

import { useAppTranslation } from '@/hooks/useAppTranslation';

const newsHighlights = [
  {
    title: 'CES celebrates 25th anniversary milestone',
    summary:
      'Quarter-century of energy innovation: from pioneering advanced energy storage to leading AI-driven market operations across global grids.',
    tag: 'Milestone',
  },
  {
    title: 'India storage portfolio achieves 40% faster deployment',
    summary: 'IoT telemetry + AI scheduling streamline commissioning across utility-scale battery sites.',
    tag: 'Case Study',
  },
  {
    title: 'CES featuring at Japan Energy Week 2025',
    summary: 'Panel on multi-market orchestration and zero-knowledge compliance for cross-border programs.',
    tag: 'Event',
  },
];

export default function NewsSection() {
  const { t } = useAppTranslation();

  return (
    <section id="news" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('news.title', 'News & Media')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'news.description',
              'AI-curated highlights, announcements, and event spotlights from across CES global teams.',
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm font-semibold text-blue-600 sm:flex-row sm:items-center">
          <Link href="/news" className="inline-flex items-center hover:text-blue-700">
            {t('news.cta', 'Explore innovation stories →')}
          </Link>
          <a
            href="mailto:media@ces-ltd.com?subject=CES%20Media%20Briefings"
            className="inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            {t('news.subscribe', 'Get press briefings →')}
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {newsHighlights.map((item, index) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          >
            <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
              {t(`news.items.${index}.tag`, item.tag)}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {t(`news.items.${index}.title`, item.title)}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">
              {t(`news.items.${index}.summary`, item.summary)}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
              {t('news.readMore', 'Read more →')}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
