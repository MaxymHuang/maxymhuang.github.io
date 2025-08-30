import React, { useState, useRef, useEffect } from 'react';
import Skeleton from './Skeleton';

interface SkeletonVideoProps {
  src?: string;
  poster?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  children?: React.ReactNode; // For source elements
}

const SkeletonVideo: React.FC<SkeletonVideoProps> = ({
  src,
  poster,
  className = '',
  width = '100%',
  height,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
    };

    const handleLoadStart = () => {
      setShowControls(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    width,
    height: height || 'auto',
  };

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      {/* Video skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-subtle/20 rounded-lg overflow-hidden animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-subtle/60 via-subtle/40 to-subtle/60 bg-[length:200%_100%] animate-shimmer" />
          
          {/* Play button skeleton */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-foreground/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 bg-foreground/40 rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            </div>
          </div>
          
          {/* Controls skeleton */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2">
              <div className="flex items-center gap-2">
                <Skeleton width="24px" height="24px" variant="circular" />
                <Skeleton width="60%" height="4px" className="rounded-full" />
                <Skeleton width="40px" height="16px" />
                <Skeleton width="24px" height="24px" variant="circular" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actual video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${className}`}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload={preload}
        style={containerStyle}
      >
        {children}
      </video>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-subtle/20 border border-border rounded-lg">
          <div className="text-center text-muted">
            <div className="text-2xl mb-2">📹</div>
            <div className="text-sm">Video failed to load</div>
            {src && (
              <a 
                href={src} 
                className="text-accent text-xs mt-1 inline-block hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Download video
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonVideo;
