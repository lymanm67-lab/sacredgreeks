import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Home, Bookmark, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BookmarkItem {
  id: string;
  bookmark_type: string;
  content_json: any;
  notes: string | null;
  created_at: string;
}

const Bookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load bookmarks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setBookmarks(bookmarks.filter(b => b.id !== deleteId));
      toast({
        title: 'Bookmark deleted',
        description: 'The bookmark has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete bookmark',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleSaveNotes = async (bookmarkId: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .update({ notes: notesText })
        .eq('id', bookmarkId);

      if (error) throw error;

      setBookmarks(bookmarks.map(b => 
        b.id === bookmarkId ? { ...b, notes: notesText } : b
      ));
      setEditingNotes(null);
      toast({
        title: 'Notes saved',
        description: 'Your notes have been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    }
  };

  const getBookmarkTitle = (bookmark: BookmarkItem) => {
    if (bookmark.bookmark_type === 'assessment') {
      return `Assessment: ${bookmark.content_json.scenario || 'Unknown'}`;
    } else if (bookmark.bookmark_type === 'devotional') {
      return bookmark.content_json.title || 'Devotional';
    } else if (bookmark.bookmark_type === 'prayer') {
      return bookmark.content_json.title || 'Prayer';
    }
    return 'Bookmark';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Bookmarks</h1>
              <p className="text-muted-foreground">Your saved items</p>
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Bookmarks Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Save assessments, devotionals, or prayers to access them quickly
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookmarks.map((bookmark) => (
                <Card key={bookmark.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">
                            {getBookmarkTitle(bookmark)}
                          </CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {bookmark.bookmark_type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(bookmark.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingNotes === bookmark.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Add your notes..."
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveNotes(bookmark.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNotes(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {bookmark.notes ? (
                          <p className="text-sm mb-2">{bookmark.notes}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground mb-2">No notes added</p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingNotes(bookmark.id);
                            setNotesText(bookmark.notes || '');
                          }}
                        >
                          {bookmark.notes ? 'Edit Notes' : 'Add Notes'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bookmark?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This bookmark will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Bookmarks;
