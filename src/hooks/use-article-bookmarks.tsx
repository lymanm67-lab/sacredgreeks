import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ArticleBookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  readTime?: string;
}

export function useArticleBookmarks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBookmarks();
    } else {
      setBookmarkedArticles(new Set());
      setLoading(false);
    }
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('content_json')
        .eq('user_id', user.id)
        .eq('bookmark_type', 'article');

      if (error) throw error;

      const articleIds = new Set(
        data?.map((bookmark: any) => bookmark.content_json.id) || []
      );
      setBookmarkedArticles(articleIds);
    } catch (error) {
      console.error('Error loading article bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (article: ArticleBookmark) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to bookmark articles',
        variant: 'destructive',
      });
      return;
    }

    const isBookmarked = bookmarkedArticles.has(article.id);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('bookmark_type', 'article')
          .eq('content_json->>id', article.id);

        if (error) throw error;

        setBookmarkedArticles(prev => {
          const newSet = new Set(prev);
          newSet.delete(article.id);
          return newSet;
        });

        toast({
          title: 'Bookmark removed',
          description: 'Article removed from your bookmarks',
        });
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            bookmark_type: 'article',
            content_json: article as any,
          });

        if (error) throw error;

        setBookmarkedArticles(prev => new Set([...prev, article.id]));

        toast({
          title: 'Bookmark added',
          description: 'Article saved to your bookmarks',
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to update bookmark',
        variant: 'destructive',
      });
    }
  };

  const isBookmarked = (articleId: string) => {
    return bookmarkedArticles.has(articleId);
  };

  return {
    bookmarkedArticles,
    loading,
    toggleBookmark,
    isBookmarked,
  };
}
