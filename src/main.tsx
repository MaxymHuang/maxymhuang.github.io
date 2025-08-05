import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { performanceMonitor } from './utils/performance'

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('[Main] Service Worker registered successfully:', registration.scope);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available, notify user
              console.log('[Main] New content available, please refresh');
              
              // Optional: Show update notification
              if (window.confirm('New version available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
      
      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Main] Service Worker controller changed');
        window.location.reload();
      });
      
    } catch (error) {
      console.error('[Main] Service Worker registration failed:', error);
    }
  });
} else {
  console.log('[Main] Service Worker not supported');
}

// Initialize performance monitoring
window.addEventListener('load', () => {
  setTimeout(() => {
    performanceMonitor.logMetrics();
  }, 1000);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
