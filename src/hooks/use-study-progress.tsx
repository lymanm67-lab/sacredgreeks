import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { toast } from "sonner";
import { invokeCheckAchievements } from "@/lib/invoke-check-achievements";

export interface StudyProgress {
  id: string;
  user_id: string;
  session_id: number;
  completed: boolean;
  completed_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Demo progress data for presentations - shows partial progress
// Includes "Stay or Leave" course progress (session 25 completed) so Reveal is unlocked
const DEMO_PROGRESS: StudyProgress[] = [
  // Greek Life Training sessions (1-2)
  {
    id: 'demo-1',
    user_id: 'demo-user',
    session_id: 1,
    completed: true,
    completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Great insights on biblical boundaries during intake.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-2',
    user_id: 'demo-user',
    session_id: 2,
    completed: true,
    completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'The power of belief principle is transformative.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Stay or Leave: Case Study completed (session 25) so Reveal is unlocked
  {
    id: 'demo-stay-1',
    user_id: 'demo-user',
    session_id: 25,
    completed: true,
    completed_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    notes: 'Selected "This could be acceptable" - interesting scenario.',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

export const useStudyProgress = () => {
  const { user } = useAuth();
  const { isDemoMode, demoSettings } = useDemoMode();
  const queryClient = useQueryClient();

  // In presentation mode, bypass real data for a fresh demo experience
  const isPresentationMode = demoSettings.presentationMode;

  const { data: progress = [], isLoading } = useQuery({
    queryKey: ["study-progress", user?.id, isPresentationMode],
    queryFn: async () => {
      // In presentation mode, return demo data showing partial progress
      if (isPresentationMode) {
        console.log('[useStudyProgress] Presentation mode active, returning demo progress');
        return DEMO_PROGRESS;
      }
      
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("study_session_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("session_id");

      if (error) throw error;
      return data as StudyProgress[];
    },
    enabled: !!user || isPresentationMode,
  });

  const toggleSessionMutation = useMutation({
    mutationFn: async ({ sessionId, completed }: { sessionId: number; completed: boolean }) => {
      // In presentation mode, just simulate success
      if (isPresentationMode) {
        console.log('[useStudyProgress] Presentation mode - simulating session toggle');
        return;
      }
      
      if (!user) throw new Error("Must be logged in");

      if (completed) {
        // Mark as complete
        const { error } = await supabase
          .from("study_session_progress")
          .upsert({
            user_id: user.id,
            session_id: sessionId,
            completed: true,
            completed_at: new Date().toISOString(),
          });

        if (error) throw error;
      } else {
        // Mark as incomplete (delete the record)
        const { error } = await supabase
          .from("study_session_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("session_id", sessionId);

        if (error) throw error;
      }
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["study-progress"] });
      
      // Skip point awarding in presentation mode
      if (isPresentationMode) {
        toast.success(
          variables.completed
            ? "Session marked as complete!"
            : "Session marked as incomplete"
        );
        return;
      }
      
      if (variables.completed) {
        // Award points for completing study session
        try {
          await supabase.rpc("award_points", {
            _user_id: user!.id,
            _points: 15,
            _action_type: "study",
          });

          // Check for achievements
          await invokeCheckAchievements({ userId: user!.id, actionType: "study" });
        } catch (error) {
          console.error("Error awarding points:", error);
        }
      }

      toast.success(
        variables.completed
          ? "Session marked as complete!"
          : "Session marked as incomplete"
      );
    },
    onError: (error) => {
      toast.error("Failed to update progress: " + error.message);
    },
  });

  const saveNotesMutation = useMutation({
    mutationFn: async ({ sessionId, notes }: { sessionId: number; notes: string }) => {
      // In presentation mode, just simulate success
      if (isPresentationMode) {
        console.log('[useStudyProgress] Presentation mode - simulating notes save');
        return;
      }
      
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase
        .from("study_session_progress")
        .upsert({
          user_id: user.id,
          session_id: sessionId,
          notes,
          completed: isSessionComplete(sessionId),
          completed_at: isSessionComplete(sessionId) ? new Date().toISOString() : null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-progress"] });
      toast.success("Notes saved successfully!");
    },
    onError: (error) => {
      toast.error("Failed to save notes: " + error.message);
    },
  });

  const isSessionComplete = (sessionId: number) => {
    return progress.some((p) => p.session_id === sessionId && p.completed);
  };

  const getSessionNotes = (sessionId: number) => {
    return progress.find((p) => p.session_id === sessionId)?.notes || "";
  };

  // In presentation mode, show demo progress (2 of 5)
  const completedCount = progress.filter((p) => p.completed).length;
  const totalSessions = 5;
  const progressPercentage = (completedCount / totalSessions) * 100;

  return {
    progress,
    isLoading: isPresentationMode ? false : isLoading,
    toggleSession: toggleSessionMutation.mutate,
    saveNotes: saveNotesMutation.mutate,
    isSavingNotes: saveNotesMutation.isPending,
    isSessionComplete,
    getSessionNotes,
    completedCount,
    totalSessions,
    progressPercentage,
    isAuthenticated: !!user || isPresentationMode,
    isPresentationMode,
  };
};
