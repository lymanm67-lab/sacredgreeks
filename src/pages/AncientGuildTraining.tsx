import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ListenButton } from '@/components/ListenButton';
import { FileDown, Users, Landmark, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  GuildJourneyDiagram, 
  GuildAudioPlayer, 
  HolyKissComparisonChart, 
  FirstCenturyGuildsSection, 
  GuildEvolutionTimeline, 
  JesusPaulBrotherhoodArticle, 
  IchthysTraceDiagram, 
  EarlyChristianSymbolsGuide,
  CatacombArtGallery
} from '@/components/ancient-guilds';
import { GuildPracticesSection } from '@/components/ancient-guilds/GuildPracticesSection';
import { generateGuildOnePagerPDF } from '@/lib/guild-onepager-pdf';
import { generateGuildComparisonPDF } from '@/lib/guild-comparison-pdf';
import { generateJesusMasterCarpenterPDF } from '@/lib/jesus-master-carpenter-pdf';
import { generateBrotherhoodStudyGuidePDF } from '@/lib/brotherhood-study-guide-pdf';
import { generateIchthysTracePDF } from '@/lib/ichthys-trace-pdf';

const courseOverviewText = `Ancient Guild Training: Understanding Jesus and Paul's World of Trade Associations

This course explores the historical reality of 1st-century trade guilds and their relevance to understanding modern Greek-letter organizations. By studying the Tekton (carpenter) guild that shaped Jesus' formative years and the Tentmaker associations that provided Paul's livelihood, we discover that structured brotherhood, apprenticeship, and mutual accountability have ancient biblical precedent.

The training covers guild journey from apprentice to master, historical practices including oaths and handshakes, recognition rituals like the Holy Kiss and Ichthys trace, early Christian symbols found in Roman catacombs, and the evolution from ancient guilds to modern fraternities.

This is not about defending every practice of modern organizations. It's about understanding that organizational structure, communal identity, and formational processes are not inherently opposed to faith—they were woven into the fabric of the world Jesus and Paul inhabited.`;

export default function AncientGuildTraining() {
  const { toast } = useToast();

  return (
    <>
      <SEOHead 
        title="Ancient Guild Training | Sacred Greeks"
        description="Explore Jesus and Paul's world of trade guilds, apprenticeship, and brotherhood. Discover the biblical precedent for structured community."
        type="website"
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/proof-course" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to P.R.O.O.F. Course
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Ancient Guild Training</h1>
                  <p className="text-muted-foreground">Jesus & Paul's Membership in Trade Guilds</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                  Historical Context
                </Badge>
                <ListenButton 
                  text={courseOverviewText}
                  itemId="guild-training-overview"
                  variant="outline"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Course Introduction */}
          <Card className="mb-8 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Landmark className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">Course Overview</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    This training explores the historical reality of 1st-century trade guilds and their relevance to 
                    understanding modern Greek-letter organizations. By studying the Tekton (carpenter) guild that shaped 
                    Jesus' formative years and the Tentmaker associations that provided Paul's livelihood, we discover 
                    that structured brotherhood, apprenticeship, and mutual accountability have ancient biblical precedent.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">8 Training Modules</Badge>
                    <Badge variant="outline" className="text-xs">PDF Resources</Badge>
                    <Badge variant="outline" className="text-xs">Audio Narration</Badge>
                    <Badge variant="outline" className="text-xs">Interactive Diagrams</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Modules */}
          <div className="space-y-6">
            {/* Module 1: Guild Journey Diagram */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 1</Badge>
                <h3 className="font-semibold text-foreground">Guild Journey: Apprentice to Master</h3>
              </div>
              <GuildJourneyDiagram className="mb-0" />
            </div>

            {/* Module 2: Guild Audio Player */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 2</Badge>
                <h3 className="font-semibold text-foreground">Audio Teaching: Historical Context</h3>
              </div>
              <GuildAudioPlayer className="mb-0" />
            </div>

            {/* Module 3: 1st-Century Guilds Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 3</Badge>
                <h3 className="font-semibold text-foreground">Tekton & Tentmaker Associations</h3>
              </div>
              <FirstCenturyGuildsSection className="mb-0" />
            </div>

            {/* Module 4: Guild Practices */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 4</Badge>
                <h3 className="font-semibold text-foreground">Historical Practices: Oaths, Handshakes, Rituals</h3>
              </div>
              <GuildPracticesSection className="mb-0" />
            </div>

            {/* Module 5: Holy Kiss Comparison */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 5</Badge>
                <h3 className="font-semibold text-foreground">Recognition Rituals: The Holy Kiss</h3>
              </div>
              <HolyKissComparisonChart className="mb-0" />
            </div>

            {/* Module 6: Ichthys Trace */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 6</Badge>
                <h3 className="font-semibold text-foreground">The Ichthys Trace: Covert Recognition</h3>
              </div>
              <IchthysTraceDiagram className="mb-0" />
            </div>

            {/* Module 7: Early Christian Symbols */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 7</Badge>
                <h3 className="font-semibold text-foreground">Early Christian Symbols Guide</h3>
              </div>
              <EarlyChristianSymbolsGuide className="mb-0" />
            </div>

            {/* Module 8: Catacomb Art Gallery */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 8</Badge>
                <h3 className="font-semibold text-foreground">Catacomb Art Gallery: Archaeological Evidence</h3>
              </div>
              <CatacombArtGallery className="mb-0" />
            </div>

            {/* Module 9: Guild Evolution Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 9</Badge>
                <h3 className="font-semibold text-foreground">Evolution: Guilds to Greek Organizations</h3>
              </div>
              <GuildEvolutionTimeline className="mb-0" />
            </div>

            {/* Module 10: Brotherhood Article */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-500 text-white">Module 10</Badge>
                <h3 className="font-semibold text-foreground">Jesus, Paul, and the Brotherhood Question</h3>
              </div>
              <JesusPaulBrotherhoodArticle className="mb-0" />
            </div>
          </div>

          {/* PDF Downloads */}
          <Card className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileDown className="w-5 h-5 text-amber-500" />
                Downloadable Resources
              </h3>
              <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    generateGuildOnePagerPDF();
                    toast({ title: 'One-Pager PDF downloaded!' });
                  }}
                  className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                >
                  <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-left">
                    <span className="block text-sm font-medium">One-Pager</span>
                    <span className="block text-xs text-muted-foreground">Quick Reference</span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    generateGuildComparisonPDF();
                    toast({ title: 'Comparison Guide downloaded!' });
                  }}
                  className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                >
                  <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-left">
                    <span className="block text-sm font-medium">Full Guide</span>
                    <span className="block text-xs text-muted-foreground">Detailed Comparison</span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    generateJesusMasterCarpenterPDF();
                    toast({ title: 'Jesus Master Carpenter PDF downloaded!' });
                  }}
                  className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                >
                  <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-left">
                    <span className="block text-sm font-medium">Jesus the Tekton</span>
                    <span className="block text-xs text-muted-foreground">Carpenter Study</span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    generateBrotherhoodStudyGuidePDF();
                    toast({ title: 'Brotherhood Study Guide downloaded!' });
                  }}
                  className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                >
                  <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-left">
                    <span className="block text-sm font-medium">Brotherhood Guide</span>
                    <span className="block text-xs text-muted-foreground">Group Study</span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    generateIchthysTracePDF();
                    toast({ title: 'Ichthys Trace Guide downloaded!' });
                  }}
                  className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                >
                  <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                  <span className="text-left">
                    <span className="block text-sm font-medium">Ichthys Trace</span>
                    <span className="block text-xs text-muted-foreground">Visual Guide</span>
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <Link to="/proof-course">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to P.R.O.O.F. Course
              </Button>
            </Link>
            <Link to="/symbol-guide">
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Explore Symbol Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
