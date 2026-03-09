import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Smart notification prompt that shows after user has engaged 3+ times
 * without enabling notifications. Shows as a subtle bottom banner.
 */
export function NotificationPrompt() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!('Notification' in window) || !('PushManager' in window)) return;
    if (Notification.permission !== 'default') return;

    // Check if user has dismissed before
    const dismissed = localStorage.getItem('notification-prompt-dismissed');
    if (dismissed) {
      const dismissedAt = new Date(dismissed);
      const daysSince = (Date.now() - dismissedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) return; // Wait 7 days before showing again
    }

    // Check engagement count
    const visits = parseInt(localStorage.getItem('app-visit-count') || '0', 10) + 1;
    localStorage.setItem('app-visit-count', String(visits));

    if (visits >= 3) {
      // Delay showing for a smooth UX
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleEnable = async () => {
    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await (registration as any).pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            'BIlS2Jw3IDwM_GCSFdDo62G6QBZFnVhbMmhHeu1Cmmog_ZkM_j_JPzhpMlBgU2etR-0kqJptbEZ5PgTV3PGLAUM'
          ),
        });

        await supabase.functions.invoke('subscribe-push', {
          body: {
            subscription: subscription.toJSON(),
            preferences: { devotionalReminders: true, prayerReminderSchedule: 'none' },
          },
        });

        toast({
          title: '🔔 Notifications enabled!',
          description: "You'll get daily devotional reminders to keep your streak alive.",
        });
      }
      setShow(false);
    } catch (error) {
      console.error('Notification setup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notification-prompt-dismissed', new Date().toISOString());
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-card border border-border shadow-xl rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-sacred" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">Never miss a devotional</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get daily reminders to keep your streak going 🔥
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="bg-sacred hover:bg-sacred/90 text-xs"
                  onClick={handleEnable}
                  disabled={loading}
                >
                  {loading ? 'Enabling...' : 'Enable Reminders'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground"
                  onClick={handleDismiss}
                >
                  Not now
                </Button>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 shrink-0"
              onClick={handleDismiss}
              aria-label="Dismiss notification prompt"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
