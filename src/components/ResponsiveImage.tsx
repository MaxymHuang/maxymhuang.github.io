import React, { useState, useRef, useEffect } from 'react';
import './ResponsiveImage.css';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: boolean;
  useOptimized?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px',
  priority = false,
  placeholder = true,
  useOptimized,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Extract filename without extension
  const getBaseName = (src: string) => {
    const filename = src.split('/').pop() || '';
    return filename.split('.')[0];
  };

  const baseName = getBaseName(src);
  const shouldUseOptimized = useOptimized !== undefined ? useOptimized : true;

  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Start loading 100px before entering viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Still mark as loaded to hide placeholder
  };

  return (
    <div 
      ref={imgRef} 
      className={`responsive-image-container relative ${className} ${isLoaded ? 'loaded' : ''}`}
    >
      {/* Blur placeholder */}
      {shouldUseOptimized && placeholder && !isLoaded && (
        <div className="image-placeholder">
          <img
            src={`/optimized/${baseName}-placeholder.webp`}
            alt=""
            className="placeholder-blur"
            loading="lazy"
          />
        </div>
      )}

      {/* Loading skeleton - Enhanced */}
      {!placeholder && !isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-subtle/60 via-subtle/40 to-subtle/60 bg-[length:200%_100%] animate-shimmer rounded-xl flex items-center justify-center">
            <div className="text-muted text-sm opacity-50">📷</div>
          </div>
        </div>
      )}
      
      {/* Loading skeleton for optimized images without placeholder */}
      {shouldUseOptimized && !placeholder && !isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-subtle/60 via-subtle/40 to-subtle/60 bg-[length:200%_100%] animate-shimmer rounded-xl flex items-center justify-center">
            <div className="text-muted text-sm opacity-50">📷</div>
          </div>
        </div>
      )}

      {/* Main responsive image */}
      {isInView && shouldUseOptimized && (
        <picture className={`main-picture ${isLoaded ? 'visible' : ''}`}>
          {/* AVIF - Best compression */}
          <source
            srcSet={`
              /optimized/${baseName}-400.avif 400w,
              /optimized/${baseName}-800.avif 800w,
              /optimized/${baseName}-1200.avif 1200w
            `}
            sizes={sizes}
            type="image/avif"
          />
          
          {/* WebP - Good compression, wide support */}
          <source
            srcSet={`
              /optimized/${baseName}-400.webp 400w,
              /optimized/${baseName}-800.webp 800w,
              /optimized/${baseName}-1200.webp 1200w
            `}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback - Original format */}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            className="responsive-img"
          />
        </picture>
      )}

      {isInView && !shouldUseOptimized && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className="responsive-img"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="image-error">
          <span>⚠️ Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;