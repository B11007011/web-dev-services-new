import { MetadataRoute } from 'next';
import { products } from '@/data/products';

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
      // Add images for portfolio and services pages
      ...(routes.includes('/portfolio') || routes.includes('/services') ? {
        images: products.map(product => ({
          url: new URL(product.thumbnail, baseUrlWithLang).href,
          title: product.title,
          caption: `Professional ${product.title} services by TecXmate`
        }))
      } : {})
    });
    
    // Add other routes
    routes.forEach(route => {
      if (route !== '') {
        entries.push({
          url: `${baseUrlWithLang}/${lang}${route}/`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: 0.8,
          // Add images for portfolio and services pages
          ...(route === '/portfolio' || route === '/services' ? {
            images: products.map(product => ({
              url: new URL(product.thumbnail, baseUrlWithLang).href,
              title: product.title,
              caption: `Professional ${product.title} services by TecXmate`
            }))
          } : {})
        });
      }
    });
  });

  return entries;
} 