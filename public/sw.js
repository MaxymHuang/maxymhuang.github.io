// Enhanced Service Worker for Maxym Huang Portfolio
// Provides advanced image caching and offline functionality

const CACHE_NAME = 'maxym-portfolio-v2.0.0';
const IMAGE_CACHE_NAME = 'portfolio-images-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';

// Critical optimized assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Critical optimized images
  '/optimized/profilepic-400.webp',
  '/optimized/hardware-400.webp',
  '/optimized/profilepic-placeholder.webp',
  '/optimized/hardware-placeholder.webp',
  // SVG icons (small, always cache)
  '/esp32.svg',
  '/linux.svg',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing enhanced service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Critical assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache critical assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating enhanced service worker...');
  
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME, STATIC_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Enhanced fetch event with smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // Route to appropriate caching strategy
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// Check if request is for an image
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.includes('/optimized/') ||
         /\.(png|jpg|jpeg|webp|avif|svg|gif)$/i.test(new URL(request.url).pathname);
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/manifest.json') ||
         url.pathname.includes('/sw.js') ||
         url.pathname === '/' ||
         url.pathname === '/index.html';
}

// Advanced image caching with format preference and size management
async function handleImageRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Check cache first (Cache First strategy for images)
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Image served from cache:', url.pathname);
      return cachedResponse;
    }

    // Fetch from network
    console.log('[SW] Fetching image from network:', url.pathname);
    const response = await fetch(request);
    
    if (response.ok) {
      // Clone response for caching
      const responseClone = response.clone();
      
      // Use dedicated image cache
      const imageCache = await caches.open(IMAGE_CACHE_NAME);
      
      // Implement cache size management (max 100 images)
      await manageCacheSize(imageCache, 100);
      
      await imageCache.put(request, responseClone);
      console.log('[SW] Image cached:', url.pathname);
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Image fetch failed:', url.pathname, error);
    
    // Try to return cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return placeholder for failed image loads
    return new Response('', { 
      status: 404,
      statusText: 'Image not found'
    });
  }
}

// Cache First strategy for static assets
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Static asset served from cache:', request.url);
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      const responseClone = response.clone();
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, responseClone);
      console.log('[SW] Static asset cached:', request.url);
    }
    
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Asset not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First strategy for dynamic content
async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const responseClone = response.clone();
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, responseClone);
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Content not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache size management to prevent unlimited growth
async function manageCacheSize(cache, maxEntries) {
  const keys = await cache.keys();
  
  if (keys.length >= maxEntries) {
    console.log(`[SW] Cache size limit reached (${keys.length}/${maxEntries}), cleaning up...`);
    
    // Remove oldest entries (FIFO strategy)
    const entriesToDelete = keys.slice(0, keys.length - maxEntries + 10);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
    
    console.log(`[SW] Removed ${entriesToDelete.length} old cache entries`);
  }
}

// Background sync for failed image loads (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'image-retry') {
      event.waitUntil(retryFailedImages());
    }
  });
}

async function retryFailedImages() {
  // Implementation for retrying failed image loads
  console.log('[SW] Retrying failed image loads...');
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'CACHE_STATS') {
    getCacheStats().then(stats => {
      event.ports[0].postMessage(stats);
    });
  }
});

async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }
  
  return stats;
}