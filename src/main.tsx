import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force React singleton to prevent multiple instances
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ || { isDisabled: true };
}

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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Check if we're on HTTPS or localhost (required for service workers)
    const isSecure = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';
    
    if (isSecure) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    } else {
      console.log('Service Worker skipped: not on secure connection');
    }
  });
}
