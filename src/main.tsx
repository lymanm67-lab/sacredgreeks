import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

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
// App version for cache busting - v2.5.2-20260130
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const isSecure = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';
    
    if (isSecure) {
      // IMPORTANT: querystring ensures browser fetches the latest SW file after deploys
      navigator.serviceWorker.register(`/sw.js?v=2.5.2-20260130`)
        .then(registration => {
          console.log('Service Worker registered:', registration);
          
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
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  });
  
  // Force reload when service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
