import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, BellOff, Mail, Smartphone, MessageSquare, Heart, BookOpen, Trophy, Sparkles, Volume2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SEOHead } from '@/components/SEOHead';

interface NotificationPreferences {
  // Real-time notifications
  prayerWallUpdates: boolean;
  forumReplies: boolean;
  forumMentions: boolean;
  achievementUnlocked: boolean;
  
  // Push notifications
  pushEnabled: boolean;
  devotionalReminders: boolean;
  prayerReminders: boolean;
  prayerReminderSchedule: string;
  
  // Email notifications
  emailDigest: boolean;
  emailDigestFrequency: 'daily' | 'weekly' | 'never';
  emailAchievements: boolean;
  
  // App notifications
  whatsNewModal: boolean;
  soundEffects: boolean;
}

const defaultPreferences: NotificationPreferences = {
  prayerWallUpdates: true,
  forumReplies: true,
  forumMentions: true,
  achievementUnlocked: true,
  pushEnabled: false,
  devotionalReminders: true,
  prayerReminders: true,
  prayerReminderSchedule: 'morning',
  emailDigest: false,
  emailDigestFrequency: 'weekly',
  emailAchievements: true,
  whatsNewModal: true,
  soundEffects: true,
};

export default function NotificationPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
    }

    // Also check push subscription status
    if (user) {
      supabase
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setPreferences(prev => ({
              ...prev,
              pushEnabled: true,
              devotionalReminders: data.devotional_reminders,
              prayerReminders: data.prayer_reminders,
              prayerReminderSchedule: data.prayer_reminder_schedule || 'morning',
            }));
          }
        });
    }
  }, [user]);

  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('notification-preferences', JSON.stringify(preferences));

      // Update push subscription if user is logged in
      if (user && preferences.pushEnabled) {
        await supabase
          .from('push_subscriptions')
          .update({
            devotional_reminders: preferences.devotionalReminders,
            prayer_reminders: preferences.prayerReminders,
            prayer_reminder_schedule: preferences.prayerReminderSchedule,
          })
          .eq('user_id', user.id);
      }

      // Update What's New preference
      if (!preferences.whatsNewModal) {
        localStorage.setItem('whats-new-disabled', 'true');
      } else {
        localStorage.removeItem('whats-new-disabled');
      }

      toast.success('Notification preferences saved');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const NotificationToggle = ({
    id,
    label,
    description,
    icon: Icon,
    checked,
    onCheckedChange,
    disabled = false,
  }: {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div className="space-y-0.5">
          <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );

  return (
    <>
      <SEOHead
        title="Notification Preferences | Sacred Greeks"
        description="Manage your notification settings for Sacred Greeks"
        noindex
      />

      <div className="container max-w-2xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notification Preferences</h1>
          <p className="text-muted-foreground">Customize how and when you receive notifications</p>
        </div>

        {/* Real-time Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg">Real-time Notifications</CardTitle>
            </div>
            <CardDescription>
              Get instant notifications while using the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <NotificationToggle
              id="prayer-wall"
              label="Prayer Wall Updates"
              description="New prayer requests and when others pray for you"
              icon={Heart}
              checked={preferences.prayerWallUpdates}
              onCheckedChange={(v) => updatePreference('prayerWallUpdates', v)}
            />
            <Separator />
            <NotificationToggle
              id="forum-replies"
              label="Forum Replies"
              description="Replies to your discussions and posts"
              icon={MessageSquare}
              checked={preferences.forumReplies}
              onCheckedChange={(v) => updatePreference('forumReplies', v)}
            />
            <Separator />
            <NotificationToggle
              id="forum-mentions"
              label="Forum Mentions"
              description="When someone mentions you in a discussion"
              icon={MessageSquare}
              checked={preferences.forumMentions}
              onCheckedChange={(v) => updatePreference('forumMentions', v)}
            />
            <Separator />
            <NotificationToggle
              id="achievements"
              label="Achievement Unlocked"
              description="Celebrate when you earn new badges"
              icon={Trophy}
              checked={preferences.achievementUnlocked}
              onCheckedChange={(v) => updatePreference('achievementUnlocked', v)}
            />
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Push Notifications</CardTitle>
              </div>
              <Badge variant={preferences.pushEnabled ? 'default' : 'secondary'}>
                {preferences.pushEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <CardDescription>
              Receive notifications even when the app is closed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <NotificationToggle
              id="devotional-reminders"
              label="Devotional Reminders"
              description="Daily reminders to read your devotional"
              icon={BookOpen}
              checked={preferences.devotionalReminders}
              onCheckedChange={(v) => updatePreference('devotionalReminders', v)}
              disabled={!preferences.pushEnabled}
            />
            <Separator />
            <NotificationToggle
              id="prayer-reminders"
              label="Prayer Reminders"
              description="Scheduled reminders for prayer time"
              icon={Heart}
              checked={preferences.prayerReminders}
              onCheckedChange={(v) => updatePreference('prayerReminders', v)}
              disabled={!preferences.pushEnabled}
            />
            {preferences.prayerReminders && preferences.pushEnabled && (
              <div className="pl-8 py-2">
                <Label className="text-xs text-muted-foreground mb-2 block">Reminder Schedule</Label>
                <Select
                  value={preferences.prayerReminderSchedule}
                  onValueChange={(v) => updatePreference('prayerReminderSchedule', v)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8 AM)</SelectItem>
                    <SelectItem value="noon">Noon (12 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM)</SelectItem>
                    <SelectItem value="night">Night (9 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg">Email Notifications</CardTitle>
            </div>
            <CardDescription>
              Receive updates via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <NotificationToggle
              id="email-digest"
              label="Weekly Digest"
              description="Summary of your activity and community highlights"
              icon={Mail}
              checked={preferences.emailDigest}
              onCheckedChange={(v) => updatePreference('emailDigest', v)}
            />
            {preferences.emailDigest && (
              <div className="pl-8 py-2">
                <Label className="text-xs text-muted-foreground mb-2 block">Frequency</Label>
                <Select
                  value={preferences.emailDigestFrequency}
                  onValueChange={(v) => updatePreference('emailDigestFrequency', v as 'daily' | 'weekly' | 'never')}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Separator />
            <NotificationToggle
              id="email-achievements"
              label="Achievement Emails"
              description="Receive emails when you unlock achievements"
              icon={Trophy}
              checked={preferences.emailAchievements}
              onCheckedChange={(v) => updatePreference('emailAchievements', v)}
            />
          </CardContent>
        </Card>

        {/* App Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">App Experience</CardTitle>
            </div>
            <CardDescription>
              Customize your in-app experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <NotificationToggle
              id="whats-new"
              label="What's New Modal"
              description="Show updates when new features are released"
              icon={Sparkles}
              checked={preferences.whatsNewModal}
              onCheckedChange={(v) => updatePreference('whatsNewModal', v)}
            />
            <Separator />
            <NotificationToggle
              id="sounds"
              label="Sound Effects"
              description="Play sounds for celebrations and achievements"
              icon={Volume2}
              checked={preferences.soundEffects}
              onCheckedChange={(v) => updatePreference('soundEffects', v)}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setPreferences(defaultPreferences);
              setHasChanges(true);
            }}
          >
            Reset to Defaults
          </Button>
          <Button
            onClick={savePreferences}
            disabled={!hasChanges || saving}
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </>
  );
}
