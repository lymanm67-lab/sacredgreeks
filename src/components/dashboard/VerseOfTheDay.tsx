import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ListenButton } from '@/components/ListenButton';

interface DailyVerse {
  id: string;
  verse_ref: string;
  verse_text: string;
  theme: string;
  reflection: string | null;
  image_url: string | null;
}

// Fallback verses for demo/empty state
const FALLBACK_VERSES: DailyVerse[] = [
  {
    id: 'fallback-1',
    verse_ref: 'Proverbs 27:17',
    verse_text: 'As iron sharpens iron, so one person sharpens another.',
    theme: 'Brotherhood & Fellowship',
    reflection: 'True fellowship isn\'t just about good times—it\'s about mutual growth. In Greek life, we have the unique opportunity to sharpen one another spiritually while honoring our organizational commitments.',
    image_url: null,
  },
  {
    id: 'fallback-2',
    verse_ref: 'Colossians 3:23-24',
    verse_text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    theme: 'Excellence & Service',
    reflection: 'Whether studying, serving your chapter, or worshiping God, bring your full effort. Excellence in Greek life and faith aren\'t competing goals—they flow from the same source.',
    image_url: null,
  },
  {
    id: 'fallback-3',
    verse_ref: 'Romans 12:2',
    verse_text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
    theme: 'Transformation',
    reflection: 'Being in Greek life means navigating cultural pressures while staying rooted in faith. Let your mind be renewed daily through Scripture and prayer.',
    image_url: null,
  },
  {
    id: 'fallback-4',
    verse_ref: '1 Corinthians 10:31',
    verse_text: 'So whether you eat or drink or whatever you do, do it all for the glory of God.',
    theme: 'Living for God\'s Glory',
    reflection: 'Every step show, every service project, every chapter meeting can glorify God when done with the right heart and intention.',
    image_url: null,
  },
  {
    id: 'fallback-5',
    verse_ref: 'Hebrews 10:24-25',
    verse_text: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.',
    theme: 'Community',
    reflection: 'Both your Greek organization and your faith community call you to gather, encourage, and push each other toward growth. These aren\'t competing callings.',
    image_url: null,
  },
];

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
      
      if (data) {
        setVerse(data);
      } else {
        // Use fallback verse based on day of year for variety
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const fallbackIndex = dayOfYear % FALLBACK_VERSES.length;
        setVerse(FALLBACK_VERSES[fallbackIndex]);
      }
    } catch (error) {
      console.error('Error loading verse:', error);
      // Use fallback on error too
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const fallbackIndex = dayOfYear % FALLBACK_VERSES.length;
      setVerse(FALLBACK_VERSES[fallbackIndex]);
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
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">
              — {verse.verse_ref}
            </p>
            <ListenButton
              text={`${verse.verse_ref}. ${verse.verse_text}`}
              itemId={`verse-${verse.id}`}
              title="Verse of the Day"
              showLabel={false}
              size="sm"
              variant="ghost"
            />
          </div>
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