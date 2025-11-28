import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, AlertTriangle, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { symbolGuideContent, ritualGuideContent, symbolCategories } from '@/data/symbolGuideContent';

const CautionBadge = ({ level }: { level: string }) => {
  if (level === 'low') return <Badge className="bg-badge-success/30 text-badge-success-foreground border-badge-success/50"><CheckCircle className="w-3 h-3 mr-1" /> Low Concern</Badge>;
  if (level === 'medium') return <Badge className="bg-badge-warning/20 text-badge-warning-foreground border-badge-warning/30"><AlertCircle className="w-3 h-3 mr-1" /> Use Discernment</Badge>;
  return <Badge className="bg-badge-danger/20 text-badge-danger-foreground border-badge-danger/30"><AlertTriangle className="w-3 h-3 mr-1" /> Caution Needed</Badge>;
};

const SymbolGuide = () => {
  const [symbolCategory, setSymbolCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSymbols = useMemo(() => {
    return symbolGuideContent.filter(s => {
      const matchesCategory = symbolCategory === 'all' || s.category === symbolCategory;
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.christianPerspective.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [symbolCategory, searchQuery]);

  const filteredRituals = useMemo(() => {
    return ritualGuideContent.filter(r => {
      const matchesSearch = searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.christianApproach.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

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
          </CardContent>
        </Card>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search symbols and rituals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="symbols" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="symbols">Symbols</TabsTrigger>
            <TabsTrigger value="rituals">Rituals & Practices</TabsTrigger>
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
                <p className="text-muted-foreground">No symbols found matching "{searchQuery}"</p>
              </Card>
            )}
            {filteredSymbols.map(symbol => (
              <Card key={symbol.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{symbol.name}</CardTitle>
                    <CautionBadge level={symbol.cautionLevel} />
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
                    <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                      <p className="text-sm text-amber-700 dark:text-amber-400"><AlertCircle className="w-4 h-4 inline mr-1" /> {symbol.cautionNote}</p>
                    </div>
                  )}
                  {symbol.scripturalContext && (
                    <p className="text-xs text-muted-foreground italic">{symbol.scripturalContext}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rituals" className="space-y-4">
            {filteredRituals.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No rituals found matching "{searchQuery}"</p>
              </Card>
            )}
            {filteredRituals.map(ritual => (
              <Card key={ritual.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{ritual.name}</CardTitle>
                    <CautionBadge level={ritual.cautionLevel} />
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
                    <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                      <p className="text-sm text-amber-700 dark:text-amber-400"><AlertCircle className="w-4 h-4 inline mr-1" /> {ritual.cautionNote}</p>
                    </div>
                  )}
                  {ritual.alternatives && (
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <p className="text-sm text-green-700 dark:text-green-400"><CheckCircle className="w-4 h-4 inline mr-1" /> {ritual.alternatives}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SymbolGuide;
