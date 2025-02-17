import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Providers } from '@/providers/Providers'
import ScrollToTop from '@/components/ScrollToTop'
import { headers } from 'next/headers'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

// Get language from subdomain
function getLanguageFromHost(host: string): string {
  const subdomain = host.split('.')[0]
  switch (subdomain) {
    case 'vi':
      return 'vi'
    case 'tw':
      return 'zh-TW'
    default:
      return 'en'
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const lang = getLanguageFromHost(host)
  
  const titles = {
    'en': 'Web Development Services - Professional Web Solutions',
    'vi': 'Dịch vụ Phát triển Web - Giải pháp Web Chuyên nghiệp',
    'zh-TW': '網站開發服務 - 專業網站解決方案'
  }
  
  const descriptions = {
    'en': 'Professional web development services offering modern, responsive websites, e-commerce solutions, and custom web applications. Expert team delivering high-quality digital solutions.',
    'vi': 'Dịch vụ phát triển web chuyên nghiệp cung cấp website hiện đại, responsive, giải pháp thương mại điện tử và ứng dụng web tùy chỉnh. Đội ngũ chuyên gia cung cấp giải pháp kỹ thuật số chất lượng cao.',
    'zh-TW': '專業網站開發服務提供現代化響應式網站、電子商務解決方案和自定義網絡應用程序。專家團隊提供高質量數字解決方案。'
  }

  return {
    title: titles[lang as keyof typeof titles],
    description: descriptions[lang as keyof typeof descriptions],
    metadataBase: new URL(`https://${host}`),
    alternates: {
      languages: {
        'en': 'https://en.tecxmate.com/en',
        'vi': 'https://vi.tecxmate.com/vi',
        'zh-TW': 'https://tw.tecxmate.com/zh-TW',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification=YOUR_VERIFICATION_CODE',
    },
    openGraph: {
      title: titles[lang as keyof typeof titles],
      description: descriptions[lang as keyof typeof descriptions],
      url: `https://${host}`,
      siteName: 'TecXmate',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles],
      description: descriptions[lang as keyof typeof descriptions],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isDev = host.includes('localhost') || host.includes('127.0.0.1')
  const lang = getLanguageFromHost(host)
  
  // Construct base domain for alternates
  const domain = isDev 
    ? `localhost:3000`
    : host.includes('.') ? host.split('.').slice(1).join('.') : host

  // Construct full URLs for alternates
  const protocol = isDev ? 'http' : 'https'
  const alternates = {
    en: `${protocol}://en.${domain}/en`,
    vi: `${protocol}://vi.${domain}/vi`,
    'zh-TW': `${protocol}://tw.${domain}/zh-TW`
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${protocol}://${host}/#organization`,
        name: 'TecXmate',
        url: `${protocol}://${host}`,
        logo: {
          '@type': 'ImageObject',
          url: `${protocol}://${host}/logo.png`,
        },
        sameAs: [
          'https://www.linkedin.com/company/tecxmate',
          'https://github.com/tecxmate',
          'https://twitter.com/tecxmate'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${protocol}://${host}/#website`,
        url: `${protocol}://${host}`,
        name: 'TecXmate',
        publisher: {
          '@id': `${protocol}://${host}/#organization`
        },
        inLanguage: lang
      },
      {
        '@type': 'WebPage',
        '@id': `${protocol}://${host}/#webpage`,
        url: `${protocol}://${host}`,
        name: 'TecXmate - Web Development Services',
        isPartOf: {
          '@id': `${protocol}://${host}/#website`
        },
        about: {
          '@id': `${protocol}://${host}/#organization`
        },
        inLanguage: lang
      }
    ]
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="IVfFVvMnAeD6nDyedE8wDB3uDXeQlLNLBTlvYH50nHg" />
        <link rel="alternate" href={alternates.en} hrefLang="en" />
        <link rel="alternate" href={alternates.vi} hrefLang="vi" />
        <link rel="alternate" href={alternates['zh-TW']} hrefLang="zh-TW" />
        <link rel="canonical" href={`${protocol}://${host}${lang === 'en' ? '/en' : lang === 'vi' ? '/vi' : '/zh-TW'}`} />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <Providers>
          {children}
          <ScrollToTop />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <Analytics />
          <JsonLd data={structuredData} />
        </Providers>
      </body>
    </html>
  )
} 
