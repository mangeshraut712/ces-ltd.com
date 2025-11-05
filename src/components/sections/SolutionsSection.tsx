'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { solutions as solutionCatalog } from '@/lib/cesData';

const solutionTranslationKeys: Record<string, string> = {
  gold: 'generation',
  blue: 'retail',
  green: 'distributed',
  comets: 'emerging',
};

export default function SolutionsSection() {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(solutionCatalog[0]?.id ?? null);
  const selectedSolution = solutionCatalog.find(solution => solution.id === selectedSolutionId);
  const tSolutions = useTranslations('solutions');

  const localizedSelected = useMemo(() => {
    if (!selectedSolution) return null;

    const translationKey = solutionTranslationKeys[selectedSolution.id];
    if (!translationKey) {
      return {
        title: selectedSolution.name,
        description: selectedSolution.description,
      };
    }

    return {
      title: tSolutions(`${translationKey}.title`, { default: selectedSolution.name }),
      description: tSolutions(`${translationKey}.description`, { default: selectedSolution.description }),
    };
  }, [selectedSolution, tSolutions]);

  return (
    <section id="solutions" className="mt-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{tSolutions('heading')}</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {tSolutions('description')}
          </p>
          <p className="mt-3 text-sm font-semibold text-blue-700">{tSolutions('localizedFrameworks')}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {solutionCatalog.map(solution => {
            const isActive = selectedSolutionId === solution.id;
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
                  <span className="text-xs uppercase tracking-wide text-blue-500">{solution.target}</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {tSolutions(`${solutionTranslationKeys[solution.id] ?? ''}.title`, { default: solution.name })}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {tSolutions(`${solutionTranslationKeys[solution.id] ?? ''}.description`, { default: solution.description })}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  Learn more →
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
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">Key capabilities</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {selectedSolution.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedSolution.link && (
                <a
                  href={selectedSolution.link}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Explore solution details →
                </a>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-600">Select a solution to view details.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
