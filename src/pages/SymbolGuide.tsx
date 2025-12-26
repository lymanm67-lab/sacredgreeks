import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ArrowLeft, AlertTriangle, CheckCircle, AlertCircle, Search, Bookmark, BookmarkCheck, Lightbulb, ChevronDown, ChevronUp, Edit2, Trash2, ExternalLink, Share2, FileDown, Scale, History, Sparkles, Printer, Crown, Building, GraduationCap, Landmark, Users, Heart, Scroll, BookOpen, LayoutGrid, List, Filter } from 'lucide-react';
import { symbolGuideContent, ritualGuideContent, symbolCategories, customsSubcategories, culturalComparisons, culturalComparisonCategories, SymbolEntry, RitualEntry, CulturalComparisonEntry } from '@/data/symbolGuideContent';
import { getSymbolImageUrl } from '@/data/symbolImageUrls';
import { ListenButton } from '@/components/ListenButton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscernmentGuidanceDialog from '@/components/symbol-guide/DiscernmentGuidanceDialog';
import BookmarkNotesDialog from '@/components/symbol-guide/BookmarkNotesDialog';
import ShareBookmarksDialog from '@/components/symbol-guide/ShareBookmarksDialog';
import PrintComparisonGuideDialog from '@/components/symbol-guide/PrintComparisonGuideDialog';
import ExpandableImage from '@/components/symbol-guide/ExpandableImage';


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
  notes: string | null;
}

// Category icons for better visual navigation
const categoryIcons: Record<string, React.ReactNode> = {
  organizational: <Badge variant="outline" className="gap-1"><Building className="w-3 h-3" /> Organizational</Badge>,
  cultural: <Badge variant="outline" className="gap-1"><Users className="w-3 h-3" /> Cultural</Badge>,
  ritual: <Badge variant="outline" className="gap-1"><History className="w-3 h-3" /> Ritual</Badge>,
  deity: <Badge variant="outline" className="gap-1"><Crown className="w-3 h-3" /> Deity</Badge>,
  seals: <Badge variant="outline" className="gap-1"><Landmark className="w-3 h-3" /> Seals</Badge>,
  symbols: <Badge variant="outline" className="gap-1"><Sparkles className="w-3 h-3" /> Symbols</Badge>,
  oaths: <Badge variant="outline" className="gap-1"><Scroll className="w-3 h-3" /> Oaths</Badge>,
  customs: <Badge variant="outline" className="gap-1"><Heart className="w-3 h-3" /> Customs</Badge>,
};

type OathTone = 'amber' | 'blue' | 'emerald' | 'muted';

function OathSection({
  title,
  content,
  tone,
  defaultOpen,
}: {
  title: string;
  content: string;
  tone: OathTone;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  const toneClasses: Record<OathTone, { summary: string; icon: React.ReactNode; label?: string }> = {
    amber: {
      summary: 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40',
      icon: <History className="w-4 h-4" />,
    },
    blue: {
      summary: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/40',
      icon: <BookOpen className="w-4 h-4" />,
      label: 'English Translation',
    },
    emerald: {
      summary: 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40',
      icon: <Scroll className="w-4 h-4" />,
    },
    muted: {
      summary: 'bg-muted/50 hover:bg-muted border-border',
      icon: <Scroll className="w-4 h-4" />,
    },
  };

  const toneDef = toneClasses[tone];

  return (
    <div className="space-y-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-full p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between',
          toneDef.summary,
        )}
        aria-expanded={open}
      >
        <h5 className="font-semibold text-sm flex items-center gap-2 text-left">
          {toneDef.icon}
          {toneDef.label ?? title}
        </h5>
        <ChevronDown className={cn('w-4 h-4 transition-transform', open ? 'rotate-180' : '')} />
      </button>

      {open && (
        <div className="bg-muted/40 p-3 rounded-b-lg border border-t-0">
          <p
            className={cn(
              'text-sm text-foreground whitespace-pre-wrap',
              title.startsWith('ORIGINAL') ? 'italic font-serif' : '',
            )}
          >
            {content}
          </p>
        </div>
      )}
    </div>
  );
}

const SymbolGuide = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [symbolCategory, setSymbolCategory] = useState('all');
  const [customsSubcategory, setCustomsSubcategory] = useState('all');
  const [comparisonCategory, setComparisonCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [activeTab, setActiveTab] = useState('symbols');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [notesDialog, setNotesDialog] = useState<{
    open: boolean;
    itemId: string;
    itemType: 'symbol' | 'ritual';
    itemName: string;
    notes: string;
    bookmarkId?: string;
  }>({ open: false, itemId: '', itemType: 'symbol', itemName: '', notes: '' });

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
        content_json: b.content_json as unknown as BookmarkContent,
        notes: b.notes
      })) as SymbolBookmark[];
    },
    enabled: !!user,
  });

  // Add bookmark mutation
  const addBookmark = useMutation({
    mutationFn: async ({ itemId, itemType, notes }: { itemId: string; itemType: 'symbol' | 'ritual'; notes?: string }) => {
      if (!user) throw new Error('Must be logged in');
      const { error } = await supabase.from('bookmarks').insert({
        user_id: user.id,
        bookmark_type: 'symbol-guide',
        content_json: { itemId, itemType },
        notes: notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symbol-guide-bookmarks'] });
      toast.success('Added to bookmarks');
    },
  });

  // Update bookmark mutation
  const updateBookmark = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from('bookmarks')
        .update({ notes })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symbol-guide-bookmarks'] });
      toast.success('Notes updated');
    },
  });

  // Remove bookmark mutation
  const removeBookmark = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('bookmarks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symbol-guide-bookmarks'] });
      toast.success('Removed from bookmarks');
    },
  });

  const getBookmark = (itemId: string, itemType: 'symbol' | 'ritual') => {
    return bookmarks.find(b => b.content_json.itemId === itemId && b.content_json.itemType === itemType);
  };

  const handleBookmarkClick = (itemId: string, itemType: 'symbol' | 'ritual', itemName: string) => {
    const existing = getBookmark(itemId, itemType);
    if (existing) {
      setNotesDialog({
        open: true,
        itemId,
        itemType,
        itemName,
        notes: existing.notes || '',
        bookmarkId: existing.id,
      });
    } else {
      setNotesDialog({
        open: true,
        itemId,
        itemType,
        itemName,
        notes: '',
        bookmarkId: undefined,
      });
    }
  };

  const handleSaveNotes = (notes: string) => {
    if (notesDialog.bookmarkId) {
      updateBookmark.mutate({ id: notesDialog.bookmarkId, notes });
    } else {
      addBookmark.mutate({ itemId: notesDialog.itemId, itemType: notesDialog.itemType, notes });
    }
    setNotesDialog(prev => ({ ...prev, open: false }));
  };

  const getItemDetails = (bookmark: SymbolBookmark) => {
    if (bookmark.content_json.itemType === 'symbol') {
      return symbolGuideContent.find(s => s.id === bookmark.content_json.itemId);
    } else {
      return ritualGuideContent.find(r => r.id === bookmark.content_json.itemId);
    }
  };

  const getScriptureLink = (reference: string | undefined) => {
    if (!reference) return '#';
    const match = reference.match(/^([A-Za-z0-9\s]+)/);
    if (!match) return '#';
    const bookAndVerse = match[1].trim().replace(/\s+/g, '+');
    return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(bookAndVerse)}&version=NIV`;
  };

  const exportBookmarksPDF = () => {
    const content: string[] = [
      '═'.repeat(50),
      '',
      '   MY SACRED GREEKS SYMBOL GUIDE BOOKMARKS',
      '',
      '═'.repeat(50),
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
    ];

    bookmarks.forEach((bookmark, index) => {
      const item = getItemDetails(bookmark);
      if (!item) return;
      
      const isSymbol = bookmark.content_json.itemType === 'symbol';
      const scriptureRef = isSymbol && 'scripturalContext' in item ? item.scripturalContext : 
                          !isSymbol && 'scripturalContext' in item ? item.scripturalContext : null;
      
      content.push(`${index + 1}. ${item.name}`);
      content.push(`   Type: ${bookmark.content_json.itemType.charAt(0).toUpperCase() + bookmark.content_json.itemType.slice(1)}`);
      content.push(`   Caution Level: ${item.cautionLevel.charAt(0).toUpperCase() + item.cautionLevel.slice(1)}`);
      content.push('');
      content.push(`   Description: ${item.description}`);
      content.push('');
      content.push(`   Christian Perspective: ${isSymbol && 'christianPerspective' in item ? item.christianPerspective : ''}`);
      content.push(`   ${!isSymbol && 'christianApproach' in item ? 'Christian Approach: ' + item.christianApproach : ''}`);
      
      if (scriptureRef) {
        content.push('');
        content.push(`   Scripture: ${scriptureRef}`);
      }
      
      if (bookmark.notes) {
        content.push('');
        content.push(`   MY PERSONAL NOTES:`);
        content.push(`   ${bookmark.notes}`);
      }
      
      content.push('');
      content.push('-'.repeat(50));
      content.push('');
    });

    content.push('');
    content.push('Sacred Greeks - Faith & Greek Life Together');

    const blob = new Blob([content.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sacred-greeks-bookmarks-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Bookmarks exported successfully!');
  };

  const filteredSymbols = useMemo(() => {
    return symbolGuideContent.filter(s => {
      const matchesCategory = symbolCategory === 'all' || s.category === symbolCategory;
      // Apply subcategory filter when customs is selected
      const matchesSubcategory = symbolCategory !== 'customs' || 
        customsSubcategory === 'all' || 
        s.organizationType === customsSubcategory;
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.christianPerspective.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [symbolCategory, customsSubcategory, searchQuery]);

  const filteredRituals = useMemo(() => {
    return ritualGuideContent.filter(r => {
      const matchesSearch = searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.christianApproach.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const filteredComparisons = useMemo(() => {
    return culturalComparisons.filter(c => {
      const matchesCategory = comparisonCategory === 'all' || c.category === comparisonCategory;
      const matchesSearch = searchQuery === '' ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.ancientConnection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.modernUsage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.appUsage.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [comparisonCategory, searchQuery]);

  const renderComparisonCard = (comparison: CulturalComparisonEntry) => {
    const categoryLabel = culturalComparisonCategories.find(c => c.id === comparison.category)?.label || comparison.category;
    return (
      <Card key={comparison.id} className="overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-sacred/5 to-warm-blue/5">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{comparison.symbol}</CardTitle>
            <Badge variant="outline" className="w-fit capitalize shrink-0">{categoryLabel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid gap-3">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <History className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400 mb-1">Ancient Connection</h4>
                <p className="text-sm text-muted-foreground">{comparison.ancientConnection}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-badge-success/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-badge-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-badge-success mb-1">How It Shows Up Today</h4>
                <p className="text-sm text-muted-foreground">{comparison.modernUsage}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-sacred/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-sacred" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-sacred mb-1">How This Helps You</h4>
                <p className="text-sm text-muted-foreground">{comparison.appUsage}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSymbolCard = (symbol: SymbolEntry) => {
    const bookmark = getBookmark(symbol.id, 'symbol');
    const CategoryBadge = categoryIcons[symbol.category] || <Badge variant="outline" className="capitalize">{symbol.category}</Badge>;
    const imageUrl = getSymbolImageUrl(symbol.id) || symbol.imageUrl;
    
    return (
      <Card key={symbol.id} className="overflow-hidden">
        {/* Symbol Image */}
        {imageUrl && (
          <ExpandableImage
            src={imageUrl}
            alt={symbol.name}
            className="w-full h-full object-cover"
            containerClassName="h-48 w-full overflow-hidden bg-gradient-to-br from-sacred/5 to-muted"
          />
        )}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">{symbol.name}</CardTitle>
              {symbol.organizationType && (
                <Badge variant="secondary" className="text-xs font-normal">
                  {symbol.organizationType}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleBookmarkClick(symbol.id, 'symbol', symbol.name)}
                >
                  {bookmark ? (
                    <BookmarkCheck className="w-4 h-4 text-sacred" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              )}
              <CautionBadge level={symbol.cautionLevel} />
            </div>
          </div>
          {CategoryBadge}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground">{symbol.description}</p>
          
          {/* The Double Standard */}
          {symbol.doubleStandard && (
            <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <h4 className="font-semibold text-sm mb-1 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                The Double Standard
              </h4>
              <p className="text-sm text-muted-foreground">{symbol.doubleStandard}</p>
            </div>
          )}
          
          {/* Christian Perspective */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-1">Christian Perspective</h4>
            <p className="text-sm text-muted-foreground">{symbol.christianPerspective}</p>
          </div>
          
          {/* Biblical Parallels */}
          {symbol.biblicalParallels && symbol.biblicalParallels.length > 0 && (
            <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
              <h4 className="font-semibold text-sm mb-2 text-sacred flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Biblical Parallels
              </h4>
              <ul className="space-y-1">
                {symbol.biblicalParallels.map((parallel, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-sacred mt-0.5">•</span>
                    <span>{parallel}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Scripture References */}
          {symbol.scriptureReferences && symbol.scriptureReferences.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium text-muted-foreground">Scripture:</span>
              {symbol.scriptureReferences.map((ref, index) => (
                <Link key={index} to={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=NIV`} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="text-xs hover:bg-sacred/10 hover:border-sacred/50 cursor-pointer transition-colors">
                    {ref}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          
          {/* Caution Note - with special formatting for oaths */}
          {symbol.cautionNote && (
            symbol.category === 'oaths' ? (
              <div className="space-y-2">
                {(() => {
                  const note = symbol.cautionNote;

                  const headerRegex = /(ORIGINAL GREEK TEXT[^:]*:|ORIGINAL LATIN[^:]*:|ORIGINAL ENGLISH TRANSLATION:|MODERN[^:]*:|DECLARATION OF GENEVA[^:]*:|CONSTITUTIONAL TEXT[^:]*:|TRADITIONAL ADDITION[^:]*:|AFFIRMATION OPTION[^:]*:)/g;
                  const headers = Array.from(note.matchAll(headerRegex));
                  if (headers.length === 0) return null;

                  return headers.map((h, i) => {
                    const title = h[0].replace(/:$/, "");
                    const start = (h.index ?? 0) + h[0].length;
                    const end = i + 1 < headers.length ? (headers[i + 1].index ?? note.length) : note.length;
                    const rawContent = note.slice(start, end).trim();
                    const content = rawContent.replace(/^'+|'+$/g, "");

                    const isOriginal = title.startsWith('ORIGINAL GREEK TEXT') || title.startsWith('ORIGINAL LATIN');
                    const isEnglish = title.startsWith('ORIGINAL ENGLISH TRANSLATION');
                    const isModern = title.startsWith('MODERN') || title.startsWith('DECLARATION OF GENEVA') || title.startsWith('CONSTITUTIONAL TEXT') || title.startsWith('TRADITIONAL ADDITION') || title.startsWith('AFFIRMATION OPTION');

                    const tone: OathTone = isOriginal ? 'amber' : isEnglish ? 'blue' : isModern ? 'emerald' : 'muted';

                    return (
                      <OathSection
                        key={`${symbol.id}-oath-${i}`}
                        title={title}
                        content={content}
                        tone={tone}
                        defaultOpen={isModern}
                      />
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="bg-badge-warning/10 p-3 rounded-lg border border-badge-warning/20">
                <p className="text-sm text-badge-warning-foreground"><AlertCircle className="w-4 h-4 inline mr-1" /> {symbol.cautionNote}</p>
              </div>
            )
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
          
          {/* Legacy scripturalContext (for older entries) */}
          {symbol.scripturalContext && !symbol.scriptureReferences && (
            <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-sacred">{symbol.scripturalContext}</p>
                <Link to={getScriptureLink(symbol.scripturalContext)}>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 px-2">
                    <ExternalLink className="w-3 h-3" />
                    Study
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderRitualCard = (ritual: RitualEntry) => {
    const bookmark = getBookmark(ritual.id, 'ritual');
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
                  onClick={() => handleBookmarkClick(ritual.id, 'ritual', ritual.name)}
                >
                  {bookmark ? (
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
          {ritual.alternatives && (
            <div className="bg-badge-success/10 p-3 rounded-lg border border-badge-success/20">
              <h4 className="font-semibold text-sm mb-1 text-badge-success">Suggested Alternatives</h4>
              <p className="text-sm text-muted-foreground">{ritual.alternatives}</p>
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
          {ritual.scripturalContext && (
            <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-sacred">{ritual.scripturalContext}</p>
                <Link to={getScriptureLink(ritual.scripturalContext)}>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 px-2">
                    <ExternalLink className="w-3 h-3" />
                    Study
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Toggle expanded state for list items
  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Compact list view for symbols with expandable details
  const renderSymbolListItem = (symbol: SymbolEntry) => {
    const bookmark = getBookmark(symbol.id, 'symbol');
    const isExpanded = expandedItems.has(symbol.id);
    const CategoryBadge = categoryIcons[symbol.category] || <Badge variant="outline" className="capitalize text-xs">{symbol.category}</Badge>;
    
    return (
      <Collapsible 
        key={symbol.id} 
        open={isExpanded}
        onOpenChange={() => toggleExpanded(symbol.id)}
      >
        <div className="rounded-lg border bg-card overflow-hidden">
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors cursor-pointer">
              <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{symbol.name}</span>
                  <CautionBadge level={symbol.cautionLevel} />
                </div>
                {!isExpanded && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{symbol.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                {user && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleBookmarkClick(symbol.id, 'symbol', symbol.name)}
                  >
                    {bookmark ? (
                      <BookmarkCheck className="w-3.5 h-3.5 text-sacred" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-3 pb-3 pt-0 space-y-3 border-t bg-muted/10">
              <div className="pt-3">
                {CategoryBadge}
              </div>
              
              <p className="text-sm text-muted-foreground">{symbol.description}</p>
              
              {/* Christian Perspective */}
              <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sacred" />
                  Christian Perspective
                </h4>
                <p className="text-sm text-muted-foreground">{symbol.christianPerspective}</p>
              </div>
              
              {/* Double Standard */}
              {symbol.doubleStandard && (
                <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                  <h4 className="font-semibold text-sm mb-1 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    The Double Standard
                  </h4>
                  <p className="text-sm text-muted-foreground">{symbol.doubleStandard}</p>
                </div>
              )}
              
              {/* Scripture References */}
              {symbol.scriptureReferences && symbol.scriptureReferences.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sacred" />
                    Scripture References
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {symbol.scriptureReferences.map((ref, idx) => (
                      <Link key={idx} to={`/bible-study?search=${encodeURIComponent(ref)}`}>
                        <Badge variant="outline" className="text-xs text-sacred hover:bg-sacred/10 cursor-pointer">
                          {ref}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  // Compact list view for rituals with expandable details
  const renderRitualListItem = (ritual: RitualEntry) => {
    const bookmark = getBookmark(ritual.id, 'ritual');
    const isExpanded = expandedItems.has(ritual.id);
    
    return (
      <Collapsible 
        key={ritual.id} 
        open={isExpanded}
        onOpenChange={() => toggleExpanded(ritual.id)}
      >
        <div className="rounded-lg border bg-card overflow-hidden">
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors cursor-pointer">
              <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{ritual.name}</span>
                  <CautionBadge level={ritual.cautionLevel} />
                </div>
                {!isExpanded && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{ritual.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                {user && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleBookmarkClick(ritual.id, 'ritual', ritual.name)}
                  >
                    {bookmark ? (
                      <BookmarkCheck className="w-3.5 h-3.5 text-sacred" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="px-3 pb-3 pt-0 space-y-3 border-t bg-muted/10">
              <p className="text-sm text-muted-foreground pt-3">{ritual.description}</p>
              
              {/* Christian Approach */}
              <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sacred" />
                  Christian Approach
                </h4>
                <p className="text-sm text-muted-foreground">{ritual.christianApproach}</p>
              </div>
              
              {/* Scriptural Context */}
              {ritual.scripturalContext && (
                <div className="bg-sacred/5 p-3 rounded-lg border border-sacred/20">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-sacred">{ritual.scripturalContext}</p>
                    <Link to={`/bible-study?search=${encodeURIComponent(ritual.scripturalContext)}`}>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 px-2">
                        <ExternalLink className="w-3 h-3" />
                        Study
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold">Symbols & Rituals Guide</h1>
            <p className="text-sm text-muted-foreground">Christian perspectives on symbols, rituals & cultural imagery</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <Link to="/greek-life">
            <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sacred/10">
                  <GraduationCap className="w-5 h-5 text-sacred" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Greek Organizations</h3>
                  <p className="text-xs text-muted-foreground">Explore all Greek orgs</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/oaths">
            <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Scroll className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Oaths Guide</h3>
                  <p className="text-xs text-muted-foreground">Sacred commitments</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/beauty-origins">
            <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Beauty Origins</h3>
                  <p className="text-xs text-muted-foreground">Egyptian & Roman roots</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/myth-buster">
            <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <AlertTriangle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Myth Buster</h3>
                  <p className="text-xs text-muted-foreground">Address misconceptions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/anti-hazing">
            <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Anti-Hazing</h3>
                  <p className="text-xs text-muted-foreground">Biblical guidance</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-2">How to Use This Guide</h2>
            <p className="text-sm text-muted-foreground">This guide provides Christian perspectives on common symbols, rituals, and cultural imagery. Each entry includes a caution level to help you think through participation. Remember: the goal is informed, prayerful decision-making—not fear or blanket condemnation.</p>
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

        {/* Bookmarks Section */}
        {user && bookmarks.length > 0 && (
          <Collapsible open={bookmarksOpen} onOpenChange={setBookmarksOpen} className="mb-6">
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-sacred" />
                      <CardTitle className="text-base">My Bookmarks ({bookmarks.length})</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          exportBookmarksPDF();
                        }}
                      >
                        <FileDown className="w-4 h-4" />
                        Export
                      </Button>
                      <ShareBookmarksDialog 
                        bookmarkIds={bookmarks.map(b => b.id)}
                        trigger={
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-1 h-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                        }
                      />
                      {bookmarksOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-3">
                  {bookmarks.map(bookmark => {
                    const item = getItemDetails(bookmark);
                    if (!item) return null;
                    return (
                      <div key={bookmark.id} className="p-3 bg-muted/30 rounded-lg space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.name}</span>
                              <Badge variant="outline" className="text-xs capitalize">{bookmark.content_json.itemType}</Badge>
                              <CautionBadge level={item.cautionLevel} />
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleBookmarkClick(bookmark.content_json.itemId, bookmark.content_json.itemType, item.name)}
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => removeBookmark.mutate(bookmark.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {bookmark.notes && (
                          <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded italic">
                            {bookmark.notes}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Search and View Toggle */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search symbols, rituals, comparisons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="icon"
              className={`rounded-none h-10 w-10 ${viewMode === 'cards' ? 'bg-sacred hover:bg-sacred/90' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className={`rounded-none h-10 w-10 ${viewMode === 'list' ? 'bg-sacred hover:bg-sacred/90' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symbols">Reference Guide ({filteredSymbols.length})</TabsTrigger>
            <TabsTrigger value="rituals">Practical Guidance ({filteredRituals.length})</TabsTrigger>
            <TabsTrigger value="comparisons">Double Standards ({filteredComparisons.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="symbols" className="space-y-4">
            {/* Enhanced Filter Bar with Dropdowns */}
            <Card className="p-4 bg-gradient-to-r from-muted/50 to-background border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>
                
                {/* Main Category Dropdown */}
                <Select 
                  value={symbolCategory} 
                  onValueChange={(value) => {
                    setSymbolCategory(value);
                    if (value !== 'customs') {
                      setCustomsSubcategory('all');
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {symbolCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Subcategory Dropdown - Only for Customs */}
                {symbolCategory === 'customs' && (
                  <Select value={customsSubcategory} onValueChange={setCustomsSubcategory}>
                    <SelectTrigger className="w-[180px] bg-background border-amber-500/50">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      {customsSubcategories.map(sub => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Results Count */}
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="secondary" className="bg-sacred/10 text-sacred">
                    {filteredSymbols.length} results
                  </Badge>
                  {(symbolCategory !== 'all' || customsSubcategory !== 'all') && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSymbolCategory('all');
                        setCustomsSubcategory('all');
                      }}
                      className="text-xs h-7"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(symbolCategory !== 'all' || customsSubcategory !== 'all') && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  {symbolCategory !== 'all' && (
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-destructive/10"
                      onClick={() => {
                        setSymbolCategory('all');
                        setCustomsSubcategory('all');
                      }}
                    >
                      {symbolCategories.find(c => c.id === symbolCategory)?.label} ×
                    </Badge>
                  )}
                  {symbolCategory === 'customs' && customsSubcategory !== 'all' && (
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-destructive/10 border-amber-500/50"
                      onClick={() => setCustomsSubcategory('all')}
                    >
                      {customsSubcategories.find(c => c.id === customsSubcategory)?.label} ×
                    </Badge>
                  )}
                </div>
              )}
            </Card>

            {filteredSymbols.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No symbols found matching your filters</p>
              </Card>
            )}
            <div className={viewMode === 'list' ? 'space-y-2' : 'space-y-4'}>
              {filteredSymbols.map(viewMode === 'list' ? renderSymbolListItem : renderSymbolCard)}
            </div>
          </TabsContent>

          <TabsContent value="rituals" className="space-y-4">
            {filteredRituals.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No rituals found matching your filters</p>
              </Card>
            )}
            <div className={viewMode === 'list' ? 'space-y-2' : 'space-y-4'}>
              {filteredRituals.map(viewMode === 'list' ? renderRitualListItem : renderRitualCard)}
            </div>
          </TabsContent>

          <TabsContent value="comparisons" className="space-y-4">
            <Card className="mb-4 bg-gradient-to-r from-amber-500/10 to-sacred/10 border-sacred/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-sacred" />
                      Why This Matters
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Christians already use many symbols and practices with pre-Christian or pagan origins—from wedding rings to church architecture to brand logos. 
                      These comparisons help expose inconsistent logic when Greek letters are singled out as "demonic" while other ancient symbols are freely embraced.
                    </p>
                  </div>
                  <PrintComparisonGuideDialog
                    selectedCategory={comparisonCategory}
                    trigger={
                      <Button variant="outline" size="sm" className="gap-2 shrink-0">
                        <Printer className="w-4 h-4" />
                        Print Guide
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Category:</span>
              </div>
              <Select value={comparisonCategory} onValueChange={setComparisonCategory}>
                <SelectTrigger className="w-[200px] bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {culturalComparisonCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-sacred/10 text-sacred">
                {filteredComparisons.length} results
              </Badge>
            </div>
            
            {filteredComparisons.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No comparisons found matching your filters</p>
              </Card>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredComparisons.map(renderComparisonCard)}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Notes Dialog */}
      <BookmarkNotesDialog
        open={notesDialog.open}
        onOpenChange={(open) => setNotesDialog(prev => ({ ...prev, open }))}
        itemName={notesDialog.itemName}
        initialNotes={notesDialog.notes}
        onSave={handleSaveNotes}
        isEditing={!!notesDialog.bookmarkId}
      />
    </div>
  );
};

export default SymbolGuide;
