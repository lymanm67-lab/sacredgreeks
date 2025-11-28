import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, CheckCircle, AlertCircle, Bookmark, Book, User, Calendar, ExternalLink } from 'lucide-react';
import { symbolGuideContent, ritualGuideContent } from '@/data/symbolGuideContent';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface BookmarkContent {
  itemId: string;
  itemType: 'symbol' | 'ritual';
}

interface SymbolBookmark {
  id: string;
  bookmark_type: string;
  content_json: BookmarkContent;
  notes: string | null;
}

const CautionBadge = ({ level }: { level: string }) => {
  if (level === 'low') return <Badge className="bg-badge-success/30 text-badge-success-foreground border-badge-success/50"><CheckCircle className="w-3 h-3 mr-1" /> Low Concern</Badge>;
  if (level === 'medium') return <Badge className="bg-badge-warning/20 text-badge-warning-foreground border-badge-warning/30"><AlertCircle className="w-3 h-3 mr-1" /> Use Discernment</Badge>;
  return <Badge className="bg-badge-danger/20 text-badge-danger-foreground border-badge-danger/30"><AlertTriangle className="w-3 h-3 mr-1" /> Caution Needed</Badge>;
};

const SharedSymbolBookmarks = () => {
  const { shareToken } = useParams<{ shareToken: string }>();

  // Fetch shared collection
  const { data: sharedCollection, isLoading, error } = useQuery({
    queryKey: ['shared-symbol-bookmarks', shareToken],
    queryFn: async () => {
      if (!shareToken) throw new Error('No share token');
      
      // Get shared collection
      const { data: collection, error: collectionError } = await supabase
        .from('shared_symbol_bookmarks')
        .select('*')
        .eq('share_token', shareToken)
        .eq('is_public', true)
        .single();
      
      if (collectionError) throw collectionError;
      
      // Update view count
      await supabase
        .from('shared_symbol_bookmarks')
        .update({ view_count: (collection.view_count || 0) + 1 })
        .eq('id', collection.id);
      
      // Get bookmarks
      const bookmarkIds = collection.bookmark_ids as string[];
      if (bookmarkIds.length === 0) return { collection, bookmarks: [] };
      
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('*')
        .in('id', bookmarkIds);
      
      if (bookmarksError) throw bookmarksError;
      
      return {
        collection,
        bookmarks: (bookmarks || []).map(b => ({
          id: b.id,
          bookmark_type: b.bookmark_type,
          content_json: b.content_json as unknown as BookmarkContent,
          notes: b.notes
        })) as SymbolBookmark[]
      };
    },
    enabled: !!shareToken,
  });

  const getItemDetails = (bookmark: SymbolBookmark) => {
    if (bookmark.content_json.itemType === 'symbol') {
      return symbolGuideContent.find(s => s.id === bookmark.content_json.itemId);
    }
    return ritualGuideContent.find(r => r.id === bookmark.content_json.itemId);
  };

  const getScriptureLink = (reference: string) => {
    const encoded = encodeURIComponent(reference);
    return `/bible-study?search=${encoded}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-sacred border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading shared collection...</p>
        </div>
      </div>
    );
  }

  if (error || !sharedCollection) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-xl font-bold">Shared Collection</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="text-center py-12">
            <CardContent>
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-badge-warning" />
              <h2 className="text-xl font-semibold mb-2">Collection Not Found</h2>
              <p className="text-muted-foreground mb-6">
                This shared collection may have expired or doesn't exist.
              </p>
              <Link to="/symbol-guide">
                <Button>Explore Symbol Guide</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const { collection, bookmarks } = sharedCollection;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold">Shared Symbol Collection</h1>
            <p className="text-sm text-muted-foreground">Christian perspectives for mentoring</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Collection Header */}
        <Card className="mb-6 bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{collection.title}</CardTitle>
                {collection.description && (
                  <p className="text-sm text-muted-foreground mt-2">{collection.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-sacred" />
                <Badge variant="outline">{bookmarks.length} items</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Shared {new Date(collection.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {collection.view_count || 0} views
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Bookmarked Items */}
        <div className="space-y-4">
          {bookmarks.map(bookmark => {
            const item = getItemDetails(bookmark);
            if (!item) return null;
            
            const isSymbol = bookmark.content_json.itemType === 'symbol';
            const scriptureRef = isSymbol && 'scripturalContext' in item ? item.scripturalContext : null;
            
            return (
              <Card key={bookmark.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">{bookmark.content_json.itemType}</Badge>
                        <CautionBadge level={item.cautionLevel} />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">
                      {isSymbol ? 'Christian Perspective' : 'Christian Approach'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isSymbol && 'christianPerspective' in item ? item.christianPerspective : ''}
                      {!isSymbol && 'christianApproach' in item ? item.christianApproach : ''}
                    </p>
                  </div>
                  
                  {/* Scripture Reference with Link */}
                  {scriptureRef && (
                    <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-foreground italic flex-1">
                          <Book className="w-4 h-4 inline mr-1 text-sacred" />
                          {scriptureRef}
                        </p>
                        <Link to={getScriptureLink(scriptureRef.split(' - ')[0])}>
                          <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                            <ExternalLink className="w-3 h-3" />
                            Study
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {/* Personal Notes */}
                  {bookmark.notes && (
                    <div className="bg-warm-blue/10 p-3 rounded-lg border border-warm-blue/20">
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" /> Mentor's Notes
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{bookmark.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 text-center">
          <CardContent className="py-8">
            <h3 className="font-semibold mb-2">Want to Create Your Own Collection?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore the full Symbol Guide and bookmark items with your own notes.
            </p>
            <Link to="/symbol-guide">
              <Button className="gap-2">
                <Book className="w-4 h-4" />
                Explore Symbol Guide
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SharedSymbolBookmarks;
