import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, BookOpen, Check, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SocialShareDialog } from '@/components/SocialShareDialog';
import { AchievementBadgeDialog } from '@/components/AchievementBadgeDialog';
import { useGamification } from '@/hooks/use-gamification';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';

interface Devotional {
  id: string;
  date: string;
  title: string;
  scripture_ref: string;
  scripture_text: string;
  reflection: string;
  proof_focus: string;
  application: string;
  prayer: string;
}

const Devotional = () => {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const { toast } = useToast();

  // Pull to refresh
  const handleRefresh = async () => {
    await loadDevotional();
    toast({
      title: 'Devotional refreshed',
      description: 'Latest content loaded',
    });
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  useEffect(() => {
    loadDevotional();
  }, []);

  const loadDevotional = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_devotionals')
        .select('*')
        .eq('date', today)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setDevotional(data);
      }

      // Check if user completed today's devotional
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('devotional_completed, devotional_notes')
          .eq('user_id', user.id)
          .eq('date', today)
          .maybeSingle();

        if (progressData?.devotional_completed) {
          setCompleted(true);
        }
        if (progressData?.devotional_notes) {
          setNotes(progressData.devotional_notes);
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load today\'s devotional',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          date: today,
          devotional_completed: true,
          devotional_notes: notes,
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;

      setCompleted(true);

      // Award points and check achievements
      awardPoints({ points: 10, actionType: 'devotional' });

      // Check for achievements via edge function
      await supabase.functions.invoke('check-achievements', {
        body: { userId: user.id, actionType: 'devotional' }
      });

      toast({
        title: 'Devotional completed!',
        description: 'Keep up your daily spiritual discipline.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark devotional as complete',
        variant: 'destructive',
      });
    }
  };

  const saveNotes = async () => {
    if (!user) return;

    setSavingNotes(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          date: today,
          devotional_notes: notes,
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;

      toast({
        title: 'Notes saved',
        description: 'Your reflection notes have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    } finally {
      setSavingNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading devotional...</p>
        </div>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">No Devotional Today</h1>
          <p className="text-muted-foreground">Check back tomorrow for a new reflection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
              <BookOpen className="w-8 h-8 text-sacred" />
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(devotional.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <h1 className="text-4xl font-bold">{devotional.title}</h1>
            <p className="text-xl text-sacred font-medium">
              P.R.O.O.F. Focus: {devotional.proof_focus}
            </p>
          </div>

          {/* Scripture */}
          <Card className="border-2 border-sacred/20">
            <CardHeader>
              <CardTitle className="text-lg">{devotional.scripture_ref}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed italic">{devotional.scripture_text}</p>
            </CardContent>
          </Card>

          {/* Reflection */}
          <Card>
            <CardHeader>
              <CardTitle>Reflection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{devotional.reflection}</p>
            </CardContent>
          </Card>

          {/* Application */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{devotional.application}</p>
            </CardContent>
          </Card>

          {/* Prayer */}
          <Card className="bg-sacred/5 border-sacred/20">
            <CardHeader>
              <CardTitle>Prayer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed italic">{devotional.prayer}</p>
            </CardContent>
          </Card>

          {/* Personal Notes */}
          {user && (
            <Card className="border-2 border-warm-blue/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-warm-blue" />
                  <CardTitle>My Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="devotional-notes" className="text-sm text-muted-foreground">
                    Write your personal reflections, prayers, or insights from today&apos;s devotional
                  </Label>
                  <Textarea
                    id="devotional-notes"
                    placeholder="What is God speaking to you today? How will you apply this to your life?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="mt-2 resize-none"
                  />
                </div>
                <Button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions Row */}
          {user && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={markComplete}
                disabled={completed}
                className="bg-sacred hover:bg-sacred/90"
                size="lg"
              >
                {completed ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
              
              {completed && devotional && (
                <>
                  <SocialShareDialog
                    title={`Today's Devotional: ${devotional.title}`}
                    description={`Just completed today's devotional on ${devotional.proof_focus}. Growing in faith daily! 📖✨`}
                    hashtags={["SacredGreeks", "Devotional", "Faith", "DailyBread"]}
                    trigger={
                      <Button variant="outline" size="lg">
                        Share Devotional
                      </Button>
                    }
                  />
                  <AchievementBadgeDialog
                    type="devotional"
                    title={devotional.title}
                    subtitle="Daily Devotional"
                    completionDate={new Date().toLocaleDateString()}
                    trigger={
                      <Button variant="outline" size="lg">
                        Get Badge
                      </Button>
                    }
                  />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Devotional;