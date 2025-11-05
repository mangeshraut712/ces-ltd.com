'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { expertProfiles, positionHierarchy } from '@/lib/expertProfiles';

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'position'>('name');
  const [filterPosition, setFilterPosition] = useState('');

  const filteredExperts = useMemo(() => {
    const filtered = expertProfiles.filter(expert => {
      const matchesSearch =
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition =
        !filterPosition || expert.role.toLowerCase().includes(filterPosition.toLowerCase());

      return matchesSearch && matchesPosition;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      const aIndex = positionHierarchy.findIndex(pos =>
        a.role.toLowerCase().includes(pos.toLowerCase()),
      );
      const bIndex = positionHierarchy.findIndex(pos =>
        b.role.toLowerCase().includes(pos.toLowerCase()),
      );

      return aIndex - bIndex;
    });
  }, [filterPosition, searchTerm, sortBy]);

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-6xl">CES Leadership Directory</h1>
          <Link
            href="/#experts"
            className="inline-flex items-center rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/10"
          >
            ← Back to expert
          </Link>
        </div>
      </section>

      <main className="py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <header className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Leadership Directory</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Filter and explore CES leadership by expertise, focus area, or market role.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortBy('name')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    sortBy === 'name'
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Sort Alphabetically
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('position')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    sortBy === 'position'
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Sort by position
                </button>
              </div>
            </header>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder="Search by name or role..."
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
              />
              <select
                value={filterPosition}
                onChange={event => setFilterPosition(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-[220px]"
              >
                <option value="">All positions</option>
                {positionHierarchy.map(position => (
                  <option key={position} value={position.toLowerCase()}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                {filteredExperts.length} Expert{filteredExperts.length !== 1 ? 's' : ''} Found
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExperts.map(expert => (
                <article
                  key={expert.name}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {initials(expert.name)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{expert.name}</p>
                      <p className="text-sm text-slate-600">{expert.role}</p>
                    </div>
                  </div>
                  {expert.focus && <p className="text-sm text-slate-600">{expert.focus}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}
