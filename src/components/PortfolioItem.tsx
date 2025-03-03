import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface PortfolioItemProps {
  id: string;
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
  details,
  id
}: PortfolioItemProps) {
  const [imageError, setImageError] = useState(false);
  const isGolfProject = id === 'tjgl-golf';

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative bg-gradient-to-b from-gray-900/40 to-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all overflow-hidden shadow-2xl hover:shadow-blue-500/20"
    >
      {isGolfProject && (
        <div className="absolute -right-16 top-6 rotate-45 z-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-1 px-12 shadow-lg">
            Featured
          </div>
        </div>
      )}
      <div className="relative w-full h-[400px] p-4">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-black/20 to-black/40 flex items-center justify-center backdrop-blur-sm border border-white/5">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority
              quality={100}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl">
              <ImageIcon className="w-16 h-16 text-white/40 mb-4" />
              <span className="text-white/70 text-xl font-medium">{title}</span>
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 hover:border-white/40"
              >
                <Search className="w-8 h-8 text-white" />
              </motion.div>
              <span className="text-white/90 font-medium text-lg tracking-wide">View Details</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-gradient-to-b from-black/40 to-black/60 border-t border-white/5 backdrop-blur-sm">
        <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
          isGolfProject 
            ? 'from-blue-400 via-purple-400 to-blue-400 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-blue-300' 
            : 'from-white via-blue-200 to-white group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-blue-400'
        } transition-all duration-500`}>{title}</h3>
        <p className="text-white/80 mb-6 line-clamp-2 leading-relaxed text-lg">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {details.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech}
              className="px-4 py-1.5 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {details.technologies.length > 3 && (
            <span className="px-4 py-1.5 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
              +{details.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {details.features.slice(0, 2).map((feature) => (
            <span 
              key={feature}
              className="px-4 py-1.5 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
            >
              {feature}
            </span>
          ))}
          {details.features.length > 2 && (
            <span className="px-4 py-1.5 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
              +{details.features.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
    </motion.div>
  );
} 