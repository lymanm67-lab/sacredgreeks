import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, MessageSquare, TrendingUp, LogOut, FileText, Calendar, User, Bookmark, Book, Clock, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { WelcomeVideo } from '@/components/dashboard/WelcomeVideo';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CompactQuickAction } from '@/components/dashboard/CompactQuickAction';
import { VideoSection } from '@/components/dashboard/VideoSection';
import { CommunityServiceChecklist } from '@/components/dashboard/CommunityServiceChecklist';
import { ChapterMeetingNotes } from '@/components/dashboard/ChapterMeetingNotes';
import { ResourcesSection } from '@/components/dashboard/ResourcesSection';
import { ChapterResourcesSection } from '@/components/dashboard/ChapterResourcesSection';
import { Onboarding } from '@/components/Onboarding';
import { useOnboarding } from '@/hooks/use-onboarding';
import { MobileQRCode } from '@/components/MobileQRCode';
import { StudyGuideWidget } from '@/components/dashboard/StudyGuideWidget';
import { StudyRecommendations } from '@/components/StudyRecommendations';
import { GamificationBar } from '@/components/GamificationBar';

interface DashboardStats {
  assessmentCount: number;
  prayerCount: number;
  devotionalCompleted: boolean;
  currentStreak: number;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { showOnboarding, completeOnboarding, isChecking } = useOnboarding();
  const [stats, setStats] = useState<DashboardStats>({
    assessmentCount: 0,
    prayerCount: 0,
    devotionalCompleted: false,
    currentStreak: 0,
  });
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      // Load assessment count
      const { count: assessmentCount } = await supabase
        .from('assessment_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Load prayer count
      const { count: prayerCount } = await supabase
        .from('prayer_journal')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Check today's devotional completion
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('devotional_completed')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      // Load recent assessments
      const { data: assessments } = await supabase
        .from('assessment_submissions')
        .select('id, created_at, scenario, result_type')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // Calculate streak
      const { data: progressHistory } = await supabase
        .from('user_progress')
        .select('date, devotional_completed')
        .eq('user_id', user.id)
        .eq('devotional_completed', true)
        .order('date', { ascending: false })
        .limit(30);

      let streak = 0;
      if (progressHistory && progressHistory.length > 0) {
        const sortedDates = progressHistory.map(p => new Date(p.date));
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedDates.length; i++) {
          const checkDate = new Date(todayDate);
          checkDate.setDate(checkDate.getDate() - i);
          
          const hasEntry = sortedDates.some(d => 
            d.getFullYear() === checkDate.getFullYear() &&
            d.getMonth() === checkDate.getMonth() &&
            d.getDate() === checkDate.getDate()
          );

          if (hasEntry) {
            streak++;
          } else {
            break;
          }
        }
      }

      setStats({
        assessmentCount: assessmentCount || 0,
        prayerCount: prayerCount || 0,
        devotionalCompleted: progressData?.devotional_completed || false,
        currentStreak: streak,
      });
      setRecentAssessments(assessments || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <Heart className="w-5 h-5 text-sacred group-hover:scale-110 transition-transform" />
              <span className="font-semibold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                Sacred Greeks
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <MobileQRCode />
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="hover:bg-sacred/10">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Two-column layout: Video + Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <WelcomeVideo />
            <HeroSection />
          </div>

          {/* Gamification Bar */}
          <GamificationBar />

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Assessments"
              value={stats.assessmentCount}
              subtitle="Total completed"
              icon={FileText}
              gradient="from-sacred to-warm-blue"
              delay="0.1s"
            />
            <StatsCard
              title="Prayers"
              value={stats.prayerCount}
              subtitle="In your journal"
              icon={MessageSquare}
              gradient="from-warm-blue to-accent"
              delay="0.2s"
            />
            <StatsCard
              title="Today's Devotional"
              value={stats.devotionalCompleted ? '✓' : '○'}
              subtitle={stats.devotionalCompleted ? 'Completed today' : 'Not yet completed'}
              icon={BookOpen}
              gradient="from-sacred to-secondary"
              delay="0.3s"
            />
            <StatsCard
              title="Current Streak"
              value={stats.currentStreak}
              subtitle="Days in a row"
              icon={TrendingUp}
              gradient="from-status-low to-warm-blue"
              delay="0.4s"
            />
          </div>

          {/* Study Guide Widget */}
          <div className="mb-8">
            <StudyGuideWidget />
          </div>

          {/* AI Recommendations */}
          <div className="mb-8">
            <StudyRecommendations />
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Quick Actions
            </h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              <CompactQuickAction
                title="New Assessment"
                description="Process a new decision with biblical guidance"
                icon={Heart}
                href="/guide"
                gradient="from-sacred to-warm-blue"
                delay="0.1s"
              />
              <CompactQuickAction
                title="Daily Devotional"
                description="Read today's reflection and scripture"
                icon={BookOpen}
                href="/devotional"
                gradient="from-warm-blue to-accent"
                delay="0.2s"
              />
              <CompactQuickAction
                title="Prayer Journal"
                description="Track your prayers and answered requests"
                icon={MessageSquare}
                href="/prayer-journal"
                gradient="from-sacred to-secondary"
                delay="0.3s"
              />
              <CompactQuickAction
                title="Bible Study"
                description="Search Scripture and explore reading plans"
                icon={Book}
                href="/bible-study"
                gradient="from-accent to-sacred"
                delay="0.4s"
              />
              <CompactQuickAction
                title="Bookmarks"
                description="Access your saved resources"
                icon={Bookmark}
                href="/bookmarks"
                gradient="from-warm-blue to-status-low"
                delay="0.5s"
              />
              <CompactQuickAction
                title="Service Hours"
                description="Track community service activities"
                icon={Clock}
                href="/service-tracker"
                gradient="from-secondary to-accent"
                delay="0.6s"
              />
              <CompactQuickAction
                title="Achievements"
                description="View your progress and unlocked badges"
                icon={TrendingUp}
                href="/achievements"
                gradient="from-accent to-warm-blue"
                delay="0.7s"
              />
              <CompactQuickAction
                title="Did You Know?"
                description="Discover Christian practices with pagan roots and educational videos"
                icon={Lightbulb}
                href="/did-you-know"
                gradient="from-warm-blue to-sacred"
                delay="0.8s"
              />
            </div>
          </div>

          {/* Progress Link */}
          <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Track Your Growth</h3>
                  <p className="text-muted-foreground">
                    View charts and insights about your spiritual journey
                  </p>
                </div>
                <Link to="/progress">
                  <Button variant="outline" className="hover:bg-sacred/10 hover:text-sacred hover:border-sacred">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Essential Resources */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <ResourcesSection />
          </div>

          {/* Chapter Resources */}
          <div className="animate-fade-in" style={{ animationDelay: '0.55s' }}>
            <ChapterResourcesSection />
          </div>

          {/* Videos Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <VideoSection />
          </div>

          {/* Community Service and Notes */}
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <CommunityServiceChecklist />
            <ChapterMeetingNotes />
          </div>

          {/* Recent Assessments */}
          {recentAssessments.length > 0 && (
            <Card className="animate-fade-in border-2 hover:shadow-xl transition-all" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Recent Assessments
                  </CardTitle>
                  <Link to="/assessment-history">
                    <Button variant="outline" size="sm" className="hover:bg-sacred/10 hover:text-sacred hover:border-sacred">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors border border-border/50">
                      <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-sacred to-warm-blue">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {assessment.scenario.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(assessment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        assessment.result_type === 'high_risk' ? 'bg-status-high/10 text-status-high' :
                        assessment.result_type === 'medium_risk' ? 'bg-status-medium/10 text-status-medium' :
                        'bg-status-low/10 text-status-low'
                      }`}>
                        {assessment.result_type.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Onboarding open={showOnboarding && !isChecking} onComplete={completeOnboarding} />
    </div>
  );
};

export default Dashboard;
