'use client'

import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from '@/providers/TranslationsProvider'
import { useState, useEffect } from 'react'

type HeroContent = {
  title: string;
  subtitle: string;
  cta: string;
}

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites built for speed and scalability",
    color: "from-blue-600 to-purple-600",
    image: "/placeholder1.jpg" // Replace with your image
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform apps that captivate iOS and Android users",
    color: "from-purple-600 to-red-600",
    image: "/placeholder2.jpg" // Replace with your image
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure for seamless growth",
    color: "from-red-600 to-orange-600",
    image: "/placeholder3.jpg" // Replace with your image
  }
];

export function Hero() {
  const content = useTranslations<HeroContent>('hero')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-950 to-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Side - Text */}
          <div className="text-left max-w-2xl pt-4">
            {/* Interactive Squares */}
            <div className="flex gap-2 mb-6">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => setCurrentIndex(0)}
                className={`w-6 h-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  currentIndex === 0 ? 'bg-white/30' : 'bg-white/10'
                }`}
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setCurrentIndex(1)}
                className={`w-6 h-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  currentIndex === 1 ? 'bg-white/30' : 'bg-white/10'
                }`}
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setCurrentIndex(2)}
                className={`w-6 h-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  currentIndex === 2 ? 'bg-white/30' : 'bg-white/10'
                }`}
              />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif"
            >
              {content?.title || "We Build Amazing Websites"}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg md:text-xl text-white/80 max-w-xl"
            >
              {content?.subtitle || "Transform your business with modern web solutions"}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex gap-2"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg text-black bg-white hover:bg-white/90 transition-colors select-none"
              >
                {content?.cta || "Get Started"}
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors select-none"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Floating Cards */}
          <div 
            className="relative h-[450px] hidden lg:block"
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {services.map((service, idx) => {
                const isActive = idx === currentIndex;
                const offset = (idx - currentIndex) * 40; // Reduced offset
                
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
                    className="cursor-pointer absolute top-0 right-0 w-72 h-80"
                  >
                    <div className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isActive ? 'border-white/30 shadow-2xl' : 'border-white/10'
                    }`}>
                      <div className={`w-full h-full bg-gradient-to-br ${service.color} p-6 flex flex-col justify-end`}>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-white/80">
                          {service.description}
                        </p>
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