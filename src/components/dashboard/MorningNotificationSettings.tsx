import { useState, useEffect } from "react";
import { Bell, Clock, BookOpen, Flame, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MorningSettings {
  enabled: boolean;
  notification_time: string;
  include_verse_preview: boolean;
  include_streak_reminder: boolean;
  timezone: string;
}

const timeOptions = [
  { value: "05:00:00", label: "5:00 AM" },
  { value: "05:30:00", label: "5:30 AM" },
  { value: "06:00:00", label: "6:00 AM" },
  { value: "06:30:00", label: "6:30 AM" },
  { value: "07:00:00", label: "7:00 AM" },
  { value: "07:30:00", label: "7:30 AM" },
  { value: "08:00:00", label: "8:00 AM" },
  { value: "08:30:00", label: "8:30 AM" },
  { value: "09:00:00", label: "9:00 AM" },
];

const timezones = [
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/Denver", label: "Mountain Time" },
  { value: "America/Los_Angeles", label: "Pacific Time" },
];

export function MorningNotificationSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<MorningSettings>({
    enabled: true,
    notification_time: "07:00:00",
    include_verse_preview: true,
    include_streak_reminder: true,
    timezone: "America/New_York",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('morning_notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings({
          enabled: data.enabled,
          notification_time: data.notification_time,
          include_verse_preview: data.include_verse_preview,
          include_streak_reminder: data.include_streak_reminder,
          timezone: data.timezone,
        });
      }
    } catch (error) {
      console.error('Error fetching morning settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('morning_notification_settings')
        .upsert({
          user_id: user.id,
          ...settings,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your morning notification preferences have been updated.",
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof MorningSettings>(key: K, value: MorningSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-sacred" />
          Morning Notifications
        </CardTitle>
        <CardDescription>
          Customize when and how you receive your daily morning reminder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="morning-enabled" className="font-medium">Enable Morning Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive a daily reminder to start your day with God
            </p>
          </div>
          <Switch
            id="morning-enabled"
            checked={settings.enabled}
            onCheckedChange={(checked) => updateSetting('enabled', checked)}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Time Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Notification Time
              </Label>
              <div className="flex gap-3">
                <Select
                  value={settings.notification_time}
                  onValueChange={(value) => updateSetting('notification_time', value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSetting('timezone', value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Include Verse Preview */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="verse-preview" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Include Verse Preview
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show today's verse snippet in the notification
                </p>
              </div>
              <Switch
                id="verse-preview"
                checked={settings.include_verse_preview}
                onCheckedChange={(checked) => updateSetting('include_verse_preview', checked)}
              />
            </div>

            {/* Include Streak Reminder */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="streak-reminder" className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Include Streak Reminder
                </Label>
                <p className="text-sm text-muted-foreground">
                  Remind you of your current streak to stay motivated
                </p>
              </div>
              <Switch
                id="streak-reminder"
                checked={settings.include_streak_reminder}
                onCheckedChange={(checked) => updateSetting('include_streak_reminder', checked)}
              />
            </div>
          </>
        )}

        {hasChanges && (
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
