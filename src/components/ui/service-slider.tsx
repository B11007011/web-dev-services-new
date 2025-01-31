'use client'

import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

type Service = {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  bgColor?: string;
  image?: string; // Will be added when images are provided
}

interface ServiceSliderProps {
  services: Service[];
  autoPlayInterval?: number;
}

export function ServiceSlider({ services, autoPlayInterval = 5000 }: ServiceSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  };

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0.7 },
    active: { scale: 1, opacity: 1 },
    inactive: { scale: 0.95, opacity: 0.5 }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
          style={{
            background: services[currentIndex].bgColor
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="text-white space-y-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-[clamp(4rem,10vw,7rem)] font-serif leading-none"
                >
                  {services[currentIndex].title.replace(/[🌐📱🛒🎯✨☁️]/g, '')}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-xl text-white/80 max-w-xl"
                >
                  {services[currentIndex].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Explore Now
                  </button>
                </motion.div>
              </div>

              {/* Right Side - Floating Cards */}
              <div className="relative h-[600px]" onMouseMove={handleMouseMove}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {services.map((service, idx) => {
                    const isActive = idx === currentIndex;
                    const offset = (idx - currentIndex) * 60;
                    
                    return (
                          <motion.div
                            key={idx}
                        style={{
                          position: 'absolute',
                          zIndex: isActive ? 2 : 1,
                          rotateX: isActive ? rotateX : 0,
                          rotateY: isActive ? rotateY : 0,
                          translateX: offset,
                          translateY: isActive ? 0 : offset,
                        }}
                        animate={isActive ? "active" : "inactive"}
                        variants={cardVariants}
                        whileHover={{ scale: 0.98 }}
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1);
                          setCurrentIndex(idx);
                        }}
                        className="cursor-pointer"
                      >
                        <div className={`w-[300px] h-[400px] rounded-2xl overflow-hidden border-2 transition-colors ${
                          isActive ? 'border-white/30' : 'border-white/10'
                        }`}>
                          {/* Placeholder for service image */}
                          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                            <div className="text-6xl opacity-50">
                              {service.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1 transition-all ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-8 bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 