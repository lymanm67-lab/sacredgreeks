import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ArrowLeft, Search, BookOpen, ExternalLink, Filter, Copy, Check, MessageSquare, ChevronDown, Download, FileText, Target, Sparkles, Scale, Eye, Building, X, CheckCircle2 } from 'lucide-react';
import { mythBusterContent, mythCategories, mythScenarios, mythOrganizations, ProofCategory } from '@/data/mythBusterContent';
import { ListenButton } from '@/components/ListenButton';
import { FISTFramework } from '@/components/myth-buster/FISTFramework';
import { ProofQuickReference } from '@/components/proof/ProofQuickReference';
import { MythBusterDownloads } from '@/components/myth-buster/MythBusterDownloads';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { downloadMythBusterPDF } from '@/lib/myth-buster-pdf';
import { PreviewBanner } from '@/components/PreviewBanner';
import { DemoAudioGuide } from '@/components/DemoAudioGuide';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const categoryIcons: Record<string, string> = {
  identity: '✝️',
  ministry: '🙏',
  worship: '⛪',
  rituals: '🕯️',
  community: '🤝',
  lifestyle: '🌟',
  history: '📜'
};

const categoryDescriptions: Record<string, string> = {
  identity: 'Questions about maintaining faith, loyalty, and Christian identity',
  ministry: 'Topics on leadership, evangelism, and serving in the church',
  worship: 'Concerns about idolatry, spiritual practices, and false gods',
  rituals: 'Concerns about ceremonies, symbols, and traditions',
  community: 'Topics on service, fellowship, and organizational impact',
  lifestyle: 'Matters of behavior, testimony, and daily living',
  history: 'Questions about origins, founders, and historical roots'
};

// PROOF category filter definitions - P (blue), R (purple), O (orange), O (green), F (red)
const proofCategories: { id: ProofCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: 'all', label: 'All', icon: Target, color: 'bg-muted text-foreground' },
  { id: 'pledge-process', label: 'Pledge Process', icon: Target, color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' },
  { id: 'rituals', label: 'Rituals', icon: Sparkles, color: 'bg-purple-500/10 text-purple-600 border-purple-500/30' },
  { id: 'oaths', label: 'Oaths', icon: Scale, color: 'bg-orange-500/10 text-orange-600 border-orange-500/30' },
  { id: 'obscurity', label: 'Obscurity', icon: Eye, color: 'bg-green-500/10 text-green-600 border-green-500/30' },
  { id: 'founders', label: 'Founders', icon: Building, color: 'bg-red-500/10 text-red-600 border-red-500/30' },
];

const MythBuster = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [scenario, setScenario] = useState('all');
  const [organization, setOrganization] = useState('all');
  const [proofFilter, setProofFilter] = useState<ProofCategory | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['identity']);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reviewedMyths, setReviewedMyths] = useState<string[]>([]);

  // Load reviewed myths on mount
  useEffect(() => {
    const loadReviewedMyths = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('study_session_progress')
        .select('session_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .gte('session_id', 100)
        .lt('session_id', 200);
      
      if (data) {
        // Convert session IDs back to myth IDs
        const mythIds = data.map(d => {
          const index = d.session_id - 100;
          return mythBusterContent[index]?.id;
        }).filter(Boolean);
        setReviewedMyths(mythIds);
      }
    };
    
    loadReviewedMyths();
  }, [user]);

  const toggleMythReviewed = async (mythId: string) => {
    if (!user) {
      toast.info('Sign in to track your progress');
      return;
    }

    const mythIndex = mythBusterContent.findIndex(m => m.id === mythId);
    if (mythIndex === -1) return;
    
    const sessionId = 100 + mythIndex;
    const isReviewed = reviewedMyths.includes(mythId);

    if (isReviewed) {
      await supabase
        .from('study_session_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('session_id', sessionId);
      
      setReviewedMyths(prev => prev.filter(id => id !== mythId));
      toast.success('Myth unmarked');
    } else {
      await supabase
        .from('study_session_progress')
        .upsert({
          user_id: user.id,
          session_id: sessionId,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,session_id' });
      
      setReviewedMyths(prev => [...prev, mythId]);
      toast.success('Myth reviewed! ✓');
    }
  };

  const reviewProgress = Math.round((reviewedMyths.length / mythBusterContent.length) * 100);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Response copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // Allow UI to update
      downloadMythBusterPDF();
      toast.success('PDF downloaded! Check your downloads folder.');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const filtered = mythBusterContent.filter(myth => {
    const matchesSearch = search === '' || 
      myth.myth.toLowerCase().includes(search.toLowerCase()) ||
      myth.shortAnswer.toLowerCase().includes(search.toLowerCase()) ||
      myth.detailedResponse.toLowerCase().includes(search.toLowerCase()) ||
      myth.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesScenario = scenario === 'all' || myth.scenario === scenario;
    const matchesOrganization = organization === 'all' || myth.organization === organization;
    const matchesProofCategory = proofFilter === 'all' || myth.proofCategory === proofFilter;
    return matchesSearch && matchesScenario && matchesOrganization && matchesProofCategory;
  });

  // Group myths by category
  const groupedMyths = mythCategories
    .filter(cat => cat.id !== 'all')
    .map(cat => ({
      ...cat,
      myths: filtered.filter(m => m.category === cat.id)
    }))
    .filter(group => group.myths.length > 0);

  const generateQuickResponse = (myth: typeof mythBusterContent[0]) => {
    const scripture = myth.scriptures[0];
    return `${myth.detailedResponse}\n\nScripture: ${scripture.ref} - "${scripture.text}"`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PreviewBanner featureName="Myth Buster Library" />
      <DemoAudioGuide 
        pageId="myth-buster" 
        title="Myth Buster Library" 
        description="Explore common myths about Greek life and learn the truth with research-backed facts." 
      />
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Myth Buster Library</h1>
              <p className="text-sm text-muted-foreground">Biblical responses with ready-to-use scripts</p>
            </div>
            {user && (
              <div className="hidden sm:flex items-center gap-3 bg-muted/50 px-3 py-2 rounded-lg">
                <div className="text-sm text-muted-foreground">Progress</div>
                <Progress value={reviewProgress} className="w-24 h-2" />
                <Badge variant="secondary" className="text-xs">{reviewedMyths.length}/{mythBusterContent.length}</Badge>
              </div>
            )}
          </div>
          {user && (
            <div className="sm:hidden mt-3 flex items-center gap-3 bg-muted/50 px-3 py-2 rounded-lg">
              <div className="text-sm text-muted-foreground">Progress</div>
              <Progress value={reviewProgress} className="flex-1 h-2" />
              <Badge variant="secondary" className="text-xs">{reviewedMyths.length}/{mythBusterContent.length}</Badge>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* F.I.S.T. Framework */}
        <FISTFramework />

        {/* P.R.O.O.F. Quick Reference */}
        <div className="mb-8">
          <ProofQuickReference />
        </div>
        
        
        {/* Search & Filter - Compact */}
        <div className="mb-8 space-y-4 bg-card p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search myths, scriptures, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={scenario} onValueChange={setScenario}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Scenario" />
              </SelectTrigger>
              <SelectContent>
                {mythScenarios.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={organization} onValueChange={setOrganization}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                {mythOrganizations.map(o => (
                  <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* PROOF Category Filter Badges */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Filter by P.R.O.O.F. Criticism:</p>
            <div className="flex flex-wrap gap-2">
              {proofCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setProofFilter(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                    proofFilter === cat.id 
                      ? `${cat.color} ring-2 ring-offset-2 ring-sacred/30` 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted border-transparent"
                  )}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                  {proofFilter === cat.id && cat.id !== 'all' && (
                    <X 
                      className="w-3 h-3 ml-1 hover:text-foreground" 
                      onClick={(e) => { e.stopPropagation(); setProofFilter('all'); }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm flex-wrap gap-2">
            <Badge variant="secondary">{filtered.length} myths found</Badge>
            <div className="flex items-center gap-2">
              {(search || proofFilter !== 'all') && (
                <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setProofFilter('all'); }}>
                  Clear filters
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="gap-2"
              >
                {isDownloading ? (
                  <Download className="w-4 h-4 animate-pulse" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                Download All as PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No myths found matching your filters.</p>
              <Button variant="link" onClick={() => { setSearch(''); setScenario('all'); setOrganization('all'); setProofFilter('all'); }}>
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {groupedMyths.map(group => (
              <Collapsible 
                key={group.id} 
                open={expandedCategories.includes(group.id)}
                onOpenChange={() => toggleCategory(group.id)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{categoryIcons[group.id] || '📋'}</span>
                          <div className="text-left">
                            <CardTitle className="text-lg">{group.label}</CardTitle>
                            <p className="text-sm text-muted-foreground font-normal">
                              {categoryDescriptions[group.id]} • {group.myths.length} topics
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCategories.includes(group.id) ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-3">
                      {group.myths.map(myth => (
                        <div key={myth.id} className="border rounded-lg overflow-hidden">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={myth.id} className="border-none">
                              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                                <div className="flex items-start gap-3 text-left flex-1">
                                  {reviewedMyths.includes(myth.id) ? (
                                    <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 shrink-0" />
                                  ) : (
                                    <MessageSquare className="w-4 h-4 mt-1 text-sacred shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{myth.myth}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      {myth.scenario && (
                                        <Badge variant="outline" className="text-xs">{myth.scenario}</Badge>
                                      )}
                                      {reviewedMyths.includes(myth.id) && (
                                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">Reviewed</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-4">
                                  {/* The Accusation */}
                                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-destructive mb-1">What They Say:</p>
                                    <p className="text-sm italic text-muted-foreground">"{myth.shortAnswer}"</p>
                                  </div>
                                  
                                  {/* Quick Response Script */}
                                  <div className="bg-sacred/5 border border-sacred/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-xs font-semibold text-sacred">Your Response:</p>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(generateQuickResponse(myth), myth.id);
                                          }}
                                        >
                                          {copiedId === myth.id ? (
                                            <Check className="w-3 h-3 text-green-500" />
                                          ) : (
                                            <Copy className="w-3 h-3" />
                                          )}
                                          <span className="ml-1 text-xs">Copy</span>
                                        </Button>
                                        <ListenButton 
                                          text={generateQuickResponse(myth)} 
                                          itemId={myth.id} 
                                          title={myth.myth} 
                                          size="sm" 
                                        />
                                      </div>
                                    </div>
                                    <p className="text-sm leading-relaxed">{myth.detailedResponse}</p>
                                  </div>
                                  
                                  {/* Scripture Support */}
                                  <div>
                                    <p className="text-xs font-semibold mb-2">Scripture Support:</p>
                                    <div className="space-y-2">
                                      {myth.scriptures.map((s, i) => (
                                        <div key={i} className="bg-muted/50 p-3 rounded-lg border-l-4 border-sacred">
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                              <p className="font-semibold text-xs text-sacred">{s.ref}</p>
                                              <p className="text-xs italic mt-1">"{s.text}"</p>
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 shrink-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(`${s.ref}: "${s.text}"`, `${myth.id}-${i}`);
                                              }}
                                            >
                                              {copiedId === `${myth.id}-${i}` ? (
                                                <Check className="w-3 h-3 text-green-500" />
                                              ) : (
                                                <Copy className="w-3 h-3" />
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                   {/* Tags & Related + Mark Reviewed */}
                                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                                    {myth.tags.slice(0, 4).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                    ))}
                                    <div className="flex items-center gap-2 ml-auto">
                                      {myth.relatedArticle && (
                                        <Link to={myth.relatedArticleUrl || '/articles'} className="inline-flex items-center gap-1 text-xs text-sacred hover:underline">
                                          <ExternalLink className="w-3 h-3" /> Related article
                                        </Link>
                                      )}
                                      <Button
                                        variant={reviewedMyths.includes(myth.id) ? "secondary" : "outline"}
                                        size="sm"
                                        className="gap-1.5 h-7"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleMythReviewed(myth.id);
                                        }}
                                      >
                                        {reviewedMyths.includes(myth.id) ? (
                                          <>
                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                            Reviewed
                                          </>
                                        ) : (
                                          <>
                                            <CheckCircle2 className="w-3 h-3" />
                                            Mark Reviewed
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        )}

        {/* Downloadable Resources */}
        <div className="mt-12">
          <MythBusterDownloads />
        </div>
      </main>
    </div>
  );
};

export default MythBuster;
