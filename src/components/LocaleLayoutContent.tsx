'use client';

import { useEffect, useState } from 'react';
import EnhancedStructuredData from "@/components/EnhancedStructuredData";
import JsonLd from '@/components/JsonLd';

type LocaleLayoutContentProps = {
  locale: string;
};

export default function LocaleLayoutContent({ locale }: LocaleLayoutContentProps) {
  const [content, setContent] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tecxmate.com';
      const isDev = window.location.hostname.includes('localhost');
      const protocol = isDev ? 'http' : 'https';
      const host = window.location.hostname;
      
      const currentUrl = `${baseUrl}/${locale}`;
      
      const domain = isDev 
        ? `localhost:3000`
        : host.includes('.') ? host.split('.').slice(1).join('.') : host;

      const title = locale === 'vi' ? 'Tecxmate' : 
                   locale === 'zh-TW' ? 'Tecxmate' : 
                   'Tecxmate';
                   
      const description = locale === 'vi' ? 'Dịch vụ phát triển web chuyên nghiệp cho doanh nghiệp hiện đại' :
                        locale === 'zh-TW' ? '為現代企業提供專業的網站開發服務' :
                        'Professional web development services for modern businesses';

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tecxmate',
        url: `${protocol}://${host}`,
        description: 'Professional web development services',
        publisher: {
          '@type': 'Organization',
          name: 'Tecxmate',
          logo: {
            '@type': 'ImageObject',
            url: `${protocol}://${host}/logo.svg`
          }
        }
      };

      setContent({
        title,
        description,
        organizationName: title,
        currentUrl,
        baseUrl,
        structuredData
      });
    }

    fetchData();
  }, [locale]);

  if (!content) {
    return null;
  }

  return (
    <>
      <EnhancedStructuredData
        organizationName={content.organizationName}
        url={content.currentUrl}
        logo={`${content.baseUrl}/logo.svg`}
        siteTitle={content.title}
        description={content.description}
        breadcrumbs={[
          {
            name: 'Home',
            item: content.currentUrl
          }
        ]}
      />
      <JsonLd data={content.structuredData} />
    </>
  );
} 