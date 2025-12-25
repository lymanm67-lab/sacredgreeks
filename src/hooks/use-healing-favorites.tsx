import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface HealingResource {
  title: string;
  category: string;
  type: string;
  description: string;
}

export const useHealingFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("content_json")
        .eq("user_id", user.id)
        .eq("bookmark_type", "healing_resource");

      if (error) throw error;

      const titles = data?.map((b) => {
        const content = b.content_json as { title?: string };
        return content?.title || "";
      }).filter(Boolean) || [];

      setFavorites(titles);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (resource: HealingResource) => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    const isFavorited = favorites.includes(resource.title);

    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("bookmark_type", "healing_resource")
          .filter("content_json->title", "eq", resource.title);

        if (error) throw error;

        setFavorites((prev) => prev.filter((t) => t !== resource.title));
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          bookmark_type: "healing_resource",
          content_json: {
            title: resource.title,
            category: resource.category,
            type: resource.type,
            description: resource.description,
          },
        });

        if (error) throw error;

        setFavorites((prev) => [...prev, resource.title]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  const isFavorite = (title: string) => favorites.includes(title);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    isAuthenticated: !!user,
  };
};
