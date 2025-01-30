'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Import translations directly using relative paths
import enTranslations from '../../messages/en.json';
import viTranslations from '../../messages/vi.json';
import zhTWTranslations from '../../messages/zh-TW.json';

// Define the structure of our translations
export type TranslationType = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  nav: {
    home: string;
    stats: string;
    services: string;
    features: string;
    process: string;
    technologies: string;
    portfolio: string;
    caseStudies: string;
    team: string;
    blog: string;
    testimonials: string;
    pricing: string;
    faq: string;
    contact: string;
  };
  stats: {
    projects: {
      number: string;
      label: string;
    };
    clients: {
      number: string;
      label: string;
    };
    experience: {
      number: string;
      label: string;
    };
    support: {
      number: string;
      label: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };
  features: {
    title: string;
    subtitle: string;
  };
  process: {
    title: string;
    subtitle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    contact: {
      email: string;
      phone: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    contactText: string;
    contactLink: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

const translations: Record<string, TranslationType> = {
  en: enTranslations as TranslationType,
  vi: viTranslations as TranslationType,
  'zh-TW': zhTWTranslations as TranslationType
};

type TranslationsContextType = {
  getTranslation: <T>(section: keyof TranslationType) => T;
  locale: string;
};

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  const getTranslation = <T,>(section: keyof TranslationType): T => {
    try {
      const translation = translations[locale]?.[section];
      return (translation as T) || (translations.en[section] as T);
    } catch (error) {
      console.error(`Error getting translation for section ${section}:`, error);
      return translations.en[section] as T;
    }
  };

  return (
    <TranslationsContext.Provider value={{ getTranslation, locale }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations<T>(section: keyof TranslationType): T {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context.getTranslation<T>(section);
} 
