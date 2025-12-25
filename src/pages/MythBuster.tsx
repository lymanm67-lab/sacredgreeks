import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Search, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { mythBusterContent, mythCategories, mythScenarios, mythOrganizations } from '@/data/mythBusterContent';
import { ListenButton } from '@/components/ListenButton';
import { FISTFramework } from '@/components/myth-buster/FISTFramework';
import { MythBusterDownloads } from '@/components/myth-buster/MythBusterDownloads';
import ConversationScripts from '@/components/myth-buster/ConversationScripts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MythBuster = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [scenario, setScenario] = useState('all');
  const [organization, setOrganization] = useState('all');

  const filtered = mythBusterContent.filter(myth => {
    const matchesSearch = myth.myth.toLowerCase().includes(search.toLowerCase()) ||
      myth.shortAnswer.toLowerCase().includes(search.toLowerCase()) ||
      myth.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'all' || myth.category === category;
    const matchesScenario = scenario === 'all' || myth.scenario === scenario;
    const matchesOrganization = organization === 'all' || myth.organization === organization;
    return matchesSearch && matchesCategory && matchesScenario && matchesOrganization;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold">Myth Buster Library</h1>
            <p className="text-sm text-muted-foreground">Searchable biblical responses to common accusations about Greek life</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* F.I.S.T. Framework - How Myths Become Truth */}
        <FISTFramework />

        {/* Conversation Scripts */}
        <ConversationScripts />
        
        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search myths, topics, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {mythCategories.map(cat => (
              <Button
                key={cat.id}
                variant={category === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(cat.id)}
                className={category === cat.id ? 'bg-sacred hover:bg-sacred/90' : ''}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          
          {/* Additional Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={scenario} onValueChange={setScenario}>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                {mythOrganizations.map(o => (
                  <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Badge variant="secondary" className="self-center">
              {filtered.length} myths found
            </Badge>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No myths found matching your search.</CardContent></Card>
          ) : (
            filtered.map(myth => (
              <Card key={myth.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="outline" className="mb-2 capitalize">{myth.category}</Badge>
                      <CardTitle className="text-lg">{myth.myth}</CardTitle>
                    </div>
                    <ListenButton text={`${myth.myth}. ${myth.shortAnswer}. ${myth.detailedResponse}`} itemId={myth.id} title={myth.myth} size="sm" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{myth.shortAnswer}</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="py-2 text-sacred hover:no-underline">
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Read Full Response</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{myth.detailedResponse}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Scripture References</h4>
                          <div className="space-y-2">
                            {myth.scriptures.map((s, i) => (
                              <div key={i} className="bg-muted/50 p-3 rounded-lg border-l-4 border-sacred">
                                <p className="font-semibold text-sm text-sacred">{s.ref}</p>
                                <p className="text-sm italic">"{s.text}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {myth.relatedArticle && (
                          <Link to={myth.relatedArticleUrl || '/articles'} className="inline-flex items-center gap-2 text-sacred hover:underline">
                            <ExternalLink className="w-4 h-4" /> {myth.relatedArticle}
                          </Link>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {myth.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Downloadable Resources */}
        <MythBusterDownloads />
      </main>
    </div>
  );
};

export default MythBuster;
