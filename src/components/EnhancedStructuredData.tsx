'use client'

import JsonLd from './JsonLd'

interface EnhancedStructuredDataProps {
  organizationName: string;
  url: string;
  logo: string;
  siteTitle: string;
  description: string;
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
}

export default function EnhancedStructuredData({
  organizationName,
  url,
  logo,
  siteTitle,
  description,
  breadcrumbs = []
}: EnhancedStructuredDataProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: 'Tecxmate',
    url: 'https://tecxmate.com',
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 190,
      height: 190
    },
    description: 'Helping people transition from local to digital with web and app solutions',
    sameAs: [
      'https://www.facebook.com/tecxmate',
      'https://twitter.com/tecxmate',
      'https://line.me/tecxmate',
      'https://zalo.me/tecxmate',
      'https://weixin.qq.com/tecxmate'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: ['TW', 'VN', 'Global'],
        availableLanguage: ['en', 'vi', 'zh-TW'],
        url: 'https://tecxmate.com/contact'
      }
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: url,
    description: description,
    publisher: {
      '@type': 'Organization',
      name: organizationName,
      logo: {
        '@type': 'ImageObject',
        url: logo,
        width: 190,
        height: 190
      }
    }
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    name: organizationName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: organizationName,
      image: logo
    },
    areaServed: ['Taiwan', 'Global'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'TWD',
        minPrice: '30000'
      }
    }
  }

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  } : null

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
    </>
  )
} 