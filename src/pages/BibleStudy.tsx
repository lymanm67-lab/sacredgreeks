import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Search, Book, BookOpen, Calendar, ArrowLeft, ExternalLink, Loader2, Sparkles, Bookmark, BookmarkCheck, FlaskConical, Eye, FileText, MessageSquare, Shield, ChevronDown, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { useExternalLinks } from '@/hooks/use-external-links';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useSavedBibleSearches } from '@/hooks/use-saved-bible-searches';
import { SavedSearchesList } from '@/components/bible-study/SavedSearchesList';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { ListenButton } from '@/components/ListenButton';
import { PremiumGate } from '@/components/PremiumGate';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { StudyGuideDialog, StudyGuide } from '@/components/bible-study/StudyGuideDialog';
import { studyGuides, getStudiesByCategory, categories } from '@/data/bibleStudyGuides';
import { ScriptureFlashcards } from '@/components/ScriptureFlashcards';
import { BibleStudyGenerator } from '@/components/BibleStudyGenerator';
import { ApologeticsQuickReference } from '@/components/ApologeticsQuickReference';

// Demo data for Bible Study
const DEMO_DAILY_VERSE = {
  reference: 'Philippians 4:13',
  text: 'I can do all things through Christ which strengtheneth me.',
  translation_name: 'King James Version'
};

const DEMO_SAVED_SEARCHES = [
  {
    id: 'demo-1',
    search_query: 'love one another',
    search_type: 'ai',
    results_json: [
      { reference: 'John 13:34', text: 'A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another.' },
      { reference: '1 John 4:7', text: 'Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.' }
    ],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-2',
    search_query: 'Romans 8:28',
    search_type: 'reference',
    results_json: [
      { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', translation: 'King James Version' }
    ],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-3',
    search_query: 'strength',
    search_type: 'phrase',
    results_json: [
      { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
      { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' }
    ],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const readingPlans = [
  {
    title: "30-Day Faith Foundation",
    description: "Build a strong foundation in Christian faith and Greek life integration",
    duration: "30 days",
    verses: [
      "Romans 12:1-2", "Philippians 2:1-11", "1 Corinthians 13:1-13", "Galatians 5:22-26",
      "Ephesians 4:1-6", "Colossians 3:12-17", "James 1:22-27", "1 Peter 2:9-12"
    ]
  },
  {
    title: "Leadership in Greek Life",
    description: "Biblical principles for servant leadership in your chapter",
    duration: "14 days",
    verses: [
      "Mark 10:42-45", "John 13:1-17", "1 Timothy 3:1-7", "Titus 1:5-9",
      "1 Peter 5:1-4", "Proverbs 11:14", "Proverbs 16:18-19"
    ]
  },
  {
    title: "P.R.O.O.F. Deep Dive",
    description: "Explore the P.R.O.O.F. framework through Scripture",
    duration: "21 days",
    verses: [
      "Matthew 5-7", "Romans 8:1-17", "Galatians 5:16-26", "Ephesians 4:17-32",
      "Philippians 4:4-9", "Colossians 3:1-17", "1 John 1:5-10"
    ]
  }
];

type TopicKey = 'all' | 'greek-life' | 'discernment' | 'foundation' | 'purpose';

const BibleStudy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { openExternalLink } = useExternalLinks();
  const { completeChallenge } = useAutoCompleteChallenge();
  const { isDemoMode } = useDemoMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dailyVerse, setDailyVerse] = useState<any>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);
  const [searchMode, setSearchMode] = useState<'reference' | 'phrase' | 'ai'>('reference');
  const [phraseResults, setPhraseResults] = useState<any[]>([]);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('all');
  const [selectedStudy, setSelectedStudy] = useState<StudyGuide | null>(null);
  const [studyDialogOpen, setStudyDialogOpen] = useState(false);
  const { savedSearches, loading: savedLoading, saveSearch, deleteSearch, isSearchSaved } = useSavedBibleSearches();
  
  // Accordion state with localStorage persistence
  const ALL_ACCORDION_VALUES = ['proof-study', 'apologetics', 'flashcards'];
  const [accordionValues, setAccordionValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('bible-study-accordion-state');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist accordion state
  useEffect(() => {
    localStorage.setItem('bible-study-accordion-state', JSON.stringify(accordionValues));
  }, [accordionValues]);

  const expandAll = () => setAccordionValues(ALL_ACCORDION_VALUES);
  const collapseAll = () => setAccordionValues([]);

  // Get studies based on selected category
  const filteredStudies = getStudiesByCategory(selectedTopic);

  // Use demo data when demo mode is enabled
  const displayVerse = isDemoMode ? DEMO_DAILY_VERSE : dailyVerse;
  const displaySavedSearches = isDemoMode ? DEMO_SAVED_SEARCHES : (savedSearches.length > 0 ? savedSearches : DEMO_SAVED_SEARCHES);
  const isShowingDemoSearches = isDemoMode || savedSearches.length === 0;

  const handleOpenStudy = (study: StudyGuide) => {
    setSelectedStudy(study);
    setStudyDialogOpen(true);
  };

  // Pull to refresh
  const handleRefresh = async () => {
    await fetchDailyVerse();
    toast({
      title: 'Bible Study refreshed',
      description: 'Daily verse updated',
    });
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  // Fetch daily verse on component mount
  useEffect(() => {
    fetchDailyVerse();
  }, []);

  const fetchDailyVerse = async () => {
    setLoadingVerse(true);
    try {
      // Use a curated list of popular verses
      const popularVerses = [
        'john 3:16', 'romans 8:28', 'philippians 4:13', 'psalm 23:1-6',
        'proverbs 3:5-6', 'jeremiah 29:11', 'matthew 6:33', 'isaiah 41:10',
        'romans 12:2', 'joshua 1:9', '2 timothy 1:7', 'psalm 46:1'
      ];
      
      // Get a verse based on the day of year for consistency
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const verseIndex = dayOfYear % popularVerses.length;
      const selectedVerse = popularVerses[verseIndex];
      
      const response = await fetch(`https://bible-api.com/${selectedVerse}?translation=kjv`);
      if (response.ok) {
        const data = await response.json();
        setDailyVerse(data);
      }
    } catch (error) {
      console.error('Error fetching daily verse:', error);
      toast({
        title: 'Error loading daily verse',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoadingVerse(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    
    if (searchMode === 'ai') {
      // AI-powered search
      try {
        const { data, error } = await supabase.functions.invoke('bible-verse-ai-search', {
          body: { query: searchQuery }
        });

        if (error) {
          console.error('AI search error:', error);
          toast({
            title: 'AI search failed',
            description: 'Please try again or use reference/keyword search',
            variant: 'destructive'
          });
          setAiResults([]);
        } else if (data?.verses && data.verses.length > 0) {
          setAiResults(data.verses);
          setSearchResults(null);
          setPhraseResults([]);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'No verses found',
            description: 'Try rephrasing your search or use reference/keyword search',
            variant: 'destructive'
          });
          setAiResults([]);
        }
      } catch (error) {
        console.error('AI search error:', error);
        toast({
          title: 'AI search failed',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    } else if (searchMode === 'reference') {
      try {
        // Bible API format: book chapter:verse or book chapter
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchQuery)}?translation=kjv`);
        
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setPhraseResults([]);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'Verse not found',
            description: 'Try searching for a verse like "John 3:16" or "Psalm 23"',
            variant: 'destructive'
          });
          setSearchResults(null);
        }
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Please check your connection and try again',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Phrase search mode - search for keywords in curated verses
      try {
        const keyword = searchQuery.toLowerCase();
        const verseDatabase = [
          { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', keywords: ['love', 'salvation', 'eternal life', 'believe', 'faith'] },
          { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', keywords: ['purpose', 'good', 'faith', 'trust', 'plan'] },
          { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', keywords: ['strength', 'power', 'overcome', 'ability', 'faith'] },
          { ref: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.', keywords: ['shepherd', 'provision', 'care', 'trust', 'comfort'] },
          { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', keywords: ['trust', 'guidance', 'direction', 'wisdom', 'faith'] },
          { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', keywords: ['hope', 'future', 'plans', 'peace', 'purpose'] },
          { ref: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', keywords: ['priority', 'kingdom', 'seek', 'provision', 'faith'] },
          { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', keywords: ['fear', 'courage', 'strength', 'help', 'support'] },
          { ref: 'Romans 12:2', text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', keywords: ['transformation', 'renew', 'mind', 'change', 'growth'] },
          { ref: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.', keywords: ['courage', 'strength', 'fear', 'brave', 'confidence'] },
          { ref: '2 Timothy 1:7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', keywords: ['fear', 'power', 'love', 'mind', 'courage'] },
          { ref: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.', keywords: ['help', 'trouble', 'refuge', 'strength', 'support'] },
          { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', keywords: ['rest', 'burden', 'tired', 'peace', 'comfort'] },
          { ref: 'Ephesians 2:8-9', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.', keywords: ['grace', 'salvation', 'faith', 'saved', 'gift'] },
          { ref: '1 Corinthians 13:4-7', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.', keywords: ['love', 'patient', 'kind', 'relationships', 'charity'] },
          { ref: 'James 1:2-3', text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.', keywords: ['trials', 'joy', 'patience', 'faith', 'perseverance'] },
          { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', keywords: ['faith', 'hope', 'belief', 'trust', 'confidence'] },
          { ref: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.', keywords: ['fruit', 'spirit', 'character', 'virtues', 'growth'] },
          { ref: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.', keywords: ['guidance', 'word', 'direction', 'wisdom', 'light'] },
          { ref: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', keywords: ['love', 'sacrifice', 'salvation', 'grace', 'mercy'] }
        ];

        const matches = verseDatabase.filter(verse => 
          verse.keywords.some(kw => kw.includes(keyword)) || 
          verse.text.toLowerCase().includes(keyword)
        );

        if (matches.length > 0) {
          setPhraseResults(matches);
          setSearchResults(null);
          
          // Auto-complete Bible study challenge
          await completeChallenge('bible_study');
        } else {
          toast({
            title: 'No verses found',
            description: 'Try different keywords like "love", "strength", "faith", or "peace"',
            variant: 'destructive'
          });
          setPhraseResults([]);
        }
      } catch (error) {
        toast({
          title: 'Search failed',
          description: 'Please try again',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveSearch = async () => {
    if (!searchQuery.trim()) return;
    
    let results: any[] = [];
    if (searchMode === 'ai') {
      results = aiResults;
    } else if (searchMode === 'phrase') {
      results = phraseResults;
    } else if (searchResults) {
      results = [{
        reference: searchResults.reference,
        text: searchResults.text,
        translation: searchResults.translation_name
      }];
    }

    if (results.length > 0) {
      await saveSearch(searchQuery, searchMode, results);
    }
  };

  const handleLoadSearch = (search: any) => {
    setSearchQuery(search.search_query);
    setSearchMode(search.search_type);
    
    if (search.search_type === 'ai') {
      setAiResults(search.results_json);
      setPhraseResults([]);
      setSearchResults(null);
    } else if (search.search_type === 'phrase') {
      setPhraseResults(search.results_json);
      setAiResults([]);
      setSearchResults(null);
    } else {
      setSearchResults(search.results_json[0]);
      setAiResults([]);
      setPhraseResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <Heart className="w-5 h-5 text-sacred" />
              <span className="font-semibold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
                Back to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
              <Book className="w-8 h-8 text-sacred" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sacred to-warm-blue bg-clip-text text-transparent">
              Bible Study
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search Scripture, explore daily verses, and follow guided reading plans
            </p>
          </div>

          {/* Daily Verse Section */}
          <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sacred" />
                <CardTitle>Verse of the Day</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {loadingVerse ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-sacred" />
                </div>
              ) : displayVerse ? (
                <div className="space-y-4">
                  <blockquote className="text-lg italic border-l-4 border-sacred pl-4 py-2">
                    "{displayVerse.text}"
                  </blockquote>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                        {displayVerse.reference}
                      </Badge>
                      {isDemoMode && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <FlaskConical className="w-3 h-3 mr-1" />
                          Demo
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ListenButton
                        text={`${displayVerse.reference}. ${displayVerse.text}`}
                        itemId={`bible-daily-verse`}
                        title="Daily Verse"
                        showLabel={false}
                        size="sm"
                        variant="ghost"
                      />
                      {!isDemoMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchDailyVerse}
                          className="gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          Get Another Verse
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Unable to load daily verse. Please try again.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="topics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
              <TabsTrigger value="topics" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Topics
              </TabsTrigger>
              <TabsTrigger value="search" className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="plans" className="gap-2">
                <Calendar className="w-4 h-4" />
                Plans
              </TabsTrigger>
            </TabsList>

            {/* Topics Tab */}
            <TabsContent value="topics" className="space-y-6">
              {/* Topic Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((topic) => (
                  <Button
                    key={topic.key}
                    variant={selectedTopic === topic.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTopic(topic.key as TopicKey)}
                    className={selectedTopic === topic.key ? 'bg-sacred hover:bg-sacred/90' : ''}
                  >
                    {topic.label}
                  </Button>
                ))}
              </div>

              {/* Study Guides Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredStudies.map((study) => (
                  <Card key={study.id} className="hover:shadow-md transition-shadow border-sacred/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                          {study.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <FileText className="w-3 h-3" />
                          <span>{study.keyScriptures.length} scriptures</span>
                          <MessageSquare className="w-3 h-3 ml-2" />
                          <span>{study.discussionQuestions.length} questions</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-2">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {study.introduction}
                      </p>
                      
                      {/* Preview of key scriptures */}
                      <div className="flex flex-wrap gap-1">
                        {study.keyScriptures.slice(0, 3).map((scripture, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {scripture.ref}
                          </Badge>
                        ))}
                        {study.keyScriptures.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{study.keyScriptures.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <ListenButton
                          text={`${study.title}. ${study.introduction}`}
                          itemId={`study-preview-${study.id}`}
                          title={study.title}
                          showLabel={false}
                          size="sm"
                          variant="ghost"
                        />
                        <Button 
                          size="sm" 
                          className="gap-2 bg-sacred hover:bg-sacred/90"
                          onClick={() => handleOpenStudy(study)}
                        >
                          <Eye className="w-4 h-4" />
                          View Study
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scripture Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-sacred" />
                    Search Scripture
                  </CardTitle>
                  <CardDescription>
                    Choose your search method below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search Mode Selection */}
                  <RadioGroup value={searchMode} onValueChange={(value: 'reference' | 'phrase' | 'ai') => {
                    setSearchMode(value);
                    setSearchResults(null);
                    setPhraseResults([]);
                    setAiResults([]);
                  }} className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reference" id="reference" />
                      <Label htmlFor="reference" className="font-medium cursor-pointer">
                        Scripture Reference
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phrase" id="phrase" />
                      <Label htmlFor="phrase" className="font-medium cursor-pointer">
                        Keyword/Phrase
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ai" id="ai" />
                      <Label htmlFor="ai" className="font-medium cursor-pointer flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Assistant
                      </Label>
                    </div>
                  </RadioGroup>

                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder={
                          searchMode === 'ai' 
                            ? "e.g., breaking one law is like breaking all laws" 
                            : searchMode === 'reference' 
                              ? "e.g., John 3:16 or Romans 8" 
                              : "e.g., love, strength, faith, courage"
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <VoiceInputButton
                        onTranscript={setSearchQuery}
                        existingText={searchQuery}
                        appendMode={false}
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-sacred hover:bg-sacred/90">
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Reference Search Results */}
                  {searchResults && searchMode === 'reference' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm">
                          {searchResults.reference}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <ListenButton
                            text={`${searchResults.reference}. ${searchResults.text || searchResults.verses?.map((v: any) => v.text).join(' ')}`}
                            itemId={`ref-search-result`}
                            title={searchResults.reference}
                            showLabel={true}
                            size="sm"
                            variant="outline"
                          />
                          <span className="text-xs text-muted-foreground">
                            {searchResults.translation_name}
                          </span>
                        </div>
                      </div>
                      <ScrollArea className="h-[400px] rounded-lg border p-4 bg-muted/30">
                        <div className="space-y-4">
                          {searchResults.verses ? (
                            searchResults.verses.map((verse: any, idx: number) => (
                              <p key={idx} className="text-base leading-relaxed">
                                <span className="font-semibold text-sacred mr-2">
                                  {verse.verse}.
                                </span>
                                {verse.text}
                              </p>
                            ))
                          ) : (
                            <p className="text-base leading-relaxed">{searchResults.text}</p>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {/* AI Search Results */}
                  {aiResults.length > 0 && searchMode === 'ai' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {aiResults.length} AI suggestion{aiResults.length !== 1 ? 's' : ''}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveSearch}
                          disabled={isSearchSaved(searchQuery, searchMode)}
                          className="gap-2"
                        >
                          {isSearchSaved(searchQuery, searchMode) ? (
                            <><BookmarkCheck className="w-4 h-4" /> Saved</>
                          ) : (
                            <><Bookmark className="w-4 h-4" /> Save Search</>
                          )}
                        </Button>
                      </div>
                      <ScrollArea className="h-[500px] space-y-3">
                        {aiResults.map((verse, idx) => (
                            <Card key={idx} className="mb-3 hover:shadow-md transition-shadow border-sacred/20">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge className="w-fit bg-sacred/10 text-sacred border-sacred/20">
                                  {verse.reference}
                                </Badge>
                                <ListenButton
                                  text={`${verse.reference}. ${verse.text}`}
                                  itemId={`ai-verse-${idx}`}
                                  title={verse.reference}
                                  showLabel={false}
                                  size="sm"
                                  variant="ghost"
                                />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed mb-2">{verse.text}</p>
                              {verse.keywords && verse.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {verse.keywords.map((keyword: string, kidx: number) => (
                                    <Badge key={kidx} variant="secondary" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </div>
                  )}

                  {/* Phrase Search Results */}
                  {phraseResults.length > 0 && searchMode === 'phrase' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm">
                          {phraseResults.length} verse{phraseResults.length !== 1 ? 's' : ''} found
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveSearch}
                          disabled={isSearchSaved(searchQuery, searchMode)}
                          className="gap-2"
                        >
                          {isSearchSaved(searchQuery, searchMode) ? (
                            <><BookmarkCheck className="w-4 h-4" /> Saved</>
                          ) : (
                            <><Bookmark className="w-4 h-4" /> Save Search</>
                          )}
                        </Button>
                      </div>
                      <ScrollArea className="h-[500px] space-y-3">
                        {phraseResults.map((verse, idx) => (
                          <Card key={idx} className="mb-3 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge className="w-fit bg-sacred/10 text-sacred border-sacred/20">
                                  {verse.ref}
                                </Badge>
                                <ListenButton
                                  text={`${verse.ref}. ${verse.text}`}
                                  itemId={`phrase-verse-${idx}`}
                                  title={verse.ref}
                                  showLabel={false}
                                  size="sm"
                                  variant="ghost"
                                />
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed">{verse.text}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </div>
                  )}

                  {!searchResults && !loading && phraseResults.length === 0 && aiResults.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">
                        {searchMode === 'ai'
                          ? 'Describe a verse or concept, even if you don\'t remember the exact wording'
                          : searchMode === 'reference' 
                            ? 'Enter a verse reference to search Scripture' 
                            : 'Enter keywords to find relevant verses'}
                      </p>
                      <p className="text-sm">
                        {searchMode === 'ai'
                          ? 'Examples: "breaking one law is like breaking all", "faith without works", "love your enemies"'
                          : searchMode === 'reference'
                            ? 'Examples: "John 3:16", "Psalm 23", "Romans 8:28"'
                            : 'Examples: "love", "strength", "faith", "courage", "peace"'}
                      </p>
                    </div>
                  )}

                  {/* Quick Access Links */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold mb-3">External Bible Resources:</p>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <ExternalContentModal
                        url="https://www.biblegateway.com/"
                        title="Bible Gateway"
                        description="Search and read the Bible in multiple translations"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Bible Gateway
                          </Button>
                        }
                      />
                      <ExternalContentModal
                        url="https://www.bible.com/"
                        title="YouVersion Bible"
                        description="Read the Bible and access reading plans"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            YouVersion
                          </Button>
                        }
                      />
                      <ExternalContentModal
                        url="https://www.blueletterbible.org/"
                        title="Blue Letter Bible"
                        description="Study the Bible with original language tools"
                        trigger={
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Blue Letter Bible
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Searches Tab */}
            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-sacred" />
                        Saved Searches
                      </CardTitle>
                      {isShowingDemoSearches && (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          <FlaskConical className="w-3 h-3 mr-1" />
                          Demo
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {isShowingDemoSearches 
                      ? 'Sample saved searches - save your own searches to build your collection'
                      : 'Quick access to your previously saved Bible searches'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedLoading && !isDemoMode ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-sacred" />
                    </div>
                  ) : (
                    <SavedSearchesList
                      searches={displaySavedSearches}
                      onDelete={isShowingDemoSearches ? () => {} : deleteSearch}
                      onLoadSearch={handleLoadSearch}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reading Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingPlans.map((plan, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-sacred" />
                        <Badge variant="outline" className="text-xs">
                          {plan.duration}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">Key Passages:</p>
                        <div className="flex flex-wrap gap-1">
                          {plan.verses.slice(0, 4).map((verse, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {verse}
                            </Badge>
                          ))}
                          {plan.verses.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{plan.verses.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button className="w-full bg-sacred hover:bg-sacred/90" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Reading Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Coming Soon Banner */}
              <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
                <CardContent className="py-6">
                  <div className="text-center space-y-2">
                    <Sparkles className="w-8 h-8 mx-auto text-sacred" />
                    <h3 className="font-semibold text-lg">More Plans Coming Soon</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      We're working on adding more reading plans tailored specifically for Greek life challenges and spiritual growth
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
        </Tabs>

        {/* Expand/Collapse Controls */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="text-xs"
          >
            <ChevronsDownUp className="w-4 h-4 mr-1" />
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="text-xs"
          >
            <ChevronsUpDown className="w-4 h-4 mr-1" />
            Collapse All
          </Button>
        </div>

        {/* Collapsible Sections for PROOF Bible Study, Apologetics, and Flashcards */}
        <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="space-y-4">
          {/* P.R.O.O.F. Bible Study Generator */}
          <AccordionItem value="proof-study" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-emerald-500/10 to-background hover:from-emerald-500/15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">P.R.O.O.F. Bible Study Generator</h3>
                  <p className="text-xs text-muted-foreground">5-week curriculum based on Sacred, Not Sinful</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <BibleStudyGenerator />
            </AccordionContent>
          </AccordionItem>

          {/* Apologetics Quick Reference */}
          <AccordionItem value="apologetics" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-sacred/10 to-background hover:from-sacred/15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sacred/10">
                  <Shield className="w-5 h-5 text-sacred" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Apologetics Quick Reference</h3>
                  <p className="text-xs text-muted-foreground">Biblical defenses for common objections to Greek life</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <ApologeticsQuickReference />
            </AccordionContent>
          </AccordionItem>

          {/* Scripture Flashcards */}
          <AccordionItem value="flashcards" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-sacred/10 to-background hover:from-sacred/15">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sacred/10">
                  <BookOpen className="w-6 h-6 text-sacred" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Scripture Flashcards</h3>
                  <p className="text-xs text-muted-foreground">Master key apologetics verses with spaced repetition</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <ScriptureFlashcards />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
      </main>

      {/* Study Guide Dialog */}
      <StudyGuideDialog
        study={selectedStudy}
        open={studyDialogOpen}
        onOpenChange={setStudyDialogOpen}
      />
    </div>
  );
};

export default BibleStudy;
