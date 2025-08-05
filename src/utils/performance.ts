// Performance monitoring and optimization utilities

import { PerformanceMetrics } from '../types';

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private startTime: number = 0;

  constructor() {
    this.startTime = performance.now();
    this.initializeObservers();
  }

  private initializeObservers() {
    // Largest Contentful Paint observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.renderTime = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay observer
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          this.metrics.interactionTime = firstEntry.processingStart - firstEntry.startTime;
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Navigation timing
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navEntry = entries[0] as PerformanceNavigationTiming;
          this.metrics.loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
        });
        navObserver.observe({ entryTypes: ['navigation'] });

      } catch (error) {
        console.warn('[Performance] Observer not supported:', error);
      }
    }
  }

  // Log performance metrics
  logMetrics(): PerformanceMetrics {
    const currentMetrics: PerformanceMetrics = {
      loadTime: this.metrics.loadTime || performance.now() - this.startTime,
      renderTime: this.metrics.renderTime || 0,
      interactionTime: this.metrics.interactionTime || 0,
      cacheHitRate: this.calculateCacheHitRate()
    };

    console.group('[Performance Metrics]');
    console.log('Load Time:', `${currentMetrics.loadTime.toFixed(2)}ms`);
    console.log('Render Time:', `${currentMetrics.renderTime.toFixed(2)}ms`);
    console.log('Interaction Time:', `${currentMetrics.interactionTime.toFixed(2)}ms`);
    console.log('Cache Hit Rate:', `${(currentMetrics.cacheHitRate * 100).toFixed(1)}%`);
    console.groupEnd();

    return currentMetrics;
  }

  private calculateCacheHitRate(): number {
    if (!('performance' in window) || !performance.getEntriesByType) {
      return 0;
    }

    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    if (resourceEntries.length === 0) return 0;

    const cachedResources = resourceEntries.filter(entry => 
      entry.transferSize === 0 && entry.decodedBodySize > 0
    );

    return cachedResources.length / resourceEntries.length;
  }

  // Memory usage monitoring
  getMemoryUsage(): { used: number; total: number; } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576) // MB
      };
    }
    return null;
  }

  // Network information
  getNetworkInfo(): { effectiveType?: string; downlink?: number; rtt?: number; } {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      };
    }
    return {};
  }
}

// Image lazy loading utility
export const lazyLoadImage = (img: HTMLImageElement, src: string): void => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = src;
          image.classList.remove('lazy');
          observer.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = src;
  }
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  link.onload = () => console.log(`[Performance] Preloaded: ${href}`);
  link.onerror = () => console.warn(`[Performance] Failed to preload: ${href}`);
  
  document.head.appendChild(link);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor();

// Export performance monitoring for global access
if (typeof window !== 'undefined') {
  (window as any).performanceMonitor = performanceMonitor;
}