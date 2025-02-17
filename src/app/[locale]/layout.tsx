import "@/app/globals.css";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/ui/navigation-wrapper";
import { TranslationsProvider } from "@/providers/TranslationsProvider";
import ViewportHandler from "@/components/ViewportHandler";
import LanguageHandler from "@/components/LanguageHandler";
import EnhancedStructuredData from "@/components/EnhancedStructuredData";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import { cn } from '@/lib/utils'
import { Providers } from '@/providers/Providers'
import { headers } from 'next/headers'
import JsonLd from '@/components/JsonLd'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ScrollToTopWrapper from '@/components/client/ScrollToTopWrapper'
import { Viewport } from 'next'

export const dynamic = 'force-dynamic';

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
});

const locales = ['en', 'vi', 'zh-TW'] as const;
type Locale = (typeof locales)[number];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: { locale: Locale };
}

async function getMetadataParams() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isDev = host.includes('localhost') || host.includes('127.0.0.1');
  const protocol = isDev ? 'http' : 'https';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tecxmate.com';
  
  return {
    host,
    isDev,
    protocol,
    baseUrl
  };
}

async function getLocalizedContent(locale: Locale) {
  const title = locale === 'vi' ? 'Tecxmate' : 
                locale === 'zh-TW' ? 'Tecxmate' : 
                'Tecxmate';
                
  const description = locale === 'vi' ? 'Dịch vụ phát triển web chuyên nghiệp cho doanh nghiệp hiện đại' :
                     locale === 'zh-TW' ? '為現代企業提供專業的網站開發服務' :
                     'Professional web development services for modern businesses';

  return {
    title,
    description,
    organizationName: title
  };
}

const LANGUAGE_SUBDOMAINS = {
  'en': '',  // Default domain
  'vi': 'vi',
  'zh-TW': 'tw'
};

export async function generateMetadata(
  { params: { locale } }: Props
): Promise<Metadata> {
  const [metadataParams, content] = await Promise.all([
    getMetadataParams(),
    getLocalizedContent(locale)
  ]);

  const { baseUrl } = metadataParams;
  const domain = baseUrl.split('://')[1];

  // Generate hreflang URLs for all supported languages with subdomains
  const hreflangUrls = {
    'en-US': `https://${domain}/en`,
    'vi-VN': `https://vi.${domain}/vi`,
    'zh-TW': `https://tw.${domain}/zh-TW`,
  };

  // Get current subdomain URL
  const subdomain = LANGUAGE_SUBDOMAINS[locale as keyof typeof LANGUAGE_SUBDOMAINS];
  const currentUrl = subdomain
    ? `https://${subdomain}.${domain}/${locale}`
    : `https://${domain}/${locale}`;

  return {
    title: {
      default: content.title,
      template: `%s | ${content.title}`
    },
    description: content.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `https://${domain}/en`,
        'vi': `https://vi.${domain}/vi`,
        'zh-TW': `https://tw.${domain}/zh-TW`
      },
      types: {
        'application/rss+xml': `${baseUrl}/feed.xml`,
      }
    },
    openGraph: {
      title: content.title,
      description: content.description,
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
      url: currentUrl,
      siteName: content.title,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: content.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    icons: {
      icon: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
      ],
      other: [
        { rel: 'manifest', url: '/site.webmanifest' }
      ]
    },
    verification: {
      google: 'IVfFVvMnAeD6nDyedE8wDB3uDXeQlLNLBTlvYH50nHg'
    },
    other: {
      'google-site-verification': 'IVfFVvMnAeD6nDyedE8wDB3uDXeQlLNLBTlvYH50nHg',
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VALIDATION || '',
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VALIDATION || ''
    }
  };
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  if (!locales.includes(locale)) {
    return null;
  }

  const [metadataParams, content] = await Promise.all([
    getMetadataParams(),
    getLocalizedContent(locale)
  ]);

  const { host, isDev, protocol, baseUrl } = metadataParams;
  const currentUrl = `${baseUrl}/${locale}`;
  
  // Construct base domain for alternates
  const domain = isDev 
    ? `localhost:3000`
    : host.includes('.') ? host.split('.').slice(1).join('.') : host;

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
        url: `${protocol}://${host}/tecxmate chinese 拓科智聯.png`
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-background font-sans antialiased",
      inter.variable,
      beVietnamPro.variable
    )}>
      <Providers>
        <TranslationsProvider>
          <LanguageHandler locale={locale} />
          <ViewportHandler />
          <EnhancedStructuredData
            organizationName={content.organizationName}
            url={currentUrl}
            logo={`${baseUrl}/logo.png`}
            siteTitle={content.title}
            description={content.description}
            breadcrumbs={[
              {
                name: 'Home',
                item: currentUrl
              }
            ]}
          />
          <NavigationBar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <ScrollToTopWrapper />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <Analytics />
          <JsonLd data={structuredData} />
        </TranslationsProvider>
      </Providers>
    </div>
  );
} 