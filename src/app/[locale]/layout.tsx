import "@/app/globals.css";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/ui/navigation-wrapper";
import { TranslationsProvider } from "@/providers/TranslationsProvider";
import ViewportHandler from "@/components/ViewportHandler";
import LanguageHandler from "@/components/LanguageHandler";
import { ReactNode } from "react";

const locales = ['en', 'vi', 'zh-TW'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: {
      default: locale === 'vi' ? 'Dịch Vụ Phát Triển Web' : 
              locale === 'zh-TW' ? '網站開發服務' : 
              'Web Development Services',
      template: '%s | Web Dev Services'
    },
    description: locale === 'vi' ? 'Dịch vụ phát triển web chuyên nghiệp cho doanh nghiệp hiện đại' :
                locale === 'zh-TW' ? '為現代企業提供專業的網站開發服務' :
                'Professional web development services for modern businesses',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  // Validate locale
  if (!locales.includes(locale)) {
    return null;
  }

  return (
    <TranslationsProvider>
      <LanguageHandler locale={locale} />
      <ViewportHandler />
      <NavigationBar />
      <div className="pt-20">
        {children}
      </div>
      <Footer />
    </TranslationsProvider>
  );
} 