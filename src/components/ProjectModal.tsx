import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    image: string
    details: {
      technologies: string[]
      features: string[]
      link: string
    }
  } | null
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-[#0B1120] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="relative h-[280px] md:h-full bg-black/40">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                {project.title}
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-6">
                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.details.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.details.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit Button */}
                <a
                  href={project.details.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Visit Project
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 