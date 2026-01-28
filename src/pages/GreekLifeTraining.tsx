import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOHead } from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ListenButton } from '@/components/ListenButton';
import { 
  FileDown, Users, Landmark, BookOpen, ArrowLeft, Target, CheckCircle2, Circle, 
  BookHeart, Scroll, Building2, ChevronRight, Star, Printer, ChevronsUpDown, Home, Trophy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useEarnedCertificates, CERTIFICATE_TYPES } from '@/hooks/use-earned-certificates';
import { useGamification } from '@/hooks/use-gamification';
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
import { HistoricalTimeline, HistoricalTimelineRef } from '@/components/HistoricalTimeline';
import { generateGuildOnePagerPDF } from '@/lib/guild-onepager-pdf';
import { generateGuildComparisonPDF } from '@/lib/guild-comparison-pdf';
import { generateJesusMasterCarpenterPDF } from '@/lib/jesus-master-carpenter-pdf';
import { generateBrotherhoodStudyGuidePDF } from '@/lib/brotherhood-study-guide-pdf';
import { generateIchthysTracePDF } from '@/lib/ichthys-trace-pdf';

const courseOverviewText = `Greek Life & Guild Training: Understanding the Biblical Foundation for Fraternal Organizations

This comprehensive course explores the historical reality of 1st-century trade guilds and their direct connection to modern Greek-letter organizations. By studying the Tekton (carpenter) guild that shaped Jesus' formative years and the Tentmaker associations that provided Paul's livelihood, we discover that structured brotherhood, apprenticeship, and mutual accountability have ancient biblical precedent.

The training is divided into two parts: Part 1 covers the Biblical Foundation with historical context from Scripture, and Part 2 covers the 10 interactive training modules on ancient guild practices. Together they provide a complete understanding of how organizational structure, communal identity, and formational processes are woven into the fabric of biblical history.`;

// Module session IDs map (6-15 for 10 modules)
const MODULE_SESSION_IDS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Foundation reading sections (session IDs 21-24)
const FOUNDATION_SESSION_IDS = [21, 22, 23, 24];

const foundationSections = [
  {
    id: 'koinonia',
    title: 'Koinonia: Biblical Fellowship',
    sessionId: 21,
    content: `Fraternities are not a modern invention. The concept of koinonia (κοινωνία)—Greek for "fellowship," "partnership," or "communion"—appears over 20 times in the New Testament and describes the essential fraternal bond between believers. When Scripture commands believers to have koinonia with one another, it's commanding exactly what Greek letter organizations create: shared life, mutual support, common identity, and exclusive fellowship.`,
    scripture: 'Acts 2:42 — "They devoted themselves to the apostles\' teaching and to koinonia."'
  },
  {
    id: 'jesus-tekton',
    title: 'Jesus: Master Craftsman & Guild Member',
    sessionId: 22,
    content: `Jesus was a TEKTON (τέκτων)—translated "carpenter" but more accurately "master builder" or "craftsman." Ancient craft guilds were fraternal organizations with secret initiations, coded language, oaths of loyalty, and special recognition grips. Guild masters were highly selective—typically accepting only 1-3 apprentices at a time. Selection criteria included family lineage, physical aptitude, moral character, and recommendation from a current guild member.`,
    scripture: 'Mark 6:3 — "Is not this the carpenter (tekton), the son of Mary?"'
  },
  {
    id: 'historical-evidence',
    title: 'Historical Evidence: Passwords & Recognition',
    sessionId: 23,
    content: `The earliest documented password in history comes from Scripture itself. The Gileadites used "Shibboleth" to identify enemy Ephraimites who couldn't pronounce the "sh" sound. This demonstrates password-based recognition systems have biblical precedent dating back over 3,000 years. Roman-era craftsmen guilds had "secret methods of recognition"—but actual passwords were never written down, proving how seriously they guarded secrets.`,
    scripture: 'Judges 12:6 — "Then they would say to him, \'Say now, Shibboleth.\'"'
  },
  {
    id: 'early-church',
    title: 'Early Church as Secret Society',
    sessionId: 24,
    content: `The early church functioned as a secret society during persecution. They used the Ichthys fish symbol as a recognition sign, the password "Maranatha" (which Paul didn't translate, assuming readers knew it), the Holy Kiss as a ritual greeting commanded 5 times in Scripture, and a catechumenate of 1-3 years of initiation with fasting, exorcism, and new names. These practices directly parallel modern fraternal recognition rituals.`,
    scripture: '1 Corinthians 16:22 — "Maranatha" (Our Lord, come!)'
  }
];

const modules = [
  { title: 'Guild Journey: Apprentice to Master', component: GuildJourneyDiagram },
  { title: 'Audio Teaching: Historical Context', component: GuildAudioPlayer },
  { title: 'Tekton & Tentmaker Associations', component: FirstCenturyGuildsSection },
  { title: 'Historical Practices: Oaths, Handshakes, Rituals', component: GuildPracticesSection },
  { title: 'Recognition Rituals: The Holy Kiss', component: HolyKissComparisonChart },
  { title: 'The Ichthys Trace: Covert Recognition', component: IchthysTraceDiagram },
  { title: 'Early Christian Symbols Guide', component: EarlyChristianSymbolsGuide },
  { title: 'Catacomb Art Gallery: Archaeological Evidence', component: CatacombArtGallery },
  { title: 'Evolution: Guilds to Greek Organizations', component: GuildEvolutionTimeline },
  { title: 'Jesus, Paul & the Brotherhood Question', component: JesusPaulBrotherhoodArticle }
];

export default function GreekLifeTraining() {
  const { toast: showToast } = useToast();
  const { user } = useAuth();
  const { progressData } = useNavigationProgress();
  const navigate = useNavigate();
  const { awardCertificate, hasCertificate } = useEarnedCertificates();
  const { awardPoints } = useGamification();
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [completedFoundation, setCompletedFoundation] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('foundation');
  const [allModulesExpanded, setAllModulesExpanded] = useState(false);
  const timelineRef = useRef<HistoricalTimelineRef>(null);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);

  // Load completed modules and foundation sections
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
        .eq('completed', true);
      
      if (data) {
        // Filter for guild modules (6-15)
        setCompletedModules(data.filter(d => d.session_id >= 6 && d.session_id <= 15).map(d => d.session_id));
        // Filter for foundation sections (21-24)
        setCompletedFoundation(data.filter(d => d.session_id >= 21 && d.session_id <= 24).map(d => d.session_id));
      }
      setIsLoading(false);
    };
    
    loadProgress();
  }, [user]);

  const toggleModuleComplete = async (sessionId: number) => {
    if (!user) {
      showToast({ title: 'Sign in required', description: 'Please sign in to track progress', variant: 'destructive' });
      return;
    }

    const isCurrentlyComplete = completedModules.includes(sessionId) || completedFoundation.includes(sessionId);
    
    if (isCurrentlyComplete) {
      await supabase
        .from('study_session_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('session_id', sessionId);
      
      if (sessionId >= 21 && sessionId <= 24) {
        setCompletedFoundation(prev => prev.filter(id => id !== sessionId));
      } else {
        setCompletedModules(prev => prev.filter(id => id !== sessionId));
      }
      showToast({ title: 'Progress removed', description: 'Section unmarked' });
    } else {
      await supabase
        .from('study_session_progress')
        .upsert({
          user_id: user.id,
          session_id: sessionId,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,session_id' });
      
      if (sessionId >= 21 && sessionId <= 24) {
        setCompletedFoundation(prev => [...prev, sessionId]);
      } else {
        setCompletedModules(prev => [...prev, sessionId]);
      }
      showToast({ title: 'Completed! 🎉', description: 'Section marked as complete' });
    }
  };

  // Calculate overall progress (4 foundation + 10 modules = 14 total)
  const totalCompleted = completedFoundation.length + completedModules.length;
  const overallProgress = Math.round((totalCompleted / 14) * 100);
  const foundationProgress = Math.round((completedFoundation.length / 4) * 100);
  const modulesProgress = Math.round((completedModules.length / 10) * 100);

  // Celebration effect when training is 100% complete
  useEffect(() => {
    if (overallProgress >= 100 && !celebrationShown && !isLoading) {
      setCelebrationShown(true);
      setShowCompletionBanner(true);
      
      // Trigger confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8B5CF6', '#D4AF37', '#10B981', '#EC4899'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8B5CF6', '#D4AF37', '#10B981', '#EC4899'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
      
      // Award points for completing the training (50 points)
      awardPoints({ points: 50, actionType: 'training_completion' });
      
      // Award certificate if not already earned
      if (!hasCertificate(CERTIFICATE_TYPES.GREEK_LIFE_TRAINING)) {
        awardCertificate.mutate({
          certificate_type: CERTIFICATE_TYPES.GREEK_LIFE_TRAINING,
          title: 'Greek Life & Guild Training',
          description: 'Successfully completed all 14 sections of Greek Life & Guild Training, mastering the biblical foundation for fraternal organizations.',
          certificate_data: {
            icon: 'Building2',
            color: 'violet',
            completedSections: 14,
            totalSections: 14,
          },
        });
      } else {
        toast.success('🎉 Congratulations! You completed Greek Life Training!', {
          duration: 5000,
        });
      }
    }
  }, [overallProgress, celebrationShown, isLoading, hasCertificate, awardCertificate, awardPoints]);

  const handlePrintFoundation = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Greek Life: A Biblical Foundation - Sacred Greeks</title>
        <style>
          body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
          h1 { text-align: center; color: #8B4513; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; }
          h2 { color: #8B4513; margin-top: 30px; border-left: 4px solid #D4AF37; padding-left: 12px; }
          .section { margin-bottom: 30px; page-break-inside: avoid; }
          .quote { background: #f9f6f0; padding: 15px; border-left: 3px solid #D4AF37; margin: 15px 0; font-style: italic; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 0.9em; color: #666; }
          @media print { body { margin: 20px; } }
        </style>
      </head>
      <body>
        <h1>Greek Life: A Biblical Foundation</h1>
        <p style="text-align: center; color: #666;">Sacred Greeks Ministry</p>
        ${foundationSections.map(section => `
          <div class="section">
            <h2>${section.title}</h2>
            <p>${section.content}</p>
            <div class="quote">${section.scripture}</div>
          </div>
        `).join('')}
        <div class="footer">
          <p>Sacred Greeks Ministry — sacredgreeks.org</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <SEOHead 
        title="Greek Life & Guild Training | Sacred Greeks"
        description="Explore the biblical foundation for Greek-letter organizations through ancient trade guilds, early church practices, and historical evidence."
        type="website"
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header with Progress Widget */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/proof-course" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Learning Path
              </Link>
              <span className="text-muted-foreground">|</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Building2 className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Greek Life & Guild Training</h1>
                  <p className="text-muted-foreground">Biblical Foundation for Fraternal Organizations</p>
                </div>
              </div>
              
              {/* Progress Widget */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-xl p-4 min-w-[200px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <Badge variant="secondary" className="bg-violet-500/20 text-violet-500 border-violet-500/30">
                    {totalCompleted}/14
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={overallProgress} className="h-2 flex-1" />
                  <span className="text-sm font-bold text-violet-500">{overallProgress}%</span>
                </div>
                {overallProgress >= 100 && (
                  <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Training Complete!
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <Badge variant="secondary" className="bg-violet-500/20 text-violet-500 border-violet-500/30">
                Historical Context
              </Badge>
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                10 Training Modules
              </Badge>
              <ListenButton 
                text={courseOverviewText}
                itemId="greek-life-training-overview"
                variant="outline"
                size="sm"
              />
            </div>
          </div>

          {/* Completion Celebration Banner */}
          <AnimatePresence>
            {showCompletionBanner && overallProgress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8"
              >
                <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/30"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Trophy className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">🎉 Training Complete!</h3>
                          <p className="text-sm text-muted-foreground">
                            You've earned a certificate! View it in your Training Success Vault.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          onClick={() => navigate('/training-vault')}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white gap-2 shadow-lg"
                          size="lg"
                        >
                          <Trophy className="w-5 h-5" />
                          View Certificate
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/dashboard')}
                          className="gap-2"
                          size="lg"
                        >
                          <Home className="w-5 h-5" />
                          Dashboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Course Introduction */}
          <Card className="mb-8 border-violet-500/30 bg-gradient-to-r from-violet-500/5 to-purple-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Landmark className="w-8 h-8 text-violet-500 shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">Course Overview</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    This comprehensive training explores the historical reality of 1st-century trade guilds and their 
                    direct connection to modern Greek-letter organizations. Part 1 establishes the biblical foundation,
                    while Part 2 provides interactive training modules on ancient guild practices, recognition rituals,
                    and archaeological evidence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">4 Foundation Readings</Badge>
                    <Badge variant="outline" className="text-xs">10 Training Modules</Badge>
                    <Badge variant="outline" className="text-xs">PDF Resources</Badge>
                    <Badge variant="outline" className="text-xs">Audio Narration</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Foundation vs Training Modules */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1">
              <TabsTrigger value="foundation" className="flex items-center gap-2 py-3">
                <BookHeart className="w-4 h-4" />
                <span>Part 1: Biblical Foundation</span>
                <Badge variant="secondary" className="ml-2 text-xs">{completedFoundation.length}/4</Badge>
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2 py-3">
                <Users className="w-4 h-4" />
                <span>Part 2: Guild Training</span>
                <Badge variant="secondary" className="ml-2 text-xs">{completedModules.length}/10</Badge>
              </TabsTrigger>
            </TabsList>

            {/* Part 1: Biblical Foundation */}
            <TabsContent value="foundation" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Biblical Foundation Readings</h3>
                  <p className="text-sm text-muted-foreground">Essential context from Scripture and history</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrintFoundation} className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print All
                  </Button>
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                    <Progress value={foundationProgress} className="w-20 h-2" />
                    <span className="text-sm font-medium">{foundationProgress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                {foundationSections.map((section, index) => (
                  <Card key={section.id} className={`transition-all ${completedFoundation.includes(section.sessionId) ? 'border-green-500/30 bg-green-500/5' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            completedFoundation.includes(section.sessionId) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-violet-500/20 text-violet-500'
                          }`}>
                            {completedFoundation.includes(section.sessionId) ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                            <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-sacred">
                              <p className="text-xs italic text-muted-foreground">{section.scripture}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <ListenButton 
                            text={`${section.title}. ${section.content} ${section.scripture}`}
                            itemId={`foundation-${section.id}`}
                            size="sm"
                            variant="outline"
                          />
                          <Button 
                            variant={completedFoundation.includes(section.sessionId) ? "secondary" : "outline"} 
                            size="sm" 
                            onClick={() => toggleModuleComplete(section.sessionId)}
                            className="gap-2"
                          >
                            {completedFoundation.includes(section.sessionId) ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                Done
                              </>
                            ) : (
                              <>
                                <Circle className="w-4 h-4" />
                                Mark Done
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* D9 Timeline */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-violet-500" />
                    Divine Nine Historical Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <HistoricalTimeline ref={timelineRef} />
                </CardContent>
              </Card>
              
              {/* Continue to Part 2 */}
              <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Ready for Guild Training?</h3>
                      <p className="text-sm text-muted-foreground">Continue to interactive training modules</p>
                    </div>
                    <Button onClick={() => setActiveTab('modules')} className="gap-2">
                      Part 2: Guild Training
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Part 2: Guild Training Modules */}
            <TabsContent value="modules" className="space-y-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Interactive Training Modules</h3>
                  <p className="text-sm text-muted-foreground">Deep dive into ancient guild practices</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAllModulesExpanded(!allModulesExpanded)}
                    className="gap-2"
                  >
                    <ChevronsUpDown className="w-4 h-4" />
                    {allModulesExpanded ? 'Collapse All' : 'Expand All'}
                  </Button>
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                    <Progress value={modulesProgress} className="w-20 h-2" />
                    <span className="text-sm font-medium">{modulesProgress}%</span>
                  </div>
                </div>
              </div>

              {/* Training Modules */}
              <div className="space-y-6">
                {modules.map((module, index) => {
                  const ModuleComponent = module.component;
                  const sessionId = MODULE_SESSION_IDS[index];
                  const isComplete = completedModules.includes(sessionId);
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={isComplete ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>
                            Module {index + 1}
                          </Badge>
                          <h3 className="font-semibold text-foreground">{module.title}</h3>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toggleModuleComplete(sessionId)} className="gap-2">
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                          {isComplete ? 'Completed' : 'Mark Complete'}
                      </Button>
                      </div>
                      <ModuleComponent className="mb-0" defaultOpen={allModulesExpanded} key={`${index}-${allModulesExpanded}`} />
                    </div>
                  );
                })}
              </div>

              {/* PDF Resources */}
              <Card className="mt-8 border-violet-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-violet-500" />
                    Downloadable Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button variant="outline" onClick={generateGuildOnePagerPDF} className="justify-start gap-2">
                      <FileDown className="w-4 h-4" />
                      Guild One-Pager
                    </Button>
                    <Button variant="outline" onClick={generateGuildComparisonPDF} className="justify-start gap-2">
                      <FileDown className="w-4 h-4" />
                      Guild Comparison Chart
                    </Button>
                    <Button variant="outline" onClick={generateJesusMasterCarpenterPDF} className="justify-start gap-2">
                      <FileDown className="w-4 h-4" />
                      Jesus Master Carpenter
                    </Button>
                    <Button variant="outline" onClick={generateBrotherhoodStudyGuidePDF} className="justify-start gap-2">
                      <FileDown className="w-4 h-4" />
                      Brotherhood Study Guide
                    </Button>
                    <Button variant="outline" onClick={generateIchthysTracePDF} className="justify-start gap-2">
                      <FileDown className="w-4 h-4" />
                      Ichthys Trace Diagram
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Resources */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Continue Your Learning</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/proof-course">
                <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Target className="w-8 h-8 text-amber-500" />
                    <div>
                      <h4 className="font-medium">P.R.O.O.F. Course</h4>
                      <p className="text-xs text-muted-foreground">Evaluate membership biblically</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/myth-buster">
                <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Star className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h4 className="font-medium">Myth Busters</h4>
                      <p className="text-xs text-muted-foreground">Biblical responses to criticisms</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/symbol-guide">
                <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-teal-500" />
                    <div>
                      <h4 className="font-medium">Symbol Guide</h4>
                      <p className="text-xs text-muted-foreground">Understanding Greek symbols</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
