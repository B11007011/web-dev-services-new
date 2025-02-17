import Image from 'next/image';
import { motion } from 'framer-motion';

interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  details: {
    technologies: string[];
    features: string[];
    link: string;
  };
}

export function PortfolioItem({
  title,
  description,
  image,
  details
}: PortfolioItemProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all overflow-hidden shadow-2xl"
    >
      <div className="relative w-full h-[280px] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain bg-black/40"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-white/90 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {details.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {details.features.map((feature, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex justify-start">
          <a
            href={details.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300"
          >
            View Project
            <svg 
              className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
} 