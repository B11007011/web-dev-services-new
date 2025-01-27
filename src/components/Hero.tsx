'use client'

import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Hero() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [translations, setTranslations] = useState({
    title: '',
    subtitle: '',
    cta: ''
  });

  useEffect(() => {
    const loadTranslations = async () => {
      const messages = await import(`../../messages/${locale}.json`);
      setTranslations(messages.hero);
    };
    loadTranslations();
  }, [locale]);

  return (
    <section id="hero" className="relative h-[100vh] w-full bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-50" />
      <BackgroundGradientAnimation />
      <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4 md:px-8">
        <div className="w-full max-w-[90vw] md:max-w-4xl backdrop-blur-sm bg-black/20 rounded-xl p-6 md:p-8 mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {translations.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300">
            {translations.subtitle}
          </p>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-200 hover:scale-105 transform">
            {translations.cta}
          </button>
        </div>
      </div>
    </section>
  );
} 