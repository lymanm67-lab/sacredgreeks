import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, CheckCircle2, Flame, Star, ArrowRight } from 'lucide-react';
import { useGamification } from '@/hooks/use-gamification';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  points_reward: number;
  icon: string;
  requirements_json: any;
  date: string;
  created_at: string;
}

interface CheckIn {
  id: string;
  prayed_today: boolean;
  read_bible: boolean;
  served_others: boolean;
  challenges_completed: any;
  date: string;
  user_id: string;
  grateful_for: string;
  quick_reflection: string;
  created_at: string;
  updated_at: string;
}

export function DailyChallengesWidget() {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadChallenges();
    }
  }, [user]);

  const loadChallenges = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Load today's challenges
      const { data: challengesData, error: challengesError } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('date', today)
        .order('points_reward', { ascending: false });

      if (challengesError) throw challengesError;

      // Load today's check-in
      const { data: checkInData, error: checkInError } = await supabase
        .from('user_daily_check_ins')
        .select('*')
        .eq('user_id', user!.id)
        .eq('date', today)
        .maybeSingle();

      if (checkInError && checkInError.code !== 'PGRST116') throw checkInError;

      setChallenges((challengesData || []) as Challenge[]);
      setCheckIn(checkInData as CheckIn | null);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeChallenge = async (challengeId: string, points: number) => {
    if (!user || !challengeId) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const completedChallenges = Array.isArray(checkIn?.challenges_completed) 
        ? checkIn.challenges_completed 
        : [];

      if (completedChallenges.includes(challengeId)) {
        toast.info('Challenge already completed!');
        return;
      }

      // Update check-in
      const { error } = await supabase
        .from('user_daily_check_ins')
        .upsert({
          user_id: user.id,
          date: today,
          challenges_completed: [...completedChallenges, challengeId],
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;

      // Award points
      awardPoints({ points, actionType: 'daily_challenge' });

      toast.success(`Challenge completed! +${points} points`);
      await loadChallenges();
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast.error('Failed to complete challenge');
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      trophy: Trophy,
      target: Target,
      flame: Flame,
      star: Star,
    };
    return icons[iconName] || Target;
  };

  const isChallengeCompleted = (challengeId: string) => {
    const completed = checkIn?.challenges_completed;
    if (Array.isArray(completed)) {
      return completed.includes(challengeId);
    }
    return false;
  };

  const getChallengeActionLink = (challengeType: string): string | null => {
    const typeMap: Record<string, string> = {
      'prayer': '/prayer-journal',
      'prayer_journal': '/prayer-journal',
      'devotional': '/devotional',
      'bible_reading': '/bible-study',
      'bible_study': '/bible-study',
      'service': '/service-tracker',
      'community_service': '/service-tracker',
      'prayer_wall': '/prayer-wall',
      'check_in': '#check-in',
    };
    return typeMap[challengeType.toLowerCase()] || null;
  };

  const getChallengeActionText = (challengeType: string): string => {
    const textMap: Record<string, string> = {
      'prayer': 'Go to Prayer Journal',
      'prayer_journal': 'Go to Prayer Journal',
      'devotional': 'Read Devotional',
      'bible_reading': 'Go to Bible Study',
      'bible_study': 'Go to Bible Study',
      'service': 'Log Service Hours',
      'community_service': 'Log Service Hours',
      'prayer_wall': 'Visit Prayer Wall',
      'check_in': 'Complete Check-In',
    };
    return textMap[challengeType.toLowerCase()] || 'Start Challenge';
  };

  const completedCount = challenges.filter(c => isChallengeCompleted(c.id)).length;
  const totalPoints = challenges.reduce((sum, c) => 
    isChallengeCompleted(c.id) ? sum + c.points_reward : sum, 0
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading challenges...</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Sign in to track daily challenges and earn rewards!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Challenges
          </CardTitle>
          <Badge variant="secondary">
            {completedCount}/{challenges.length} Complete
          </Badge>
        </div>
        {challenges.length > 0 && (
          <div className="mt-2 space-y-2">
            <Progress value={(completedCount / challenges.length) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {totalPoints} points earned today
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {challenges.length === 0 ? (
          <p className="text-muted-foreground">No challenges available today. Check back tomorrow!</p>
        ) : (
          challenges.map((challenge) => {
            const Icon = getIconComponent(challenge.icon);
            const completed = isChallengeCompleted(challenge.id);

            return (
              <div
                key={challenge.id}
                className={`p-4 rounded-lg border ${
                  completed 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    completed ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      completed ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{challenge.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {challenge.description}
                        </p>
                      </div>
                      {completed ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <Badge variant="outline" className="shrink-0">
                          +{challenge.points_reward}
                        </Badge>
                      )}
                    </div>
                    {!completed && (
                      <div className="mt-3 flex gap-2">
                        {getChallengeActionLink(challenge.challenge_type) && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <Link to={getChallengeActionLink(challenge.challenge_type)!}>
                              {getChallengeActionText(challenge.challenge_type)}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className={getChallengeActionLink(challenge.challenge_type) ? 'flex-1' : 'w-full'}
                          onClick={() => completeChallenge(challenge.id, challenge.points_reward)}
                        >
                          Mark as Done
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}