/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  i18n: {
    locales: ['en', 'vi', 'tw'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'en.tecxmate.com',
        defaultLocale: 'en',
      },
      {
        domain: 'vi.tecxmate.com',
        defaultLocale: 'vi',
      },
      {
        domain: 'tw.tecxmate.com',
        defaultLocale: 'tw',
      },
    ],
  },
}

module.exports = nextConfig 