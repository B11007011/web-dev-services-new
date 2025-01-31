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
        http: true
      },
      {
        domain: 'vi.tecxmate.com',
        defaultLocale: 'vi',
        http: true
      },
      {
        domain: 'tw.tecxmate.com',
        defaultLocale: 'tw',
        http: true
      }
    ],
    localeDetection: false
  }
}

module.exports = nextConfig 