import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSubscription } from '@/hooks/use-subscription';
import { isFeatureAvailable, TIER_INFO, TierLevel, FEATURES } from '@/data/featureTiers';
import { useToast } from '@/hooks/use-toast';

interface FeaturePreference {
  feature_id: string;
  is_visible: boolean;
}

export function useFeaturePreferences() {
  const { user } = useAuth();
  const { tier: subscriptionTier } = useSubscription();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [hiddenCount, setHiddenCount] = useState(0);

  // Get current tier (default to free if no subscription)
  const tier: TierLevel = subscriptionTier || 'free';
  const tierInfo = TIER_INFO[tier];
  const maxHidden = tierInfo.maxHiddenFeatures;

  // Load preferences from database
  const loadPreferences = useCallback(async () => {
    if (!user) {
      setPreferences({});
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('feature_preferences')
        .select('feature_id, is_visible')
        .eq('user_id', user.id);

      if (error) throw error;

      const prefs: Record<string, boolean> = {};
      let hidden = 0;
      
      data?.forEach((pref: FeaturePreference) => {
        prefs[pref.feature_id] = pref.is_visible;
        if (!pref.is_visible) hidden++;
      });

      setPreferences(prefs);
      setHiddenCount(hidden);
    } catch (error) {
      console.error('Error loading feature preferences:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  // Check if a feature is visible (considering tier and preferences)
  const isFeatureVisible = useCallback((featureId: string): boolean => {
    // First check if feature is available for user's tier
    if (!isFeatureAvailable(featureId, tier)) {
      return false;
    }

    // Then check user preference (default to visible)
    return preferences[featureId] !== false;
  }, [tier, preferences]);

  // Check if user can hide more features
  const canHideMore = useCallback((): boolean => {
    if (maxHidden === null) return true; // Unlimited
    return hiddenCount < maxHidden;
  }, [maxHidden, hiddenCount]);

  // Toggle feature visibility
  const toggleFeature = useCallback(async (featureId: string, visible: boolean) => {
    if (!user) return;

    // Check if trying to hide and at limit
    if (!visible && !canHideMore()) {
      toast({
        title: 'Upgrade Required',
        description: `Free users can only hide ${maxHidden} features. Upgrade to Pro for unlimited customization.`,
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('feature_preferences')
        .upsert({
          user_id: user.id,
          feature_id: featureId,
          is_visible: visible,
        }, {
          onConflict: 'user_id,feature_id',
        });

      if (error) throw error;

      setPreferences(prev => ({ ...prev, [featureId]: visible }));
      setHiddenCount(prev => visible ? prev - 1 : prev + 1);
      
      return true;
    } catch (error) {
      console.error('Error updating feature preference:', error);
      toast({
        title: 'Error',
        description: 'Failed to update preference',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, canHideMore, maxHidden, toast]);

  // Reset all preferences
  const resetPreferences = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('feature_preferences')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setPreferences({});
      setHiddenCount(0);
      
      toast({
        title: 'Preferences Reset',
        description: 'All features are now visible',
      });
    } catch (error) {
      console.error('Error resetting preferences:', error);
    }
  }, [user, toast]);

  // Get visible features for dashboard
  const getVisibleFeatures = useCallback(() => {
    return FEATURES.filter(feature => isFeatureVisible(feature.id));
  }, [isFeatureVisible]);

  // Get hidden features
  const getHiddenFeatures = useCallback(() => {
    return FEATURES.filter(feature => {
      const isAvailable = isFeatureAvailable(feature.id, tier);
      return isAvailable && preferences[feature.id] === false;
    });
  }, [tier, preferences]);

  return {
    tier,
    tierInfo,
    preferences,
    loading,
    hiddenCount,
    maxHidden,
    canHideMore,
    isFeatureVisible,
    isFeatureAvailable: (featureId: string) => isFeatureAvailable(featureId, tier),
    toggleFeature,
    resetPreferences,
    getVisibleFeatures,
    getHiddenFeatures,
    refresh: loadPreferences,
  };
}
