import React, { useState, useRef, useEffect } from 'react';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  width,
  height,
  priority = false,
  onLoad,
  onError,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
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
    setIsLoaded(true);
    onError?.();
  };

  const containerStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div ref={imgRef} className={`relative ${className}`} style={containerStyle}>
      {/* Skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 ${skeletonClassName}`}>
          <div className={`w-full h-full bg-subtle/40 animate-pulse flex items-center justify-center ${className.includes('rounded') ? className.match(/rounded-\w+/)?.[0] || 'rounded' : 'rounded'}`}>
            <div className="text-muted/50 text-lg">📷</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={containerStyle}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-subtle/20 border border-border rounded ${className.includes('rounded') ? className.match(/rounded-\w+/)?.[0] || 'rounded' : 'rounded'}`}>
          <div className="text-center text-muted text-sm">
            <div className="text-lg mb-1">⚠️</div>
            <div>Image failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
