import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  icon: any;
  category: "about" | "book" | "articles" | "testimonials";
  requiresAuth?: boolean;
  badge?: string;
  downloadUrl?: string;
  tags?: string[];
  reason?: string;
}

export const useResourceRecommendations = () => {
  const [recommendations, setRecommendations] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecommendations = async (currentResource: any, allResources: any[]) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recommend-resources', {
        body: {
          currentResource: {
            title: currentResource.title,
            description: currentResource.description,
            category: currentResource.category,
            tags: currentResource.tags,
            url: currentResource.url
          },
          allResources: allResources.map(r => ({
            title: r.title,
            description: r.description,
            category: r.category,
            tags: r.tags,
            url: r.url,
            icon: r.icon
          }))
        }
      });

      if (error) {
        console.error('Error fetching recommendations:', error);
        toast.error('Failed to load recommendations');
        return;
      }

      if (data?.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
  };

  return {
    recommendations,
    isLoading,
    fetchRecommendations,
    clearRecommendations
  };
};
