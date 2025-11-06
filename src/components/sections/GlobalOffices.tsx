'use client';

import { globalOffices } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function GlobalOffices() {
  const { t } = useAppTranslation();

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {t('offices.title', 'Global Delivery Offices')}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {t(
            'offices.description',
            'Local teams providing on-the-ground expertise across North America, Asia, and island grids.',
          )}
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {globalOffices.map((office, index) => (
          <li key={`${office.country}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
              {t(`offices.items.${index}.country`, office.country)}
            </p>
            <p className="text-sm text-slate-900">
              {t(`offices.items.${index}.location`, office.location)}
            </p>
            {office.phone && (
              <p className="mt-1 text-xs text-slate-600">
                {t(`offices.items.${index}.phone`, office.phone)}
              </p>
            )}
            {office.email && (
              <a href={`mailto:${office.email}`} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                {t(`offices.items.${index}.email`, office.email)}
              </a>
            )}
            {office.focus && (
              <div className="mt-2 flex flex-wrap gap-1">
                {office.focus.map((item, focusIndex) => (
                  <span key={item} className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-700 shadow-sm">
                    {t(`offices.items.${index}.focus.${focusIndex}`, item)}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
