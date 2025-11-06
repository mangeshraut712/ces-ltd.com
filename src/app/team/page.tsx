import Link from 'next/link';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa6';

import { expertProfiles, presidentProfile } from '@/lib/expertProfiles';

const FEATURED_TEAM = expertProfiles.slice(0, 9);

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TeamHero />
      <TeamDirectory />
    </div>
  );
}

function TeamHero() {
  return (
    <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold md:text-5xl">Meet the CES Team</h1>
        <p className="max-w-2xl text-blue-100">
          Cross-disciplinary leaders delivering market intelligence, regulatory expertise, and technology execution for the global
          energy transition.
        </p>
        <Link
          href="/experts"
          className="inline-flex items-center rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Explore all experts
        </Link>
      </div>
    </section>
  );
}

function TeamDirectory() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PresidentSpotlight />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TEAM.map(profile => (
            <TeamCard key={profile.name} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PresidentSpotlight() {
  return (
    <article className="rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-white p-6 shadow-lg md:p-8">
      <h2 className="text-xl font-semibold text-blue-800">Leadership Spotlight</h2>
      <p className="mt-3 text-2xl font-bold text-slate-900">{presidentProfile.name}</p>
      <p className="text-sm uppercase tracking-[0.3em] text-blue-600">{presidentProfile.role}</p>
      {presidentProfile.summary && <p className="mt-4 text-sm text-slate-700">{presidentProfile.summary}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        {presidentProfile.linkedin && (
          <Link
            href={presidentProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FaLinkedin className="mr-2 h-4 w-4" aria-hidden />
            LinkedIn
          </Link>
        )}
        {presidentProfile.email && (
          <Link
            href={`mailto:${presidentProfile.email}`}
            className="inline-flex items-center rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            <FaEnvelope className="mr-2 h-4 w-4" aria-hidden />
            Email Stephen
          </Link>
        )}
      </div>
    </article>
  );
}

function TeamCard({ profile }: { profile: (typeof expertProfiles)[number] }) {
  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {profile.name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{profile.name}</h3>
      <p className="text-sm text-slate-600">{profile.role}</p>
      {profile.focus && <p className="mt-3 text-sm text-slate-600">{profile.focus}</p>}
    </article>
  );
}
