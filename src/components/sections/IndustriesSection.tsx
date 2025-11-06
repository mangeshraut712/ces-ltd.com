'use client';

import { serviceCategories } from '@/lib/cesData';
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
              'Tailored playbooks and advisory for operators, retailers, and emerging technology participants navigating deregulated markets.',
            )}
          </p>
        </div>
        <a href="#contact" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          {t('industries.cta', 'Schedule a strategy session →')}
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((category, index) => (
          <div key={category.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-slate-900">
                {t(`industries.cards.${index}.title`, category.name)}
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {t(`industries.cards.${index}.description`, category.description)}
            </p>
            <a
              href={category.link ?? '#'}
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              {t('industries.viewCapabilities', 'View capabilities →')}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
