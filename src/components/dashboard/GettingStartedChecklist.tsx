import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export const GettingStartedChecklist = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 'profile', title: 'Complete Your Profile', description: 'Add your name and preferences', completed: false, points: 10 },
    { id: 'assessment', title: 'Take First Assessment', description: 'Get biblical guidance on a decision', completed: false, points: 15 },
    { id: 'devotional', title: 'Read Daily Devotional', description: 'Start your day with scripture', completed: false, points: 10 },
    { id: 'prayer', title: 'Add a Prayer', description: 'Share your first prayer request', completed: false, points: 10 },
    { id: 'study', title: 'Explore Bible Study', description: 'Begin a reading plan', completed: false, points: 15 },
  ]);

  useEffect(() => {
    if (user) {
      checkProgress();
    }
  }, [user]);

  const checkProgress = async () => {
    if (!user) return;

    try {
      // Check profile completion
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      // Check assessment
      const { count: assessmentCount } = await supabase
        .from('assessment_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Check devotional
      const today = new Date().toISOString().split('T')[0];
      const { data: progress } = await supabase
        .from('user_progress')
        .select('devotional_completed')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      // Check prayer
      const { count: prayerCount } = await supabase
        .from('prayer_journal')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Check study sessions
      const { count: studyCount } = await supabase
        .from('study_session_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setItems(prev => prev.map(item => {
        if (item.id === 'profile') return { ...item, completed: !!profile?.full_name };
        if (item.id === 'assessment') return { ...item, completed: (assessmentCount || 0) > 0 };
        if (item.id === 'devotional') return { ...item, completed: progress?.devotional_completed || false };
        if (item.id === 'prayer') return { ...item, completed: (prayerCount || 0) > 0 };
        if (item.id === 'study') return { ...item, completed: (studyCount || 0) > 0 };
        return item;
      }));
    } catch (error) {
      console.error('Error checking progress:', error);
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalPoints = items.reduce((sum, item) => sum + (item.completed ? item.points : 0), 0);
  const progress = (completedCount / items.length) * 100;

  if (completedCount === items.length) {
    return null; // Hide when fully completed
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Getting Started</CardTitle>
          <div className="text-sm font-medium text-primary">
            {completedCount}/{items.length} • {totalPoints} pts
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-3">
          <motion.div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              item.completed ? 'bg-primary/5' : 'hover:bg-muted/50'
            }`}
          >
            {item.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            {!item.completed && (
              <span className="text-xs text-primary font-medium">+{item.points}</span>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};
