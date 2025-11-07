'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import AdminPanel from '@/components/AdminPanel';

const DEMO_EMAIL = 'admin@ces-ltd.com';
const DEMO_PASSWORD = 'admin123';

export default function AdminPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <AdminPanel />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      if (formData.email === DEMO_EMAIL && formData.password === DEMO_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials. Use admin@ces-ltd.com / admin123 for demo access.');
      }
    }, 400);
  };

  const handleForgotPassword = () => {
    alert('Contact support@ces-ltd.com to reset your credentials.');
  };

  const handleCesEmailContinue = () => {
    setIsAuthenticated(true);
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#004b8f] px-4 py-12">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-[0_25px_70px_rgba(10,38,76,0.35)]">
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Customized Energy Solutions logo"
              width={220}
              height={70}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">Welcome</h1>
          <p className="mt-1 text-sm text-slate-600">Log in to SSO Dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-base text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-12 text-base text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-[#4B5BD8] hover:text-[#2F3AB8]"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#0b56a4] px-4 py-3 text-base font-semibold text-white shadow transition hover:bg-[#0a4c90] focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Continuing…' : 'Continue'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>Or</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleCesEmailContinue}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-white"
          >
            <MicrosoftGlyph />
            Continue with CES Email Address
          </button>
        </div>

        <div className="mt-8 space-y-1 text-center text-xs text-slate-500">
          <p>
            Need help? Email{' '}
            <a href="mailto:info@ces-ltd.com" className="font-semibold text-blue-600 hover:text-blue-700">
              info@ces-ltd.com
            </a>
            .
          </p>
          <p className="text-[11px]">
            Demo credentials: <span className="font-semibold text-slate-600">{DEMO_EMAIL}</span> /
            <span className="font-semibold text-slate-600"> {DEMO_PASSWORD}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MicrosoftGlyph() {
  const colors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];

  return (
    <span className="inline-flex rounded-md border border-slate-200 p-1 shadow-sm">
      <span className="grid grid-cols-2 gap-0.5">
        {colors.map(color => (
          <span key={color} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
        ))}
      </span>
    </span>
  );
}
