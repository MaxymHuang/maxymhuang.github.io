// Service Worker for Maxym Huang Portfolio
// Provides offline functionality and caching

const CACHE_NAME = 'maxym-portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/coolpic.png',
  '/esp32.svg',
  '/linux.svg',
  '/hardware.png',
  '/Resume.pdf',
  // Add other critical assets
];

// Assets to cache dynamically
const DYNAMIC_ASSETS = [
  '/src/main.tsx',
  '/src/App.css',
  '/src/App.tsx',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve cached content with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response
            const responseToCache = networkResponse.clone();
            
            // Cache dynamic assets
            if (shouldCacheDynamically(request.url)) {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  console.log('[SW] Caching dynamic asset:', request.url);
                  cache.put(request, responseToCache);
                });
            }
            
            return networkResponse;
          })
          .catch((error) => {
            console.log('[SW] Network request failed:', request.url, error);
            
            // Return offline fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Return cached version or offline indicator
            return new Response(
              JSON.stringify({
                error: 'Offline',
                message: 'This content is not available offline'
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
              }
            );
          });
      })
  );
});

// Helper function to determine if asset should be cached
function shouldCacheDynamically(url) {
  // Cache JS, CSS, and image files
  return /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico)$/i.test(url) ||
         url.includes('/src/') ||
         url.includes('/assets/');
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    console.log('[SW] Background sync: contact-form-sync');
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  try {
    const db = await openDB();
    const tx = db.transaction(['pending-forms'], 'readonly');
    const store = tx.objectStore('pending-forms');
    const pendingForms = await store.getAll();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(form.data).toString()
        });
        
        if (response.ok) {
          // Remove from pending queue
          const deleteTx = db.transaction(['pending-forms'], 'readwrite');
          const deleteStore = deleteTx.objectStore('pending-forms');
          await deleteStore.delete(form.id);
          console.log('[SW] Form submission synced successfully');
        }
      } catch (error) {
        console.error('[SW] Failed to sync form submission:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Simple IndexedDB helper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('portfolio-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending-forms')) {
        db.createObjectStore('pending-forms', { keyPath: 'id' });
      }
    };
  });
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/coolpic.png',
    badge: '/coolpic.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/esp32.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/linux.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Maxym Huang Portfolio', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service worker script loaded');