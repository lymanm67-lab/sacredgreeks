import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  BarChart3,
  Sparkles,
  Target,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Assessment {
  id: string;
  created_at: string;
  track: string;
  scenario: string;
  result_type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scores_json: any;
}

const CHART_COLORS = [
  "hsl(270, 70%, 60%)",
  "hsl(45, 90%, 55%)",
  "hsl(180, 60%, 50%)",
  "hsl(330, 70%, 55%)",
  "hsl(200, 70%, 55%)",
];

const trackInfo: Record<string, { name: string; color: string; path: string }> = {
  'faith-snapshot': { name: 'Faith Snapshot', color: 'from-amber-500 to-orange-600', path: '/snapshot' },
  'proof-quiz': { name: 'P.R.O.O.F. Assessment', color: 'from-purple-500 to-violet-600', path: '/proof-assessment' },
  'sacred_greeks': { name: 'Sacred Greeks Assessment', color: 'from-blue-500 to-indigo-600', path: '/guide' },
  'shattered-masks': { name: 'Shattered Masks', color: 'from-fuchsia-500 to-pink-600', path: '/shattered-masks' },
};

const AssessmentHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAssessments();
  }, [user]);

  const loadAssessments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('assessment_submissions')
        .select('id, created_at, track, scenario, result_type, scores_json')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load assessment history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(assessments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export successful',
      description: 'Your assessment history has been downloaded.',
    });
  };

  // Prepare chart data - scores over time
  const scoreChartData = assessments
    .filter(a => a.scores_json?.score !== undefined)
    .slice(0, 10)
    .reverse()
    .map(a => ({
      date: format(new Date(a.created_at), 'MMM d'),
      score: a.scores_json.score || 0,
      track: trackInfo[a.track]?.name || a.track
    }));

  // Assessment type distribution
  const typeDistribution = assessments.reduce((acc, a) => {
    const trackName = trackInfo[a.track]?.name || a.track;
    acc[trackName] = (acc[trackName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeDistribution).map(([name, value], index) => ({
    name,
    value,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }));

  // Calculate average score
  const scoresWithValues = assessments.filter(a => a.scores_json?.score !== undefined);
  const avgScore = scoresWithValues.length > 0
    ? Math.round(scoresWithValues.reduce((sum, a) => sum + (a.scores_json.score || 0), 0) / scoresWithValues.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Assessment History</h1>
                <p className="text-muted-foreground">Review and analyze your past assessments</p>
              </div>
            </div>
            {assessments.length > 0 && (
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            )}
          </div>

          {assessments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Assessments Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your first assessment to receive personalized guidance
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/snapshot">
                    <Button>Faith Snapshot</Button>
                  </Link>
                  <Link to="/proof-assessment">
                    <Button variant="outline">P.R.O.O.F. Quiz</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Assessments</p>
                        <p className="text-2xl font-bold">{assessments.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-2xl font-bold">{avgScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Assessment Types</p>
                        <p className="text-2xl font-bold">{Object.keys(typeDistribution).length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              {scoreChartData.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Score Trend</CardTitle>
                      <CardDescription>Your assessment scores over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={scoreChartData}>
                          <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="hsl(var(--primary))" 
                            fill="url(#scoreGradient)" 
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Assessment Types</CardTitle>
                      <CardDescription>Distribution of assessments taken</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {pieData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span>{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Assessment List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Assessments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assessments.map((assessment) => {
                    const info = trackInfo[assessment.track] || { name: assessment.track, color: 'from-gray-500 to-gray-600', path: '/' };
                    
                    return (
                      <div 
                        key={assessment.id} 
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(info.path)}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{assessment.scenario || info.name}</h3>
                            {assessment.result_type && (
                              <Badge variant="secondary" className="text-xs">
                                {assessment.result_type}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(assessment.created_at), "MMM d, yyyy")}
                            </span>
                            {assessment.scores_json?.score !== undefined && (
                              <span className="font-medium text-primary">
                                Score: {assessment.scores_json.score}%
                              </span>
                            )}
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssessmentHistory;
