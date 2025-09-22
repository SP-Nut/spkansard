import { useState } from 'react';
import Image from 'next/image';

interface OptimizedHeroImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function OptimizedHeroImage({ 
  src, 
  alt, 
  className = '', 
  priority = false 
}: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse" />
      )}
    </div>
  );
}