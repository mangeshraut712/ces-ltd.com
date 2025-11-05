'use client';

const presidentProfile = {
  name: 'Stephen Fernands',
  role: 'President',
  bio: 'Stephen Fernands is Founder and President of Customized Energy Solutions. Since Customized Energy Solutions founding in 1998 it has helped thousands of companies understand wholesale and retail electric and natural gas market and implement solutions through its hosted software platforms. INC magazine ranked Customized Energy Solutions as one of the fastest growing companies in the United States from 2005 through 2015 and in 2008 it was the 15th fastest growing private company in the energy industry. Stephen has led the expansion of Customized Energy Solutions from a Mid-Atlantic based energy services firm to one that provides comprehensive solutions throughout the US, Canada, Mexico, India and Japan.',
  achievements: 'As President, Stephen has focused on developing competitive wholesale and retail energy markets and development of software that enables innovation in the areas of retail competition, demand response program development, supply procurement, generation development, and transmission congestion analysis.',
  education: 'Stephen has a BS in economics from Pennsylvania State University and an MBA in Finance from Drexel University.',
  linkedin: 'http://www.linkedin.com/pub/stephen-fernands/9/a15/1a6',
  email: 'sfernands@ces-ltd.com'
};

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
          <h2 className="text-3xl font-bold text-slate-900">Leadership & Experts</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Cross-disciplinary leaders who bring market operations, regulatory insight, and emerging technology expertise to every engagement.
          </p>
        </div>
        <a href="#contact" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          Connect with the team →
        </a>
      </div>

      {/* President Card - Special Design */}
      <div className="mt-10">
        <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <img
              src="/images/Stephen Fernands.png"
              alt={presidentProfile.name}
              className="h-20 w-20 rounded-full object-cover shadow-lg"
            />
            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{presidentProfile.name}</h3>
                  <p className="text-lg font-semibold text-blue-600">{presidentProfile.role}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={presidentProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${presidentProfile.email}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-slate-700 leading-relaxed">{presidentProfile.bio}</p>
                <p className="text-slate-700 leading-relaxed">{presidentProfile.achievements}</p>
                <p className="text-slate-600 italic">{presidentProfile.education}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Experts */}
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
