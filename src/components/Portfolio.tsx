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
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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
    },
  ]

  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  useOutsideClick(modalRef, closeModal)

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Our Work
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Explore our latest projects and success stories
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProject(index)}
              className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-800"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-800"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>

                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {projects[selectedProject].description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].details.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm border border-blue-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {projects[selectedProject].details.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={projects[selectedProject].details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Portfolio 