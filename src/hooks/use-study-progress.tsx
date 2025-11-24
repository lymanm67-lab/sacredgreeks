import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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

export const useStudyProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: progress = [], isLoading } = useQuery({
    queryKey: ["study-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("study_session_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("session_id");

      if (error) throw error;
      return data as StudyProgress[];
    },
    enabled: !!user,
  });

  const toggleSessionMutation = useMutation({
    mutationFn: async ({ sessionId, completed }: { sessionId: number; completed: boolean }) => {
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["study-progress"] });
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

  const isSessionComplete = (sessionId: number) => {
    return progress.some((p) => p.session_id === sessionId && p.completed);
  };

  const completedCount = progress.filter((p) => p.completed).length;
  const totalSessions = 5;
  const progressPercentage = (completedCount / totalSessions) * 100;

  return {
    progress,
    isLoading,
    toggleSession: toggleSessionMutation.mutate,
    isSessionComplete,
    completedCount,
    totalSessions,
    progressPercentage,
    isAuthenticated: !!user,
  };
};
