// Image performance monitoring and optimization utilities

export interface ImageLoadMetrics {
  src: string;
  loadTime: number;
  size: number;
  format: string;
  fromCache: boolean;
  timestamp: number;
}

class ImagePerformanceMonitor {
  private metrics: ImageLoadMetrics[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver() {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'image') {
            this.recordImageLoad(resourceEntry);
          }
        });
      });

      this.observer.observe({ entryTypes: ['resource'] });
    }
  }

  private recordImageLoad(entry: PerformanceResourceTiming) {
    const metrics: ImageLoadMetrics = {
      src: entry.name,
      loadTime: entry.responseEnd - entry.startTime,
      size: entry.transferSize || 0,
      format: this.getImageFormat(entry.name),
      fromCache: entry.transferSize === 0 && entry.decodedBodySize > 0,
      timestamp: Date.now()
    };

    this.metrics.push(metrics);
    
    // Keep only last 100 entries to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log performance issues
    if (metrics.loadTime > 1000) {
      console.warn(`[ImagePerf] Slow image load: ${metrics.src} took ${metrics.loadTime}ms`);
    }

    if (metrics.size > 500000) { // 500KB
      console.warn(`[ImagePerf] Large image: ${metrics.src} is ${(metrics.size / 1024).toFixed(1)}KB`);
    }
  }

  private getImageFormat(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase() || '';
    return extension;
  }

  public getMetrics(): ImageLoadMetrics[] {
    return [...this.metrics];
  }

  public getAverageLoadTime(): number {
    if (this.metrics.length === 0) return 0;
    const total = this.metrics.reduce((sum, metric) => sum + metric.loadTime, 0);
    return total / this.metrics.length;
  }

  public getCacheHitRate(): number {
    if (this.metrics.length === 0) return 0;
    const cacheHits = this.metrics.filter(metric => metric.fromCache).length;
    return (cacheHits / this.metrics.length) * 100;
  }

  public getFormatBreakdown(): Record<string, number> {
    const breakdown: Record<string, number> = {};
    this.metrics.forEach(metric => {
      breakdown[metric.format] = (breakdown[metric.format] || 0) + 1;
    });
    return breakdown;
  }

  public getSizeStats(): { total: number; average: number; largest: ImageLoadMetrics | null } {
    if (this.metrics.length === 0) {
      return { total: 0, average: 0, largest: null };
    }

    const total = this.metrics.reduce((sum, metric) => sum + metric.size, 0);
    const average = total / this.metrics.length;
    const largest = this.metrics.reduce((prev, current) => 
      (prev.size > current.size) ? prev : current
    );

    return { total, average, largest };
  }

  public logPerformanceReport() {
    console.group('📊 Image Performance Report');
    console.log(`Total images loaded: ${this.metrics.length}`);
    console.log(`Average load time: ${this.getAverageLoadTime().toFixed(2)}ms`);
    console.log(`Cache hit rate: ${this.getCacheHitRate().toFixed(1)}%`);
    console.log('Format breakdown:', this.getFormatBreakdown());
    
    const sizeStats = this.getSizeStats();
    console.log(`Total size: ${(sizeStats.total / 1024).toFixed(1)}KB`);
    console.log(`Average size: ${(sizeStats.average / 1024).toFixed(1)}KB`);
    if (sizeStats.largest) {
      console.log(`Largest image: ${sizeStats.largest.src} (${(sizeStats.largest.size / 1024).toFixed(1)}KB)`);
    }
    console.groupEnd();
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.metrics = [];
  }
}

// Global instance
export const imagePerformanceMonitor = new ImagePerformanceMonitor();

// Utility to check if modern image formats are supported
export const checkImageFormatSupport = async (): Promise<{
  webp: boolean;
  avif: boolean;
}> => {
  const webpSupport = await checkFormat('webp');
  const avifSupport = await checkFormat('avif');
  
  return { webp: webpSupport, avif: avifSupport };
};

function checkFormat(format: 'webp' | 'avif'): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    if (format === 'webp') {
      img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    } else if (format === 'avif') {
      img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }
  });
}

// Performance hints for image loading
export const getOptimalImageSize = (containerWidth: number, devicePixelRatio = 1): number => {
  const targetWidth = containerWidth * devicePixelRatio;
  
  // Choose the smallest size that's larger than target
  const sizes = [400, 800, 1200];
  return sizes.find(size => size >= targetWidth) || sizes[sizes.length - 1];
};

// Preload critical images
export const preloadCriticalImages = (images: string[]) => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};