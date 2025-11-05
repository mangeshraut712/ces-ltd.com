import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en-US', 'ja-JP', 'hi-IN', 'nl-NL', 'ar-AE', 'es-MX', 'fr-CA', 'vi-VN'],

  // Used when no locale matches
  defaultLocale: 'en-US'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en-US|ja-JP|hi-IN|nl-NL|ar-AE|es-MX|fr-CA|vi-VN)/:path*']
};
