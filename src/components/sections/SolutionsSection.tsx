'use client';

import { useMemo, useState } from 'react';

import { solutions as solutionCatalog } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const solutionTranslationKeys: Record<string, string> = {
  gold: 'generation',
  blue: 'retail',
  green: 'distributed',
  comets: 'emerging',
};

export default function SolutionsSection() {
  const { t } = useAppTranslation();
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(solutionCatalog[0]?.id ?? null);
  const selectedSolution = solutionCatalog.find(solution => solution.id === selectedSolutionId);

  const localizedSelected = useMemo(() => {
    if (!selectedSolution) return null;

    return {
      title: t(
        `solutions.detail.${selectedSolution.id}.title`,
        selectedSolution.name,
      ),
      description: t(
        `solutions.detail.${selectedSolution.id}.description`,
        selectedSolution.description,
      ),
    };
  }, [selectedSolution, t]);

  return (
    <section id="solutions" className="mt-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('solutions.title', 'Explore Solutions')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'solutions.description',
              'Select a domain to see how CES transforms market operations, retail programs, emerging technologies, and distributed energy ecosystems.',
            )}
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700">
            {t('solutions.subtitle', 'Localized delivery frameworks for the USA, Japan, and India.')}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {solutionCatalog.map(solution => {
            const isActive = selectedSolutionId === solution.id;
            const solutionKey = solutionTranslationKeys[solution.id] ?? solution.id;
            const name = t(`solutions.card.${solutionKey}.name`, solution.name);
            const description = t(
              `solutions.card.${solutionKey}.description`,
              solution.description,
            );
            const target = solution.target
              ? t(`solutions.card.${solutionKey}.target`, solution.target)
              : solution.target;

            return (
              <button
                key={solution.id}
                type="button"
                onClick={() => setSelectedSolutionId(solution.id)}
                className={`text-left rounded-xl border p-5 transition-all ${
                  isActive ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{solution.icon}</span>
                  <span className="text-xs uppercase tracking-wide text-blue-500">{target}</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {name}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  {t('solutions.learnMore', 'Learn more →')}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          {selectedSolution && localizedSelected ? (
            <>
              <h3 className="text-xl font-semibold text-slate-900">{localizedSelected.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{localizedSelected.description}</p>
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                  {t('solutions.keyCapabilities', 'Key capabilities')}
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {selectedSolution.features.map((feature, index) => {
                    const featureKey = `solutions.detail.${selectedSolution.id}.features.${index}`;
                    return (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-500" />
                        <span>{t(featureKey, feature)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {selectedSolution.link && (
                <a
                  href={selectedSolution.link}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {t('solutions.exploreDetails', 'Explore solution details →')}
                </a>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-600">
              {t('solutions.emptyState', 'Select a solution to view details.')}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
