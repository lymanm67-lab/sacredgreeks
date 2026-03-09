import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function WeeklyDigestSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('email_digest_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setEnabled(data.digest_enabled);
        setFrequency(data.frequency as typeof frequency);
      }
    } catch (error) {
      console.error('Error loading digest preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: { digest_enabled?: boolean; frequency?: string }) => {
    if (!user) return;

    const newEnabled = updates.digest_enabled ?? enabled;
    const newFrequency = updates.frequency ?? frequency;

    setEnabled(newEnabled);
    setFrequency(newFrequency as typeof frequency);

    try {
      const { error } = await supabase
        .from('email_digest_preferences')
        .upsert({
          user_id: user.id,
          digest_enabled: newEnabled,
          frequency: newFrequency,
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast({ title: 'Preferences saved', description: 'Your digest settings have been updated.' });
    } catch (error) {
      console.error('Error saving digest preferences:', error);
      toast({ title: 'Error', description: 'Failed to save preferences.', variant: 'destructive' });
    }
  };

  if (loading || !user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-sacred" />
          Weekly Email Digest
        </CardTitle>
        <CardDescription>
          Get a personalized summary of your spiritual journey delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="digest-enabled" className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">Email Digest</p>
              <Sparkles className="w-3.5 h-3.5 text-sacred" />
            </div>
            <p className="text-sm text-muted-foreground">
              Includes your streak, points, recent devotionals, and verse of the week
            </p>
          </Label>
          <Switch
            id="digest-enabled"
            checked={enabled}
            onCheckedChange={(checked) => updatePreferences({ digest_enabled: checked })}
          />
        </div>

        {enabled && (
          <div className="space-y-2">
            <Label htmlFor="digest-frequency">Frequency</Label>
            <Select
              value={frequency}
              onValueChange={(v) => updatePreferences({ frequency: v })}
            >
              <SelectTrigger id="digest-frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly (Every Monday)</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
