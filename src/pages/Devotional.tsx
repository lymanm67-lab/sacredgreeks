import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, BookOpen, Check, FileText, FlaskConical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SocialShareDialog } from '@/components/SocialShareDialog';
import { AchievementBadgeDialog } from '@/components/AchievementBadgeDialog';
import { useGamification } from '@/hooks/use-gamification';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { ListenButton } from '@/components/ListenButton';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { OrgDevotionalContent } from '@/components/devotional/OrgDevotionalContent';
import { useDemoMode } from '@/contexts/DemoModeContext';

// Demo devotional data
const DEMO_DEVOTIONAL: Devotional = {
  id: 'demo-devotional',
  date: new Date().toISOString().split('T')[0],
  title: 'Walking in Integrity',
  scripture_ref: 'Proverbs 11:3',
  scripture_text: 'The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.',
  reflection: 'In Greek life, we often talk about the values our organizations were founded upon - integrity, scholarship, service, and brotherhood/sisterhood. Today\'s verse reminds us that integrity isn\'t just a buzzword; it\'s a guiding light that illuminates our path. When we walk with integrity, we don\'t have to worry about remembering which version of ourselves we showed to different people. Our character remains consistent whether we\'re at a chapter meeting, in class, or out with friends.',
  proof_focus: 'Purpose',
  application: 'Today, examine one area of your life where your actions might not align with your stated values. It could be in your academics, your relationships, or your leadership roles. Ask God to reveal any "duplicity" in your heart and commit to taking one concrete step toward greater integrity.',
  prayer: 'Lord, I confess that I sometimes struggle to be the same person in every situation. Help me to walk with such integrity that my character remains consistent. Guide me today to make choices that honor You and reflect the values I claim to hold. Give me courage to be authentic, even when it\'s difficult. In Jesus\' name, Amen.',
};

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

interface UserProfile {
  greek_council: string | null;
  greek_organization: string | null;
}

const Devotional = () => {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const { completeChallenge } = useAutoCompleteChallenge();
  const { isDemoMode } = useDemoMode();
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  // Use demo devotional when demo mode is enabled or no real devotional
  const displayDevotional = isDemoMode ? DEMO_DEVOTIONAL : (devotional || DEMO_DEVOTIONAL);
  const isShowingDemo = isDemoMode || !devotional;

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
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('greek_council, greek_organization')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data) {
      setUserProfile(data);
    }
  };

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

      // Auto-complete devotional challenge
      await completeChallenge('devotional');

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

  // Remove the no devotional fallback since we always show demo data

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
          <BreadcrumbNav items={[
            { label: 'Daily Spiritual Tools', category: 'daily-spiritual' },
            { label: 'Daily Devotional' }
          ]} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
              <BookOpen className="w-8 h-8 text-sacred" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">
                {new Date(displayDevotional.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {isShowingDemo && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                  <FlaskConical className="w-3 h-3 mr-1" />
                  Demo
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold">{displayDevotional.title}</h1>
            <p className="text-xl text-sacred font-medium">
              P.R.O.O.F. Focus: {displayDevotional.proof_focus}
            </p>
            
            {/* Listen to Full Devotional */}
            <div className="pt-4">
              <ListenButton
                text={`${displayDevotional.title}. Scripture: ${displayDevotional.scripture_ref}. ${displayDevotional.scripture_text}. Reflection: ${displayDevotional.reflection}. Today's Application: ${displayDevotional.application}. Prayer: ${displayDevotional.prayer}`}
                itemId={`devotional-${displayDevotional.id}`}
                title={`Daily Devotional: ${displayDevotional.title}`}
                voice="onyx"
                variant="default"
                className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
              />
            </div>
          </div>

          {/* Org-Specific Content */}
          {userProfile?.greek_council && (
            <OrgDevotionalContent 
              councilId={userProfile.greek_council}
              organizationName={userProfile.greek_organization || undefined}
            />
          )}

          {/* Scripture */}
          <Card className="border-2 border-sacred/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{displayDevotional.scripture_ref}</CardTitle>
                <ListenButton
                  text={`${displayDevotional.scripture_ref}. ${displayDevotional.scripture_text}`}
                  itemId={`scripture-${displayDevotional.id}`}
                  title="Scripture"
                  showLabel={false}
                  size="sm"
                  variant="ghost"
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed italic">{displayDevotional.scripture_text}</p>
            </CardContent>
          </Card>

          {/* Reflection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reflection</CardTitle>
                <ListenButton
                  text={displayDevotional.reflection}
                  itemId={`reflection-${displayDevotional.id}`}
                  title="Reflection"
                  showLabel={false}
                  size="sm"
                  variant="ghost"
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{displayDevotional.reflection}</p>
            </CardContent>
          </Card>

          {/* Application */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Application</CardTitle>
                <ListenButton
                  text={displayDevotional.application}
                  itemId={`application-${displayDevotional.id}`}
                  title="Today's Application"
                  showLabel={false}
                  size="sm"
                  variant="ghost"
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{displayDevotional.application}</p>
            </CardContent>
          </Card>

          {/* Prayer */}
          <Card className="bg-sacred/5 border-sacred/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prayer</CardTitle>
                <ListenButton
                  text={displayDevotional.prayer}
                  itemId={`prayer-${displayDevotional.id}`}
                  title="Prayer"
                  showLabel={false}
                  size="sm"
                  variant="ghost"
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed italic">{displayDevotional.prayer}</p>
            </CardContent>
          </Card>

          {/* Personal Notes */}
          {(user || isShowingDemo) && (
            <Card className="border-2 border-warm-blue/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-warm-blue" />
                  <CardTitle>My Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="devotional-notes" className="text-sm text-muted-foreground">
                      {isShowingDemo ? 'Sample notes section - sign in to save your reflections' : 'Write your personal reflections, prayers, or insights from today\'s devotional'}
                    </Label>
                    {!isShowingDemo && (
                      <VoiceInputButton
                        onTranscript={setNotes}
                        existingText={notes}
                        appendMode={true}
                      />
                    )}
                  </div>
                  <Textarea
                    id="devotional-notes"
                    placeholder={isShowingDemo ? "This devotional really challenged me to examine my integrity..." : "What is God speaking to you today? How will you apply this to your life? (or tap the mic to dictate)"}
                    value={isShowingDemo ? "This devotional really challenged me to examine my integrity in my Greek organization. I want to be the same person whether I'm at chapter meetings or out with friends." : notes}
                    onChange={(e) => !isShowingDemo && setNotes(e.target.value)}
                    rows={6}
                    className="mt-2 resize-none"
                    readOnly={isShowingDemo}
                  />
                </div>
                {!isShowingDemo && (
                  <Button
                    onClick={saveNotes}
                    disabled={savingNotes}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {savingNotes ? 'Saving...' : 'Save Notes'}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions Row */}
          {(user || isShowingDemo) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={!isShowingDemo ? markComplete : undefined}
                disabled={completed || isShowingDemo}
                className="bg-sacred hover:bg-sacred/90"
                size="lg"
              >
                {isShowingDemo ? (
                  'Sign in to Track Progress'
                ) : completed ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
              
              {(completed || isShowingDemo) && displayDevotional && (
                <>
                  <SocialShareDialog
                    title={`Today's Devotional: ${displayDevotional.title}`}
                    description={`Just completed today's devotional on ${displayDevotional.proof_focus}. Growing in faith daily! 📖✨`}
                    hashtags={["SacredGreeks", "Devotional", "Faith", "DailyBread"]}
                    trigger={
                      <Button variant="outline" size="lg">
                        Share Devotional
                      </Button>
                    }
                  />
                  <AchievementBadgeDialog
                    type="devotional"
                    title={displayDevotional.title}
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