import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

// Generate a session ID for grouping events
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics-session-id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const location = useLocation();
  const pageStartTime = useRef<number>(Date.now());
  const previousPath = useRef<string>(location.pathname);

  useEffect(() => {
    // Track time spent on previous page before navigating
    if (previousPath.current !== location.pathname) {
      const timeSpent = Date.now() - pageStartTime.current;
      trackTimeSpent(previousPath.current, timeSpent);
      pageStartTime.current = Date.now();
      previousPath.current = location.pathname;
    }

    // Track page view
    trackPageView(location.pathname);

    // Track time spent when leaving page
    return () => {
      const timeSpent = Date.now() - pageStartTime.current;
      trackTimeSpent(location.pathname, timeSpent);
    };
  }, [location]);

  const trackPageView = async (path: string) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_type: 'page_view',
        event_category: 'navigation',
        page_path: path,
        session_id: getSessionId(),
        event_data: {
          referrer: document.referrer,
          user_agent: navigator.userAgent,
        }
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackTimeSpent = async (path: string, duration: number) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted' || duration < 1000) return; // Only track if > 1 second

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_type: 'time_spent',
        event_category: 'engagement',
        page_path: path,
        session_id: getSessionId(),
        event_data: {
          duration_ms: duration,
          duration_seconds: Math.round(duration / 1000),
        }
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackEvent = async ({ event, properties }: AnalyticsEvent) => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== 'accepted') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_type: event,
        event_category: properties?.category || 'general',
        page_path: location.pathname,
        session_id: getSessionId(),
        event_data: properties || {}
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  return { trackEvent };
};

