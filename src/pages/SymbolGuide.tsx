import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, AlertTriangle, CheckCircle, AlertCircle, Search, Bookmark, BookmarkCheck, Filter, Lightbulb } from 'lucide-react';
import { symbolGuideContent, ritualGuideContent, symbolCategories, SymbolEntry, RitualEntry } from '@/data/symbolGuideContent';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscernmentGuidanceDialog from '@/components/symbol-guide/DiscernmentGuidanceDialog';

const cautionLevels = [
  { id: 'all', label: 'All Levels', icon: null },
  { id: 'low', label: 'Low Concern', icon: CheckCircle, color: 'text-badge-success' },
  { id: 'medium', label: 'Use Discernment', icon: AlertCircle, color: 'text-badge-warning' },
  { id: 'high', label: 'Caution Needed', icon: AlertTriangle, color: 'text-badge-danger' },
];

const CautionBadge = ({ level }: { level: string }) => {
  if (level === 'low') return <Badge className="bg-badge-success/30 text-badge-success-foreground border-badge-success/50"><CheckCircle className="w-3 h-3 mr-1" /> Low Concern</Badge>;
  if (level === 'medium') return <Badge className="bg-badge-warning/20 text-badge-warning-foreground border-badge-warning/30"><AlertCircle className="w-3 h-3 mr-1" /> Use Discernment</Badge>;
  return <Badge className="bg-badge-danger/20 text-badge-danger-foreground border-badge-danger/30"><AlertTriangle className="w-3 h-3 mr-1" /> Caution Needed</Badge>;
};

interface BookmarkContent {
  itemId: string;
  itemType: 'symbol' | 'ritual';
}

interface SymbolBookmark {
  id: string;
  bookmark_type: string;
  content_json: BookmarkContent;
}

const SymbolGuide = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [symbolCategory, setSymbolCategory] = useState('all');
  const [cautionLevel, setCautionLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch bookmarks
  const { data: bookmarks = [] } = useQuery({
    queryKey: ['symbol-guide-bookmarks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .eq('bookmark_type', 'symbol-guide');
      if (error) throw error;
      return (data || []).map(b => ({
        id: b.id,
        bookmark_type: b.bookmark_type,
        content_json: b.content_json as unknown as BookmarkContent
      })) as SymbolBookmark[];
    },
    enabled: !!user,
  });

  // Add bookmark mutation
  const addBookmark = useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: string; itemType: 'symbol' | 'ritual' }) => {
      if (!user) throw new Error('Must be logged in');
      const { error } = await supabase.from('bookmarks').insert({
        user_id: user.id,
        bookmark_type: 'symbol-guide',
        content_json: { itemId, itemType },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symbol-guide-bookmarks'] });
      toast.success('Bookmarked for reference');
    },
    onError: () => toast.error('Failed to bookmark'),
  });

  // Remove bookmark mutation
  const removeBookmark = useMutation({
    mutationFn: async (bookmarkId: string) => {
      const { error } = await supabase.from('bookmarks').delete().eq('id', bookmarkId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symbol-guide-bookmarks'] });
      toast.success('Bookmark removed');
    },
    onError: () => toast.error('Failed to remove bookmark'),
  });

  const isBookmarked = (itemId: string, itemType: 'symbol' | 'ritual') => {
    return bookmarks.find(b => 
      b.content_json.itemId === itemId && 
      b.content_json.itemType === itemType
    );
  };

  const toggleBookmark = (itemId: string, itemType: 'symbol' | 'ritual') => {
    if (!user) {
      toast.error('Please sign in to bookmark items');
      return;
    }
    const existing = isBookmarked(itemId, itemType);
    if (existing) {
      removeBookmark.mutate(existing.id);
    } else {
      addBookmark.mutate({ itemId, itemType });
    }
  };

  const filteredSymbols = useMemo(() => {
    return symbolGuideContent.filter(s => {
      const matchesCategory = symbolCategory === 'all' || s.category === symbolCategory;
      const matchesCaution = cautionLevel === 'all' || s.cautionLevel === cautionLevel;
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.christianPerspective.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesCaution && matchesSearch;
    });
  }, [symbolCategory, cautionLevel, searchQuery]);

  const filteredRituals = useMemo(() => {
    return ritualGuideContent.filter(r => {
      const matchesCaution = cautionLevel === 'all' || r.cautionLevel === cautionLevel;
      const matchesSearch = searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.christianApproach.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCaution && matchesSearch;
    });
  }, [cautionLevel, searchQuery]);

  const renderSymbolCard = (symbol: SymbolEntry) => {
    const bookmarked = isBookmarked(symbol.id, 'symbol');
    return (
      <Card key={symbol.id}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{symbol.name}</CardTitle>
            <div className="flex items-center gap-2">
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleBookmark(symbol.id, 'symbol')}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-sacred" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              )}
              <CautionBadge level={symbol.cautionLevel} />
            </div>
          </div>
          <Badge variant="outline" className="w-fit capitalize">{symbol.category}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{symbol.description}</p>
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-1">Christian Perspective</h4>
            <p className="text-sm text-muted-foreground">{symbol.christianPerspective}</p>
          </div>
          {symbol.cautionNote && (
            <div className="bg-badge-warning/10 p-3 rounded-lg border border-badge-warning/20">
              <p className="text-sm text-badge-warning-foreground"><AlertCircle className="w-4 h-4 inline mr-1" /> {symbol.cautionNote}</p>
            </div>
          )}
          {symbol.cautionLevel === 'medium' && (
            <DiscernmentGuidanceDialog
              itemName={symbol.name}
              trigger={
                <Button variant="outline" size="sm" className="gap-2 w-full mt-2">
                  <Lightbulb className="w-4 h-4" />
                  View Guidance for Navigating This
                </Button>
              }
            />
          )}
          {symbol.scripturalContext && (
            <p className="text-xs text-muted-foreground italic">{symbol.scripturalContext}</p>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderRitualCard = (ritual: RitualEntry) => {
    const bookmarked = isBookmarked(ritual.id, 'ritual');
    return (
      <Card key={ritual.id}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{ritual.name}</CardTitle>
            <div className="flex items-center gap-2">
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleBookmark(ritual.id, 'ritual')}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-sacred" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              )}
              <CautionBadge level={ritual.cautionLevel} />
            </div>
          </div>
          <Badge variant="outline" className="w-fit capitalize">{ritual.category}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{ritual.description}</p>
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-1">Christian Approach</h4>
            <p className="text-sm text-muted-foreground">{ritual.christianApproach}</p>
          </div>
          {ritual.cautionNote && (
            <div className="bg-badge-warning/10 p-3 rounded-lg border border-badge-warning/20">
              <p className="text-sm text-badge-warning-foreground"><AlertCircle className="w-4 h-4 inline mr-1" /> {ritual.cautionNote}</p>
            </div>
          )}
          {ritual.cautionLevel === 'medium' && (
            <DiscernmentGuidanceDialog
              itemName={ritual.name}
              trigger={
                <Button variant="outline" size="sm" className="gap-2 w-full mt-2">
                  <Lightbulb className="w-4 h-4" />
                  View Guidance for Navigating This
                </Button>
              }
            />
          )}
          {ritual.alternatives && (
            <div className="bg-badge-success/10 p-3 rounded-lg border border-badge-success/20">
              <p className="text-sm text-badge-success-foreground"><CheckCircle className="w-4 h-4 inline mr-1" /> {ritual.alternatives}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold">Symbol & Ritual Guide</h1>
            <p className="text-sm text-muted-foreground">Christian perspectives on Greek symbolism</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6 bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-2">How to Use This Guide</h2>
            <p className="text-sm text-muted-foreground">This guide provides Christian perspectives on common symbols and rituals in Greek life. Each entry includes a caution level to help you think through participation. Remember: the goal is informed, prayerful decision-making—not fear or blanket condemnation.</p>
            <div className="mt-4">
              <DiscernmentGuidanceDialog
                trigger={
                  <Button variant="outline" size="sm" className="gap-2">
                    <Lightbulb className="w-4 h-4" />
                    View Discernment Guidance & Response Templates
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search symbols and rituals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Caution Level Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by Caution Level</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cautionLevels.map(level => (
                <Button
                  key={level.id}
                  variant={cautionLevel === level.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCautionLevel(level.id)}
                  className={cautionLevel === level.id ? 'bg-sacred hover:bg-sacred/90' : ''}
                >
                  {level.icon && <level.icon className={`w-3 h-3 mr-1 ${level.color}`} />}
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="symbols" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="symbols">Symbols ({filteredSymbols.length})</TabsTrigger>
            <TabsTrigger value="rituals">Rituals & Practices ({filteredRituals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="symbols" className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {symbolCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant={symbolCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSymbolCategory(cat.id)}
                  className={symbolCategory === cat.id ? 'bg-sacred hover:bg-sacred/90' : ''}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            {filteredSymbols.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No symbols found matching your filters</p>
              </Card>
            )}
            {filteredSymbols.map(renderSymbolCard)}
          </TabsContent>

          <TabsContent value="rituals" className="space-y-4">
            {filteredRituals.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No rituals found matching your filters</p>
              </Card>
            )}
            {filteredRituals.map(renderRitualCard)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SymbolGuide;
