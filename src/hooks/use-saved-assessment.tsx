import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

export interface SavedAssessment {
  id: string;
  created_at: string;
  track: string;
  scenario: string;
  result_type: string;
  scores_json: Record<string, unknown>;
  answers_json: Record<string, unknown>;
}

export const useSavedAssessment = (assessmentType: string) => {
  const { user } = useAuth();
  const { isDemoMode, demoSettings } = useDemoMode();
  
  // In presentation mode, bypass saved assessments for a fresh demo experience
  const isPresentationMode = demoSettings.presentationMode;

  const { data: savedAssessment, isLoading, refetch } = useQuery({
    queryKey: ["saved-assessment", assessmentType, user?.id, isPresentationMode],
    queryFn: async (): Promise<SavedAssessment | null> => {
      // Skip fetching in presentation mode to ensure fresh demo experience
      if (isPresentationMode) {
        console.log('[useSavedAssessment] Presentation mode active, skipping saved assessment fetch');
        return null;
      }
      
      if (!user) return null;

      const { data, error } = await supabase
        .from("assessment_submissions")
        .select("id, created_at, track, scenario, result_type, scores_json, answers_json")
        .eq("user_id", user.id)
        .eq("track", assessmentType)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching saved assessment:", error);
        return null;
      }

      return data as SavedAssessment | null;
    },
    enabled: !!user && !isPresentationMode,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // In presentation mode, always report no saved assessment
  const hasSavedAssessment = !isPresentationMode && !!savedAssessment;

  return {
    savedAssessment: isPresentationMode ? null : savedAssessment,
    hasSavedAssessment,
    isLoading: isPresentationMode ? false : isLoading,
    refetch,
  };
};
