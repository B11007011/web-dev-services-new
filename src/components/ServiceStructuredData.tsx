'use client'

import JsonLd from './JsonLd'

interface ServiceProps {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  image?: string;
  price?: {
    currency: string;
    value: number;
  };
}

export default function ServiceStructuredData({ 
  name, 
  description, 
  provider,
  areaServed,
  image,
  price 
}: ServiceProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    areaServed: areaServed.map(area => ({
      '@type': 'Country',
      name: area
    })),
    ...(image && { image }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price.value,
        priceCurrency: price.currency
      }
    })
  }

  return <JsonLd data={structuredData} />
} 