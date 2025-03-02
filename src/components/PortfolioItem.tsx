import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

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
            className="object-contain bg-black/40 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
              <Search className="w-8 h-8 text-white" />
              <span className="text-white font-medium">View Details</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-black/40 border-t border-white/5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-white/90 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {details.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
          {details.technologies.length > 3 && (
            <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20">
              +{details.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {details.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
            >
              {feature}
            </span>
          ))}
          {details.features.length > 2 && (
            <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">
              +{details.features.length - 2} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
} 