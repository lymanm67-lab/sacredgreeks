import { useCallback } from 'react';

// Capacitor Browser plugin - only imported if available
let Browser: any = null;
try {
  // Dynamic import to avoid errors if Capacitor is not available
  import('@capacitor/browser').then(module => {
    Browser = module.Browser;
  });
} catch (error) {
  console.log('Capacitor Browser not available, using standard web behavior');
}

export function useExternalLinks() {
  const openExternalLink = useCallback(async (url: string) => {
    // Check if running in Capacitor (native mobile app)
    if (Browser && typeof Browser.open === 'function') {
      try {
        await Browser.open({ 
          url,
          windowName: '_blank',
          presentationStyle: 'popover'
        });
        return;
      } catch (error) {
        console.warn('Failed to open with Capacitor Browser, falling back to window.open', error);
      }
    }
    
    // Fallback to standard web behavior
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return { openExternalLink };
}
