import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useCallback, useRef } from "react";

export interface LandingVariant {
  id: string;
  variant_key: string;
  name: string;
  headline: string;
  subheadline: string | null;
  cta_text: string;
  is_control: boolean;
  is_active: boolean;
  weight: number;
}

interface VisitData {
  variant_id: string;
  session_id: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Generate or retrieve session ID
const getSessionId = (): string => {
  const key = 'sg_landing_session';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// Get stored variant for consistent experience
const getStoredVariant = (): string | null => {
  return localStorage.getItem('sg_landing_variant');
};

const setStoredVariant = (variantKey: string): void => {
  localStorage.setItem('sg_landing_variant', variantKey);
};

// Get visit ID for conversion tracking
const getVisitId = (): string | null => {
  return sessionStorage.getItem('sg_visit_id');
};

const setVisitId = (visitId: string): void => {
  sessionStorage.setItem('sg_visit_id', visitId);
};

// Select variant based on weights
const selectVariantByWeight = (variants: LandingVariant[]): LandingVariant => {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }
  
  return variants[0];
};

export const useLandingVariants = () => {
  return useQuery({
    queryKey: ["landing-variants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("landing_page_variants")
        .select("*")
        .eq("is_active", true);
      
      if (error) throw error;
      return data as LandingVariant[];
    },
  });
};

export const useLandingABTest = () => {
  const { data: variants, isLoading } = useLandingVariants();
  const hasTrackedVisit = useRef(false);
  
  // Select or retrieve variant
  const getVariant = useCallback((): LandingVariant | null => {
    if (!variants?.length) return null;
    
    // Check URL param for forced variant (testing)
    const urlParams = new URLSearchParams(window.location.search);
    const forcedVariant = urlParams.get('variant');
    if (forcedVariant) {
      const found = variants.find(v => v.variant_key === forcedVariant);
      if (found) {
        setStoredVariant(found.variant_key);
        return found;
      }
    }
    
    // Check for stored variant (returning visitor)
    const storedKey = getStoredVariant();
    if (storedKey) {
      const found = variants.find(v => v.variant_key === storedKey);
      if (found) return found;
    }
    
    // Select new variant
    const selected = selectVariantByWeight(variants);
    setStoredVariant(selected.variant_key);
    return selected;
  }, [variants]);

  const variant = getVariant();

  // Track visit
  const trackVisit = useCallback(async () => {
    if (!variant || hasTrackedVisit.current) return;
    hasTrackedVisit.current = true;
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const visitData: VisitData = {
      variant_id: variant.id,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
    };
    
    try {
      const { data, error } = await supabase
        .from("landing_page_visits")
        .insert(visitData)
        .select("id")
        .single();
      
      if (!error && data) {
        setVisitId(data.id);
      }
    } catch (e) {
      console.error("Failed to track visit:", e);
    }
  }, [variant]);

  useEffect(() => {
    if (variant && !hasTrackedVisit.current) {
      trackVisit();
    }
  }, [variant, trackVisit]);

  // Track conversion
  const trackConversion = useCallback(async (
    conversionType: 'cta_click' | 'signup_started' | 'signup_completed' | 'demo_started' | 'snapshot_started' | 'snapshot_completed',
    userId?: string
  ) => {
    const visitId = getVisitId();
    if (!variant || !visitId) return;
    
    try {
      await supabase.from("landing_page_conversions").insert({
        visit_id: visitId,
        variant_id: variant.id,
        conversion_type: conversionType,
        user_id: userId || undefined,
      });
    } catch (e) {
      console.error("Failed to track conversion:", e);
    }
  }, [variant]);

  return {
    variant,
    isLoading,
    trackConversion,
    sessionId: getSessionId(),
  };
};

// Analytics hooks for admin dashboard
export interface LandingAnalytics {
  variantKey: string;
  variantName: string;
  visits: number;
  ctaClicks: number;
  signupsStarted: number;
  signupsCompleted: number;
  demoStarts: number;
  ctaClickRate: number;
  signupRate: number;
  completionRate: number;
}

export const useLandingAnalytics = (dateRange: number = 30) => {
  return useQuery({
    queryKey: ["landing-analytics", dateRange],
    queryFn: async (): Promise<LandingAnalytics[]> => {
      const { data: variants } = await supabase
        .from("landing_page_variants")
        .select("*");
      
      if (!variants?.length) return [];

      const analytics: LandingAnalytics[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      for (const variant of variants) {
        // Get visits
        const { count: visits } = await supabase
          .from("landing_page_visits")
          .select("id", { count: "exact" })
          .eq("variant_id", variant.id)
          .gte("visited_at", startDate.toISOString());

        // Get conversions by type
        const { data: conversions } = await supabase
          .from("landing_page_conversions")
          .select("conversion_type")
          .eq("variant_id", variant.id)
          .gte("converted_at", startDate.toISOString());

        const ctaClicks = conversions?.filter(c => c.conversion_type === 'cta_click').length || 0;
        const signupsStarted = conversions?.filter(c => c.conversion_type === 'signup_started').length || 0;
        const signupsCompleted = conversions?.filter(c => c.conversion_type === 'signup_completed').length || 0;
        const demoStarts = conversions?.filter(c => c.conversion_type === 'demo_started').length || 0;

        const visitCount = visits || 0;

        analytics.push({
          variantKey: variant.variant_key,
          variantName: variant.name,
          visits: visitCount,
          ctaClicks,
          signupsStarted,
          signupsCompleted,
          demoStarts,
          ctaClickRate: visitCount > 0 ? (ctaClicks / visitCount) * 100 : 0,
          signupRate: visitCount > 0 ? (signupsStarted / visitCount) * 100 : 0,
          completionRate: signupsStarted > 0 ? (signupsCompleted / signupsStarted) * 100 : 0,
        });
      }

      return analytics.sort((a, b) => b.signupRate - a.signupRate);
    },
  });
};

export interface DailyLandingTrend {
  date: string;
  visits: number;
  conversions: number;
}

export const useLandingTrends = (dateRange: number = 30) => {
  return useQuery({
    queryKey: ["landing-trends", dateRange],
    queryFn: async (): Promise<DailyLandingTrend[]> => {
      const trends: DailyLandingTrend[] = [];
      
      for (let i = dateRange - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const start = new Date(dateStr).toISOString();
        const end = new Date(dateStr + 'T23:59:59.999Z').toISOString();

        const { count: visits } = await supabase
          .from("landing_page_visits")
          .select("id", { count: "exact" })
          .gte("visited_at", start)
          .lte("visited_at", end);

        const { count: conversions } = await supabase
          .from("landing_page_conversions")
          .select("id", { count: "exact" })
          .eq("conversion_type", "signup_completed")
          .gte("converted_at", start)
          .lte("converted_at", end);

        trends.push({
          date: dateStr,
          visits: visits || 0,
          conversions: conversions || 0,
        });
      }

      return trends;
    },
  });
};
