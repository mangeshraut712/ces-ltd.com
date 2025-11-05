'use client';

import { useState, type FormEvent } from 'react';

import { globalOffices } from '@/lib/cesData';
import ContactForm from './ContactForm';
import GlobalOffices from './GlobalOffices';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  region: string;
  message: string;
}

export default function ContactSection() {
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: '',
    email: '',
    company: '',
    region: globalOffices[0]?.country ?? 'USA',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

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
        setContactStatus('idle');
        // You could add error state handling here if needed
        alert(`Failed to submit form: ${data.error}`);
      }
    } catch {
      setContactStatus('idle');
      alert('Failed to submit form. Please try again.');
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
            onSubmit={handleContactSubmit}
          />
        </div>
        <GlobalOffices />
      </div>
    </section>
  );
}
