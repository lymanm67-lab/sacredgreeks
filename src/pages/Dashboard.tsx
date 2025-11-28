import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, MessageSquare, TrendingUp, LogOut, FileText, Calendar, User, Bookmark, Book, Clock, Lightbulb, Library, MessageCircle, Users, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CompactQuickAction } from '@/components/dashboard/CompactQuickAction';
import { VideoSection } from '@/components/dashboard/VideoSection';
import { VideoTrainingLibrary } from '@/components/dashboard/VideoTrainingLibrary';
import { CommunityServiceChecklist } from '@/components/dashboard/CommunityServiceChecklist';
import { ChapterMeetingNotes } from '@/components/dashboard/ChapterMeetingNotes';
import { ResourcesSection } from '@/components/dashboard/ResourcesSection';
import { ChapterResourcesSection } from '@/components/dashboard/ChapterResourcesSection';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { Onboarding } from '@/components/Onboarding';
import { useOnboarding } from '@/hooks/use-onboarding';
import { MobileQRCode } from '@/components/MobileQRCode';
import { StudyGuideWidget } from '@/components/dashboard/StudyGuideWidget';
import { StudyRecommendations } from '@/components/StudyRecommendations';
import { GamificationBar } from '@/components/GamificationBar';
import { useFavorites } from '@/hooks/use-favorites';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { DailyChallengesWidget } from '@/components/dashboard/DailyChallengesWidget';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { VerseOfTheDay } from '@/components/dashboard/VerseOfTheDay';
import { QuickCheckIn } from '@/components/dashboard/QuickCheckIn';
import { WeeklyInsights } from '@/components/dashboard/WeeklyInsights';
import { FeaturedActions } from '@/components/dashboard/FeaturedActions';
import { GettingStartedChecklist } from '@/components/dashboard/GettingStartedChecklist';
import { SocialShareDialog } from '@/components/SocialShareDialog';
import { SocialMediaConnect } from '@/components/SocialMediaConnect';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { CategorySection } from '@/components/dashboard/CategorySection';
import { ShareAppCard } from '@/components/dashboard/ShareAppCard';
import { ReferralCard } from '@/components/dashboard/ReferralCard';
import { FeaturedArticle } from '@/components/dashboard/FeaturedArticle';
import { RecentlyViewed } from '@/components/dashboard/RecentlyViewed';

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
  const { toggleFavorite, isFavorite } = useFavorites();
  const [stats, setStats] = useState<DashboardStats>({
    assessmentCount: 0,
    prayerCount: 0,
    devotionalCompleted: false,
    currentStreak: 0,
  });
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pull to refresh
  const handleRefresh = async () => {
    await loadDashboardData();
    toast({
      title: 'Dashboard refreshed',
      description: 'Your data has been updated',
    });
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh,
    enabled: !isChecking && !showOnboarding
  });

  // Scroll animation hooks for mobile sections
  const heroScroll = useScrollAnimation({ triggerOnce: true });
  const featuredScroll = useScrollAnimation({ triggerOnce: true });
  const verseScroll = useScrollAnimation({ triggerOnce: true });
  const checklistScroll = useScrollAnimation({ triggerOnce: true });
  const statsScroll = useScrollAnimation({ triggerOnce: true });
  const checkInScroll = useScrollAnimation({ triggerOnce: true });
  const challengesScroll = useScrollAnimation({ triggerOnce: true });
  const studyScroll = useScrollAnimation({ triggerOnce: true });

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

  // Define quick actions with distinct, vibrant colors
  const quickActions = [
    {
      id: '30-day-journey',
      title: '30-Day Journey',
      description: 'Daily readings through P.R.O.O.F. framework',
      icon: Calendar,
      href: '/journey',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-sacred to-warm-blue',
    },
    {
      id: 'myth-buster',
      title: 'Myth Buster',
      description: 'Biblical responses to common accusations',
      icon: BookOpen,
      href: '/myth-buster',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    },
    {
      id: 'symbol-guide',
      title: 'Symbol Guide',
      description: 'Christian perspectives on Greek symbolism',
      icon: Lightbulb,
      href: '/symbol-guide',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
      id: 'ask-dr-lyman',
      title: 'Ask Dr. Lyman',
      description: 'Submit questions, get curated answers',
      icon: MessageSquare,
      href: '/ask-dr-lyman',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
    },
    {
      id: 'content-hub',
      title: 'Content Hub',
      description: 'Podcasts, videos, and study guides',
      icon: Play,
      href: '/content-hub',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    {
      id: 'new-assessment',
      title: 'New Assessment',
      description: 'Discover your 5 Persona Types Architecture',
      icon: Heart,
      href: 'https://drlymanmontgomery.involve.me/fmmpa',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
      isExternal: true,
      useModal: true,
    },
    {
      id: 'bglo-objections',
      title: 'Handle Objections',
      description: 'Navigate BGLO challenges with PROOF',
      icon: MessageCircle,
      href: '/guide',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    },
    {
      id: 'family-fallout',
      title: 'Family & Ministry Fallout',
      description: 'Navigate damaged relationships & rebuild trust',
      icon: Users,
      href: '/family-ministry-fallout',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
      id: 'daily-devotional',
      title: 'Daily Devotional',
      description: 'Read today\'s reflection and scripture',
      icon: BookOpen,
      href: '/devotional',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      id: 'prayer-journal',
      title: 'Prayer Journal',
      description: 'Track your prayers and answered requests',
      icon: MessageSquare,
      href: '/prayer-journal',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    },
    {
      id: 'prayer-guide',
      title: 'Prayer Guide',
      description: 'AI prayers, templates & learning',
      icon: Heart,
      href: '/prayer-guide',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      id: 'prayer-wall',
      title: 'Prayer Wall',
      description: 'Share and support community prayer requests',
      icon: Heart,
      href: '/prayer-wall',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
    },
    {
      id: 'bible-study',
      title: 'Bible Study',
      description: 'Search Scripture and explore reading plans',
      icon: Book,
      href: '/bible-study',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      id: 'bookmarks',
      title: 'Bookmarks',
      description: 'Access your saved resources',
      icon: Bookmark,
      href: '/bookmarks',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
      id: 'service-hours',
      title: 'Service Hours',
      description: 'Track community service activities',
      icon: Clock,
      href: '/service-tracker',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    },
    {
      id: 'assessment-history',
      title: 'My Assessments',
      description: 'View your past assessment results',
      icon: FileText,
      href: '/assessment-history',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-slate-500 to-gray-600',
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'View your progress and unlocked badges',
      icon: TrendingUp,
      href: '/achievements',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    },
    {
      id: 'did-you-know',
      title: 'Did You Know?',
      description: 'Discover Christian practices with pagan roots and educational videos',
      icon: Lightbulb,
      href: '/did-you-know',
      iconColor: 'text-white',
      iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
    },
  ];

  // Sort actions: favorites first, then the rest
  const sortedActions = [...quickActions].sort((a, b) => {
    const aFav = isFavorite(a.id) ? 1 : 0;
    const bFav = isFavorite(b.id) ? 1 : 0;
    return bFav - aFav;
  });

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
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
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
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section - Full Width */}
          <div ref={heroScroll.ref} className={`scroll-animate ${heroScroll.isVisible ? 'visible' : ''} animate-fade-in`}>
            <HeroSection />
          </div>

          {/* Featured Actions - Prominent */}
          <div ref={featuredScroll.ref} className={`scroll-animate ${featuredScroll.isVisible ? 'visible' : ''} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
            <FeaturedActions />
          </div>

          {/* Verse of the Day */}
          <div ref={verseScroll.ref} className={`scroll-animate ${verseScroll.isVisible ? 'visible' : ''} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <VerseOfTheDay />
          </div>

          {/* Featured Article */}
          <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <FeaturedArticle />
          </div>

          {/* Recently Viewed */}
          <div className="animate-fade-in" style={{ animationDelay: '0.27s' }}>
            <RecentlyViewed />
          </div>

          {/* Share App Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ShareAppCard />
          </div>

          {/* Referral Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
            <ReferralCard />
          </div>

          {/* Two Column: Getting Started + Gamification */}
          <div ref={checklistScroll.ref} className={`scroll-animate ${checklistScroll.isVisible ? 'visible' : ''} grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in`} style={{ animationDelay: '0.3s' }}>
            <div className="lg:col-span-2">
              <GettingStartedChecklist />
            </div>
            <div>
              <GamificationBar />
            </div>
          </div>

          {/* Key Stats - Reduced to 3 most motivating */}
          <div ref={statsScroll.ref} className={`scroll-animate ${statsScroll.isVisible ? 'visible' : ''} grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-fr animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <StatsCard
              title="Current Streak"
              value={stats.currentStreak}
              subtitle="Days in a row"
              icon={TrendingUp}
              gradient="from-status-low to-warm-blue"
              delay="0s"
            />
            <StatsCard
              title="Assessments"
              value={stats.assessmentCount}
              subtitle="Total completed"
              icon={FileText}
              gradient="from-sacred to-warm-blue"
              delay="0.1s"
            />
            <StatsCard
              title="Today's Devotional"
              value={stats.devotionalCompleted ? '✓' : '○'}
              subtitle={stats.devotionalCompleted ? 'Completed today' : 'Not yet completed'}
              icon={BookOpen}
              gradient="from-sacred to-secondary"
              delay="0.2s"
            />
          </div>

          {/* Quick Check In */}
          <div ref={checkInScroll.ref} className={`scroll-animate ${checkInScroll.isVisible ? 'visible' : ''} animate-fade-in`} style={{ animationDelay: '0.5s' }}>
            <QuickCheckIn />
          </div>

          {/* Daily Challenges */}
          <div ref={challengesScroll.ref} className={`scroll-animate ${challengesScroll.isVisible ? 'visible' : ''} animate-fade-in`} style={{ animationDelay: '0.6s' }}>
            <DailyChallengesWidget />
          </div>

          {/* Share Progress */}
          <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.65s' }}>
            <SocialShareDialog
              title="Join me on Sacred Greeks!"
              description="I'm growing in my faith with the Sacred Greeks app. Join me on this journey of spiritual growth and brotherhood!"
              hashtags={["SacredGreeks", "FaithJourney", "Brotherhood"]}
            />
          </div>

          {/* Study Recommendations */}
          <div ref={studyScroll.ref} className={`scroll-animate ${studyScroll.isVisible ? 'visible' : ''} animate-fade-in`} style={{ animationDelay: '0.7s' }}>
            <StudyRecommendations />
          </div>

          {/* Category Sections */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.75s' }}>
            <h2 className="text-2xl font-bold">Explore by Category</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <CategorySection
                title="Daily Spiritual Tools"
                description="Build your daily practice"
                icon={BookOpen}
                categoryId="daily-spiritual"
                gradient="from-blue-500 to-indigo-600"
                actions={[
                  {
                    id: 'devotional',
                    title: 'Daily Devotional',
                    description: 'Today\'s reflection',
                    icon: BookOpen,
                    href: '/devotional',
                  },
                  {
                    id: 'bible-study',
                    title: 'Bible Study',
                    description: 'Search & explore',
                    icon: Book,
                    href: '/bible-study',
                  },
                  {
                    id: 'prayer-journal',
                    title: 'Prayer Journal',
                    description: 'Track your prayers',
                    icon: MessageSquare,
                    href: '/prayer-journal',
                  },
                  {
                    id: 'prayer-guide',
                    title: 'Prayer Guide',
                    description: 'AI prayers & templates',
                    icon: Heart,
                    href: '/prayer-guide',
                  },
                ]}
              />

              <CategorySection
                title="Community Features"
                description="Connect & serve together"
                icon={Heart}
                categoryId="community"
                gradient="from-purple-500 to-violet-600"
                actions={[
                  {
                    id: 'prayer-wall',
                    title: 'Prayer Wall',
                    description: 'Share & support',
                    icon: Heart,
                    href: '/prayer-wall',
                  },
                  {
                    id: 'service-hours',
                    title: 'Service Tracker',
                    description: 'Track service hours',
                    icon: Clock,
                    href: '/service-tracker',
                  },
                  {
                    id: 'bglo-guide',
                    title: 'BGLO Objections',
                    description: 'Handle challenges',
                    icon: MessageCircle,
                    href: '/guide',
                  },
                ]}
              />

              <CategorySection
                title="Personal Growth"
                description="Track your journey"
                icon={TrendingUp}
                categoryId="personal-growth"
                gradient="from-rose-500 to-pink-600"
                actions={[
                  {
                    id: 'progress',
                    title: 'Progress',
                    description: 'View your growth',
                    icon: TrendingUp,
                    href: '/progress',
                  },
                  {
                    id: 'achievements',
                    title: 'Achievements',
                    description: 'Unlock badges',
                    icon: TrendingUp,
                    href: '/achievements',
                  },
                  {
                    id: 'bookmarks',
                    title: 'Bookmarks',
                    description: 'Saved resources',
                    icon: Bookmark,
                    href: '/bookmarks',
                  },
                ]}
              />
            </div>
          </div>

          {/* More Quick Actions - Compact Grid */}
          <Collapsible defaultOpen={false}>
            <div className="space-y-4">
              <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors group w-full">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  More Actions
                </span>
                <ChevronDown className="w-5 h-5 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4">
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {sortedActions.map((action, index) => 
                    action.useModal ? (
                      <ExternalContentModal
                        key={action.id}
                        url={action.href}
                        title={action.title}
                        description={action.description}
                        trigger={
                          <div>
                            <CompactQuickAction
                              id={action.id}
                              title={action.title}
                              description={action.description}
                              icon={action.icon}
                              href={action.href}
                              iconColor={action.iconColor}
                              iconBg={action.iconBg}
                              delay={`${(index + 1) * 0.1}s`}
                              isFavorite={isFavorite(action.id)}
                              onToggleFavorite={toggleFavorite}
                            />
                          </div>
                        }
                      />
                    ) : (
                      <CompactQuickAction
                        key={action.id}
                        id={action.id}
                        title={action.title}
                        description={action.description}
                        icon={action.icon}
                        href={action.href}
                        iconColor={action.iconColor}
                        iconBg={action.iconBg}
                        delay={`${(index + 1) * 0.1}s`}
                        isFavorite={isFavorite(action.id)}
                        onToggleFavorite={toggleFavorite}
                        isExternal={action.isExternal}
                      />
                    )
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Progress Link */}
          <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
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

          {/* Collapsible Resources & Study */}
          <Collapsible defaultOpen={false}>
            <div className="space-y-6">
              <CollapsibleTrigger className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors group w-full">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Resources, Study & Community
                </span>
                <ChevronDown className="w-5 h-5 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 pt-2">
                <StudyGuideWidget />
                <SocialMediaConnect />
                <ResourcesSection />
                <ChapterResourcesSection />
                <VideoSection />
                <VideoTrainingLibrary />
                <WeeklyInsights />
                <div className="grid gap-6 lg:grid-cols-2">
                  <CommunityServiceChecklist />
                  <ChapterMeetingNotes />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

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
