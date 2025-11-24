import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Search, Book, BookOpen, Calendar, ArrowLeft, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';
import { useExternalLinks } from '@/hooks/use-external-links';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';

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

const BibleStudy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { openExternalLink } = useExternalLinks();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dailyVerse, setDailyVerse] = useState<any>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);

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
    try {
      // Bible API format: book chapter:verse or book chapter
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(searchQuery)}?translation=kjv`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
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
              ) : dailyVerse ? (
                <div className="space-y-4">
                  <blockquote className="text-lg italic border-l-4 border-sacred pl-4 py-2">
                    "{dailyVerse.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                      {dailyVerse.reference}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchDailyVerse}
                      className="gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Another Verse
                    </Button>
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
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
              <TabsTrigger value="search" className="gap-2">
                <Search className="w-4 h-4" />
                Scripture Search
              </TabsTrigger>
              <TabsTrigger value="plans" className="gap-2">
                <Calendar className="w-4 h-4" />
                Reading Plans
              </TabsTrigger>
            </TabsList>

            {/* Scripture Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-sacred" />
                    Search Scripture
                  </CardTitle>
                  <CardDescription>
                    Enter a verse reference like "John 3:16" or "Psalm 23"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      placeholder="e.g., John 3:16 or Romans 8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
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

                  {searchResults && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-sacred/10 text-sacred border-sacred/20 text-sm">
                          {searchResults.reference}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {searchResults.translation_name}
                        </span>
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

                  {!searchResults && !loading && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a verse reference above to search Scripture</p>
                      <p className="text-sm mt-2">
                        Examples: "John 3:16", "Psalm 23", "Romans 8:28"
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
        </div>
      </main>
    </div>
  );
};

export default BibleStudy;
