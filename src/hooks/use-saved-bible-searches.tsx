import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface SavedSearch {
  id: string;
  search_query: string;
  search_type: string;
  results_json: any;
  created_at: string;
}

export function useSavedBibleSearches() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSavedSearches();
    } else {
      setSavedSearches([]);
      setLoading(false);
    }
  }, [user]);

  const loadSavedSearches = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_bible_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedSearches(data || []);
    } catch (error) {
      console.error('Error loading saved searches:', error);
      toast({
        title: 'Error loading saved searches',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSearch = async (query: string, searchType: string, results: any[]) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save searches',
        variant: 'destructive'
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('saved_bible_searches')
        .insert({
          user_id: user.id,
          search_query: query,
          search_type: searchType,
          results_json: results
        })
        .select()
        .single();

      if (error) throw error;

      setSavedSearches(prev => [data, ...prev]);
      
      toast({
        title: 'Search saved',
        description: 'You can access it from your saved searches',
      });

      return data;
    } catch (error) {
      console.error('Error saving search:', error);
      toast({
        title: 'Error saving search',
        description: 'Please try again later',
        variant: 'destructive'
      });
      return null;
    }
  };

  const deleteSearch = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('saved_bible_searches')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedSearches(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: 'Search deleted',
        description: 'The saved search has been removed',
      });
    } catch (error) {
      console.error('Error deleting search:', error);
      toast({
        title: 'Error deleting search',
        description: 'Please try again later',
        variant: 'destructive'
      });
    }
  };

  const isSearchSaved = (query: string, searchType: string) => {
    return savedSearches.some(
      s => s.search_query.toLowerCase() === query.toLowerCase() && 
           s.search_type === searchType
    );
  };

  return {
    savedSearches,
    loading,
    saveSearch,
    deleteSearch,
    isSearchSaved,
    refreshSearches: loadSavedSearches
  };
}