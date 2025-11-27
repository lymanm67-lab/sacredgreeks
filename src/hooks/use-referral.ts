import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Referral {
  id: string;
  referral_code: string;
  referred_user_id: string | null;
  status: string;
  converted_at: string | null;
  reward_earned: number;
  created_at: string;
}

interface UseReferralOptions {
  userId?: string | null;
}

export function useReferral(options?: UseReferralOptions) {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvites: 0,
    successfulInvites: 0,
    pendingInvites: 0,
    totalPoints: 0,
  });

  const userId = options?.userId;

  const fetchReferralData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data: referralData, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (referralData && referralData.length > 0) {
        setReferrals(referralData);
        setReferralCode(referralData[0].referral_code);
        
        const successful = referralData.filter(r => r.status === 'converted').length;
        const pending = referralData.filter(r => r.status === 'pending').length;
        const totalPoints = referralData.reduce((sum, r) => sum + r.reward_earned, 0);
        
        setStats({
          totalInvites: referralData.length,
          successfulInvites: successful,
          pendingInvites: pending,
          totalPoints,
        });
      } else {
        await generateReferralCode();
      }
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const generateReferralCode = async () => {
    if (!userId) return null;

    try {
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_referral_code');

      if (codeError) throw codeError;

      const newCode = codeData || `SG${userId.slice(0, 6).toUpperCase()}`;

      const { data, error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: userId,
          referral_code: newCode,
          status: 'pending',
          reward_earned: 0,
        })
        .select()
        .single();

      if (error) throw error;

      setReferralCode(newCode);
      return newCode;
    } catch (error) {
      console.error('Error generating referral code:', error);
      return null;
    }
  };

  const getReferralLink = () => {
    const baseUrl = 'https://www.sacredgreekslife.com';
    return referralCode ? `${baseUrl}/auth?ref=${referralCode}` : baseUrl;
  };

  const copyReferralLink = async () => {
    const link = getReferralLink();
    await navigator.clipboard.writeText(link);
    toast({
      title: 'Referral Link Copied!',
      description: 'Share it with friends to earn points',
    });
  };

  const shareReferral = async () => {
    const link = getReferralLink();
    const message = `Join me on Sacred Greeks Life! Use my referral link to sign up: ${link}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Sacred Greeks Life',
          text: message,
          url: link,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await copyReferralLink();
    }
  };

  const textReferral = () => {
    const link = getReferralLink();
    const message = `Join me on Sacred Greeks Life! Use my referral link to sign up: ${link}`;
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const smsUrl = isIOS 
        ? `sms:&body=${encodeURIComponent(message)}`
        : `sms:?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl;
    } else {
      navigator.clipboard.writeText(message);
      toast({
        title: 'Message Copied!',
        description: 'Paste it in your messaging app',
      });
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, [fetchReferralData]);

  return {
    referralCode,
    referrals,
    stats,
    loading,
    getReferralLink,
    copyReferralLink,
    shareReferral,
    textReferral,
    refreshReferrals: fetchReferralData,
  };
}
