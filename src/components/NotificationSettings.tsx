import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, BellOff, RefreshCw, Send, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface NotificationPreferences {
  devotionalReminders: boolean;
  prayerReminderSchedule: 'none' | 'daily' | 'weekly';
  appUpdates: boolean;
}

export const NotificationSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    devotionalReminders: true,
    prayerReminderSchedule: 'none',
    appUpdates: true,
  });
  const [loading, setLoading] = useState(false);
  const [testingNotification, setTestingNotification] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if push notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      checkSubscription();
      checkForUpdates();
    }
  }, []);

  // Listen for service worker updates
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSwRegistration(registration);
        
        // Check for updates periodically
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
                if (preferences.appUpdates && Notification.permission === 'granted') {
                  showAppUpdateNotification();
                }
              }
            });
          }
        });
      });

      // Listen for controller change (after skipWaiting)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, [preferences.appUpdates]);

  const checkForUpdates = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  const showAppUpdateNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('App Update Available', {
        body: 'A new version of Sacred Greeks is available. Tap to update!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'app-update',
        requireInteraction: true,
      });
    }
  };

  const applyUpdate = () => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);

      if (subscription && user) {
        // Get current preferences from database
        const { data } = await supabase
          .from('push_subscriptions')
          .select('devotional_reminders, prayer_reminder_schedule')
          .eq('endpoint', subscription.endpoint)
          .maybeSingle();

        if (data) {
          const schedule = data.prayer_reminder_schedule as 'none' | 'daily' | 'weekly';
          setPreferences((prev) => ({
            ...prev,
            devotionalReminders: data.devotional_reminders,
            prayerReminderSchedule: schedule || 'none',
          }));
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

      // Subscribe to push notifications using VAPID keys
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BIlS2Jw3IDwM_GCSFdDo62G6QBZFnVhbMmhHeu1Cmmog_ZkM_j_JPzhpMlBgU2etR-0kqJptbEZ5PgTV3PGLAUM'
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
        description: "You'll receive reminders for devotionals, prayers, and app updates.",
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

  const sendTestNotification = async () => {
    if (Notification.permission !== 'granted') {
      toast({
        title: 'Permission required',
        description: 'Please enable notifications first.',
        variant: 'destructive',
      });
      return;
    }

    setTestingNotification(true);

    try {
      // Show a local notification for testing
      new Notification('Test Notification', {
        body: 'Your notifications are working! You\'ll receive updates for devotionals, prayers, and app updates.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'test-notification',
      });

      toast({
        title: 'Test sent!',
        description: 'Check your notifications.',
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to send test notification.',
        variant: 'destructive',
      });
    } finally {
      setTestingNotification(false);
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
          {updateAvailable && (
            <Badge variant="secondary" className="ml-2 bg-sacred/20 text-sacred">
              Update Available
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Get reminded about daily devotionals, prayer journal updates, and app updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* App Update Banner */}
        {updateAvailable && (
          <div className="p-4 rounded-lg bg-sacred/10 border border-sacred/20 space-y-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-sacred" />
              <span className="font-medium text-sacred">New Version Available!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A new version of Sacred Greeks is ready to install.
            </p>
            <Button
              onClick={applyUpdate}
              size="sm"
              className="bg-sacred hover:bg-sacred/90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Update Now
            </Button>
          </div>
        )}

        {!isSubscribed ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable notifications to receive daily reminders for devotionals, prayer updates, and app updates.
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
            {/* Test Notification */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Test Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Send a test to verify everything works
                  </p>
                </div>
              </div>
              <Button
                onClick={sendTestNotification}
                disabled={testingNotification}
                size="sm"
                variant="outline"
              >
                {testingNotification ? 'Sending...' : 'Test'}
              </Button>
            </div>

            {/* Devotional Reminders */}
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

            {/* Prayer Reminders */}
            <div className="space-y-2">
              <Label htmlFor="prayer-reminder-schedule">
                <div>
                  <p className="font-medium">Prayer Journal Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Choose how often you want prayer reminders
                  </p>
                </div>
              </Label>
              <Select
                value={preferences.prayerReminderSchedule}
                onValueChange={(value: 'none' | 'daily' | 'weekly') =>
                  updatePreferences({ prayerReminderSchedule: value })
                }
              >
                <SelectTrigger id="prayer-reminder-schedule">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No reminders</SelectItem>
                  <SelectItem value="daily">Daily (8 AM)</SelectItem>
                  <SelectItem value="weekly">Weekly (Monday 8 AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* App Updates */}
            <div className="flex items-center justify-between">
              <Label htmlFor="app-updates" className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">App Updates</p>
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Get notified when a new version is available
                </p>
              </Label>
              <Switch
                id="app-updates"
                checked={preferences.appUpdates}
                onCheckedChange={(checked) =>
                  updatePreferences({ appUpdates: checked })
                }
              />
            </div>

            {/* Check for Updates Button */}
            <Button
              onClick={checkForUpdates}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Check for App Updates
            </Button>

            <Button
              onClick={unsubscribeFromPush}
              disabled={loading}
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
            >
              {loading ? 'Disabling...' : 'Disable All Notifications'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
