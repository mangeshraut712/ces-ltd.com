'use client';

import { type ChangeEvent, type FormEvent } from 'react';

import { companyInfo, globalOffices } from '@/lib/cesData';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  region: string;
  message: string;
}

interface ContactFormProps {
  contactForm: ContactFormState;
  setContactForm: React.Dispatch<React.SetStateAction<ContactFormState>>;
  contactStatus: 'idle' | 'submitting' | 'success';
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const socialIconMap: Record<string, string> = {
  Email: '✉️',
  Twitter: '𝕏',
  Facebook: '📘',
  LinkedIn: '🔗',
  Instagram: '📸',
  YouTube: '▶️',
};

export default function ContactForm({ contactForm, setContactForm, contactStatus, onSubmit }: ContactFormProps) {
  const handleContactChange = (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-blue-500">Global Market Operations · 24/7</p>
        <p className="mt-2 text-sm text-slate-600">
          Share your initiative and our regional strategists will architect an engagement plan that blends AI, IoT, Web3, and VR capabilities tailored to your market.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="contact-name"
              required
              value={contactForm.name}
              onChange={handleContactChange('name')}
              placeholder="Jordan Lee"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
              Work email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={contactForm.email}
              onChange={handleContactChange('email')}
              placeholder="you@company.com"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700">
              Company or organization
            </label>
            <input
              id="contact-company"
              value={contactForm.company}
              onChange={handleContactChange('company')}
              placeholder="CES Nexus Partner"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contact-region" className="block text-sm font-medium text-slate-700">
              Region of operation
            </label>
            <select
              id="contact-region"
              value={contactForm.region}
              onChange={handleContactChange('region')}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {globalOffices.map(office => (
                <option key={office.country} value={office.country} className="text-slate-900">
                  {office.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
            Project goals
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={contactForm.message}
            onChange={handleContactChange('message')}
            placeholder="Describe your initiative, timelines, and what success looks like."
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Zero-Knowledge Proof (demo)</p>
          <p className="mt-1">
            Coming soon: drop in credentials to generate zk-SNARK attestations for compliance teams without exposing identities.
          </p>
        </div>

        <button
          type="submit"
          disabled={contactStatus === 'submitting'}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-70"
        >
          {contactStatus === 'submitting' ? 'Sending...' : contactStatus === 'success' ? 'Submitted' : 'Send message'}
        </button>

        {contactStatus === 'success' && (
          <p className="text-sm text-green-600">Thanks! A regional strategist will reach out within one business day.</p>
        )}
      </form>

      {companyInfo.socialLinks && (
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <h3 className="text-sm font-semibold text-slate-900">Connect With CES</h3>
          <ul className="mt-2 space-y-1">
            {companyInfo.socialLinks.map(link => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-xs transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="text-base">{socialIconMap[link.label] ?? '🔗'}</span>
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}