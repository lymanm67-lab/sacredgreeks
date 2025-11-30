import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface RealtimeNotificationOptions {
  onPrayerRequest?: (payload: any) => void;
  onPrayerSupport?: (payload: any) => void;
  onForumDiscussion?: (payload: any) => void;
  onForumReply?: (payload: any) => void;
  showToasts?: boolean;
}

export function useRealtimeNotifications(options: RealtimeNotificationOptions = {}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    onPrayerRequest, 
    onPrayerSupport, 
    onForumDiscussion, 
    onForumReply,
    showToasts = true 
  } = options;

  const handlePrayerRequestChange = useCallback((payload: any) => {
    if (payload.eventType === 'INSERT' && showToasts) {
      // Don't show toast for own prayers
      if (payload.new.user_id !== user?.id) {
        toast({
          title: "New Prayer Request",
          description: `Someone shared a new prayer: "${payload.new.title?.slice(0, 50)}..."`,
        });
      }
    }
    onPrayerRequest?.(payload);
  }, [onPrayerRequest, showToasts, toast, user?.id]);

  const handlePrayerSupportChange = useCallback((payload: any) => {
    if (payload.eventType === 'INSERT' && showToasts) {
      // Only show if someone prayed for the current user's request
      toast({
        title: "Prayer Support",
        description: "Someone just prayed for a request on the prayer wall!",
      });
    }
    onPrayerSupport?.(payload);
  }, [onPrayerSupport, showToasts, toast]);

  const handleForumDiscussionChange = useCallback((payload: any) => {
    if (payload.eventType === 'INSERT' && showToasts) {
      if (payload.new.user_id !== user?.id) {
        toast({
          title: "New Discussion",
          description: `New forum topic: "${payload.new.title?.slice(0, 50)}..."`,
        });
      }
    }
    onForumDiscussion?.(payload);
  }, [onForumDiscussion, showToasts, toast, user?.id]);

  const handleForumReplyChange = useCallback((payload: any) => {
    if (payload.eventType === 'INSERT' && showToasts) {
      if (payload.new.user_id !== user?.id) {
        toast({
          title: "New Reply",
          description: "Someone replied to a forum discussion!",
        });
      }
    }
    onForumReply?.(payload);
  }, [onForumReply, showToasts, toast, user?.id]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('realtime-notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prayer_requests'
        },
        handlePrayerRequestChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prayer_support'
        },
        handlePrayerSupportChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_discussions'
        },
        handleForumDiscussionChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_replies'
        },
        handleForumReplyChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, handlePrayerRequestChange, handlePrayerSupportChange, handleForumDiscussionChange, handleForumReplyChange]);
}

// Hook specifically for prayer wall real-time updates
export function usePrayerWallRealtime(onUpdate: () => void) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('prayer-wall-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prayer_requests'
        },
        () => onUpdate()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prayer_support'
        },
        () => onUpdate()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, onUpdate]);
}
