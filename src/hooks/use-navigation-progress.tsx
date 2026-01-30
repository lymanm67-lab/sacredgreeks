import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface NavProgressData {
  proofCourse: number;
  proofQuiz: number;
  guildTraining: number;
  greekLifeTraining: number;
  mythBuster: number;
  faithAuthority: number;
  stayOrLeave: number;
  saintsOrSellouts: number;
  hiddenInPlainSight: number;
  journey: number;
  bibleStudy: number;
  prayerJournal: number;
  faithSnapshot: number;
  shatteredMasks: number;
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
          greekLifeTraining: 0,
          mythBuster: 0,
          faithAuthority: 0,
          stayOrLeave: 0,
          saintsOrSellouts: 0,
          hiddenInPlainSight: 0,
          journey: 0,
          bibleStudy: 0,
          prayerJournal: 0,
          faithSnapshot: 0,
          shatteredMasks: 0,
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

      // Guild Training (sessions 6-15 for 10 modules) 
      const guildSessions = studyProgress?.filter(p => p.session_id >= 6 && p.session_id <= 15 && p.completed) || [];
      const guildTraining = Math.round((guildSessions.length / 10) * 100);

      // Greek Life Training (foundation 21-24 + modules 6-15 = 14 total items)
      const foundationSessions = studyProgress?.filter(p => p.session_id >= 21 && p.session_id <= 24 && p.completed) || [];
      const greekLifeTraining = Math.round(((foundationSessions.length + guildSessions.length) / 14) * 100);

      // Faith & Authority (sessions 16-20)
      const faithSessions = studyProgress?.filter(p => p.session_id >= 16 && p.session_id <= 20 && p.completed) || [];
      const faithAuthority = Math.round((faithSessions.length / 5) * 100);

      // Stay or Leave course (sessions 25-30)
      const stayOrLeaveSessions = studyProgress?.filter(p => p.session_id >= 25 && p.session_id <= 30 && p.completed) || [];
      const stayOrLeave = Math.round((stayOrLeaveSessions.length / 6) * 100);

      // Saints or Sellouts course (sessions 31-36)
      const saintsOrSelloutsSessions = studyProgress?.filter(p => p.session_id >= 31 && p.session_id <= 36 && p.completed) || [];
      const saintsOrSellouts = Math.round((saintsOrSelloutsSessions.length / 6) * 100);

      // Hidden in Plain Sight course (sessions 40-48, 9 modules)
      const hiddenInPlainSightSessions = studyProgress?.filter(p => p.session_id >= 40 && p.session_id <= 48 && p.completed) || [];
      const hiddenInPlainSight = Math.round((hiddenInPlainSightSessions.length / 9) * 100);

      // Myth Buster progress (sessions 100+)
      // Total myths count is dynamically determined (currently around 30+ myths in the content)
      const mythSessions = studyProgress?.filter(p => p.session_id >= 100 && p.session_id < 200 && p.completed) || [];
      // Total myth count after consolidation (reduced from 35 to ~48 entries)
      const mythBuster = Math.min(Math.round((mythSessions.length / 48) * 100), 100);

      // Fetch journey progress (30-day)
      const { data: journeyData } = await supabase
        .from("journey_progress")
        .select("day_number, completed")
        .eq("user_id", user.id)
        .eq("completed", true);
      
      const journey = Math.round(((journeyData?.length || 0) / 30) * 100);

      // Fetch assessment submissions for tracking completion
      const { data: assessmentData } = await supabase
        .from("assessment_submissions")
        .select("id, scenario, track")
        .eq("user_id", user.id);
      
      // PROOF Quiz - check for track='proof-quiz' or scenario='proof'
      const proofQuiz = assessmentData?.some(a => 
        a.track === 'proof-quiz' || a.scenario === 'proof'
      ) ? 100 : 0;
      
      // Faith Snapshot - check for track='faith-snapshot'
      const faithSnapshot = assessmentData?.some(a => 
        a.track === 'faith-snapshot' || a.track === 'snapshot'
      ) ? 100 : 0;

      // Fetch Shattered Masks results from dedicated table
      const { data: masksData } = await supabase
        .from("shattered_masks_results")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);
      
      // Also check assessment_submissions for track='shattered-masks'
      const shatteredMasksFromAssessment = assessmentData?.some(a => 
        a.track === 'shattered-masks'
      );
      
      const shatteredMasks = (masksData && masksData.length > 0) || shatteredMasksFromAssessment ? 100 : 0;

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
        greekLifeTraining,
        mythBuster,
        faithAuthority,
        stayOrLeave,
        saintsOrSellouts,
        hiddenInPlainSight,
        journey,
        bibleStudy,
        prayerJournal,
        faithSnapshot,
        shatteredMasks,
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
      case "/snapshot":
        return progressData.faithSnapshot;
      case "/shattered-masks":
        return progressData.shatteredMasks;
      case "/ancient-guild-training":
        return progressData.guildTraining;
      case "/greek-life-training":
        return progressData.greekLifeTraining;
      case "/myth-buster":
        return progressData.mythBuster;
      case "/faith-authority":
        return progressData.faithAuthority;
      case "/should-you-stay-or-leave":
        return progressData.stayOrLeave;
      case "/saints-or-sellouts":
        return progressData.saintsOrSellouts;
      case "/hidden-in-plain-sight":
        return progressData.hiddenInPlainSight;
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
