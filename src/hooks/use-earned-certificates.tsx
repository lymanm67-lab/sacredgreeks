import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface EarnedCertificate {
  id: string;
  user_id: string;
  certificate_type: string;
  title: string;
  description: string | null;
  earned_at: string;
  certificate_data: {
    icon?: string;
    color?: string;
    completedSections?: number;
    totalSections?: number;
  };
  created_at: string;
}

export const CERTIFICATE_TYPES = {
  GREEK_LIFE_TRAINING: 'greek_life_training',
  PROOF_COURSE: 'proof_course',
  FAITH_AUTHORITY: 'faith_authority',
  MYTH_BUSTER: 'myth_buster',
  MASTER_CERTIFICATION: 'master_certification',
} as const;

export function useEarnedCertificates() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: certificates, isLoading } = useQuery({
    queryKey: ['earned-certificates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('earned_certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      return data as EarnedCertificate[];
    },
    enabled: !!user,
  });

  const awardCertificate = useMutation({
    mutationFn: async ({
      certificate_type,
      title,
      description,
      certificate_data,
    }: {
      certificate_type: string;
      title: string;
      description?: string;
      certificate_data?: { icon?: string; color?: string; completedSections?: number; totalSections?: number };
    }) => {
      if (!user) throw new Error('User not authenticated');

      // Check if certificate already exists
      const { data: existing } = await supabase
        .from('earned_certificates')
        .select('id')
        .eq('user_id', user.id)
        .eq('certificate_type', certificate_type)
        .single();

      if (existing) {
        return existing; // Already awarded
      }

      const { data, error } = await supabase
        .from('earned_certificates')
        .insert([{
          user_id: user.id,
          certificate_type,
          title,
          description: description || null,
          certificate_data: (certificate_data || {}) as unknown as import('@/integrations/supabase/types').Json,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['earned-certificates'] });
      toast.success(`🏆 Certificate Earned: ${variables.title}`, {
        description: 'View it in your Training Success Vault!',
        duration: 5000,
      });
    },
  });

  const hasCertificate = (certificateType: string) => {
    return certificates?.some(c => c.certificate_type === certificateType) ?? false;
  };

  return {
    certificates,
    isLoading,
    awardCertificate,
    hasCertificate,
  };
}
