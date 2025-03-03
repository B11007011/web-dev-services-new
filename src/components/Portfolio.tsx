'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import { PortfolioItem } from './PortfolioItem'
import { ProjectModal } from './ProjectModal'

type PortfolioTranslations = {
  title: string;
  subtitle: string;
  viewProject: string;
  projects: Array<{
    id: string;
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
  title: 'Our Projects',
  subtitle: 'Explore our recent projects and success stories',
  viewProject: 'View Project',
  projects: [
    {
      id: "tjgl-golf",
      title: "Taiwan Junior Golf League",
      description: "Professional golf tournament platform with player rankings, NCAA resources, and comprehensive tournament management",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "Framer Motion",
          "Vercel"
        ],
        features: [
          "Tournament Management",
          "Player Rankings",
          "NCAA Resources",
          "Membership System",
          "Interactive UI"
        ],
        link: "https://golf-p8hr.vercel.app/"
      }
    },
    {
      id: "anne-beauty",
      title: "Anne Beauty",
      description: "Professional nail salon website with modern design and booking system",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "Next.js",
          "React",
          "TailwindCSS",
          "Node.js",
          "MongoDB"
        ],
        features: [
          "Responsive Design",
          "SEO Optimization",
          "Online Booking",
          "Gallery Showcase",
          "Modern UI"
        ],
        link: "https://annebeauty.site/"
      }
    },
    {
      id: "mobile-app",
      title: "Mobile Application",
      description: "Cross-platform solution for iOS and Android",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "React Native",
          "TypeScript",
          "Firebase",
          "Push Notifications",
          "Offline Support"
        ],
        features: [
          "Cross Platform",
          "Real-time Updates",
          "Offline Mode",
          "Push Notifications",
          "Clean Design"
        ],
        link: "https://tecxmate.com/portfolio/mindful"
      }
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "User-centered design that delivers results",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "Figma",
          "Adobe XD",
          "Sketch",
          "User Research",
          "Prototyping"
        ],
        features: [
          "User Research",
          "Wireframing",
          "Prototyping",
          "User Testing",
          "Visual Design"
        ],
        link: "https://tecxmate.com/portfolio/design"
      }
    },
    {
      id: "brand-design",
      title: "Brand Design",
      description: "Complete brand identity and design systems",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "Figma",
          "Adobe Creative Suite",
          "Brand Guidelines",
          "Color Theory",
          "Typography"
        ],
        features: [
          "Logo Design",
          "Brand Identity",
          "Style Guides",
          "Marketing Materials",
          "Visual Systems"
        ],
        link: "https://tecxmate.com/portfolio/brand"
      }
    },
    {
      id: "e-commerce",
      title: "E-commerce Platform",
      description: "Full-featured online shopping platform with secure payments",
      image: "/portfolio/annebeauty.png",
      details: {
        technologies: [
          "Next.js",
          "Stripe",
          "PostgreSQL",
          "Redis",
          "Docker"
        ],
        features: [
          "Secure Payments",
          "Inventory Management",
          "User Authentication",
          "Order Tracking",
          "Analytics Dashboard"
        ],
        link: "https://tecxmate.com/portfolio/ecommerce"
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
  const [selectedProject, setSelectedProject] = useState<typeof displayContent.projects[0] | null>(null);

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.slice(0, 4).map((project, index: number) => (
            <motion.div
              key={`${project.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * (index + 1) }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
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

      {/* Project Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}

export default Portfolio 