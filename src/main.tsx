import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initErrorReporting } from "@/lib/errorReporting";

// Initialize production error monitoring
initErrorReporting();

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Register service worker for offline support with Safari fallback
// App version for cache busting - v2.5.6-20260202 (chapters sidebar)
const APP_SW_VERSION = '2.5.7-20260326';

// Clear stale caches on app start
async function clearStaleCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const staleCaches = cacheNames.filter(name => 
      !name.includes('v11') // Keep only current cache version
    );
    await Promise.all(staleCaches.map(name => caches.delete(name)));
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // Clear stale caches immediately on load
    await clearStaleCaches();
    
    const isSecure = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';
    
    if (isSecure) {
      // IMPORTANT: querystring ensures browser fetches the latest SW file after deploys
      navigator.serviceWorker.register(`/sw.js?v=${APP_SW_VERSION}`)
        .then(registration => {
          
          // Force update check immediately
          registration.update();
          
          // Check for updates on registration
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available - skip waiting and reload
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              });
            }
          });
        })
        .catch(() => {
          // SW registration failed silently
        });
    }
  });
  
  // Force reload when service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
