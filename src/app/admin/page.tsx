'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa6';

import AdminPanel from '@/components/AdminPanel';

interface Credentials {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  company: string;
}

const DEFAULT_CREDENTIALS: Credentials = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  company: '',
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<Credentials>(DEFAULT_CREDENTIALS);

  if (isAuthenticated) {
    return <AdminPanel />;
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      if (formData.email === 'admin@ces-ltd.com' && formData.password === 'admin123') {
        setIsAuthenticated(true);
        return;
      }

      alert('Invalid credentials. Use admin@ces-ltd.com / admin123 for the demo.');
      return;
    }

    if (formData.password === formData.confirmPassword && formData.password.length >= 6) {
      setIsAuthenticated(true);
      return;
    }

    alert('Passwords do not match or do not meet the minimum requirements.');
  };

  const handleGoogleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleForgotPassword = () => {
    alert('Contact support@ces-ltd.com for credential assistance.');
  };

  const renderRequired = (label: string) => (
    <>
      {label}
      <span className="ml-1 text-red-500" aria-hidden>
        *
      </span>
    </>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-lg md:grid-cols-[1.05fr,1fr]">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 p-10 text-white md:flex">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]">
            <span className="text-white/80">Customized Energy Solutions</span>
          </Link>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Enterprise SSO Access</h2>
            <p className="text-sm text-white/80">
              Manage global trading operations, market intelligence reports, and AI dashboards from a unified CES control
              plane. Verified users gain access to internal tooling, analytics, and support workflows.
            </p>
            <div className="rounded-2xl bg-white/15 p-5 shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Demo Credentials</h3>
              <p className="mt-3 text-xs text-white/70">
                Email: <span className="font-semibold text-white">admin@ces-ltd.com</span>
                <br />
                Password: <span className="font-semibold text-white">admin123</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-white/70">
            Need access? Reach out to your CES engagement lead or{' '}
            <a href="mailto:info@ces-ltd.com" className="text-white underline decoration-white/60 underline-offset-2 hover:text-blue-100">
              info@ces-ltd.com
            </a>
            .
          </p>
        </div>

        <div className="bg-white p-10">
          <div className="space-y-3 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">Customized Energy Solutions</p>
            <h1 className="text-3xl font-bold text-slate-900">{isLogin ? 'Welcome' : 'Request Access'}</h1>
            <p className="text-sm text-slate-600">
              {isLogin ? 'Log in to SSO Dashboard.' : 'Provide details to request administrative access.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                    {renderRequired('First name')}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required={!isLogin}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="Jordan"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                    {renderRequired('Last name')}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required={!isLogin}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="Lee"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                    {renderRequired('Company')}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required={!isLogin}
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    placeholder="CES Partner"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                {renderRequired('Email address')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  {renderRequired('Password')}
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                  {renderRequired('Confirm password')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="Re-enter your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 focus:ring-offset-white"
            >
              Continue
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Or
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-white"
            >
              <FaEnvelope className="h-4 w-4" aria-hidden />
              Continue with CES Email Address
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            {isLogin ? "Need administrative access?" : 'Already have credentials?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(prev => !prev)}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {isLogin ? 'Request it here' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
