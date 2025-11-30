import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, TrendingUp, Calendar, Target, FlaskConical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { useDemoMode } from '@/contexts/DemoModeContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Demo progress data for the last 30 days
const generateDemoProgressData = (): ProgressData[] => {
  const data: ProgressData[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      devotional_completed: Math.random() > 0.3,
      assessments_count: Math.floor(Math.random() * 2),
      journal_entries_count: Math.floor(Math.random() * 3),
    });
  }
  return data;
};

const DEMO_PROGRESS_DATA = generateDemoProgressData();

const DEMO_ASSESSMENTS_BY_TYPE = [
  { name: 'low risk', value: 5 },
  { name: 'medium risk', value: 3 },
  { name: 'high risk', value: 1 },
];

const DEMO_PRAYERS_BY_TYPE = [
  { name: 'Request', value: 8 },
  { name: 'Thanksgiving', value: 5 },
  { name: 'Praise', value: 4 },
  { name: 'Confession', value: 2 },
];

interface ProgressData {
  date: string;
  devotional_completed: boolean;
  assessments_count: number;
  journal_entries_count: number;
}

const Progress = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [assessmentsByType, setAssessmentsByType] = useState<any[]>([]);
  const [prayersByType, setPrayersByType] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadProgressData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Use demo data when demo mode is enabled or no real data
  const displayProgressData = isDemoMode ? DEMO_PROGRESS_DATA : (progressData.length > 0 ? progressData : DEMO_PROGRESS_DATA);
  const displayAssessments = isDemoMode ? DEMO_ASSESSMENTS_BY_TYPE : (assessmentsByType.length > 0 ? assessmentsByType : DEMO_ASSESSMENTS_BY_TYPE);
  const displayPrayers = isDemoMode ? DEMO_PRAYERS_BY_TYPE : (prayersByType.length > 0 ? prayersByType : DEMO_PRAYERS_BY_TYPE);
  const isShowingDemo = isDemoMode || (progressData.length === 0 && assessmentsByType.length === 0 && prayersByType.length === 0);

  const loadProgressData = async () => {
    if (!user) return;

    try {
      // Get last 30 days of progress
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (progress) setProgressData(progress);

      // Get assessment distribution by result type
      const { data: assessments } = await supabase
        .from('assessment_submissions')
        .select('result_type')
        .eq('user_id', user.id);

      if (assessments) {
        const distribution = assessments.reduce((acc: any, curr) => {
          acc[curr.result_type] = (acc[curr.result_type] || 0) + 1;
          return acc;
        }, {});

        setAssessmentsByType(
          Object.entries(distribution).map(([name, value]) => ({
            name: name.replace('_', ' '),
            value,
          }))
        );
      }

      // Get prayer distribution by type
      const { data: prayers } = await supabase
        .from('prayer_journal')
        .select('prayer_type')
        .eq('user_id', user.id);

      if (prayers) {
        const distribution = prayers.reduce((acc: any, curr) => {
          acc[curr.prayer_type] = (acc[curr.prayer_type] || 0) + 1;
          return acc;
        }, {});

        setPrayersByType(
          Object.entries(distribution).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
          }))
        );
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load progress data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const COLORS = {
    high_risk: '#ef4444',
    medium_risk: '#f59e0b',
    low_risk: '#10b981',
    Request: '#3b82f6',
    Thanksgiving: '#10b981',
    Confession: '#8b5cf6',
    Praise: '#f59e0b',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <BreadcrumbNav items={[
            { label: 'Personal Growth', category: 'personal-growth' },
            { label: 'Progress' }
          ]} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-bold">Your Spiritual Journey</h1>
              {isShowingDemo && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                  <FlaskConical className="w-3 h-3 mr-1" />
                  Demo
                </Badge>
              )}
            </div>
            <p className="text-xl text-muted-foreground">Track your growth and celebrate your progress</p>
          </div>

          {/* Daily Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sacred" />
                Daily Activity (Last 30 Days)
              </CardTitle>
              <CardDescription>Devotionals completed, assessments taken, and journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              {displayProgressData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={displayProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="assessments_count" stroke="#8b5cf6" name="Assessments" strokeWidth={2} />
                    <Line type="monotone" dataKey="journal_entries_count" stroke="#3b82f6" name="Journal Entries" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No activity data yet. Start using the app to see your progress!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Assessment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Results</CardTitle>
                <CardDescription>Distribution of your assessment outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                {displayAssessments.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={displayAssessments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {displayAssessments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No assessments completed yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Prayer Types */}
            <Card>
              <CardHeader>
                <CardTitle>Prayer Journal</CardTitle>
                <CardDescription>Your prayer patterns by type</CardDescription>
              </CardHeader>
              <CardContent>
                {displayPrayers.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={displayPrayers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Bar dataKey="value" fill="#8b5cf6">
                        {displayPrayers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No prayers recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-sacred/5 border-sacred/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Keep Growing!</h3>
              <p className="text-muted-foreground mb-4">
                Consistent spiritual discipline leads to transformation
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/devotional">
                  <Button variant="outline">Today's Devotional</Button>
                </Link>
                <Link to="/guide">
                  <Button className="bg-sacred hover:bg-sacred/90">Take Assessment</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Progress;