import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useBetaStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBetaTester, setIsBetaTester] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBetaStatus();
  }, [user]);

  const checkBetaStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from('beta_testers')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setIsBetaTester(true);
        setOnboardingCompleted(data.onboarding_completed);
        
        // Redirect to onboarding if not completed
        if (!data.onboarding_completed && window.location.pathname !== '/beta-onboarding') {
          navigate('/beta-onboarding');
        }
      }
    } catch (error) {
      console.error('Error checking beta status:', error);
    } finally {
      setLoading(false);
    }
  };

  return { isBetaTester, onboardingCompleted, loading };
}
