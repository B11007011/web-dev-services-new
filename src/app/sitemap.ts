import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tecxmate.com';
  const languages = ['en', 'vi', 'zh-TW'];
  const routes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/team',
    '/portfolio',
    '/blog'
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add language-specific routes
  languages.forEach(lang => {
    const subdomain = lang === 'zh-TW' ? 'tw' : lang;
    const baseUrlWithLang = `https://${subdomain}.tecxmate.com`;
    
    routes.forEach(route => {
      entries.push({
        url: `${baseUrlWithLang}${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return entries;
} 