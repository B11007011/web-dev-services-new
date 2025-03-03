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
  categories: Record<string, string>;
  projects: Array<{
    id: string;
    category: string;
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

type ProjectCategory = 'all' | 'website' | 'mobile' | 'design';

const defaultPortfolio: PortfolioTranslations = {
  title: 'Our Projects',
  subtitle: 'Explore our recent projects and success stories',
  viewProject: 'View Project',
  categories: {
    all: 'All Projects',
    website: 'Websites',
    mobile: 'Mobile Apps',
    design: 'Design'
  },
  projects: [
    {
      id: "anne-beauty",
      category: 'website',
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
      id: "tjgl-golf",
      category: 'website',
      title: "Taiwan Junior Golf League",
      description: "Professional golf tournament platform with player rankings, NCAA resources, and comprehensive tournament management",
      image: "/portfolio/golf.png",
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
      id: "tecxmate",
      category: 'website',
      title: "TecXmate Official Website",
      description: "Modern tech company website showcasing services and team portfolio",
      image: "/portfolio/tecxmate.com.png",
      details: {
        technologies: [
          "Next.js 14",
          "TypeScript",
          "TailwindCSS",
          "Framer Motion",
          "i18n"
        ],
        features: [
          "Multilingual Support",
          "Dark/Light Mode",
          "Service Showcase",
          "Team Portfolio",
          "Contact Forms"
        ],
        link: "https://tecxmate.com"
      },
    },
    {
      id: "chichi-vietnamese",
      category: 'website',
      title: "ChiChi Vietnamese",
      description: "Professional Vietnamese language learning platform with online booking system and interactive learning features",
      image: "/portfolio/Zhizhiyueyu.png",
      details: {
        technologies: [
          "Next.js 14",
          "TypeScript",
          "TailwindCSS",
          "Framer Motion",
          "i18n"
        ],
        features: [
          "Multilingual Support",
          "Online Booking System",
          "Interactive Learning",
          "Course Management",
          "Cultural Integration"
        ],
        link: "https://chichi-rho.vercel.app/vi"
      }
    },
    {
      id: "beauty-booking",
      category: 'website',
      title: "Beauty Booking System",
      description: "Professional beauty salon booking platform with real-time scheduling and service management",
      image: "/portfolio/booking service.png",
      details: {
        technologies: [
          "Next.js 14",
          "TypeScript",
          "TailwindCSS",
          "Prisma",
          "PostgreSQL"
        ],
        features: [
          "Real-time Booking",
          "Service Management",
          "Staff Scheduling",
          "Payment Integration",
          "Client Management"
        ],
        link: "https://www.treatwell.de/availability?venueId=387209&proposedServices=%5B%7B%22menuItemId%22%3A%22TR2823983%22%2C%22optionIds%22%3A%5B%224715135%22%5D%7D%5D&date=2025-03-03&timeFrom=1600"
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

export function Portfolio() {
  const content = useTranslations<PortfolioTranslations>('portfolio');
  
  // Add debug logging
  useEffect(() => {
    console.log('Portfolio Translation Content:', {
      hasContent: content && Object.keys(content).length > 0,
      content,
    });
  }, [content]);

  // Only use default if content is truly empty or undefined
  const displayContent = (!content || Object.keys(content).length === 0) 
    ? defaultPortfolio 
    : content;

  const [selectedProject, setSelectedProject] = useState<typeof displayContent.projects[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  if (!displayContent || !displayContent.projects) {
    console.error('No display content available:', displayContent);
    return null;
  }

  const categories = displayContent.categories || defaultPortfolio.categories;
  
  // Debug logging
  console.log('Active Category:', activeCategory);
  console.log('Available Categories:', categories);
  console.log('All Projects:', displayContent.projects.map(p => ({ id: p.id, category: p.category })));
  
  const filteredProjects = displayContent.projects.filter(project => {
    // Handle undefined category
    if (!project.category) {
      console.log(`Project ${project.id} has no category`);
      return activeCategory === 'all';
    }
    
    const projectCategory = project.category.toLowerCase();
    const currentCategory = activeCategory.toLowerCase();
    
    const shouldInclude = activeCategory === 'all' || projectCategory === currentCategory;
    console.log(`Project ${project.id}: category=${projectCategory}, activeCategory=${currentCategory}, included=${shouldInclude}`);
    return shouldInclude;
  });

  const handleCategoryClick = (category: string) => {
    console.log('Clicking category:', category);
    setActiveCategory(category as ProjectCategory);
  };
  
  console.log('Filtered Projects:', filteredProjects.map(p => p.id));

  // Check if we have any projects in the current category
  if (activeCategory !== 'all' && filteredProjects.length === 0) {
    console.log('No projects found in category:', activeCategory);
  }

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

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {filteredProjects.map((project, index: number) => (
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