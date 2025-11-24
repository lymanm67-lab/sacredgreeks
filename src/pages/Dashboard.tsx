import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, MessageSquare, TrendingUp, LogOut, FileText, Calendar, User, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { VideoSection } from '@/components/dashboard/VideoSection';
import { CommunityServiceChecklist } from '@/components/dashboard/CommunityServiceChecklist';
import { ChapterMeetingNotes } from '@/components/dashboard/ChapterMeetingNotes';

interface DashboardStats {
  assessmentCount: number;
  prayerCount: number;
  devotionalCompleted: boolean;
  currentStreak: number;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Heart className="w-5 h-5 text-sacred" />
                <span className="font-semibold">Sacred Greeks</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-xl text-muted-foreground">Continue your spiritual journey</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Assessments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.assessmentCount}</div>
                <p className="text-xs text-muted-foreground">
                  Total completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Prayers</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.prayerCount}</div>
                <p className="text-xs text-muted-foreground">
                  In your journal
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Today's Devotional</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.devotionalCompleted ? '✓' : '○'}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.devotionalCompleted ? 'Completed today' : 'Not yet completed'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">
                  Days in a row
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-4">
            <Link to="/guide">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>New Assessment</CardTitle>
                  <p className="text-sm text-muted-foreground">Process a new decision</p>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/devotional">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>Daily Devotional</CardTitle>
                  <p className="text-sm text-muted-foreground">Today's reflection</p>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/prayer-journal">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <MessageSquare className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>Prayer Journal</CardTitle>
                  <p className="text-sm text-muted-foreground">Track your prayers</p>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/bookmarks">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <Bookmark className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>Bookmarks</CardTitle>
                  <p className="text-sm text-muted-foreground">Saved items</p>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Videos Section */}
          <VideoSection />

          {/* Community Service Checklist */}
          <CommunityServiceChecklist />

          {/* Chapter Meeting Notes */}
          <ChapterMeetingNotes />

          {/* Recent Assessments */}
          {recentAssessments.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Assessments</CardTitle>
                  <Link to="/assessment-history">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium capitalize">
                            {assessment.scenario.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(assessment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
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
    </div>
  );
};

export default Dashboard;
