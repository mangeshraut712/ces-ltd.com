'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('contact');

  const handleContactChange = (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        onSubmit(e);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t('title')}</h2>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-blue-500">{t('subtitle')}</p>
        <p className="mt-2 text-sm text-slate-600">
          {t('description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
              {t('name')}
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
              {t('email')}
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
              {t('company')}
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
              {t('region')}
            </label>
            <select
              id="contact-region"
              value={contactForm.region}
              onChange={handleContactChange('region')}
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {globalOffices.map((office, index) => (
                <option key={`${office.country}-${index}`} value={office.country} className="text-slate-900">
                  {office.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
            {t('message')}
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


        <button
          type="submit"
          disabled={contactStatus === 'submitting'}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-70"
        >
          {contactStatus === 'submitting'
            ? t('sending', { default: 'Sending...' })
            : contactStatus === 'success'
              ? t('submitted', { default: 'Submitted' })
              : t('submit')}
        </button>

        {contactStatus === 'success' && (
          <p className="text-sm text-green-600">{t('success')}</p>
        )}
      </form>

      {companyInfo.socialLinks && (
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <h3 className="text-sm font-semibold text-slate-900">{t('connect')}</h3>
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
