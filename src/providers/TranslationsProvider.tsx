'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Define the structure of our translations
export type TranslationType = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    services: Array<{
      title: string;
      description: string;
      color: string;
      image: string;
    }>;
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
    steps: Array<{
      number: string;
      title: string;
      description: string;
      details: string[];
    }>;
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
  footer: {
    company: {
      description: string;
    };
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
      subscribing: string;
      subscribed: string;
      error: string;
    };
    sections: {
      services: {
        title: string;
        links: Array<{
          label: string;
          href: string;
        }>;
      };
      company: {
        title: string;
        links: Array<{
          label: string;
          href: string;
        }>;
      };
      support: {
        title: string;
        links: Array<{
          label: string;
          href: string;
        }>;
      };
    };
    copyright: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    viewProject: string;
    projects: Array<{
      title: string;
      description: string;
      image: string;
      details: {
        technologies: string[];
        features: string[];
        link: string;
      };
    }>;
  };
  team: {
    title: string;
    subtitle: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
      bio: string;
      social: {
        linkedin: string;
        github: string;
        twitter: string;
      }
    }>;
  };
};

type TranslationsContextType = {
  getTranslation: <T>(section: keyof TranslationType) => T;
  locale: string;
  isLoading: boolean;
};

const TranslationsContext = createContext<TranslationsContextType | null>(null);

const isClient = typeof window !== 'undefined';

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const [translations, setTranslations] = useState<Record<string, TranslationType>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        
        // Check cache first (only in client-side)
        if (isClient) {
          const cacheKey = `translations_${locale}`;
          const cachedData = localStorage.getItem(cacheKey);
          
          if (cachedData) {
            try {
              const parsedData = JSON.parse(cachedData);
              const cacheTimestamp = parsedData.timestamp;
              const currentTime = new Date().getTime();
              
              // Cache is valid for 24 hours
              if (currentTime - cacheTimestamp < 24 * 60 * 60 * 1000) {
                setTranslations(parsedData.translations);
                setIsLoading(false);
                return;
              }
            } catch (e) {
              console.error('Error parsing cached translations:', e);
            }
          }
        }

        // Load fresh translations if cache is invalid or missing
        const [en, vi, zhTW] = await Promise.all([
          import('../../messages/en.json'),
          import('../../messages/vi.json'),
          import('../../messages/zh-TW.json')
        ]);

        const newTranslations = {
          en: en.default as TranslationType,
          vi: vi.default as TranslationType,
          'zh-TW': zhTW.default as TranslationType
        };

        // Update cache (only in client-side)
        if (isClient) {
          try {
            const cacheKey = `translations_${locale}`;
            localStorage.setItem(cacheKey, JSON.stringify({
              translations: newTranslations,
              timestamp: new Date().getTime()
            }));
          } catch (e) {
            console.error('Error caching translations:', e);
          }
        }

        setTranslations(newTranslations);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to cached data if available (only in client-side)
        if (isClient) {
          const cacheKey = `translations_${locale}`;
          const cachedData = localStorage.getItem(cacheKey);
          if (cachedData) {
            try {
              const parsedData = JSON.parse(cachedData);
              setTranslations(parsedData.translations);
            } catch (e) {
              console.error('Error parsing fallback cached translations:', e);
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const getTranslation = <T,>(section: keyof TranslationType): T => {
    if (isLoading) {
      return {} as T;
    }

    try {
      const translation = translations[locale]?.[section];
      return (translation as T) || (translations.en?.[section] as T) || {} as T;
    } catch (error) {
      console.error(`Error getting translation for section ${section}:`, error);
      return {} as T;
    }
  };

  return (
    <TranslationsContext.Provider value={{ getTranslation, locale, isLoading }}>
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
