import { useState } from 'react';
import {
  FlaskConical, Volume2, VolumeX, Loader2,
  Shield, BookOpen, MessageSquareText, GraduationCap,
  ArrowRight, Sparkles, Search, FileText, Users,
  CheckCircle2, Brain, Heart, ScrollText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';

const DEMO_PROCESS_STEPS = [
  {
    step: 1,
    title: 'Select a Coach',
    description: 'Choose from four specialized AI coaches: Ritual & Oath, Founders & History, Conversation Script, or Study Plan Navigator.',
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    narration: `Step one: Select a coach. The PROOF Command Center offers four specialized AI coaches. The Ritual and Oath Clarity Coach handles claims about portals, rituals, oaths, and deity names. The Founders and History Guide provides balanced context for Masonry claims and historical mutual aid networks. The Conversation Script Coach prepares you for talking to pastors, family, or chapter members. And the Study Plan Navigator creates structured learning plans. Each coach is purpose-built for a specific type of faith and Greek life question.`,
  },
  {
    step: 2,
    title: 'Describe Your Situation',
    description: 'Enter the claim you\'ve heard, select your audience type, and choose the relevant PROOF category for targeted, source-grounded guidance.',
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    narration: `Step two: Describe your situation. You'll enter the specific claim or question you've encountered — for example, someone saying "Greek stepping opens portals." Then you select your audience — are you responding to a pastor, a parent, a chapter member, or a spouse? Finally, you pick the relevant P.R.O.O.F. category like oaths, deity names, or founders and Masonry. This context helps the AI tailor its response to your exact situation.`,
  },
  {
    step: 3,
    title: 'Receive Source-Grounded Output',
    description: 'The AI generates a 60-second response, 5-minute deep dive, PROOF breakdown, dialogue questions, prayer, and next steps — all with citations.',
    icon: ScrollText,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    narration: `Step three: Receive source-grounded output. The AI generates a comprehensive six-tab response. The sixty-second tab gives you a quick, confident answer. The five-minute tab provides a deeper exploration with full citations. The P.R.O.O.F. breakdown maps the claim against each framework pillar. Dialogue questions help you engage the other person thoughtfully. A closing prayer is included. And the Next Steps tab suggests follow-up actions. Every response cites real sources from the Golden Library — no opinions, just evidence.`,
  },
  {
    step: 4,
    title: 'Practice & Share',
    description: 'Use TTS to hear your response aloud, bookmark it for later, share with your accountability group, or save to your run history.',
    icon: Users,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    narration: `Step four: Practice and share. Once you have your response, you can listen to it using text-to-speech to practice delivering it naturally. Bookmark responses for quick access later. Share key points with your accountability group. And every interaction is saved to your run history so you can revisit past coaching sessions anytime. The goal is not just information — it's confident, graceful delivery in real conversations.`,
  },
];

const DEMO_SAMPLE_QUERIES = [
  {
    title: '"Stepping opens spiritual portals"',
    coach: 'Ritual & Oath Coach',
    audience: 'Pastor',
    category: 'Portals',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    tags: ['Portals', 'Rituals', '1 Cor 10:31'],
    description: 'Addresses the common claim that Greek stepping invokes spiritual portals, using biblical context and historical evidence.',
  },
  {
    title: '"The founders were all Freemasons"',
    coach: 'Founders Guide',
    audience: 'Chapter',
    category: 'Founders & Masonry',
    icon: BookOpen,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    tags: ['Founders', 'Masonry', 'Mutual Aid'],
    description: 'Provides nuanced historical context about early 20th-century fraternal networks, Black exclusion, and mutual aid societies.',
  },
  {
    title: '"My pastor says I need to leave my sorority"',
    coach: 'Conversation Coach',
    audience: 'Pastor',
    category: 'Oaths',
    icon: MessageSquareText,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    tags: ['Conversation', 'Pastor', 'Boundaries'],
    description: 'Generates a grace-filled script for discussing Greek membership concerns with pastoral leadership.',
  },
  {
    title: '7-Day PROOF Deep Dive',
    coach: 'Study Navigator',
    audience: 'Self',
    category: 'All Categories',
    icon: GraduationCap,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-500/10',
    tags: ['Study Plan', '7-Day', 'PROOF Framework'],
    description: 'A structured week-long study plan covering each pillar of the P.R.O.O.F. framework with daily readings and reflections.',
  },
];

interface CommandCenterDemoOverviewProps {
  onDismiss: () => void;
}

export function CommandCenterDemoOverview({ onDismiss }: CommandCenterDemoOverviewProps) {
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleStepNarration = (step: typeof DEMO_PROCESS_STEPS[0]) => {
    const itemId = `cc-demo-step-${step.step}`;
    if (isPlaying === itemId) {
      stop();
    } else {
      speak(step.narration, itemId, 'onyx', `Command Center Step ${step.step}: ${step.title}`);
    }
  };

  const handleFullOverviewNarration = () => {
    const itemId = 'cc-demo-full-overview';
    if (isPlaying === itemId) {
      stop();
      return;
    }

    const fullScript = `Welcome to the PROOF Command Center demo walkthrough. This is your AI-powered coaching hub for navigating faith and Greek life conversations with clarity and grace.

    The Command Center offers four specialized coaches. The Ritual and Oath Clarity Coach addresses claims about portals, rituals, secret oaths, and deity names. The Founders and History Guide provides balanced, citation-backed context for claims about founders and Masonic connections. The Conversation Script Coach prepares you for real conversations with pastors, parents, chapter members, or spouses. And the Study Plan Navigator builds structured learning paths using approved content from the Golden Library.

    Here's how the process works in four steps.

    First, select the coach that matches your situation. Each one is trained on specific P.R.O.O.F. categories and source materials.

    Second, describe your situation. Enter the claim you've heard, choose your audience — like a pastor or a parent — and select the relevant category.

    Third, receive your source-grounded output. The AI generates a six-tab response: a sixty-second answer, a five-minute deep dive, a P.R.O.O.F. framework breakdown, dialogue questions, a prayer, and next steps. Every response includes real citations from the Golden Library.

    Fourth, practice and share. Listen to your response with text-to-speech, bookmark it, share with your accountability group, or revisit it in your run history.

    Below you can see four sample queries that demonstrate each coach in action — from addressing portal claims with a pastor, to preparing a conversation about leaving a sorority, to building a seven-day study plan.

    Click any step card to hear a detailed explanation, or dismiss this guide and start coaching.`;

    speak(fullScript, itemId, 'onyx', 'PROOF Command Center Complete Walkthrough');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Demo header */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-violet-500/5 to-transparent">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Command Center Demo Walkthrough</h3>
                <p className="text-sm text-muted-foreground">
                  See how AI coaching delivers source-grounded guidance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFullOverviewNarration}
                className={`gap-1.5 text-xs ${
                  isPlaying === 'cc-demo-full-overview'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground'
                }`}
              >
                {isLoading === 'cc-demo-full-overview' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPlaying === 'cc-demo-full-overview' ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                {isPlaying === 'cc-demo-full-overview' ? 'Stop' : 'Full Audio Tour'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onDismiss} className="text-xs text-muted-foreground">
                Dismiss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Steps */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
          How It Works — 4 Steps
        </h4>
        <div className="grid gap-3">
          {DEMO_PROCESS_STEPS.map((step) => {
            const isExpanded = expandedStep === step.step;
            const stepItemId = `cc-demo-step-${step.step}`;
            const isThisPlaying = isPlaying === stepItemId;
            const isThisLoading = isLoading === stepItemId;

            return (
              <Card
                key={step.step}
                className={`transition-all cursor-pointer hover:shadow-md ${
                  isExpanded ? 'border-primary/30 shadow-sm' : 'border-border/50'
                }`}
                onClick={() => setExpandedStep(isExpanded ? null : step.step)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${step.bgColor} shrink-0`}>
                      <step.icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono">
                          {step.step}
                        </Badge>
                        <span className="font-medium text-sm text-foreground">{step.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStepNarration(step);
                            }}
                            className={`gap-1.5 text-xs h-7 ${
                              isThisPlaying
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {isThisLoading ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : isThisPlaying ? (
                              <VolumeX className="w-3 h-3" />
                            ) : (
                              <Volume2 className="w-3 h-3" />
                            )}
                            {isThisPlaying ? 'Stop' : 'Listen to this step'}
                          </Button>
                        </div>
                      )}
                    </div>
                    <ArrowRight className={`w-4 h-4 text-muted-foreground/50 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sample Queries */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
          Demo Queries — See Each Coach in Action
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {DEMO_SAMPLE_QUERIES.map((query, i) => (
            <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${query.bgColor}`}>
                    <query.icon className={`w-3.5 h-3.5 ${query.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{query.coach}</Badge>
                  <Badge variant="outline" className="text-[10px] ml-auto">{query.audience}</Badge>
                </div>
                <h5 className="text-sm font-medium text-foreground leading-tight">{query.title}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{query.description}</p>
                <div className="flex flex-wrap gap-1">
                  {query.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <Button onClick={onDismiss} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Start Coaching
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Select a coach above to begin your first session
        </p>
      </div>
    </div>
  );
}
