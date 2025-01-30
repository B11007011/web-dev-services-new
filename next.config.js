/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  i18n: {
    locales: ['en', 'vi', 'zh-TW'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig 