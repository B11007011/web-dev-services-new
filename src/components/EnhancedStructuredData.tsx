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
    name: organizationName,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    sameAs: [
      // Add your social media URLs here
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: siteTitle,
    url: url,
    description: description,
    publisher: {
      '@id': `${url}#organization`
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      {breadcrumbs.length > 0 && <JsonLd data={breadcrumbSchema} />}
    </>
  )
} 