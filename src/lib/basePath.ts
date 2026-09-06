const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a site-root path with the GitHub Pages repo base (e.g. `/ces-ltd.com`). */
export function withBasePath(path: string): string {
  const prefix = configuredBasePath.endsWith('/')
    ? configuredBasePath.slice(0, -1)
    : configuredBasePath;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${normalized}`;
}
