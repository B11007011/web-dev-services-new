'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import { PortfolioItem } from './PortfolioItem'

type PortfolioTranslations = {
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
}

const defaultPortfolio: PortfolioTranslations = {
  title: 'Our Portfolio',
  subtitle: 'Showcasing our latest projects and success stories',
  viewProject: 'View Project',
  projects: [
    {
      title: "Anne Beauty & Spa",
      description: "Elegant beauty salon website featuring nail art services, online booking, and multilingual support (中文/EN). Clean, modern design with a focus on showcasing professional nail art and spa services.",
      image: "/portfolio/annebeauty.site.png",
      details: {
        technologies: [
          "Next.js 13",
          "i18n",
          "TailwindCSS",
          "Responsive Design",
          "Booking System"
        ],
        features: [
          "Multilingual Support",
          "Online Booking",
          "Service Catalog",
          "Gallery",
          "Contact Form"
        ],
        link: "https://annebeauty.site"
      }
    },
    {
      title: "Mindful Moments",
      description: "A wellness tracking application featuring sleep monitoring, daily reflection questions, and mood tracking. Helps users maintain mental wellbeing through regular self-reflection and habit tracking.",
      image: "/portfolio/mindful.png",
      details: {
        technologies: [
          "React.js",
          "TailwindCSS",
          "User Authentication",
          "Data Visualization",
          "Progressive Web App"
        ],
        features: [
          "Sleep Tracking",
          "Mood Monitoring",
          "Daily Reflections",
          "Progress Analytics",
          "Habit Formation"
        ],
        link: "https://poetic-nasturtium-dfa598.netlify.app/"
      }
    },
    {
      title: "Tecxmate Corporate",
      description: "Modern multilingual corporate website with dynamic content management",
      image: "/portfolio/tecxmate.jpg",
      details: {
        technologies: [
          "React",
          "Next.js",
          "i18n",
          "TailwindCSS"
        ],
        features: [
          "Multilingual Support",
          "Dynamic Content",
          "Modern UI/UX",
          "Performance Optimized",
          "SEO Ready"
        ],
        link: "https://tecxmate.com"
      }
    }
  ]
};

// Custom hook for handling clicks outside of a component
const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}

const Portfolio = () => {
  const content = useTranslations<PortfolioTranslations>('portfolio');
  const displayContent = Object.keys(content).length === 0 ? defaultPortfolio : content;

  if (!displayContent || !displayContent.projects) {
    return null;
  }

  const projects = displayContent.projects;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="portfolio">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
          >
            {displayContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light"
          >
            {displayContent.subtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index: number) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <PortfolioItem {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-t from-white/20 to-transparent" />
      
      {/* Additional Decorative Lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-[128px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[128px] translate-x-1/2" />
    </section>
  );
}

export default Portfolio 