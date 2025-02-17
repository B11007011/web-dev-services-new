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
    title: "Elevate your global presence with next-gen Websites",
    subtitle: "At Tecxmate, we empower businesses with cutting-edge website design and development, with international technology consulting and solutions.",
    cta: "Book a Call",
    services: [
      {
        title: "Global Reach",
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
      id="hero"
      className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-950 to-black pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Primary Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%] animate-slow-spin">
            <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
            <div className="absolute top-[45%] left-[45%] w-[250px] h-[250px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
          </div>
        </div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        
        {/* Glass Effect */}
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-8">
          {/* Left Side - Text */}
          <div className="text-left max-w-2xl md:flex-1">
            {/* Interactive Squares */}
            <div className="flex gap-2 mb-6">
              {displayContent.services.map((_, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-6 h-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                    currentIndex === idx ? 'bg-white/30' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans"
            >
              {displayContent.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg md:text-xl text-white/80 max-w-xl font-sans"
            >
              {displayContent.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex gap-3"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg text-black bg-white hover:bg-white/90 transition-colors select-none font-sans"
              >
                {displayContent.cta}
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors select-none font-sans"
              >
                {displayContent.services[0].title}
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Floating Cards */}
          <div 
            className="relative h-[400px] md:h-[450px] mx-auto w-full max-w-lg md:max-w-md lg:max-w-lg"
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {displayContent.services.map((service, idx) => {
                const isActive = idx === currentIndex;
                const offset = (idx - currentIndex) * 30;
                
                return (
                  <motion.div
                    key={idx}
                    style={{
                      position: 'absolute',
                      zIndex: isActive ? 2 : 1,
                      rotateX: isActive ? rotateX : 0,
                      rotateY: isActive ? rotateY : 0,
                    }}
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ 
                      y: isActive ? 0 : offset,
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.9,
                      transition: {
                        duration: 0.6,
                        ease: "easeInOut"
                      }
                    }}
                    exit={{ y: -40, opacity: 0, scale: 0.9 }}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className="cursor-pointer absolute inset-x-4 md:inset-x-0 mx-auto h-[300px] md:h-[350px]"
                  >
                    <div className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isActive ? 'border-white/30 shadow-2xl' : 'border-white/10'
                    }`}>
                      <div className="relative w-full h-full">
                        {/* Background Image */}
                        <OptimizedImage
                          src={service.image}
                          alt={service.title}
                          priority={true}
                          className="absolute inset-0 object-cover w-full h-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                        />
                        
                        {/* Gradient Overlay - Reduced opacity */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60`} />
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/20">
                          <h3 className="text-2xl font-bold text-white mb-3 font-sans">
                            {service.title}
                          </h3>
                          <p className="text-base text-white/90 font-sans">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
} 