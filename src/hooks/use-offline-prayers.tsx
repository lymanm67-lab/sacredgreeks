import { useEffect, useState } from 'react';
import { useOffline } from './use-offline';
import { offlineStorage, CachedPrayer } from '@/lib/offline-storage';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export function useOfflinePrayers(userId: string | undefined) {
  const { isOffline } = useOffline();
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  // Cache prayers
  const cachePrayers = async (prayers: any[]) => {
    try {
      await offlineStorage.cachePrayers(
        prayers.map(p => ({
          id: p.id,
          title: p.title,
          content: p.content || '',
          prayer_type: p.prayer_type,
          answered: p.answered,
          answered_at: p.answered_at,
          created_at: p.created_at
        }))
      );
    } catch (error) {
      console.error('Failed to cache prayers:', error);
    }
  };

  // Load prayers (from cache if offline)
  const loadPrayers = async () => {
    if (isOffline) {
      return await offlineStorage.getAllPrayers();
    }

    if (!userId) return [];

    const { data, error } = await supabase
      .from('prayer_journal')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data) {
      await cachePrayers(data);
    }

    return data || [];
  };

  // Queue offline actions
  const queueOfflineAction = (action: any) => {
    const actions = [...pendingActions, action];
    setPendingActions(actions);
    localStorage.setItem('pending_prayer_actions', JSON.stringify(actions));
  };

  // Create prayer (queue if offline)
  const createPrayer = async (prayer: any) => {
    if (isOffline) {
      // Store locally with temporary ID
      const tempId = `temp_${Date.now()}`;
      const tempPrayer = {
        ...prayer,
        id: tempId,
        created_at: new Date().toISOString()
      };
      
      await offlineStorage.cachePrayers([tempPrayer]);
      queueOfflineAction({ type: 'create', data: prayer });
      
      return { data: tempPrayer, error: null };
    }

    const { data, error } = await supabase
      .from('prayer_journal')
      .insert([{ ...prayer, user_id: userId }])
      .select()
      .single();

    if (!error && data) {
      await offlineStorage.cachePrayers([data]);
    }

    return { data, error };
  };

  // Update prayer (queue if offline)
  const updatePrayer = async (id: string, updates: any) => {
    if (isOffline) {
      // Update cache
      const prayers = await offlineStorage.getAllPrayers();
      const updated = prayers.map(p => 
        p.id === id ? { ...p, ...updates } : p
      );
      await offlineStorage.cachePrayers(updated);
      queueOfflineAction({ type: 'update', id, data: updates });
      
      return { error: null };
    }

    const { error } = await supabase
      .from('prayer_journal')
      .update(updates)
      .eq('id', id);

    if (!error) {
      const prayers = await loadPrayers();
      await cachePrayers(prayers);
    }

    return { error };
  };

  // Delete prayer (queue if offline)
  const deletePrayer = async (id: string) => {
    if (isOffline) {
      await offlineStorage.deletePrayer(id);
      queueOfflineAction({ type: 'delete', id });
      return { error: null };
    }

    const { error } = await supabase
      .from('prayer_journal')
      .delete()
      .eq('id', id);

    if (!error) {
      await offlineStorage.deletePrayer(id);
    }

    return { error };
  };

  // Sync pending actions when back online
  const syncPendingActions = async () => {
    if (isOffline || pendingActions.length === 0) return;

    setSyncing(true);
    try {
      for (const action of pendingActions) {
        if (action.type === 'create') {
          await supabase
            .from('prayer_journal')
            .insert([{ ...action.data, user_id: userId }]);
        } else if (action.type === 'update') {
          await supabase
            .from('prayer_journal')
            .update(action.data)
            .eq('id', action.id);
        } else if (action.type === 'delete') {
          await supabase
            .from('prayer_journal')
            .delete()
            .eq('id', action.id);
        }
      }

      // Clear pending actions
      setPendingActions([]);
      localStorage.removeItem('pending_prayer_actions');

      // Reload and cache fresh data
      await loadPrayers();

      toast({
        title: 'Synced',
        description: `${pendingActions.length} prayer ${pendingActions.length === 1 ? 'update' : 'updates'} synced`,
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: 'Sync failed',
        description: 'Some changes could not be synced',
        variant: 'destructive'
      });
    } finally {
      setSyncing(false);
    }
  };

  // Load pending actions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('pending_prayer_actions');
    if (stored) {
      setPendingActions(JSON.parse(stored));
    }
  }, []);

  // Sync when coming back online
  useEffect(() => {
    const handleBackOnline = () => {
      if (pendingActions.length > 0) {
        syncPendingActions();
      }
    };

    window.addEventListener('app-back-online', handleBackOnline);
    return () => window.removeEventListener('app-back-online', handleBackOnline);
  }, [pendingActions]);

  return {
    loadPrayers,
    createPrayer,
    updatePrayer,
    deletePrayer,
    syncPendingActions,
    syncing,
    isOffline,
    hasPendingActions: pendingActions.length > 0
  };
}
