import "@/app/globals.css";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/ui/navigation-wrapper";
import { TranslationsProvider } from "@/providers/TranslationsProvider";
import ViewportHandler from "@/components/ViewportHandler";
import LanguageHandler from "@/components/LanguageHandler";
import EnhancedStructuredData from "@/components/EnhancedStructuredData";
import { ReactNode } from "react";
import { Metadata } from "next";

const locales = ['en', 'vi', 'zh-TW'] as const;
type Locale = (typeof locales)[number];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata(
  { params }: Omit<Props, 'children'>
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

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  if (!locales.includes(params.locale)) {
    return null;
  }

  const organizationName = params.locale === 'vi' ? 'Dịch Vụ Phát Triển Web' : 
                          params.locale === 'zh-TW' ? '網站開發服務' : 
                          'Web Development Services';
  
  const description = params.locale === 'vi' ? 'Dịch vụ phát triển web chuyên nghiệp cho doanh nghiệp hiện đại' :
                     params.locale === 'zh-TW' ? '為現代企業提供專業的網站開發服務' :
                     'Professional web development services for modern businesses';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tecxmate.com';
  const currentUrl = `${baseUrl}/${params.locale}`;

  return (
    <TranslationsProvider>
      <LanguageHandler locale={params.locale} />
      <ViewportHandler />
      <EnhancedStructuredData
        organizationName={organizationName}
        url={currentUrl}
        logo={`${baseUrl}/logo.png`}
        siteTitle={organizationName}
        description={description}
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
    </TranslationsProvider>
  );
} 