import React, { useState, useRef, useEffect } from 'react';
import './LoadingImage.css';

interface LoadingImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  delay?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  delay = 0,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading (skip if priority)
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Hide skeleton on error
    onError?.();
  };

  return (
    <div ref={imgRef} className={`loading-image-container relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className={`loading-image-skeleton absolute inset-0 ${skeletonClassName}`}>
          <div className="w-full h-full bg-subtle/40 animate-pulse flex items-center justify-center rounded-lg">
            <div className="text-muted/50 text-lg">📷</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${delay ? `loading-image-delay-${delay}` : ''} ${className}`}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-subtle/20 border border-border rounded-lg">
          <div className="text-center text-muted text-sm">
            <div className="text-lg mb-1">⚠️</div>
            <div>Failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingImage;
