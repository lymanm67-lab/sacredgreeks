import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, LogOut, FileText, User, BookOpen, FlaskConical, Calendar, Menu, Home, Heart, MessageSquare } from 'lucide-react';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/sacred-greeks-logo.png';
import { Onboarding } from '@/components/Onboarding';
import { useOnboarding } from '@/hooks/use-onboarding';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { SEOHead, pageSEO } from '@/components/SEOHead';
import { FeaturedActions } from '@/components/dashboard/FeaturedActions';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { OrgWelcomeCard } from '@/components/dashboard/OrgWelcomeCard';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { prefetchCommonRoutes } from '@/hooks/use-prefetch';
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications';

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
  const { isDemoMode } = useDemoMode();
  const { showOnboarding, completeOnboarding, isChecking } = useOnboarding();
  const [stats, setStats] = useState<DashboardStats>({
    assessmentCount: 0,
    prayerCount: 0,
    devotionalCompleted: false,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isDemoStats, setIsDemoStats] = useState(false);

  useKeyboardShortcuts();
  useRealtimeNotifications({ showToasts: !isDemoMode });

  useEffect(() => {
    prefetchCommonRoutes();
  }, []);

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
    if (user) {
      loadDashboardData();
    }
  }, [user, isDemoMode]);

  const loadDashboardData = async () => {
    if (!user) return;

    if (isDemoMode) {
      setStats(DEMO_STATS);
      setIsDemoStats(true);
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
      
      const hasNoActivity = 
        (assessmentCount || 0) === 0 && 
        (prayerCount || 0) === 0 && 
        !progressData?.devotional_completed &&
        streak === 0;
      
      if (hasNoActivity) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <SEOHead {...pageSEO.dashboard} />
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="Sacred Greeks" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
              <SubscriptionBadge />
              <DemoModeControl className="hidden lg:block" />
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

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-background">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img src={logo} alt="Sacred Greeks" className="h-6 w-auto" />
                        Menu
                      </div>
                      <DemoModeControl isMobile align="end" />
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    <Link to="/dashboard">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <Home className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/devotional">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <BookOpen className="w-4 h-4" />
                        Daily Devotional
                      </Button>
                    </Link>
                    <Link to="/myth-buster">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <MessageSquare className="w-4 h-4" />
                        Myth Buster
                      </Button>
                    </Link>
                    <Link to="/journey">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <Calendar className="w-4 h-4" />
                        30-Day Journey
                      </Button>
                    </Link>
                    <Link to="/prayer-wall">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <Heart className="w-4 h-4" />
                        Prayer Wall
                      </Button>
                    </Link>
                    
                    <div className="border-t border-border my-4" />
                    
                    <Link to="/profile">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <User className="w-4 h-4" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/progress">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <TrendingUp className="w-4 h-4" />
                        Progress
                      </Button>
                    </Link>
                    
                    <div className="border-t border-border my-4" />
                    
                    <Button variant="outline" className="w-full justify-start gap-3" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section with Welcome & Video */}
          <div className="animate-fade-in">
            <HeroSection />
          </div>

          {/* Organization Welcome Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <OrgWelcomeCard />
          </div>

          {/* Featured Actions - The 3 Core Tools */}
          <FeaturedActions isLoading={loading} />

          {/* Quick Stats */}
          <div className="space-y-3">
            {isDemoStats && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-xs font-medium">Sample Data</span>
                <span>Complete activities to see your real stats</span>
              </div>
            )}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
                      <p className="text-sm text-muted-foreground">{isDemoStats ? "Sample streak" : "Day Streak"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.assessmentCount}</p>
                      <p className="text-sm text-muted-foreground">{isDemoStats ? "Sample count" : "Assessments"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.devotionalCompleted ? '✓' : '○'}</p>
                      <p className="text-sm text-muted-foreground">{isDemoStats ? "Sample status" : stats.devotionalCompleted ? 'Devotional Done' : 'Not Yet'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/journey">
              <Card className="border border-border bg-background hover:border-primary/50 transition-all cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">30-Day Journey</h3>
                      <p className="text-sm text-muted-foreground">Daily readings through P.R.O.O.F. framework</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/progress">
              <Card className="border border-border bg-background hover:border-primary/50 transition-all cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Track Your Growth</h3>
                      <p className="text-sm text-muted-foreground">View charts and insights about your journey</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      {showOnboarding && <Onboarding open={showOnboarding} onComplete={completeOnboarding} />}
    </div>
  );
};

export default Dashboard;
