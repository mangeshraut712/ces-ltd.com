'use client';

import Image from 'next/image';

import { globalOffices } from '@/lib/cesData';
import { getFlagForCountry } from '@/lib/flags';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6';

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
        {globalOffices.map((office, index) => {
          const flagSrc = getFlagForCountry(office.country);

          return (
            <li
              key={`${office.country}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                {flagSrc && (
                  <Image
                    src={flagSrc}
                    alt={t('offices.flagAlt', '{{country}} flag', { country: office.country })}
                    width={28}
                    height={20}
                    className="h-5 w-7 rounded-sm border border-slate-200 object-cover shadow-sm"
                  />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                    {t(`offices.items.${index}.country`, office.country)}
                  </p>
                  {(office.address || office.localizedName) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {office.address ??
                        office.localizedName ??
                        t(`offices.items.${index}.country`, office.country)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                {office.location && (
                  <div className="flex items-start gap-2">
                    <FaLocationDot className="mt-1 h-4 w-4 text-blue-600" aria-hidden />
                    <p className="whitespace-pre-line">
                      {t(`offices.items.${index}.location`, office.location)}
                    </p>
                  </div>
                )}
                {office.phone && (
                  <div className="flex items-start gap-2">
                    <FaPhone className="mt-1 h-4 w-4 text-blue-600" aria-hidden />
                    <a
                      href={`tel:${office.phone}`}
                      className="text-blue-700 hover:text-blue-800"
                    >
                      {t(`offices.items.${index}.phone`, office.phone)}
                    </a>
                  </div>
                )}
                {office.email && (
                  <div className="flex items-start gap-2 break-all">
                    <FaEnvelope className="mt-1 h-4 w-4 text-blue-600" aria-hidden />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-blue-700 hover:text-blue-800"
                    >
                      {t(`offices.items.${index}.email`, office.email)}
                    </a>
                  </div>
                )}
              </div>

              {office.focus && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {office.focus.map((item, focusIndex) => (
                    <span
                      key={`${item}-${focusIndex}`}
                      className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-blue-700 shadow-sm"
                    >
                      {t(`offices.items.${index}.focus.${focusIndex}`, item)}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
