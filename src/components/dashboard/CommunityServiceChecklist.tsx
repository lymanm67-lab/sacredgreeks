import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { communityServiceSchema } from '@/lib/validation';

interface ServiceItem {
  id: string;
  title: string;
  hours: number;
  completed: boolean;
  event_date: string | null;
}

export const CommunityServiceChecklist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newHours, setNewHours] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const loadItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('community_service_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load service items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!user) return;

    try {
      const validated = communityServiceSchema.parse({
        title: newItem,
        hours: parseFloat(newHours) || 0
      });

      const { error } = await supabase
        .from('community_service_items')
        .insert({
          user_id: user.id,
          title: validated.title,
          hours: validated.hours,
          completed: false
        });

      if (error) throw error;

      setNewItem('');
      setNewHours('');
      loadItems();
      toast({
        title: 'Added',
        description: 'Service item added to your checklist',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add service item',
          variant: 'destructive',
        });
      }
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('community_service_items')
        .update({ 
          completed: !completed,
          completed_at: !completed ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;
      loadItems();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update service item',
        variant: 'destructive',
      });
    }
  };

  const totalHours = items.reduce((sum, item) => 
    item.completed ? sum + (item.hours || 0) : sum, 0
  );

  if (loading) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sacred" />
            <CardTitle>Community Service</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{totalHours.toFixed(1)} hours completed</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Service activity..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <Input
            type="number"
            placeholder="Hours"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            className="w-24"
            step="0.5"
          />
          <Button onClick={addItem} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No service activities yet. Add your first one above!
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleComplete(item.id, item.completed)}
                />
                <div className="flex-1">
                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.title}
                  </span>
                  {item.hours > 0 && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({item.hours} hrs)
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};