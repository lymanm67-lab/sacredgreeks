import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { symbolGuideContent, ritualGuideContent, symbolCategories } from '@/data/symbolGuideContent';

const CautionBadge = ({ level }: { level: string }) => {
  if (level === 'low') return <Badge className="bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 border-emerald-500/50"><CheckCircle className="w-3 h-3 mr-1" /> Low Concern</Badge>;
  if (level === 'medium') return <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30"><AlertCircle className="w-3 h-3 mr-1" /> Use Discernment</Badge>;
  return <Badge className="bg-red-500/20 text-red-700 border-red-500/30"><AlertTriangle className="w-3 h-3 mr-1" /> Caution Needed</Badge>;
};

const SymbolGuide = () => {
  const [symbolCategory, setSymbolCategory] = useState('all');

  const filteredSymbols = symbolGuideContent.filter(s => symbolCategory === 'all' || s.category === symbolCategory);

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
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-2">How to Use This Guide</h2>
            <p className="text-sm text-muted-foreground">This guide provides Christian perspectives on common symbols and rituals in Greek life. Each entry includes a caution level to help you think through participation. Remember: the goal is informed, prayerful decision-making—not fear or blanket condemnation.</p>
          </CardContent>
        </Card>

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
            {ritualGuideContent.map(ritual => (
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
