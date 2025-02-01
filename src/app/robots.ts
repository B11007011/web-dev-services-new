import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: [
      'https://en.tecxmate.com/sitemap.xml',
      'https://vi.tecxmate.com/sitemap.xml',
      'https://tw.tecxmate.com/sitemap.xml',
    ],
  }
} 