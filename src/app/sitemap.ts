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
    
    // Add the root URL for each language
    entries.push({
      url: `${baseUrlWithLang}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
    
    // Add other routes
    routes.forEach(route => {
      if (route !== '') { // Skip empty route as we already added root
        entries.push({
          url: `${baseUrlWithLang}/${lang}${route}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });
  });

  return entries;
} 