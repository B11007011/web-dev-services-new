'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  locale: string;
};

const LANGUAGE_SUBDOMAINS = {
  'en': '',  // Default domain
  'vi': 'vi',
  'zh-TW': 'tw'
};

const isClient = typeof window !== 'undefined';

const LanguageHandler = ({ locale }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!isClient) return;

    try {
      // Get stored language preference
      const storedLang = localStorage.getItem('preferred_language');
      const currentHost = window.location.host;
      const isLocalhost = currentHost.includes('localhost') || currentHost.includes('127.0.0.1');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tecxmate.com';
      
      const redirectToSubdomain = (lang: string) => {
        if (isLocalhost) {
          // In development, use path-based routing
          router.push(`/${lang}`);
        } else {
          // In production, use subdomain-based routing
          const subdomain = LANGUAGE_SUBDOMAINS[lang as keyof typeof LANGUAGE_SUBDOMAINS];
          const domain = baseUrl.split('://')[1];
          const newUrl = subdomain 
            ? `https://${subdomain}.${domain}/${lang}`
            : `https://${domain}/${lang}`;
          window.location.href = newUrl;
        }
      };
      
      if (!storedLang) {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        let detectedLang = 'en';

        if (browserLang.startsWith('vi')) {
          detectedLang = 'vi';
        } else if (browserLang.startsWith('zh')) {
          detectedLang = 'zh-TW';
        }

        // Store the detected language
        localStorage.setItem('preferred_language', detectedLang);

        // Redirect if current locale doesn't match detected language
        if (locale !== detectedLang) {
          redirectToSubdomain(detectedLang);
        }
      } else if (locale !== storedLang) {
        // Redirect if current locale doesn't match stored preference
        redirectToSubdomain(storedLang);
      }
    } catch (error) {
      console.error('Error in LanguageHandler:', error);
    }
  }, [locale, router]);

  return null;
};

export default LanguageHandler; 