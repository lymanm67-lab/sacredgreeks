import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SEOHead } from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ListenButton } from '@/components/ListenButton';
import { FileDown, Users, Landmark, BookOpen, ArrowLeft, Target, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
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

// Module session IDs map (6-15 for 10 modules)
const MODULE_SESSION_IDS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function AncientGuildTraining() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { progressData } = useNavigationProgress();
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load completed modules
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from('study_session_progress')
        .select('session_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .gte('session_id', 6)
        .lte('session_id', 15);
      
      if (data) {
        setCompletedModules(data.map(d => d.session_id));
      }
      setIsLoading(false);
    };
    
    loadProgress();
  }, [user]);

  const toggleModuleComplete = async (moduleIndex: number) => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to track progress', variant: 'destructive' });
      return;
    }

    const sessionId = MODULE_SESSION_IDS[moduleIndex];
    const isCurrentlyComplete = completedModules.includes(sessionId);
    
    if (isCurrentlyComplete) {
      // Remove completion
      await supabase
        .from('study_session_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('session_id', sessionId);
      
      setCompletedModules(prev => prev.filter(id => id !== sessionId));
      toast({ title: 'Module unmarked', description: `Module ${moduleIndex + 1} progress removed` });
    } else {
      // Mark complete
      await supabase
        .from('study_session_progress')
        .upsert({
          user_id: user.id,
          session_id: sessionId,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,session_id' });
      
      setCompletedModules(prev => [...prev, sessionId]);
      toast({ title: 'Module completed! 🎉', description: `Module ${moduleIndex + 1} marked as complete` });
    }
  };

  const progress = progressData?.guildTraining || Math.round((completedModules.length / 10) * 100);
  const completedCount = completedModules.length;

  return (
    <>
      <SEOHead 
        title="Ancient Guild Training | Sacred Greeks"
        description="Explore Jesus and Paul's world of trade guilds, apprenticeship, and brotherhood. Discover the biblical precedent for structured community."
        type="website"
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header with Progress Widget */}
          <div className="mb-8">
            <Link to="/proof-course" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to P.R.O.O.F. Course
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Ancient Guild Training</h1>
                  <p className="text-muted-foreground">Jesus & Paul's Membership in Trade Guilds</p>
                </div>
              </div>
              
              {/* Progress Widget */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 min-w-[200px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Training Progress</span>
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                    {completedCount}/10
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="text-sm font-bold text-amber-500">{Math.round(progress)}%</span>
                </div>
                {progress >= 100 && (
                  <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Training Complete!
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
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
                    <Badge variant="outline" className="text-xs">10 Training Modules</Badge>
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(6) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 1</Badge>
                  <h3 className="font-semibold text-foreground">Guild Journey: Apprentice to Master</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(0)} className="gap-2">
                  {completedModules.includes(6) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(6) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <GuildJourneyDiagram className="mb-0" />
            </div>

            {/* Module 2: Guild Audio Player */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(7) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 2</Badge>
                  <h3 className="font-semibold text-foreground">Audio Teaching: Historical Context</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(1)} className="gap-2">
                  {completedModules.includes(7) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(7) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <GuildAudioPlayer className="mb-0" />
            </div>

            {/* Module 3: 1st-Century Guilds Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(8) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 3</Badge>
                  <h3 className="font-semibold text-foreground">Tekton & Tentmaker Associations</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(2)} className="gap-2">
                  {completedModules.includes(8) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(8) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <FirstCenturyGuildsSection className="mb-0" />
            </div>

            {/* Module 4: Guild Practices */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(9) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 4</Badge>
                  <h3 className="font-semibold text-foreground">Historical Practices: Oaths, Handshakes, Rituals</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(3)} className="gap-2">
                  {completedModules.includes(9) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(9) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <GuildPracticesSection className="mb-0" />
            </div>

            {/* Module 5: Holy Kiss Comparison */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(10) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 5</Badge>
                  <h3 className="font-semibold text-foreground">Recognition Rituals: The Holy Kiss</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(4)} className="gap-2">
                  {completedModules.includes(10) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(10) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <HolyKissComparisonChart className="mb-0" />
            </div>

            {/* Module 6: Ichthys Trace */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(11) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 6</Badge>
                  <h3 className="font-semibold text-foreground">The Ichthys Trace: Covert Recognition</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(5)} className="gap-2">
                  {completedModules.includes(11) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(11) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <IchthysTraceDiagram className="mb-0" />
            </div>

            {/* Module 7: Early Christian Symbols */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(12) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 7</Badge>
                  <h3 className="font-semibold text-foreground">Early Christian Symbols Guide</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(6)} className="gap-2">
                  {completedModules.includes(12) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(12) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <EarlyChristianSymbolsGuide className="mb-0" />
            </div>

            {/* Module 8: Catacomb Art Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(13) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 8</Badge>
                  <h3 className="font-semibold text-foreground">Catacomb Art Gallery: Archaeological Evidence</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(7)} className="gap-2">
                  {completedModules.includes(13) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(13) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <CatacombArtGallery className="mb-0" />
            </div>

            {/* Module 9: Guild Evolution Timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(14) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 9</Badge>
                  <h3 className="font-semibold text-foreground">Evolution: Guilds to Greek Organizations</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(8)} className="gap-2">
                  {completedModules.includes(14) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(14) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
              <GuildEvolutionTimeline className="mb-0" />
            </div>

            {/* Module 10: Brotherhood Article */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={completedModules.includes(15) ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>Module 10</Badge>
                  <h3 className="font-semibold text-foreground">Jesus, Paul, and the Brotherhood Question</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(9)} className="gap-2">
                  {completedModules.includes(15) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                  {completedModules.includes(15) ? 'Completed' : 'Mark Complete'}
                </Button>
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
