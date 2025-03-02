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

        // Try to load from cache first
        const cachedTranslations = await loadFromCache(locale);
        if (cachedTranslations) {
          setTranslations(prevTranslations => ({
            ...prevTranslations,
            [locale]: cachedTranslations
          }));
          setIsLoading(false);
          return;
        }

        // If not in cache, fetch from server
        const response = await fetch(`/api/translations/${locale}`);
        const data = await response.json();

        setTranslations(prevTranslations => ({
          ...prevTranslations,
          [locale]: data
        }));

        // Cache the translations
        if (typeof window !== 'undefined') {
          try {
            await cacheTranslations(locale, data);
          } catch (e) {
            console.error('Error caching translations:', e);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading translations:', error);
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale, translations]);

  const getTranslation = <T,>(section: keyof TranslationType): T => {
    if (!translations[locale]) {
      // Return empty object if translations aren't loaded yet
      return {} as T;
    }
    return translations[locale][section] as T;
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
