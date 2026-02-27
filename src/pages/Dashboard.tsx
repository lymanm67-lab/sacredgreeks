import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, User, BarChart3, GraduationCap, Trophy, Users, Bot, Compass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/sacred-greeks-logo.png';
import { Onboarding } from '@/components/Onboarding';
import { useOnboarding } from '@/hooks/use-onboarding';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { SEOHead, pageSEO } from '@/components/SEOHead';
// FeaturedActions removed — Start Here Guide covers the same actions
import { HeroSection } from '@/components/dashboard/HeroSection';
import { OrgWelcomeCard } from '@/components/dashboard/OrgWelcomeCard';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';
import { GreekCommunitySection } from '@/components/dashboard/GreekCommunitySection';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { prefetchCommonRoutes } from '@/hooks/use-prefetch';
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications';
import { SkeletonDashboard } from '@/components/ui/SkeletonCard';
import { DashboardAIAssistant } from '@/components/dashboard/DashboardAIAssistant';
import { LearningPathsMap } from '@/components/dashboard/LearningPathsMap';
import { PathCompletionAchievements } from '@/components/dashboard/PathCompletionAchievements';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { QuickLinksSection } from '@/components/dashboard/QuickLinksSection';
import { DashboardAudioGuide } from '@/components/dashboard/DashboardAudioGuide';
import { QuickJump } from '@/components/ui/quick-jump';
import { StartHereFlow, PersonalizedPlan } from '@/components/onboarding/StartHereFlow';
import { useStartHereFlow } from '@/hooks/use-start-here-flow';
import { ProductTour, useProductTour } from '@/components/onboarding/ProductTour';
import { DemoPageBadge } from '@/components/demo/DemoPageBadge';
import { StartHereGuide } from '@/components/dashboard/StartHereGuide';

interface DashboardStats {
  assessmentCount: number;
  prayerCount: number;
  devotionalCompleted: boolean;
  currentStreak: number;
}

const DEMO_STATS: DashboardStats = {
  assessmentCount: 2,
  prayerCount: 5,
  devotionalCompleted: true,
  currentStreak: 3,
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isDemoMode } = useDemoMode();
  const { showOnboarding, completeOnboarding, isChecking } = useOnboarding();
  const { showStartHere, completeStartHere, skipStartHere } = useStartHereFlow();
  const { showTour, completeTour, skipTour } = useProductTour();
  const [stats, setStats] = useState<DashboardStats>({
    assessmentCount: 0,
    prayerCount: 0,
    devotionalCompleted: false,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isDemoStats, setIsDemoStats] = useState(false);

  // Check if user has started exploring (any Start Here steps completed)
  const [hasProgress, setHasProgress] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sacred_greeks_start_guide');
      if (stored) {
        const data = JSON.parse(stored);
        setHasProgress((data.completed || []).length > 0);
      }
    } catch { /* ignore */ }
    // Also listen for storage changes so it updates when user completes a step and returns
    const handler = () => {
      try {
        const stored = localStorage.getItem('sacred_greeks_start_guide');
        if (stored) {
          const data = JSON.parse(stored);
          setHasProgress((data.completed || []).length > 0);
        }
      } catch { /* ignore */ }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useKeyboardShortcuts();
  useRealtimeNotifications({ showToasts: !isDemoMode });

  useEffect(() => {
    prefetchCommonRoutes();
  }, []);

  const handleStartHereComplete = (plan: PersonalizedPlan) => {
    completeStartHere();
    // Navigate to first day's action
    if (plan.days.length > 0) {
      navigate(plan.days[0].actionRoute);
    }
  };

  const handleRefresh = useCallback(async () => {
    await loadDashboardData();
    toast({
      title: 'Dashboard refreshed',
      description: 'Your data has been updated',
    });
  }, [toast]);

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh,
    enabled: !isChecking && !showOnboarding
  });

  useEffect(() => {
    loadDashboardData();
  }, [user, isDemoMode]);

  const loadDashboardData = async () => {
    // In demo mode, always show demo stats regardless of auth state
    if (isDemoMode) {
      setStats(DEMO_STATS);
      setIsDemoStats(true);
      setLoading(false);
      return;
    }

    // If not in demo mode and no user, set loading to false
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];

      const { count: assessmentCount } = await supabase
        .from('assessment_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: prayerCount } = await supabase
        .from('prayer_journal')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('devotional_completed')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

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

      const actualStats = {
        assessmentCount: assessmentCount || 0,
        prayerCount: prayerCount || 0,
        devotionalCompleted: progressData?.devotional_completed || false,
        currentStreak: streak,
      };
      
      // Only show demo stats for truly new users with *zero* history.
      // (Previously, we treated "no activity today" as "no activity at all",
      // which could incorrectly force demo stats for returning users.)
      const hasNoHistory =
        (assessmentCount || 0) === 0 &&
        (prayerCount || 0) === 0 &&
        (!progressHistory || progressHistory.length === 0);

      if (hasNoHistory) {
        setStats(DEMO_STATS);
        setIsDemoStats(true);
      } else {
        setStats(actualStats);
        setIsDemoStats(false);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Pull down to refresh.',
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
      <div className="min-h-screen bg-muted/30 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <SkeletonDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 w-full overflow-x-hidden">
      <SEOHead {...pageSEO.dashboard} />
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      
      {/* Header - Desktop only since AppLayout handles mobile nav */}
      <header className="border-b border-border bg-background sticky top-0 z-50 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <SubscriptionBadge />
              <DashboardAudioGuide />
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Profile</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-8 overflow-x-hidden">
        <div className="max-w-5xl mx-auto space-y-8 w-full overflow-hidden">
          {/* Quick Jump Navigation - hidden for brand new users */}
          {hasProgress && (
            <QuickJump 
              sections={[
                { id: 'start-here-guide', label: 'Start Here', icon: <Compass className="w-3 h-3" /> },
                { id: 'stats-section', label: 'Your Progress', icon: <BarChart3 className="w-3 h-3" /> },
                { id: 'learning-paths', label: 'Learning Paths', icon: <GraduationCap className="w-3 h-3" /> },
                { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-3 h-3" /> },
                { id: 'community', label: 'Community', icon: <Users className="w-3 h-3" /> },
                { id: 'ai-assistant', label: 'The Berean', icon: <Bot className="w-3 h-3" /> },
                { id: 'quick-links', label: 'Explore More', icon: <Compass className="w-3 h-3" /> },
              ]}
              title="Jump to Section"
              defaultOpen={false}
            />
          )}

          <DemoPageBadge pageKey="dashboard" className="justify-center" />

          {/* 1. Hero Section - Welcome & Introduction */}
          <div className="animate-fade-in">
            <HeroSection />
          </div>

          {/* 2. Organization Welcome Card - Context */}
          <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <OrgWelcomeCard />
          </div>

          {/* 3. Start Here Guide - Primary onboarding for new/conference users */}
          <div id="start-here-guide" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <StartHereGuide />
          </div>

          {/* 4. Stats Section - Your Progress */}
          <div id="stats-section" className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <StatsSection stats={stats} isDemoStats={isDemoStats} />
          </div>

          {/* 5-8: Progressive sections - only shown after user has explored at least 1 Start Here step */}
          {hasProgress && (
            <>
              {/* 5. Learning Paths Map */}
              <div id="learning-paths" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <LearningPathsMap />
              </div>

              {/* 6. Path Completion Achievements */}
              <div id="achievements" className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <PathCompletionAchievements />
              </div>

              {/* 7. Greek Community Section */}
              <div id="community" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <GreekCommunitySection />
              </div>

              {/* 8. AI Assistant */}
              <div id="ai-assistant" className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
                <DashboardAIAssistant />
              </div>

              {/* 9. Quick Links - Explore More */}
              <div id="quick-links" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <QuickLinksSection />
              </div>
            </>
          )}
        </div>
      </main>

      {showOnboarding && <Onboarding open={showOnboarding} onComplete={completeOnboarding} />}
      
      {/* Start Here guided flow - only if onboarding is done AND no Start Here Guide visible */}
      {!showOnboarding && showStartHere && (
        <StartHereFlow 
          open={showStartHere} 
          onComplete={handleStartHereComplete}
          onSkip={skipStartHere}
        />
      )}

      {/* Product Tour - skip if Start Here Guide is present (avoids modal overload) */}
    </div>
  );
};

export default Dashboard;
