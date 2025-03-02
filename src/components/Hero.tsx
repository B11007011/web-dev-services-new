'use client'

import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from '@/providers/TranslationsProvider'
import { useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

type HeroContent = {
  title: string;
  subtitle: string;
  cta: string;
  services: Array<{
    title: string;
    description: string;
    color: string;
    image: string;
  }>;
}

export function Hero() {
  const defaultContent: HeroContent = {
    title: "以新一代網站提升您的全球形象",
    subtitle: "在Tecxmate，我們透過尖端網站設計和開發，以及國際技術諮詢和解決方案，助您企業成長",
    cta: "預約諮詢",
    services: [
      {
        title: "全球據點",
        description: "With representatives in: San Francisco, Taipei, Hanoi, HCMC, Bangkok, Shenzhen, and more.",
        color: "from-blue-600 to-purple-600",
        image: "images/hero/global.jpg"
      },
      {
        title: "Tailored Solutions",
        description: "Custom designs and digital branding that align with your brand's identity, optimized for performance and security.",
        color: "from-purple-600 to-red-600",
        image: "images/hero/Solutions.jpg"
      },
      {
        title: "Full-Service Support",
        description: "From development to maintenance, SEO optimization, and ongoing technical support.",
        color: "from-red-600 to-orange-600",
        image: "images/hero/Support.jpg"
      }
    ]
  };

  // Get translations and ensure we always have valid content
  const content = useTranslations<HeroContent>('hero');
  const [displayContent, setDisplayContent] = useState<HeroContent>(defaultContent);
  
  useEffect(() => {
    // Only update display content if we have valid translation content
    if (content && Object.keys(content).length > 0 && Array.isArray(content.services)) {
      // Merge translations with default content, keeping default images
      const validContent = {
        ...content,
        services: content.services.map((service, index) => ({
          ...service,
          // Always use default image paths
          image: defaultContent.services[index].image
        }))
      };
      setDisplayContent(validContent);
    }
  }, [content]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    // Log the image paths and verify they exist
    const images = displayContent.services.map(service => service.image);
    console.log('Hero images to load:', images);
    
    // Validate content
    if (!Array.isArray(displayContent.services) || displayContent.services.length === 0) {
      console.error('Invalid services data:', displayContent.services);
      return;
    }

    // Preload images with proper path handling
    const preloadPromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        if (!src || typeof src !== 'string') {
          console.error('Invalid image source:', src);
          reject(new Error('Invalid image source'));
          return;
        }
        const img = new Image();
        img.onload = () => {
          console.log('Successfully preloaded:', src);
          resolve(src);
        };
        img.onerror = (e) => {
          console.error('Failed to preload:', src, e);
          reject(e);
        };
        img.src = `/${src}`; // Add leading slash for proper path resolution
      });
    });

    Promise.all(preloadPromises)
      .then(() => console.log('All images preloaded successfully'))
      .catch(error => console.error('Error preloading images:', error));

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayContent.services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayContent.services]);

  // Early return if no valid services
  if (!Array.isArray(displayContent.services) || displayContent.services.length === 0) {
    console.error('No valid services data available');
    return null;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      className="relative h-[700px] w-full bg-gradient-to-br from-blue-950 via-black to-blue-950 overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/images/hero/hero.png"
          alt="Hero Background"
          priority={true}
          className="object-cover w-full h-full"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-black/50 to-blue-950/80" />
      </div>

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
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">
                {displayContent.services[currentIndex].title}
              </h3>
              <p className="text-gray-300 text-sm">
                {displayContent.services[currentIndex].description}
              </p>
            </div>
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
}