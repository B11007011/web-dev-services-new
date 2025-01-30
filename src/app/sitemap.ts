import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
const locales = ['en', 'vi', 'zh-TW'];

// Add your dynamic routes here
const routes = [
  '',
  '/services',
  '/portfolio',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.flatMap(route => 
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Add any dynamic pages here
  // const dynamicPages = ...

  return [
    ...staticPages,
    // ...dynamicPages,
  ];
} 