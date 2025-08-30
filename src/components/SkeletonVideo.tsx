import React, { useState, useRef, useEffect } from 'react';

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
        <div className="absolute inset-0 bg-subtle/30 rounded-lg overflow-hidden animate-pulse">
          <div className="w-full h-full bg-subtle/40 flex items-center justify-center">
            <div className="text-center space-y-3">
              {/* Play button skeleton */}
              <div className="w-16 h-16 bg-foreground/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <div className="w-6 h-6 bg-foreground/50" style={{ clipPath: 'polygon(25% 0%, 100% 50%, 25% 100%)' }} />
              </div>
              <div className="text-muted/50 text-sm">📹</div>
            </div>
          </div>
          
          {/* Controls skeleton */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-subtle/60 rounded-full"></div>
                <div className="flex-1 h-1 bg-subtle/60 rounded-full"></div>
                <div className="w-10 h-4 bg-subtle/60 rounded"></div>
                <div className="w-6 h-6 bg-subtle/60 rounded-full"></div>
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
