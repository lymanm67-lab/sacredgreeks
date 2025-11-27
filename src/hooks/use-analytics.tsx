import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname);
  }, [location]);

  const trackPageView = (path: string) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    // Store analytics locally for privacy
    const analytics = JSON.parse(localStorage.getItem('app-analytics') || '[]');
    analytics.push({
      type: 'pageview',
      path,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 100 events
    if (analytics.length > 100) {
      analytics.shift();
    }
    
    localStorage.setItem('app-analytics', JSON.stringify(analytics));
  };

  const trackEvent = ({ event, properties }: AnalyticsEvent) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    const analytics = JSON.parse(localStorage.getItem('app-analytics') || '[]');
    analytics.push({
      type: 'event',
      event,
      properties,
      timestamp: new Date().toISOString(),
    });
    
    if (analytics.length > 100) {
      analytics.shift();
    }
    
    localStorage.setItem('app-analytics', JSON.stringify(analytics));
  };

  return { trackEvent };
};

