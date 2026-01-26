import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface NavProgressData {
  proofCourse: number;
  proofQuiz: number;
  guildTraining: number;
  faithAuthority: number;
  journey: number;
  bibleStudy: number;
  prayerJournal: number;
}

export const useNavigationProgress = () => {
  const { user } = useAuth();

  const { data: progressData, isLoading } = useQuery({
    queryKey: ["nav-progress", user?.id],
    queryFn: async (): Promise<NavProgressData> => {
      if (!user) {
        return {
          proofCourse: 0,
          proofQuiz: 0,
          guildTraining: 0,
          faithAuthority: 0,
          journey: 0,
          bibleStudy: 0,
          prayerJournal: 0,
        };
      }

      // Fetch study session progress (PROOF Course uses sessions 1-5)
      const { data: studyProgress } = await supabase
        .from("study_session_progress")
        .select("session_id, completed")
        .eq("user_id", user.id);

      // Calculate PROOF Course progress (sessions 1-5)
      const proofSessions = studyProgress?.filter(p => p.session_id >= 1 && p.session_id <= 5 && p.completed) || [];
      const proofCourse = Math.round((proofSessions.length / 5) * 100);

      // Guild Training (sessions 6-10) 
      const guildSessions = studyProgress?.filter(p => p.session_id >= 6 && p.session_id <= 10 && p.completed) || [];
      const guildTraining = Math.round((guildSessions.length / 5) * 100);

      // Faith & Authority (sessions 11-15)
      const faithSessions = studyProgress?.filter(p => p.session_id >= 11 && p.session_id <= 15 && p.completed) || [];
      const faithAuthority = Math.round((faithSessions.length / 5) * 100);

      // Fetch journey progress (30-day)
      const { data: journeyData } = await supabase
        .from("journey_progress")
        .select("day_number, completed")
        .eq("user_id", user.id)
        .eq("completed", true);
      
      const journey = Math.round(((journeyData?.length || 0) / 30) * 100);

      // Fetch assessment submissions for PROOF Quiz
      const { data: assessmentData } = await supabase
        .from("assessment_submissions")
        .select("id")
        .eq("user_id", user.id);
      
      const proofQuiz = assessmentData && assessmentData.length > 0 ? 100 : 0;

      // Fetch prayer journal entries count
      const { count: prayerCount } = await supabase
        .from("prayer_journal")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      // Cap at 100% after 10 entries
      const prayerJournal = Math.min(Math.round(((prayerCount || 0) / 10) * 100), 100);

      // Bible study - based on saved searches
      const { count: bibleCount } = await supabase
        .from("saved_bible_searches")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      // Cap at 100% after 10 saved searches
      const bibleStudy = Math.min(Math.round(((bibleCount || 0) / 10) * 100), 100);

      return {
        proofCourse,
        proofQuiz,
        guildTraining,
        faithAuthority,
        journey,
        bibleStudy,
        prayerJournal,
      };
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const getProgressForPath = (path: string): number => {
    if (!progressData) return 0;
    
    switch (path) {
      case "/proof-course":
        return progressData.proofCourse;
      case "/proof-assessment":
        return progressData.proofQuiz;
      case "/ancient-guild-training":
        return progressData.guildTraining;
      case "/faith-authority":
        return progressData.faithAuthority;
      case "/journey":
        return progressData.journey;
      case "/bible-study":
        return progressData.bibleStudy;
      case "/prayer-journal":
        return progressData.prayerJournal;
      default:
        return 0;
    }
  };

  return {
    progressData,
    isLoading,
    getProgressForPath,
  };
};
