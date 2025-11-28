import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SubscriptionState {
  subscribed: boolean;
  tier: 'pro' | 'ministry' | null;
  subscriptionEnd: string | null;
  isTrialing: boolean;
  status: string | null;
  loading: boolean;
  error: string | null;
}

export function useSubscription() {
  const { user, session } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionState>({
    subscribed: false,
    tier: null,
    subscriptionEnd: null,
    isTrialing: false,
    status: null,
    loading: true,
    error: null,
  });

  const checkSubscription = useCallback(async () => {
    if (!session?.access_token) {
      setSubscription(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setSubscription(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscription({
        subscribed: data.subscribed || false,
        tier: data.tier || null,
        subscriptionEnd: data.subscription_end || null,
        isTrialing: data.is_trialing || false,
        status: data.status || null,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error checking subscription:', err);
      setSubscription(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to check subscription',
      }));
    }
  }, [session?.access_token]);

  // Check subscription on mount and when session changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscription({
        subscribed: false,
        tier: null,
        subscriptionEnd: null,
        isTrialing: false,
        status: null,
        loading: false,
        error: null,
      });
    }
  }, [user, checkSubscription]);

  // Refresh subscription status periodically (every 60 seconds)
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(checkSubscription, 60000);
    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  const createCheckout = async (priceId: string, trialDays: number) => {
    if (!session?.access_token) {
      throw new Error('Must be logged in to subscribe');
    }

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId, trialDays },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    if (data?.url) {
      window.open(data.url, '_blank');
    }
  };

  const openCustomerPortal = async () => {
    if (!session?.access_token) {
      throw new Error('Must be logged in to manage subscription');
    }

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;
    if (data?.url) {
      window.open(data.url, '_blank');
    }
  };

  return {
    ...subscription,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
}
