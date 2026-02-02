import { useCallback } from 'react';
import { useEnhancedAnalytics } from './use-enhanced-analytics';

type CTAType = 
  | 'signup_start' 
  | 'demo_start' 
  | 'signin_click' 
  | 'podcast_click'
  | 'assessment_start'
  | 'install_prompt'
  | 'share_app'
  | 'feature_explore'
  | 'scroll_depth'
  | 'video_play'
  | 'download_resource';

interface CTATrackingOptions {
  label?: string;
  value?: number;
  source?: string;
}

export const useCTATracking = () => {
  const { trackEvent, trackConversion } = useEnhancedAnalytics();

  const trackCTA = useCallback((ctaType: CTAType, options?: CTATrackingOptions) => {
    trackEvent({
      event_type: `cta_${ctaType}`,
      event_category: 'cta',
      event_data: {
        cta_type: ctaType,
        label: options?.label,
        value: options?.value,
        source: options?.source || window.location.pathname,
        timestamp: new Date().toISOString(),
      },
    });

    // Track as conversion for signup-related CTAs
    if (['signup_start', 'demo_start', 'assessment_start'].includes(ctaType)) {
      trackConversion(ctaType, options?.value);
    }
  }, [trackEvent, trackConversion]);

  const trackSignupStart = useCallback((source?: string) => {
    trackCTA('signup_start', { source });
  }, [trackCTA]);

  const trackDemoStart = useCallback((source?: string) => {
    trackCTA('demo_start', { source });
  }, [trackCTA]);

  const trackSigninClick = useCallback((source?: string) => {
    trackCTA('signin_click', { source });
  }, [trackCTA]);

  const trackPodcastClick = useCallback((source?: string) => {
    trackCTA('podcast_click', { source });
  }, [trackCTA]);

  const trackAssessmentStart = useCallback((assessmentType?: string) => {
    trackCTA('assessment_start', { label: assessmentType });
  }, [trackCTA]);

  const trackInstallPrompt = useCallback((platform?: string) => {
    trackCTA('install_prompt', { label: platform });
  }, [trackCTA]);

  const trackShareApp = useCallback((method?: string) => {
    trackCTA('share_app', { label: method });
  }, [trackCTA]);

  const trackFeatureExplore = useCallback((featureName: string) => {
    trackCTA('feature_explore', { label: featureName });
  }, [trackCTA]);

  const trackScrollDepth = useCallback((depth: number) => {
    trackCTA('scroll_depth', { value: depth });
  }, [trackCTA]);

  return {
    trackCTA,
    trackSignupStart,
    trackDemoStart,
    trackSigninClick,
    trackPodcastClick,
    trackAssessmentStart,
    trackInstallPrompt,
    trackShareApp,
    trackFeatureExplore,
    trackScrollDepth,
  };
};
