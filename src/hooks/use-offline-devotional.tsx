import { useEffect, useState } from 'react';
import { useOffline } from './use-offline';
import { offlineStorage, CachedDevotional } from '@/lib/offline-storage';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export function useOfflineDevotional(userId: string | undefined) {
  const { isOffline } = useOffline();
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);

  // Cache today's devotional when online
  const cacheDevotional = async (devotional: any) => {
    try {
      await offlineStorage.cacheDevotional({
        id: devotional.id,
        date: devotional.date,
        title: devotional.title,
        scripture_ref: devotional.scripture_ref,
        scripture_text: devotional.scripture_text,
        reflection: devotional.reflection,
        proof_focus: devotional.proof_focus,
        application: devotional.application,
        prayer: devotional.prayer
      });
    } catch (error) {
      console.error('Failed to cache devotional:', error);
    }
  };

  // Load devotional (from cache if offline)
  const loadDevotional = async (date: string) => {
    if (isOffline) {
      // Try to load from cache
      const cached = await offlineStorage.getDevotional(date);
      if (cached) {
        return cached;
      }
      throw new Error('No cached devotional available for this date');
    }

    // Load from API and cache
    const { data, error } = await supabase
      .from('daily_devotionals')
      .select('*')
      .eq('date', date)
      .maybeSingle();

    if (error) throw error;
    
    if (data) {
      await cacheDevotional(data);
    }
    
    return data;
  };

  // Pre-cache recent devotionals for offline access
  const preCacheRecentDevotionals = async () => {
    if (isOffline) return;

    try {
      const today = new Date();
      const dates = [];
      
      // Cache today and last 6 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }

      const { data } = await supabase
        .from('daily_devotionals')
        .select('*')
        .in('date', dates);

      if (data) {
        for (const devotional of data) {
          await cacheDevotional(devotional);
        }
      }
    } catch (error) {
      console.error('Failed to pre-cache devotionals:', error);
    }
  };

  // Sync when coming back online
  useEffect(() => {
    const handleBackOnline = async () => {
      setSyncing(true);
      try {
        await preCacheRecentDevotionals();
        toast({
          title: 'Synced',
          description: 'Devotionals updated for offline access',
        });
      } catch (error) {
        console.error('Sync failed:', error);
      } finally {
        setSyncing(false);
      }
    };

    window.addEventListener('app-back-online', handleBackOnline);
    return () => window.removeEventListener('app-back-online', handleBackOnline);
  }, []);

  // Pre-cache on mount if online
  useEffect(() => {
    if (!isOffline && userId) {
      preCacheRecentDevotionals();
    }
  }, [userId, isOffline]);

  return {
    loadDevotional,
    cacheDevotional,
    preCacheRecentDevotionals,
    syncing,
    isOffline
  };
}
