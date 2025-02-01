import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${baseUrlWithLang}/${lang}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    });
    
    // Add other routes
    routes.forEach(route => {
      if (route !== '') {
        entries.push({
          url: `${baseUrlWithLang}/${lang}${route}/`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });
  });

  return entries;
} 