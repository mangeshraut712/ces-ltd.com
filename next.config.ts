import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const pagesBasePath = '/ces-ltd.com';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@react-three/xr'],
  images: {
    unoptimized: isGithubPages,
  },
};

if (isGithubPages) {
  nextConfig.output = 'export';
  nextConfig.basePath = pagesBasePath;
  nextConfig.assetPrefix = pagesBasePath;
  nextConfig.trailingSlash = true;
} else {
  nextConfig.headers = async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
}

export default nextConfig;
