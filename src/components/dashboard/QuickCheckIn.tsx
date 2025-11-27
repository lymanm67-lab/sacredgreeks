import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, BookOpen, HandHeart, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/hooks/use-gamification';
import { toast } from 'sonner';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';

interface CheckInData {
  prayed_today: boolean;
  read_bible: boolean;
  served_others: boolean;
}

export function QuickCheckIn() {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const { completeChallenge } = useAutoCompleteChallenge();
  const [checkIn, setCheckIn] = useState<CheckInData>({
    prayed_today: false,
    read_bible: false,
    served_others: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadCheckIn();
    }
  }, [user]);

  const loadCheckIn = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('user_daily_check_ins')
        .select('prayed_today, read_bible, served_others')
        .eq('user_id', user!.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setCheckIn({
          prayed_today: data.prayed_today,
          read_bible: data.read_bible,
          served_others: data.served_others,
        });
      }
    } catch (error) {
      console.error('Error loading check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCheckIn = async (field: keyof CheckInData, value: boolean) => {
    if (!user) return;

    setSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const newCheckIn = { ...checkIn, [field]: value };

      const { error } = await supabase
        .from('user_daily_check_ins')
        .upsert({
          user_id: user.id,
          date: today,
          ...newCheckIn,
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;

      setCheckIn(newCheckIn);

      // Award points only when checking (not unchecking)
      if (value) {
        awardPoints({ points: 5, actionType: 'quick_check_in' });
        toast.success('Checked in! +5 points');
        
        // Check if all items are now checked and auto-complete check-in challenge
        const allItemsChecked = Object.values(newCheckIn).every(Boolean);
        if (allItemsChecked) {
          await completeChallenge('check_in');
        }
      }
    } catch (error) {
      console.error('Error updating check-in:', error);
      toast.error('Failed to update check-in');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Quick Check-In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Sign in to track your daily spiritual activities!</p>
        </CardContent>
      </Card>
    );
  }

  const allChecked = checkIn.prayed_today && checkIn.read_bible && checkIn.served_others;
  const checkedCount = Object.values(checkIn).filter(Boolean).length;

  return (
    <Card className={allChecked ? 'border-primary/50 bg-primary/5' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Quick Check-In
          </CardTitle>
          {allChecked && (
            <span className="text-xs font-medium text-primary">
              All done today! 🎉
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Track your daily spiritual habits
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Check-in items */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="prayed"
              checked={checkIn.prayed_today}
              onCheckedChange={(checked) => 
                updateCheckIn('prayed_today', checked as boolean)
              }
              disabled={saving || loading}
              className="shrink-0"
            />
            <label
              htmlFor="prayed"
              className="flex-1 flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <Heart className="h-4 w-4 text-red-500" />
              <span>I prayed today</span>
            </label>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="bible"
              checked={checkIn.read_bible}
              onCheckedChange={(checked) => 
                updateCheckIn('read_bible', checked as boolean)
              }
              disabled={saving || loading}
              className="shrink-0"
            />
            <label
              htmlFor="bible"
              className="flex-1 flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>I read the Bible today</span>
            </label>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="served"
              checked={checkIn.served_others}
              onCheckedChange={(checked) => 
                updateCheckIn('served_others', checked as boolean)
              }
              disabled={saving || loading}
              className="shrink-0"
            />
            <label
              htmlFor="served"
              className="flex-1 flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <HandHeart className="h-4 w-4 text-green-500" />
              <span>I served others today</span>
            </label>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground text-center">
            {checkedCount}/3 activities completed (+5 points each)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}