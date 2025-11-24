import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, BookOpen, Heart, Calendar, TrendingUp, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssessmentHistory {
  id: string;
  scenario: string;
  result_type: string;
  created_at: string;
}

interface TodaysDevotional {
  id: string;
  title: string;
  scripture_ref: string;
  proof_focus: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentHistory[]>([]);
  const [devotional, setDevotional] = useState<TodaysDevotional | null>(null);
  const [prayerCount, setPrayerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Load recent assessments
      const { data: assessmentsData } = await supabase
        .from('assessment_submissions')
        .select('id, scenario, result_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (assessmentsData) setAssessments(assessmentsData);

      // Load today's devotional
      const { data: devotionalData } = await supabase
        .from('daily_devotionals')
        .select('id, title, scripture_ref, proof_focus')
        .eq('date', new Date().toISOString().split('T')[0])
        .maybeSingle();

      if (devotionalData) setDevotional(devotionalData);

      // Load prayer journal count
      const { count } = await supabase
        .from('prayer_journal')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (count) setPrayerCount(count);
    } catch (error) {
      console.error('Error loading dashboard:', error);
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

  const getScenarioLabel = (scenario: string) => {
    const labels: Record<string, string> = {
      clip: 'Clip/Sermon',
      pressure: 'Pressure',
      event: 'Event Planning'
    };
    return labels[scenario] || scenario;
  };

  const getResultLabel = (resultType: string) => {
    const labels: Record<string, string> = {
      steady_language: 'Steady Language',
      high_pressure: 'High Pressure',
      ministry_idea: 'Ministry Idea'
    };
    return labels[resultType] || resultType;
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
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">{user?.email}</span>
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
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p className="text-xl text-muted-foreground">Continue your spiritual journey</p>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/guide">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>New Assessment</CardTitle>
                  <CardDescription>Process a new decision or situation</CardDescription>
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
                  <CardDescription>
                    {devotional ? devotional.title : 'Read today\'s reflection'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/prayer-journal">
              <Card className="h-full hover:shadow-lg hover:border-sacred/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6 text-sacred" />
                  </div>
                  <CardTitle>Prayer Journal</CardTitle>
                  <CardDescription>
                    {prayerCount} {prayerCount === 1 ? 'prayer' : 'prayers'} recorded
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Recent Assessments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Your latest decision guides</CardDescription>
                </div>
                <TrendingUp className="w-5 h-5 text-sacred" />
              </div>
            </CardHeader>
            <CardContent>
              {assessments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No assessments yet. <Link to="/guide" className="text-sacred hover:underline">Take your first one!</Link>
                </p>
              ) : (
                <div className="space-y-3">
                  {assessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{getScenarioLabel(assessment.scenario)}</p>
                        <p className="text-sm text-muted-foreground">
                          Result: {getResultLabel(assessment.result_type)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(assessment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;