import { supabase } from "@/integrations/supabase/client";

type ActionType = "devotional" | "study" | "assessment" | "prayer";

/**
 * Ensures the backend function is called with an explicit Authorization token.
 * This avoids intermittent 401s when the SDK session isn't attached automatically.
 */
export async function invokeCheckAchievements(params: {
  userId: string;
  actionType: ActionType;
}) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.access_token) throw new Error("Missing authentication session");

  return supabase.functions.invoke("check-achievements", {
    body: params,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
}
