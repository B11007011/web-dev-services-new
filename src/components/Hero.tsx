'use client'

import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from '@/providers/TranslationsProvider'
import { useState, useEffect, useCallback, memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { debounce } from 'lodash'

type HeroContent = {
  title: string;
  subtitle: string;
  cta: string;
  services: Array<{
    title: string;
    description: string;
    color: string;
  }>;
}

// Lazy load OptimizedImage component
const OptimizedImage = dynamic(() => import('@/components/ui/optimized-image').then(mod => mod.OptimizedImage), {
  loading: () => <div className="animate-pulse bg-gray-800 w-full h-full" />,
  ssr: false
});

// Optimize service preview component
const ServicePreview = memo(({ service, style }: { service: any; style: any }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
    <h3 className="text-lg font-semibold text-white mb-2">
      {service.title}
    </h3>
    <p className="text-gray-300 text-sm">
      {service.description}
    </p>
  </div>
));

ServicePreview.displayName = 'ServicePreview';

// Optimize background component
const Background = memo(({ src }: { src: string }) => (
  <div className="absolute inset-0">
    <OptimizedImage
      src={src}
      alt="Hero Background"
      priority={true}
      className="object-cover w-full h-full"
      fill
    />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-black/50 to-blue-950/80" />
  </div>
));

Background.displayName = 'Background';

export const Hero = memo(function Hero() {
  const defaultContent: HeroContent = {
    title: "以新一代網站提升您的全球形象",
    subtitle: "在Tecxmate，我們透過尖端網站設計和開發，以及國際技術諮詢和解決方案，助您企業成長",
    cta: "預約諮詢",
    services: [
      {
        title: "全球據點",
        description: "With representatives in: San Francisco, Taipei, Hanoi, HCMC, Bangkok, Shenzhen, and more.",
        color: "from-blue-600 to-purple-600"
      },
      {
        title: "Tailored Solutions",
        description: "Custom designs and digital branding that align with your brand's identity, optimized for performance and security.",
        color: "from-purple-600 to-red-600"
      },
      {
        title: "Full-Service Support",
        description: "From development to maintenance, SEO optimization, and ongoing technical support.",
        color: "from-red-600 to-orange-600"
      }
    ]
  };

  // Get translations and ensure we always have valid content
  const content = useTranslations<HeroContent>('hero');
  const [displayContent, setDisplayContent] = useState<HeroContent>(defaultContent);
  
  useEffect(() => {
    // Only update display content if we have valid translation content
    if (content && Object.keys(content).length > 0 && Array.isArray(content.services)) {
      setDisplayContent(content);
    }
  }, [content]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = useMemo(() => ({ damping: 15, stiffness: 150 }), []);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Optimize mouse move handler
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (!target) return;

    requestAnimationFrame(() => {
      try {
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      } catch (error) {
        console.error('Error in mouse move handler:', error);
      }
    });
  }, [mouseX, mouseY]);

  // Optimize service rotation
  useEffect(() => {
    if (!Array.isArray(displayContent.services) || displayContent.services.length === 0) return;
    
    let timeoutId: number;
    let isActive = true;

    const updateIndex = () => {
      if (!isActive) return;
      
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % displayContent.services.length);
      timeoutId = window.setTimeout(updateIndex, 5000);
    };

    timeoutId = window.setTimeout(updateIndex, 5000);
    
    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [displayContent.services]);

  // Early return for invalid data
  if (!Array.isArray(displayContent.services) || displayContent.services.length === 0) {
    return null;
  }

  return (
    <section 
      className="relative h-[700px] w-full bg-gradient-to-br from-blue-950 via-black to-blue-950 overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      <Background src="/images/hero/hero.png" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {displayContent.title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed"
          >
            {displayContent.subtitle}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#services"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-white bg-transparent border-2 border-indigo-500 rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-500/10"
            >
              <span className="relative z-10">{displayContent.services[0].title}</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            <Link
              href="#contact"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <span className="relative z-10">{displayContent.cta}</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Service Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="absolute bottom-12 right-8 w-80 hidden lg:block"
          >
            <ServicePreview 
              service={displayContent.services[currentIndex]}
              style={{ rotateX, rotateY }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-white/20 to-transparent"
      />
    </section>
  );
});