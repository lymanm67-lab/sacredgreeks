import { useState } from 'react';
import { 
  FlaskConical, Volume2, VolumeX, Loader2, Play, 
  FileText, Wand2, ImageIcon, Upload, Film, 
  CheckCircle2, ArrowRight, Sparkles, Clapperboard,
  BookOpen, MessageSquare, ScrollText, Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';

const DEMO_PROCESS_STEPS = [
  {
    step: 1,
    title: 'Choose Your Mode',
    description: 'Select from Text→Video, Image→Video, AI Thumbnails, or Upload. Each mode is optimized for different content types.',
    icon: Film,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    narration: `Step one: Choose your creation mode. Text to Video lets you describe a video concept and the AI builds it scene by scene. Image to Video animates a still image with motion. AI Thumbnails generates photorealistic images for your content. And Upload lets you add existing videos to your library. Each mode is optimized for different use cases — start with Text to Video to see the full pipeline.`,
  },
  {
    step: 2,
    title: 'Enter Your Prompt or Pick a Template',
    description: 'Type a custom prompt or use a suggestion like "Quick Objection Response" or "Mini Teaching" to auto-fill with PROOF-grounded content.',
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    narration: `Step two: Enter your prompt or select a template. You can type any description of the video you want — for example, "Create a 30-second response about secret oaths in Greek life." Or click one of the suggestion chips like Quick Objection Response or Mini Teaching to auto-fill with a P.R.O.O.F.-grounded prompt. Templates guide the AI to use approved library sources and proper citations.`,
  },
  {
    step: 3,
    title: 'Select Source Content',
    description: 'For citation-grounded videos, pick from Objection Cards and Golden Library sources. The AI weaves these into your script with proper citations.',
    icon: BookOpen,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    narration: `Step three: Select your source content. For citation-grounded videos, you'll pick from Objection Cards and Golden Library sources. These are organized by P.R.O.O.F. category — oaths, rituals, origins, and more. The AI weaves these sources into your script with proper biblical citations and historical references. This step ensures every video is backed by real research, not just opinions.`,
  },
  {
    step: 4,
    title: 'Review & Edit the Scene Script',
    description: 'The AI generates a full multi-scene script with narration, visual direction, timing, and captions. Edit anything before rendering.',
    icon: ScrollText,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    narration: `Step four: Review and edit the scene script. The AI generates a complete multi-scene script showing each scene's visual description, narration text, and duration. You can edit any scene — change the narration, adjust the visual direction, or rearrange the order. The script also includes auto-generated captions and a full transcript. Once you're satisfied, you're ready to render.`,
  },
  {
    step: 5,
    title: 'Generate & Publish',
    description: 'Generate your AI script and storyboard, then export to InVideo.ai to render your video. Auto-captions and transcripts included.',
    icon: Clapperboard,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    narration: `Step five: Generate and publish. The system creates your AI script and storyboard with scene-by-scene direction, narration, and citations. Then export to InVideo.ai — the script is copied to your clipboard and you paste it into their editor to render your video. Your storyboard is saved in your library with automated SRT captions and a full transcript.`,
  },
];

const DEMO_SAMPLE_VIDEOS = [
  {
    title: 'Secret Oaths: What the Bible Says',
    type: 'Objection Short',
    duration: '0:30',
    icon: MessageSquare,
    tags: ['Oaths', 'PROOF', 'Matthew 5:34'],
    description: 'A 30-second rapid-response video addressing secret oaths with direct scripture citations.',
  },
  {
    title: 'Founders & Faith: A 2-Minute History',
    type: 'Mini Teaching',
    duration: '2:00',
    icon: BookOpen,
    tags: ['Founders', 'History', 'Masonry'],
    description: 'A mini teaching exploring the faith roots and Masonic connections of Greek organizations.',
  },
  {
    title: 'Talking to Your Line Sister About Faith',
    type: 'Conversation Prep',
    duration: '1:30',
    icon: MessageSquare,
    tags: ['Conversation', 'Sorority', 'Relationships'],
    description: 'A guided conversation prep for discussing faith concerns with a close sorority sister.',
  },
];

interface StudioDemoOverviewProps {
  onDismiss: () => void;
}

export function StudioDemoOverview({ onDismiss }: StudioDemoOverviewProps) {
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleStepNarration = (step: typeof DEMO_PROCESS_STEPS[0]) => {
    const itemId = `studio-demo-step-${step.step}`;
    if (isPlaying === itemId) {
      stop();
    } else {
      speak(step.narration, itemId, 'onyx', `Studio Step ${step.step}: ${step.title}`);
    }
  };

  const handleFullOverviewNarration = () => {
    const itemId = 'studio-demo-full-overview';
    if (isPlaying === itemId) {
      stop();
      return;
    }

    const fullScript = `Welcome to the Studio Agent demo walkthrough. This guide shows you exactly how to create videos, thumbnails, and animations using the Sacred Greeks AI pipeline. 
    
    The Studio Agent supports four creation modes. Text to Video generates a full video from a written prompt. Image to Video animates a still photo with AI-driven motion. AI Thumbnails creates photorealistic images. And Upload lets you save existing videos to your library.
    
    Here's how the process works in five steps.
    
    First, choose your creation mode at the top of the page.
    
    Second, enter a prompt describing your video, or click a template suggestion like Quick Objection Response or Mini Teaching. Templates are pre-loaded with P.R.O.O.F. framework content.
    
    Third, select source content from the Objection Cards and Golden Library. This ensures every video is citation-grounded with real biblical and historical sources.
    
    Fourth, review the AI-generated scene script. Each scene shows its visual direction, narration text, and timing. You can edit anything before rendering.
    
    Fifth, choose your rendering provider and hit Generate. The video renders in the cloud with auto-generated captions and transcripts. When it's done, it appears in your video library ready to publish.
    
    Below you can see three sample videos that were created using this pipeline: a 30-second Objection Short about secret oaths, a 2-minute Mini Teaching on founders and faith, and a Conversation Prep for talking to a line sister about faith.
    
    Try clicking any of the step cards to hear a detailed explanation, or dismiss this guide and start creating.`;

    speak(fullScript, itemId, 'onyx', 'Studio Agent Complete Walkthrough');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Demo header */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-violet-500/5 to-transparent">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <FlaskConical className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Studio Agent Demo Walkthrough</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to create AI-powered videos, step by step
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFullOverviewNarration}
                className={`gap-1.5 text-xs ${
                  isPlaying === 'studio-demo-full-overview'
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-muted-foreground'
                }`}
              >
                {isLoading === 'studio-demo-full-overview' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPlaying === 'studio-demo-full-overview' ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                {isPlaying === 'studio-demo-full-overview' ? 'Stop' : 'Full Audio Tour'}
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
          How It Works — 5 Steps
        </h4>
        <div className="grid gap-3">
          {DEMO_PROCESS_STEPS.map((step) => {
            const isExpanded = expandedStep === step.step;
            const stepItemId = `studio-demo-step-${step.step}`;
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

      {/* Sample Videos */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
          Demo Videos Created with Studio Agent
        </h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {DEMO_SAMPLE_VIDEOS.map((video, i) => (
            <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <video.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{video.type}</Badge>
                  <span className="text-[10px] text-muted-foreground ml-auto">{video.duration}</span>
                </div>
                <h5 className="text-sm font-medium text-foreground leading-tight">{video.title}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{video.description}</p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA to start creating */}
      <div className="text-center pt-2">
        <Button onClick={onDismiss} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Start Creating
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Use the prompt bar above to begin your first video
        </p>
      </div>
    </div>
  );
}