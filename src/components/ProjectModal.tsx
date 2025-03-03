import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

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
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

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
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B1120] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-auto">
            {/* Image Section */}
            <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-black/40">
              {/* Loading Skeleton */}
              {isImageLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 animate-pulse" />
              )}
              
              {/* Fallback for image error */}
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                  <div className="text-gray-400 text-center p-4">
                    <svg 
                      className="w-12 h-12 mx-auto mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p>Image not available</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain md:object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onLoadingComplete={() => setIsImageLoading(false)}
                  onError={() => setImageError(true)}
                  style={{
                    opacity: isImageLoading ? 0 : 1
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 overflow-y-auto">
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
                <motion.a
                  href={project.details.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 