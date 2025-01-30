/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'vi', 'zh-TW'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
      },
      {
        domain: 'vi.example.com',
        defaultLocale: 'vi',
      },
      {
        domain: 'zh.example.com',
        defaultLocale: 'zh-TW',
      },
    ],
  },
  images: {
    domains: ['example.com', 'vi.example.com', 'zh.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
} 