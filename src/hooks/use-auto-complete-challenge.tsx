import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useGamification } from './use-gamification';
import { useCelebration } from '@/contexts/CelebrationContext';

export const useAutoCompleteChallenge = () => {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const { celebrate } = useCelebration();

  const completeChallenge = async (challengeType: string) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      // Find today's challenge for this type
      const { data: challenges, error: challengeError } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('date', today)
        .ilike('challenge_type', `%${challengeType}%`);

      if (challengeError) throw challengeError;
      if (!challenges || challenges.length === 0) return;

      const challenge = challenges[0];

      // Get current check-in
      const { data: checkIn, error: checkInError } = await supabase
        .from('user_daily_check_ins')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (checkInError && checkInError.code !== 'PGRST116') throw checkInError;

      const completedChallenges = Array.isArray(checkIn?.challenges_completed)
        ? checkIn.challenges_completed
        : [];

      // Check if already completed
      if (completedChallenges.includes(challenge.id)) {
        return; // Already completed
      }

      // Update check-in with completed challenge
      const { error: updateError } = await supabase
        .from('user_daily_check_ins')
        .upsert(
          {
            user_id: user.id,
            date: today,
            challenges_completed: [...completedChallenges, challenge.id],
          },
          {
            onConflict: 'user_id,date',
          }
        );

      if (updateError) throw updateError;

      // Award points
      await awardPoints({
        points: challenge.points_reward,
        actionType: 'daily_challenge',
      });

      // Trigger celebration animation
      celebrate({
        points: challenge.points_reward,
        title: challenge.title,
      });
    } catch (error) {
      console.error('Error auto-completing challenge:', error);
      // Silently fail - don't disrupt user experience
    }
  };

  return { completeChallenge };
};
