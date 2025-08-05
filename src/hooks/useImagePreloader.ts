import { useEffect } from 'react';

interface PreloadImageOptions {
  priority?: boolean;
  format?: 'webp' | 'avif' | 'original';
  size?: 400 | 800 | 1200;
}

export const useImagePreloader = (
  images: string[],
  options: PreloadImageOptions = {}
) => {
  const { priority = false, format = 'webp', size = 800 } = options;

  useEffect(() => {
    if (!priority) return;

    const preloadImages = images.map(src => {
      const baseName = src.split('/').pop()?.split('.')[0] || '';
      
      // Determine the optimal image to preload
      let preloadSrc = src;
      
      if (format === 'avif') {
        preloadSrc = `/optimized/${baseName}-${size}.avif`;
      } else if (format === 'webp') {
        preloadSrc = `/optimized/${baseName}-${size}.webp`;
      }

      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = preloadSrc;
      
      // Add format hint for better browser optimization
      if (format === 'avif') {
        link.type = 'image/avif';
      } else if (format === 'webp') {
        link.type = 'image/webp';
      }

      document.head.appendChild(link);

      return link;
    });

    // Cleanup function
    return () => {
      preloadImages.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images, priority, format, size]);
};

// Hook for critical above-the-fold images
export const useCriticalImagePreloader = () => {
  useEffect(() => {
    // Preload critical images that appear above the fold
    const criticalImages = [
      '/optimized/profilepic-400.webp', // Profile picture
      '/optimized/hardware-400.webp',   // First project image
    ];

    const preloadLinks = criticalImages.map(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
      return link;
    });

    // Cleanup
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);
};

// Utility to preload next images based on user interaction
export const preloadNextImages = (nextImages: string[]) => {
  nextImages.forEach(src => {
    const baseName = src.split('/').pop()?.split('.')[0] || '';
    
    // Preload multiple formats for best compatibility
    const formats = [
      { src: `/optimized/${baseName}-800.avif`, type: 'image/avif' },
      { src: `/optimized/${baseName}-800.webp`, type: 'image/webp' },
    ];

    formats.forEach(({ src: preloadSrc, type }) => {
      const link = document.createElement('link');
      link.rel = 'prefetch'; // Use prefetch for lower priority
      link.as = 'image';
      link.href = preloadSrc;
      link.type = type;
      document.head.appendChild(link);
    });
  });
};