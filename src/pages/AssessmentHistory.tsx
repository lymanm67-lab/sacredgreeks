import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Calendar, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Assessment {
  id: string;
  created_at: string;
  scenario: string;
  result_type: string;
  scores_json: any;
}

const AssessmentHistory = () => {
  const { user } = useAuth();
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
        .select('id, created_at, scenario, result_type, scores_json')
        .eq('user_id', user.id)
        .eq('track', 'sacred_greeks')
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

  const getScenarioTitle = (scenario: string) => {
    const scenarios: Record<string, string> = {
      clip: 'Saw a clip or sermon attacking BGLOs',
      pressure: 'Someone is pressuring me to denounce',
      event: 'Planning a faith-based event',
    };
    return scenarios[scenario] || scenario;
  };

  const getResultBadge = (resultType: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      high_risk: { color: 'border-status-high text-status-high', text: 'High Risk' },
      medium_risk: { color: 'border-status-medium text-status-medium', text: 'Medium Risk' },
      low_risk: { color: 'border-status-low text-status-low', text: 'Low Risk' },
    };
    const variant = variants[resultType] || variants.low_risk;
    return (
      <Badge variant="outline" className={variant.color}>
        {variant.text}
      </Badge>
    );
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-sacred" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Assessment History</h1>
                <p className="text-muted-foreground">Review your past Sacred Greeks assessments</p>
              </div>
            </div>
            {assessments.length > 0 && (
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
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
                <Link to="/guide">
                  <Button className="bg-sacred hover:bg-sacred/90">
                    Start Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {getScenarioTitle(assessment.scenario)}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(assessment.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      {getResultBadge(assessment.result_type)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      {assessment.scores_json && (
                        <>
                          <div>
                            <p className="text-muted-foreground">P - Purpose</p>
                            <p className="font-semibold">{assessment.scores_json.P || 0}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">R - Relationships</p>
                            <p className="font-semibold">{assessment.scores_json.R || 0}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">O - Obedience</p>
                            <p className="font-semibold">{assessment.scores_json.O || 0}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">O - Opportunity</p>
                            <p className="font-semibold">{assessment.scores_json.O2 || 0}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">F - Freedom</p>
                            <p className="font-semibold">{assessment.scores_json.F || 0}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssessmentHistory;
