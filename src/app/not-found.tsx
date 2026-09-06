import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600">
        That path is not part of the CES Ltd static site.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Back to home
      </Link>
    </main>
  );
}
