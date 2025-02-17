import Image from 'next/image';
import { CSSProperties, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  style,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Ensure src starts with a forward slash
  const imageSrc = src.startsWith('/') ? src : `/${src}`;

  if (fill) {
    return (
      <div className={`relative ${className}`} style={style}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`duration-700 ease-in-out ${
            isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          } object-cover`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            console.error(`Failed to load image: ${imageSrc}`);
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
        {isLoading && !error && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        {error && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width || 1920}
        height={height || 1080}
        priority={priority}
        sizes={sizes}
        className={`duration-700 ease-in-out ${
          isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        } object-cover`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          console.error(`Failed to load image: ${imageSrc}`);
        }}
        loading={priority ? 'eager' : 'lazy'}
      />
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
} 