import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const router = useRouter();
  const locale = router.locale || 'en';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    description,
    url: canonical,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Your Company Name',
      logo: {
        '@type': 'ImageObject',
        url: `https://example.com/logo.png`
      }
    }
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          locale,
          site_name: 'Your Site Name'
        }}
        languageAlternates={[
          { hrefLang: 'en', href: `https://example.com${router.pathname}` },
          { hrefLang: 'vi', href: `https://vi.example.com${router.pathname}` },
          { hrefLang: 'zh-TW', href: `https://zh.example.com${router.pathname}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
} 