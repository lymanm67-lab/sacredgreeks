import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

export type VariantType = 'control' | 'urgency_curiosity' | 'benefit_social';

export interface EmailCampaign {
  id: string;
  name: string;
  template_key: string;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface EmailVariant {
  id: string;
  campaign_id: string;
  variant_type: VariantType;
  subject_line: string;
  preview_text: string | null;
  weight: number;
}

export interface EmailAnalytics {
  totalSent: number;
  totalOpens: number;
  uniqueOpens: number;
  totalClicks: number;
  uniqueClicks: number;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
}

export interface VariantPerformance extends EmailVariant {
  sent: number;
  opens: number;
  uniqueOpens: number;
  clicks: number;
  openRate: number;
  clickRate: number;
}

export interface DailyTrend {
  date: string;
  sent: number;
  opens: number;
  clicks: number;
}

export interface TopLink {
  url: string;
  label: string | null;
  clicks: number;
}

export const useEmailCampaigns = () => {
  return useQuery({
    queryKey: ["email-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as EmailCampaign[];
    },
  });
};

export const useEmailAnalytics = (campaignId?: string, dateRange: number = 30) => {
  return useQuery({
    queryKey: ["email-analytics", campaignId, dateRange],
    queryFn: async (): Promise<EmailAnalytics> => {
      const startDate = format(subDays(new Date(), dateRange), "yyyy-MM-dd");
      
      let sendsQuery = supabase
        .from("email_sends")
        .select("id", { count: "exact" })
        .gte("sent_at", startDate);
      
      if (campaignId) {
        sendsQuery = sendsQuery.eq("campaign_id", campaignId);
      }
      
      const { count: totalSent } = await sendsQuery;

      // Get opens
      let opensData: { id: string; send_id: string }[] = [];
      let totalOpens = 0;
      
      if (campaignId) {
        // Get send IDs first
        const { data: campaignSends } = await supabase
          .from("email_sends")
          .select("id")
          .eq("campaign_id", campaignId);
        
        const sendIds = campaignSends?.map(s => s.id) || [];
        if (sendIds.length > 0) {
          const { data, count } = await supabase
            .from("email_opens")
            .select("id, send_id", { count: "exact" })
            .in("send_id", sendIds);
          opensData = data || [];
          totalOpens = count || 0;
        }
      } else {
        const { data, count } = await supabase
          .from("email_opens")
          .select("id, send_id", { count: "exact" });
        opensData = data || [];
        totalOpens = count || 0;
      }
      
      const uniqueOpens = new Set(opensData.map(o => o.send_id)).size;

      // Get clicks
      let clicksData: { id: string; send_id: string }[] = [];
      let totalClicks = 0;
      
      if (campaignId) {
        const { data: campaignSends } = await supabase
          .from("email_sends")
          .select("id")
          .eq("campaign_id", campaignId);
        
        const sendIds = campaignSends?.map(s => s.id) || [];
        if (sendIds.length > 0) {
          const { data, count } = await supabase
            .from("email_clicks")
            .select("id, send_id", { count: "exact" })
            .in("send_id", sendIds);
          clicksData = data || [];
          totalClicks = count || 0;
        }
      } else {
        const { data, count } = await supabase
          .from("email_clicks")
          .select("id, send_id", { count: "exact" });
        clicksData = data || [];
        totalClicks = count || 0;
      }
      const uniqueClicks = new Set(clicksData?.map(c => c.send_id) || []).size;

      const sent = totalSent || 0;
      const opens = uniqueOpens || 0;
      const clicks = uniqueClicks || 0;

      return {
        totalSent: sent,
        totalOpens: totalOpens || 0,
        uniqueOpens: opens,
        totalClicks: totalClicks || 0,
        uniqueClicks: clicks,
        openRate: sent > 0 ? (opens / sent) * 100 : 0,
        clickRate: sent > 0 ? (clicks / sent) * 100 : 0,
        clickToOpenRate: opens > 0 ? (clicks / opens) * 100 : 0,
      };
    },
  });
};

export const useVariantPerformance = (campaignId?: string) => {
  return useQuery({
    queryKey: ["variant-performance", campaignId],
    queryFn: async (): Promise<VariantPerformance[]> => {
      let variantsQuery = supabase.from("email_subject_variants").select("*");
      
      if (campaignId) {
        variantsQuery = variantsQuery.eq("campaign_id", campaignId);
      }
      
      const { data: variants, error } = await variantsQuery;
      if (error) throw error;
      if (!variants?.length) return [];

      const performance: VariantPerformance[] = [];

      for (const variant of variants) {
        // Get sends for this variant
        const { data: sends } = await supabase
          .from("email_sends")
          .select("id")
          .eq("variant_id", variant.id);

        const sendIds = sends?.map(s => s.id) || [];
        const sentCount = sendIds.length;

        if (sentCount === 0) {
          performance.push({
            ...variant,
            variant_type: variant.variant_type as VariantType,
            sent: 0,
            opens: 0,
            uniqueOpens: 0,
            clicks: 0,
            openRate: 0,
            clickRate: 0,
          });
          continue;
        }

        // Get opens for these sends
        const { data: opens } = await supabase
          .from("email_opens")
          .select("send_id")
          .in("send_id", sendIds);

        const uniqueOpenSends = new Set(opens?.map(o => o.send_id) || []).size;

        // Get clicks for these sends
        const { data: clicks } = await supabase
          .from("email_clicks")
          .select("send_id")
          .in("send_id", sendIds);

        const uniqueClickSends = new Set(clicks?.map(c => c.send_id) || []).size;

        performance.push({
          ...variant,
          variant_type: variant.variant_type as VariantType,
          sent: sentCount,
          opens: opens?.length || 0,
          uniqueOpens: uniqueOpenSends,
          clicks: clicks?.length || 0,
          openRate: sentCount > 0 ? (uniqueOpenSends / sentCount) * 100 : 0,
          clickRate: sentCount > 0 ? (uniqueClickSends / sentCount) * 100 : 0,
        });
      }

      return performance.sort((a, b) => b.openRate - a.openRate);
    },
    enabled: !!campaignId,
  });
};

export const useDailyTrends = (campaignId?: string, dateRange: number = 30) => {
  return useQuery({
    queryKey: ["daily-trends", campaignId, dateRange],
    queryFn: async (): Promise<DailyTrend[]> => {
      const trends: DailyTrend[] = [];
      
      for (let i = dateRange - 1; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = format(date, "yyyy-MM-dd");
        const start = startOfDay(date).toISOString();
        const end = endOfDay(date).toISOString();

        let sendsQuery = supabase
          .from("email_sends")
          .select("id", { count: "exact" })
          .gte("sent_at", start)
          .lte("sent_at", end);
        
        if (campaignId) {
          sendsQuery = sendsQuery.eq("campaign_id", campaignId);
        }
        
        const { count: sent } = await sendsQuery;

        let opensQuery = supabase
          .from("email_opens")
          .select("id", { count: "exact" })
          .gte("opened_at", start)
          .lte("opened_at", end);
        
        const { count: opens } = await opensQuery;

        let clicksQuery = supabase
          .from("email_clicks")
          .select("id", { count: "exact" })
          .gte("clicked_at", start)
          .lte("clicked_at", end);
        
        const { count: clicks } = await clicksQuery;

        trends.push({
          date: dateStr,
          sent: sent || 0,
          opens: opens || 0,
          clicks: clicks || 0,
        });
      }

      return trends;
    },
  });
};

export const useTopLinks = (campaignId?: string, limit: number = 10) => {
  return useQuery({
    queryKey: ["top-links", campaignId, limit],
    queryFn: async (): Promise<TopLink[]> => {
      let query = supabase
        .from("email_clicks")
        .select("link_url, link_label");
      
      if (campaignId) {
        const { data: sends } = await supabase
          .from("email_sends")
          .select("id")
          .eq("campaign_id", campaignId);
        
        const sendIds = sends?.map(s => s.id) || [];
        if (sendIds.length > 0) {
          query = query.in("send_id", sendIds);
        }
      }
      
      const { data: clicks, error } = await query;
      if (error) throw error;

      // Aggregate clicks by URL
      const urlCounts = new Map<string, { url: string; label: string | null; clicks: number }>();
      
      for (const click of clicks || []) {
        const existing = urlCounts.get(click.link_url);
        if (existing) {
          existing.clicks++;
        } else {
          urlCounts.set(click.link_url, {
            url: click.link_url,
            label: click.link_label,
            clicks: 1,
          });
        }
      }

      return Array.from(urlCounts.values())
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, limit);
    },
  });
};
