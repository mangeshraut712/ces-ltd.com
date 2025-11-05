'use client';

const expertProfiles = [
  {
    name: 'Ankita Desai',
    role: 'VP, Emerging Technologies',
    focus: 'Energy storage strategy, hydrogen commercialization, market design',
  },
  {
    name: 'Michael Turner',
    role: 'Director, Market Operations',
    focus: 'Wholesale market optimization, ISO engagement, reliability planning',
  },
  {
    name: 'Rika Watanabe',
    role: 'Regional Lead, Japan',
    focus: 'Regulatory advisory, renewable integration, bilingual stakeholder alignment',
  },
];

export default function ExpertsSection() {
  return (
    <section id="experts" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Industry Experts</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Cross-disciplinary leaders who bring market operations, regulatory insight, and emerging technology expertise to every engagement.
          </p>
        </div>
        <a href="#contact" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          Connect with the team →
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {expertProfiles.map(expert => (
          <div key={expert.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {expert.name
                  .split(' ')
                  .map(part => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">{expert.name}</p>
                <p className="text-sm text-slate-600">{expert.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{expert.focus}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
