import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen, Heart, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Recommendation {
  type: 'study_session' | 'devotional' | 'assessment' | 'prayer';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export const StudyRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('study-recommendations', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load recommendations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'study_session':
        return <BookOpen className="h-5 w-5" />;
      case 'devotional':
        return <Heart className="h-5 w-5" />;
      case 'assessment':
        return <Target className="h-5 w-5" />;
      case 'prayer':
        return <Sparkles className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-status-high';
      case 'medium':
        return 'bg-status-medium';
      case 'low':
        return 'bg-status-low';
      default:
        return 'bg-muted';
    }
  };

  const handleAction = (type: string) => {
    switch (type) {
      case 'study_session':
        navigate('/study');
        break;
      case 'devotional':
        navigate('/devotional');
        break;
      case 'assessment':
        navigate('/guide');
        break;
      case 'prayer':
        navigate('/prayer-journal');
        break;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {getIcon(rec.type)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{rec.title}</h4>
                <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <Button
                size="sm"
                variant="link"
                className="px-0 mt-2 h-auto"
                onClick={() => handleAction(rec.type)}
              >
                Get Started →
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
