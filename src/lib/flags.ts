export const officeFlagMap: Record<string, string> = {
  USA: '/images/flags/US.svg',
  India: '/images/flags/IN.svg',
  Japan: '/images/flags/JP.svg',
  Vietnam: '/images/flags/VN.svg',
  Canada: '/images/flags/CA.svg',
  Mexico: '/images/flags/MX.svg',
  UAE: '/images/flags/AE.svg',
  Netherlands: '/images/flags/NL.svg',
};

export const getFlagForCountry = (country: string): string | undefined =>
  officeFlagMap[country] ?? officeFlagMap[country.replace(/\s+/g, '')];
