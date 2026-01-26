import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";

export type SegmentType = 'opened_no_click' | 'clicked_no_convert' | 'converted' | 'inactive';

export interface LeadSegment {
  id: string;
  email: string;
  user_id: string | null;
  segment_type: SegmentType;
  source_campaign_id: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface SegmentStats {
  segment_type: SegmentType;
  count: number;
  label: string;
  description: string;
  color: string;
}

export interface EmailAutomationWorkflow {
  id: string;
  name: string;
  trigger_segment: string;
  delay_hours: number;
  email_template_key: string;
  subject_variant_type: string;
  is_active: boolean;
  created_at: string;
}

export interface SegmentConversionRate {
  segment_type: SegmentType;
  total: number;
  converted: number;
  conversionRate: number;
}

const segmentInfo: Record<SegmentType, { label: string; description: string; color: string }> = {
  opened_no_click: {
    label: "Opened but Didn't Click",
    description: "Users who opened emails but never clicked any links",
    color: "bg-yellow-500",
  },
  clicked_no_convert: {
    label: "Clicked but Didn't Convert",
    description: "Users who clicked links but didn't complete signup",
    color: "bg-orange-500",
  },
  converted: {
    label: "Converted",
    description: "Users who completed signup after email engagement",
    color: "bg-green-500",
  },
  inactive: {
    label: "Inactive",
    description: "Users with no recent activity",
    color: "bg-slate-500",
  },
};

export const useLeadSegments = () => {
  return useQuery({
    queryKey: ["lead-segments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lead_segments")
        .select("*")
        .order("last_activity_at", { ascending: false });

      if (error) throw error;
      return data as LeadSegment[];
    },
  });
};

export const useSegmentStats = () => {
  return useQuery({
    queryKey: ["segment-stats"],
    queryFn: async (): Promise<SegmentStats[]> => {
      const { data, error } = await supabase
        .from("lead_segments")
        .select("segment_type");

      if (error) throw error;

      const counts: Record<string, number> = {};
      for (const lead of data || []) {
        counts[lead.segment_type] = (counts[lead.segment_type] || 0) + 1;
      }

      return Object.entries(segmentInfo).map(([type, info]) => ({
        segment_type: type as SegmentType,
        count: counts[type] || 0,
        ...info,
      }));
    },
  });
};

export const useSegmentConversionRates = (dateRange: number = 30) => {
  return useQuery({
    queryKey: ["segment-conversion-rates", dateRange],
    queryFn: async (): Promise<SegmentConversionRate[]> => {
      const startDate = format(subDays(new Date(), dateRange), "yyyy-MM-dd");

      // Get all segments created in the date range
      const { data: segments } = await supabase
        .from("lead_segments")
        .select("*")
        .gte("created_at", startDate);

      if (!segments?.length) return [];

      // Group by original segment type and track conversions
      const segmentGroups: Record<SegmentType, { total: number; converted: number }> = {
        opened_no_click: { total: 0, converted: 0 },
        clicked_no_convert: { total: 0, converted: 0 },
        converted: { total: 0, converted: 0 },
        inactive: { total: 0, converted: 0 },
      };

      for (const segment of segments) {
        const type = segment.segment_type as SegmentType;
        segmentGroups[type].total++;
        
        // Check if they later converted (user_id exists means they signed up)
        if (segment.user_id) {
          segmentGroups[type].converted++;
        }
      }

      return Object.entries(segmentGroups).map(([type, stats]) => ({
        segment_type: type as SegmentType,
        total: stats.total,
        converted: stats.converted,
        conversionRate: stats.total > 0 ? (stats.converted / stats.total) * 100 : 0,
      }));
    },
  });
};

export const useEmailAutomationWorkflows = () => {
  return useQuery({
    queryKey: ["email-automation-workflows"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_automation_workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as EmailAutomationWorkflow[];
    },
  });
};

// Utility function to determine segment type based on email engagement
export const determineLeadSegment = async (
  email: string,
  campaignId?: string
): Promise<SegmentType> => {
  // Check for email opens
  const { data: sends } = await supabase
    .from("email_sends")
    .select("id")
    .eq("recipient_email", email);

  if (!sends?.length) return 'inactive';

  const sendIds = sends.map(s => s.id);

  // Check for opens
  const { count: openCount } = await supabase
    .from("email_opens")
    .select("id", { count: "exact" })
    .in("send_id", sendIds);

  // Check for clicks
  const { count: clickCount } = await supabase
    .from("email_clicks")
    .select("id", { count: "exact" })
    .in("send_id", sendIds);

  // Check for conversions (landing page)
  const { count: conversionCount } = await supabase
    .from("landing_page_conversions")
    .select("id", { count: "exact" })
    .eq("conversion_type", "signup_completed");

  if (conversionCount && conversionCount > 0) return 'converted';
  if (clickCount && clickCount > 0) return 'clicked_no_convert';
  if (openCount && openCount > 0) return 'opened_no_click';
  return 'inactive';
};

// Update lead segment in database
export const updateLeadSegment = async (
  email: string,
  userId?: string,
  campaignId?: string
) => {
  const segmentType = await determineLeadSegment(email, campaignId);

  const { error } = await supabase.from("lead_segments").upsert(
    {
      email,
      user_id: userId,
      segment_type: segmentType,
      source_campaign_id: campaignId,
      last_activity_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  if (error) console.error("Failed to update lead segment:", error);
  return segmentType;
};
