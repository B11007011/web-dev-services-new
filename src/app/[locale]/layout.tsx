import "@/app/globals.css";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/ui/navigation-wrapper";
import { TranslationsProvider } from "@/providers/TranslationsProvider";
import ViewportHandler from "@/components/ViewportHandler";
import LanguageHandler from "@/components/LanguageHandler";
import { ReactNode } from "react";
import { Metadata } from "next";
import dynamic from 'next/dynamic'

const locales = ['en', 'vi', 'zh-TW'] as const;
type Locale = typeof locales[number];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Wait for locale
  await new Promise(resolve => setTimeout(resolve, 0));
  
  const title = params.locale === 'vi' ? 'Dịch Vụ Phát Triển Web' : 
                params.locale === 'zh-TW' ? '網站開發服務' : 
                'Web Development Services';
                
  const description = params.locale === 'vi' ? 'Dịch vụ phát triển web chuyên nghiệp cho doanh nghiệp hiện đại' :
                     params.locale === 'zh-TW' ? '為現代企業提供專業的網站開發服務' :
                     'Professional web development services for modern businesses';

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    alternates: {
      languages: {
        'en': '/en',
        'vi': '/vi',
        'zh-TW': '/zh-TW'
      }
    },
    openGraph: {
      title,
      description,
      locale: params.locale,
      alternateLocale: locales.filter(l => l !== params.locale)
    }
  };
}

const Process = dynamic(() => import('@/components/Process'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Pricing = dynamic(() => import('@/components/Pricing'))
const Contact = dynamic(() => import('@/components/Contact'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Team = dynamic(() => import('@/components/Team'))

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  // Wait for locale
  await new Promise(resolve => setTimeout(resolve, 0));

  if (!locales.includes(params.locale)) {
    return null;
  }

  return (
    <TranslationsProvider>
      <LanguageHandler locale={params.locale} />
      <ViewportHandler />
      <NavigationBar />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </TranslationsProvider>
  );
} 