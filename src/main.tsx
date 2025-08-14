import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { performanceMonitor } from './utils/performance';
import { imagePerformanceMonitor, checkImageFormatSupport } from './utils/imagePerformance';

// Register Service Worker - temporarily disabled for debugging
if (false && 'serviceWorker' in navigator && import.meta.env.PROD) {
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
  console.log('[Main] Service Worker not supported or disabled for development');
}

// Initialize performance monitoring
window.addEventListener('load', () => {
  setTimeout(() => {
    performanceMonitor.logMetrics();
    imagePerformanceMonitor.logPerformanceReport();
  }, 1000);
});

// Check image format support and log results
checkImageFormatSupport().then(support => {
  console.log('🖼️ Image format support:', support);
  if (support.avif) {
    console.log('✅ AVIF supported - using best compression');
  } else if (support.webp) {
    console.log('✅ WebP supported - using good compression');
  } else {
    console.log('⚠️ Using fallback formats - consider upgrading browser');
  }
});

// Enhanced error handling for production debugging
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Root element not found! Check if index.html has <div id="root"></div>');
  // Create a temporary error display
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `
    <div style="color: red; padding: 20px; font-family: Arial, sans-serif;">
      <h2>Error: Root element not found</h2>
      <p>The React app cannot mount because the root element is missing.</p>
    </div>
  `;
  document.body.appendChild(errorDiv);
} else {
  try {
    console.log('✅ Root element found, creating React app...');
    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('✅ React app rendered successfully');
  } catch (error) {
    console.error('❌ Failed to render React app:', error);
    
    // Display error on screen for debugging
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px; font-family: Arial, sans-serif; background: #1a1a1a; min-height: 100vh;">
        <h2>React App Error</h2>
        <p><strong>Error:</strong> ${error instanceof Error ? error.message : String(error)}</p>
        <p><strong>Stack:</strong></p>
        <pre style="background: #2d2d2d; padding: 10px; border-radius: 5px; overflow-x: auto;">
          ${error instanceof Error ? error.stack : 'No stack trace available'}
        </pre>
        <p><a href="/debug.html" style="color: #339af0;">Open Debug Page</a></p>
      </div>
    `;
  }
}
