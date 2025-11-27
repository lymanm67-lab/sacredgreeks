import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface DailyVerse {
  id: string;
  verse_ref: string;
  verse_text: string;
  theme: string;
  reflection: string | null;
  image_url: string | null;
}

export function VerseOfTheDay() {
  const { user } = useAuth();
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    loadVerse();
    if (user) {
      checkBookmark();
    }
  }, [user]);

  const loadVerse = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('daily_verses')
        .select('*')
        .eq('date', today)
        .maybeSingle();

      if (error) throw error;
      setVerse(data);
    } catch (error) {
      console.error('Error loading verse:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkBookmark = async () => {
    if (!user || !verse) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('bookmark_type', 'verse')
        .eq('content_json->>verse_ref', verse.verse_ref)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setBookmarked(!!data);
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  const toggleBookmark = async () => {
    if (!user || !verse) {
      toast.error('Please sign in to bookmark verses');
      return;
    }

    try {
      if (bookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('bookmark_type', 'verse')
          .eq('content_json->>verse_ref', verse.verse_ref);

        if (error) throw error;
        setBookmarked(false);
        toast.success('Bookmark removed');
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            bookmark_type: 'verse',
            content_json: {
              verse_ref: verse.verse_ref,
              verse_text: verse.verse_text,
              theme: verse.theme,
            },
          });

        if (error) throw error;
        setBookmarked(true);
        toast.success('Verse bookmarked!');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const shareVerse = async () => {
    if (!verse) return;

    const shareText = `${verse.verse_text}\n\n- ${verse.verse_ref}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Verse of the Day',
          text: shareText,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        toast.success('Verse copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy verse');
      }
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Verse of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading today's verse...</p>
        </CardContent>
      </Card>
    );
  }

  if (!verse) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Verse of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No verse available today. Check back tomorrow!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Verse of the Day
          </CardTitle>
          <Badge variant="secondary">{verse.theme}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main verse */}
        <div className="space-y-3">
          <blockquote className="text-lg font-serif italic leading-relaxed border-l-4 border-primary pl-4">
            "{verse.verse_text}"
          </blockquote>
          <p className="text-sm font-medium text-primary">
            — {verse.verse_ref}
          </p>
        </div>

        {/* Reflection */}
        {verse.reflection && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {verse.reflection}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={toggleBookmark}
          >
            {bookmarked ? (
              <>
                <BookmarkCheck className="h-4 w-4 mr-2" />
                Bookmarked
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={shareVerse}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}