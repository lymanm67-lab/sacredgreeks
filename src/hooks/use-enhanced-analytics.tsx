import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Json } from '@/integrations/supabase/types';

interface AnalyticsEvent {
  event_type: string;
  event_category: string;
  event_data?: Record<string, Json>;
  page_path?: string;
}

// Generate a unique session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useEnhancedAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();
  const lastPath = useRef<string>('');
  const sessionId = useRef(getSessionId());

  // Track page views
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;
    
    // Prevent duplicate tracking
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;

    trackEvent({
      event_type: 'page_view',
      event_category: 'navigation',
      page_path: location.pathname,
      event_data: {
        referrer: document.referrer,
        title: document.title,
        search: location.search,
        hash: location.hash,
      },
    });
  }, [location.pathname]);

  // Track time on page
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    const startTime = Date.now();
    const path = location.pathname;

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 2) { // Only track if spent more than 2 seconds
        trackEvent({
          event_type: 'time_on_page',
          event_category: 'engagement',
          page_path: path,
          event_data: { seconds: timeSpent },
        });
      }
    };
  }, [location.pathname]);

  const trackEvent = useCallback(async ({ event_type, event_category, event_data, page_path }: AnalyticsEvent) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    try {
      // Store in Supabase
      await supabase.from('analytics_events').insert([{
        event_type,
        event_category,
        event_data: (event_data as Json) || null,
        page_path: page_path || location.pathname,
        user_id: user?.id || null,
        session_id: sessionId.current,
      }]);
    } catch (error) {
      // Fallback to localStorage if Supabase fails
      const analytics = JSON.parse(localStorage.getItem('app-analytics') || '[]');
      analytics.push({
        event_type,
        event_category,
        event_data,
        page_path: page_path || location.pathname,
        session_id: sessionId.current,
        timestamp: new Date().toISOString(),
      });
      
      if (analytics.length > 200) {
        analytics.splice(0, analytics.length - 200);
      }
      
      localStorage.setItem('app-analytics', JSON.stringify(analytics));
    }
  }, [location.pathname, user?.id]);

  const trackClick = useCallback((elementId: string, elementText?: string) => {
    trackEvent({
      event_type: 'click',
      event_category: 'interaction',
      event_data: { element_id: elementId, element_text: elementText },
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    trackEvent({
      event_type: 'search',
      event_category: 'engagement',
      event_data: { query, results_count: resultsCount },
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    trackEvent({
      event_type: 'form_submit',
      event_category: 'conversion',
      event_data: { form_name: formName, success },
    });
  }, [trackEvent]);

  const trackFeatureUse = useCallback((featureName: string, action: string) => {
    trackEvent({
      event_type: 'feature_use',
      event_category: 'engagement',
      event_data: { feature: featureName, action },
    });
  }, [trackEvent]);

  const trackError = useCallback((errorMessage: string, errorStack?: string) => {
    trackEvent({
      event_type: 'error',
      event_category: 'technical',
      event_data: { message: errorMessage, stack: errorStack },
    });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType: string, value?: number) => {
    trackEvent({
      event_type: 'conversion',
      event_category: 'conversion',
      event_data: { type: conversionType, value },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackClick,
    trackSearch,
    trackFormSubmit,
    trackFeatureUse,
    trackError,
    trackConversion,
  };
};

// Lightweight component for auto-tracking
export const EnhancedAnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useEnhancedAnalytics();
  return <>{children}</>;
};
