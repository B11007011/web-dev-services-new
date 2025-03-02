import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const rules = {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/*.json$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/*.json$',
        ],
      }
    ],
    sitemap: [
      'https://en.tecxmate.com/sitemap.xml',
      'https://vi.tecxmate.com/sitemap.xml',
      'https://tw.tecxmate.com/sitemap.xml'
    ],
    host: 'https://tecxmate.com'
  }

  return rules
} 