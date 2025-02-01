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
      '@id': `${url}#logo`,
      url: logo,
      width: 112,
      height: 112,
      caption: organizationName
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${url}#logo`,
      url: logo,
      width: 112,
      height: 112
    },
    description: description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TW',
      addressLocality: 'Taipei'
    },
    sameAs: [
      'https://www.facebook.com/tecxmate',
      'https://twitter.com/tecxmate',
      'https://www.linkedin.com/company/tecxmate'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url: url,
    name: siteTitle,
    description: description,
    publisher: {
      '@id': `${url}#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: organizationName,
    image: logo,
    url: url,
    telephone: '+886-2-xxxx-xxxx',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. XX, Section X, XX Road',
      addressLocality: 'Taipei',
      postalCode: '10608',
      addressCountry: 'TW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.0330,
      longitude: 121.5654
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    priceRange: '$$'
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    }))
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: organizationName,
    provider: {
      '@id': `${url}#organization`
    },
    description: description,
    areaServed: {
      '@type': 'Country',
      name: 'Taiwan'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Development',
            description: 'Professional website development services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Development',
            description: 'Custom web application development'
          }
        }
      ]
    }
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />
      {breadcrumbs.length > 0 && <JsonLd data={breadcrumbSchema} />}
    </>
  )
} 