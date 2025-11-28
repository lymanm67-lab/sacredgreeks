import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Valid action types
const VALID_ACTION_TYPES = ["devotional", "study", "assessment", "prayer"] as const;
type ActionType = typeof VALID_ACTION_TYPES[number];

interface CheckAchievementsRequest {
  userId: string;
  actionType: ActionType;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // SECURITY: Require authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Verify the user's authentication
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const { userId, actionType } = body as CheckAchievementsRequest;

    // SECURITY: Input validation
    if (!userId || typeof userId !== "string" || userId.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid userId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!actionType || !VALID_ACTION_TYPES.includes(actionType as ActionType)) {
      return new Response(
        JSON.stringify({ error: "Invalid actionType. Must be one of: " + VALID_ACTION_TYPES.join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SECURITY: User can only check achievements for themselves
    if (user.id !== userId) {
      return new Response(
        JSON.stringify({ error: "Can only check achievements for your own user" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Checking achievements for user:", userId, "action:", actionType);

    // Get user's current achievements
    const { data: userAchievements } = await supabase
      .from("user_achievements")
      .select("achievement_id, achievements(achievement_key)")
      .eq("user_id", userId);

    const earnedKeys = new Set(
      userAchievements?.map((ua: any) => ua.achievements.achievement_key) || []
    );

    const newAchievements = [];

    // Check for first-time achievements
    if (actionType === "devotional" && !earnedKeys.has("first_devotional")) {
      const { data: achievement } = await supabase
        .from("achievements")
        .select("*")
        .eq("achievement_key", "first_devotional")
        .single();

      if (achievement) {
        await supabase.from("user_achievements").insert({
          user_id: userId,
          achievement_id: achievement.id,
        });
        newAchievements.push(achievement);
      }
    }

    if (actionType === "study" && !earnedKeys.has("first_study")) {
      const { data: achievement } = await supabase
        .from("achievements")
        .select("*")
        .eq("achievement_key", "first_study")
        .single();

      if (achievement) {
        await supabase.from("user_achievements").insert({
          user_id: userId,
          achievement_id: achievement.id,
        });
        newAchievements.push(achievement);
      }

      // Check for all studies completed
      const { data: progress } = await supabase
        .from("study_session_progress")
        .select("session_id")
        .eq("user_id", userId)
        .eq("completed", true);

      if (progress && progress.length >= 5 && !earnedKeys.has("all_studies")) {
        const { data: achievement } = await supabase
          .from("achievements")
          .select("*")
          .eq("achievement_key", "all_studies")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
          });
          newAchievements.push(achievement);
        }
      }
    }

    if (actionType === "assessment") {
      if (!earnedKeys.has("first_assessment")) {
        const { data: achievement } = await supabase
          .from("achievements")
          .select("*")
          .eq("achievement_key", "first_assessment")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
          });
          newAchievements.push(achievement);
        }
      }

      // Check for assessment streak
      const { data: assessments } = await supabase
        .from("assessment_submissions")
        .select("created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (assessments && assessments.length >= 3 && !earnedKeys.has("assessment_streak_3")) {
        const { data: achievement } = await supabase
          .from("achievements")
          .select("*")
          .eq("achievement_key", "assessment_streak_3")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
          });
          newAchievements.push(achievement);
        }
      }
    }

    if (actionType === "prayer") {
      if (!earnedKeys.has("first_prayer")) {
        const { data: achievement } = await supabase
          .from("achievements")
          .select("*")
          .eq("achievement_key", "first_prayer")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
          });
          newAchievements.push(achievement);
        }
      }

      // Check for prayer warrior
      const { count } = await supabase
        .from("prayer_journal")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (count && count >= 20 && !earnedKeys.has("prayer_warrior")) {
        const { data: achievement } = await supabase
          .from("achievements")
          .select("*")
          .eq("achievement_key", "prayer_warrior")
          .single();

        if (achievement) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
          });
          newAchievements.push(achievement);
        }
      }
    }

    // Check for devotional streaks
    if (actionType === "devotional") {
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("date, devotional_completed")
        .eq("user_id", userId)
        .eq("devotional_completed", true)
        .order("date", { ascending: false })
        .limit(30);

      if (progressData && progressData.length >= 7) {
        // Check for 7-day streak
        const dates = progressData.map(p => new Date(p.date).getTime());
        let currentStreak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
          const diff = (dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            currentStreak++;
          } else {
            break;
          }
        }

        if (currentStreak >= 7 && !earnedKeys.has("devotional_streak_7")) {
          const { data: achievement } = await supabase
            .from("achievements")
            .select("*")
            .eq("achievement_key", "devotional_streak_7")
            .single();

          if (achievement) {
            await supabase.from("user_achievements").insert({
              user_id: userId,
              achievement_id: achievement.id,
            });
            newAchievements.push(achievement);
          }
        }

        if (currentStreak >= 30 && !earnedKeys.has("devotional_streak_30")) {
          const { data: achievement } = await supabase
            .from("achievements")
            .select("*")
            .eq("achievement_key", "devotional_streak_30")
            .single();

          if (achievement) {
            await supabase.from("user_achievements").insert({
              user_id: userId,
              achievement_id: achievement.id,
            });
            newAchievements.push(achievement);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        newAchievements,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error checking achievements:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "An error occurred while checking achievements",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
