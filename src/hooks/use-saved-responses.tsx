import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface SavedResponse {
  id: string;
  scenario: string;
  context: string | null;
  original_response: string;
  feedback_json: any;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useSavedResponses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedResponses = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_response_coach_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedResponses(data || []);
    } catch (error: any) {
      console.error('Error fetching saved responses:', error);
      toast({
        title: "Error",
        description: "Failed to load saved responses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveResponse = async (
    scenario: string,
    context: string,
    originalResponse: string,
    feedbackJson: any,
    notes?: string
  ) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your response coach results",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('saved_response_coach_results')
        .insert({
          user_id: user.id,
          scenario,
          context,
          original_response: originalResponse,
          feedback_json: feedbackJson,
          notes
        })
        .select()
        .single();

      if (error) throw error;

      setSavedResponses(prev => [data, ...prev]);
      toast({
        title: "Saved",
        description: "Response coach results saved to your profile"
      });
      return data;
    } catch (error: any) {
      console.error('Error saving response:', error);
      toast({
        title: "Error",
        description: "Failed to save response",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteResponse = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_response_coach_results')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedResponses(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Deleted",
        description: "Saved response removed"
      });
      return true;
    } catch (error: any) {
      console.error('Error deleting response:', error);
      toast({
        title: "Error",
        description: "Failed to delete response",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_response_coach_results')
        .update({ notes })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedResponses(prev => 
        prev.map(r => r.id === id ? { ...r, notes } : r)
      );
      return true;
    } catch (error: any) {
      console.error('Error updating notes:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedResponses();
    } else {
      setSavedResponses([]);
    }
  }, [user]);

  return {
    savedResponses,
    loading,
    saveResponse,
    deleteResponse,
    updateNotes,
    refreshResponses: fetchSavedResponses
  };
}
