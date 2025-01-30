'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

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
  const [selectedProject, setSelectedProject] = useState(0)
  const [direction, setDirection] = useState(0)

  const projects = [
    {
      title: 'Web Development',
      description: 'Modern web applications built with Next.js and React',
      image: '/placeholder.jpg',
      details: {
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        features: ['Responsive Design', 'SEO Optimization', 'Performance Metrics', 'API Integration'],
        link: 'https://example.com/project1'
      }
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform solutions for iOS and Android',
      image: '/placeholder.jpg',
      details: {
        technologies: ['React Native', 'TypeScript', 'Redux', 'Native APIs'],
        features: ['Push Notifications', 'Offline Support', 'Analytics', 'App Store Optimization'],
        link: 'https://example.com/project2'
      }
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered designs that deliver results',
      image: '/placeholder.jpg',
      details: {
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        features: ['User Research', 'Wireframing', 'Design Systems', 'Usability Testing'],
        link: 'https://example.com/project3'
      }
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="portfolio">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif"
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Explore our latest projects and success stories
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Preview */}
          <motion.div 
            className="relative aspect-video rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setDirection(-1)
                  setSelectedProject((prev) => (prev - 1 + projects.length) % projects.length)
                }}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => {
                  setDirection(1)
                  setSelectedProject((prev) => (prev + 1) % projects.length)
                }}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                →
              </button>
            </div>
          </motion.div>

          {/* Project Details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-white/70 mb-6">
                  {projects[selectedProject].description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white/90">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].details.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white/90">Key Features</h4>
                    <ul className="space-y-2">
                      {projects[selectedProject].details.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center text-white/60 group-hover:text-white/80 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.a
                    href={projects[selectedProject].details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.a>
                </div>
              </motion.div>
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

export default Portfolio 