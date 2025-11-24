import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Heart, Lock } from 'lucide-react';
import { SacredGreeksResults } from '@/components/sacred-greeks/SacredGreeksResults';

const SharedResult = () => {
  const { token } = useParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSharedResult();
  }, [token]);

  const loadSharedResult = async () => {
    if (!token) {
      setError('Invalid share link');
      setLoading(false);
      return;
    }

    try {
      // Get shared result
      const { data: sharedData, error: sharedError } = await supabase
        .from('shared_results')
        .select('*, assessment_submissions(*)')
        .eq('share_token', token)
        .maybeSingle();

      if (sharedError) throw sharedError;

      if (!sharedData) {
        setError('This share link is invalid or has expired');
        setLoading(false);
        return;
      }

      // Check if expired
      if (sharedData.expires_at && new Date(sharedData.expires_at) < new Date()) {
        setError('This share link has expired');
        setLoading(false);
        return;
      }

      // Update view count
      await supabase
        .from('shared_results')
        .update({
          view_count: sharedData.view_count + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq('id', sharedData.id);

      setResult(sharedData.assessment_submissions);
    } catch (error) {
      console.error('Error loading shared result:', error);
      setError('Failed to load shared result');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading shared result...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Link Not Available</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link to="/">
              <Button className="bg-sacred hover:bg-sacred/90">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-sacred" />
              <span className="font-semibold">Shared Assessment Result</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-sacred/5 border-sacred/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-sacred" />
                Someone shared their assessment with you
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This assessment uses the P.R.O.O.F. framework from "Sacred, Not Sinful" to help Christians in Greek Life process difficult decisions with biblical wisdom.
              </p>
            </CardContent>
          </Card>

          <SacredGreeksResults
            resultType={result.result_type}
            scores={result.scores_json}
            answers={result.answers_json}
            isSharedView={true}
          />

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">
              Want guidance for your own situation?
            </p>
            <Link to="/">
              <Button className="bg-sacred hover:bg-sacred/90">
                Try Sacred Greeks
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedResult;