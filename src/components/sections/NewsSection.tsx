'use client';

const newsHighlights = [
  {
    title: 'CES launches Nexus 3.0 innovation suite',
    summary: 'AI-first upgrade introduces predictive dashboards, VR site tours, and Web3 certification workflows.',
    tag: 'Product',
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
  return (
    <section id="news" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">News & Media</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            AI-curated highlights, announcements, and event spotlights from across CES global teams.
          </p>
        </div>
        <a href="#innovation" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          Explore innovation stories →
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {newsHighlights.map(item => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          >
            <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
              {item.tag}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">{item.summary}</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">Read more →</span>
          </article>
        ))}
      </div>
    </section>
  );
}
