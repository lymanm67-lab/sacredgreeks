import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  devotionalReminders: boolean;
  prayerReminders: boolean;
}

export const NotificationSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    devotionalReminders: true,
    prayerReminders: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);

      if (subscription && user) {
        // Get current preferences from database
        const { data } = await supabase
          .from('push_subscriptions')
          .select('devotional_reminders, prayer_reminders')
          .eq('endpoint', subscription.endpoint)
          .maybeSingle();

        if (data) {
          setPreferences({
            devotionalReminders: data.devotional_reminders,
            prayerReminders: data.prayer_reminders,
          });
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to enable notifications.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Request notification permission
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') {
        toast({
          title: 'Permission denied',
          description: 'Please enable notifications in your browser settings.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push notifications
      // Note: You'll need to generate VAPID keys for production
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8-fTnkgq7Z-D3yzm_kTv8MsNlYJsNqO3mjfKh2rYl2Kb2nRqDXVqeM'
        ),
      });

      // Save subscription to backend
      const { error } = await supabase.functions.invoke('subscribe-push', {
        body: {
          subscription: subscription.toJSON(),
          preferences,
        },
      });

      if (error) throw error;

      setIsSubscribed(true);
      toast({
        title: 'Notifications enabled!',
        description: "You'll receive reminders for devotionals and prayers.",
      });
    } catch (error) {
      console.error('Error subscribing to push:', error);
      toast({
        title: 'Error',
        description: 'Failed to enable notifications. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    setLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Remove from database
        if (user) {
          await supabase
            .from('push_subscriptions')
            .delete()
            .eq('endpoint', subscription.endpoint);
        }

        setIsSubscribed(false);
        toast({
          title: 'Notifications disabled',
          description: 'You will no longer receive push notifications.',
        });
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: 'Error',
        description: 'Failed to disable notifications.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);

    if (isSubscribed && user) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          await supabase.functions.invoke('subscribe-push', {
            body: {
              subscription: subscription.toJSON(),
              preferences: updated,
            },
          });

          toast({
            title: 'Preferences updated',
            description: 'Your notification settings have been saved.',
          });
        }
      } catch (error) {
        console.error('Error updating preferences:', error);
        toast({
          title: 'Error',
          description: 'Failed to update preferences.',
          variant: 'destructive',
        });
      }
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notifications Not Supported
          </CardTitle>
          <CardDescription>
            Your browser doesn't support push notifications.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-sacred" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Get reminded about daily devotionals and prayer journal updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSubscribed ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable notifications to receive daily reminders for devotionals and updates about your prayer journal.
            </p>
            <Button
              onClick={subscribeToPush}
              disabled={loading || !user}
              className="bg-sacred hover:bg-sacred/90 w-full"
            >
              {loading ? 'Enabling...' : 'Enable Notifications'}
            </Button>
            {!user && (
              <p className="text-xs text-muted-foreground text-center">
                Sign in to enable notifications
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="devotional-reminders" className="flex-1">
                <div>
                  <p className="font-medium">Daily Devotional</p>
                  <p className="text-sm text-muted-foreground">
                    Get reminded when a new devotional is available
                  </p>
                </div>
              </Label>
              <Switch
                id="devotional-reminders"
                checked={preferences.devotionalReminders}
                onCheckedChange={(checked) =>
                  updatePreferences({ devotionalReminders: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="prayer-reminders" className="flex-1">
                <div>
                  <p className="font-medium">Prayer Journal</p>
                  <p className="text-sm text-muted-foreground">
                    Get updates about your prayer journal
                  </p>
                </div>
              </Label>
              <Switch
                id="prayer-reminders"
                checked={preferences.prayerReminders}
                onCheckedChange={(checked) =>
                  updatePreferences({ prayerReminders: checked })
                }
              />
            </div>

            <Button
              onClick={unsubscribeFromPush}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? 'Disabling...' : 'Disable All Notifications'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
