import { useEffect, useState } from 'react';
import { ArrowLeft, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface HistoryItem {
  id: string;
  worker_type: string;
  title: string;
  created_at: string;
}

const WORKER_LABELS: Record<string, string> = {
  ritual_oath_coach: 'Ritual & Oath',
  founders_guide: 'Founders',
  conversation_coach: 'Conversation',
  study_navigator: 'Study Plan',
};

interface WorkerHistoryPanelProps {
  onBack: () => void;
}

export function WorkerHistoryPanel({ onBack }: WorkerHistoryPanelProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('worker_output_history')
        .select('id, worker_type, title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);
      setItems((data as HistoryItem[]) || []);
      setLoading(false);
    })();
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from('worker_output_history').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">Response History</h2>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No history yet. Start by using an AI Worker!</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">
                      {WORKER_LABELS[item.worker_type] || item.worker_type}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="shrink-0 text-destructive/60 hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
