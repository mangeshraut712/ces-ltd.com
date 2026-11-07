'use client';

import { useState, type FormEvent } from 'react';

import { globalOffices } from '@/lib/cesData';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { withBasePath } from '@/lib/basePath';
import ContactForm from './ContactForm';
import GlobalOffices from './GlobalOffices';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  region: string;
  message: string;
}

type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactSection() {
  const { t } = useAppTranslation();
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: '',
    email: '',
    company: '',
    region: globalOffices[0]?.country ?? 'USA',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('submitting');
    setContactError(null);

    try {
      const response = await fetch(withBasePath('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setContactStatus('success');
        setContactForm({
          name: '',
          email: '',
          company: '',
          region: globalOffices[0]?.country ?? 'USA',
          message: '',
        });

        setTimeout(() => setContactStatus('idle'), 4000);
      } else {
        setContactStatus('error');
        setContactError(
          t(
            'contact.form.submitError',
            'We could not send your message. Please try again later.',
          ),
        );
      }
    } catch {
      setContactStatus('error');
      setContactError(
        t(
          'contact.form.submitCatch',
          'We could not send your message. Please try again later.',
        ),
      );
    }
  };

  return (
    <section id="contact" className="mt-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <ContactForm
            contactForm={contactForm}
            setContactForm={setContactForm}
            contactStatus={contactStatus}
            contactError={contactError}
            onSubmit={handleContactSubmit}
          />
        </div>
        <GlobalOffices />
      </div>
    </section>
  );
}
