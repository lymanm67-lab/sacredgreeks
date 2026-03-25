import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, GraduationCap, Landmark, ClipboardCheck,
  Calendar, Users, Bot, Volume2, VolumeX, Loader2,
  ChevronRight, CheckCircle2, Sparkles, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrowserVoicePicker } from "@/components/BrowserVoicePicker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: 1,
    title: "Explore Your Dashboard",
    description: "Your command center for faith-driven Greek life. See your stats, progress, and personalized next steps at a glance.",
    icon: Home,
    href: "/dashboard",
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-500",
    ttsScript: `Step one: Explore Your Dashboard. Your dashboard is your command center. Here you'll see personalized greetings, quick stats on assessments completed, prayer streaks, and devotional progress. Featured action cards guide you to your most important next steps. Quick links give you one-tap access to tools like the Prayer Wall and Community Forum. This is where your Sacred Greeks journey begins every day.`,
    demoPoints: [
      "Personalized greeting & progress stats",
      "Featured action cards for quick navigation",
      "Learning path tracking & achievements",
    ],
  },
  {
    number: 2,
    title: "Sacred Leaders Academy",
    description: "Your learning curriculum with 11 training tracks organized into a 5-step logical flow — from Foundation to Practices.",
    icon: GraduationCap,
    href: "/leadership-academy",
    gradient: "from-amber-500 to-orange-600",
    iconColor: "text-sacred",
    ttsScript: `Step two: Sacred Leaders Academy. This is your centralized learning hub with eleven training tracks organized into five steps: Foundation, History, Discernment, Stewardship, and Practices. Courses like P.R.O.O.F., Should You Stay or Leave, and Saints or Sellouts each offer module-based content with progress tracking. Complete courses to earn points and advance through leadership tiers — from Explorer to Kingdom Builder.`,
    demoPoints: [
      "11 training tracks in 5-step flow",
      "Module progress tracking & certificates",
      "Leadership tiers: Explorer → Kingdom Builder",
    ],
  },
  {
    number: 3,
    title: "Church Leaders Hub",
    description: "Tools designed for pastors, chaplains, and ministry leaders to engage with Greek-letter communities through faith.",
    icon: Landmark,
    href: "/church-leaders",
    gradient: "from-lime-500 to-green-600",
    iconColor: "text-lime-500",
    ttsScript: `Step three: Church Leaders Hub. This hub is built for pastors, chaplains, and ministry leaders. You'll find the Chaplain Toolkit with ready-made resources for campus ministry, conversation scripts powered by A.I. that help you navigate sensitive topics with grace, and a mentorship application system. Whether you're leading a Bible study for Greeks or counseling a student, this hub equips you.`,
    demoPoints: [
      "Chaplain Toolkit for campus ministry",
      "AI-powered conversation scripts",
      "Mentorship application & tracking",
    ],
  },
  {
    number: 4,
    title: "Take Your Assessment",
    description: "Discover your faith profile through interactive assessments designed for Greek-letter members and church leaders.",
    icon: ClipboardCheck,
    href: "/assessments",
    gradient: "from-violet-500 to-purple-600",
    iconColor: "text-blue-500",
    ttsScript: `Step four: Take Your Assessment. Our assessments help you understand where you stand in your faith journey. The P.R.O.O.F. Assessment evaluates your knowledge across key biblical areas. The Faith Snapshot gives you a quick archetype — are you the Scholar, the Shepherd, or the Warrior? Results include personalized recommendations and suggested study paths. Each assessment features narrated audio to guide you through.`,
    demoPoints: [
      "PROOF Assessment for biblical knowledge",
      "Faith Snapshot with personalized archetype",
      "Audio-guided questions & narrated results",
    ],
  },
  {
    number: 5,
    title: "Start Daily Practice",
    description: "Build spiritual habits with daily devotionals, scripture reading, and guided prayer — all tracked for consistency.",
    icon: Calendar,
    href: "/daily-practice",
    gradient: "from-cyan-500 to-teal-600",
    iconColor: "text-cyan-500",
    ttsScript: `Step five: Start Your Daily Practice. Consistency transforms faith. Our daily practice section includes scripture-based devotionals refreshed every day, a prayer journal where you can write and track your prayer life, and streak tracking that rewards your dedication. Set a daily reminder and watch your spiritual disciplines grow. This is where head knowledge becomes heart transformation.`,
    demoPoints: [
      "Daily scripture devotionals",
      "Prayer journal with streak tracking",
      "Guided spiritual discipline habits",
    ],
  },
  {
    number: 6,
    title: "Connect With Others",
    description: "Build meaningful relationships through Sacred Connections, the Member Network, and community features.",
    icon: Users,
    href: "/contacts",
    gradient: "from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    ttsScript: `Step six: Connect With Others. Faith grows in community. Sacred Connections lets you exchange contact information via QR codes at events and conferences. The Member Network helps you discover fellow believers across all nine Divine Nine organizations. You can filter by organization, location, and chapter to find brothers and sisters near you. Build your faith network and never walk alone.`,
    demoPoints: [
      "QR code contact exchange at events",
      "Member Network across all D9 organizations",
      "Filter by org, location & chapter",
    ],
  },
  {
    number: 7,
    title: "Explore Your Toolkit",
    description: "Power tools including the PROOF Command Center, Financial Stewardship calculator, worship playlists, and more.",
    icon: Bot,
    href: "/tools",
    gradient: "from-emerald-500 to-green-600",
    iconColor: "text-primary",
    ttsScript: `Step seven: Explore Your Toolkit. This is where you find your power tools. The P.R.O.O.F. Command Center gives you A.I.-powered coaching grounded in vetted biblical sources. Financial Stewardship helps you apply the ten-fifteen-ten-sixty-five budgeting framework. Worship Playlists curate faith-based music for your chapter events. And Present and Polls lets you create interactive presentations. These tools equip you to lead with excellence.`,
    demoPoints: [
      "PROOF Command Center with AI coaching",
      "Financial Stewardship calculator",
      "Worship Playlists & Present + Polls",
    ],
  },
];

const WELCOME_SCRIPT = `Welcome to Sacred Greeks! I'm going to walk you through everything this platform has to offer. In just seven steps, you'll discover how to grow your faith, lead with integrity, and connect with a community of believers across the Divine Nine. Let's get started!`;

export default function GetStarted() {
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const progress = Math.round((completedSteps.size / STEPS.length) * 100);

  const handleMarkComplete = (stepNumber: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const handlePlayWelcome = () => {
    if (isPlaying === "welcome") {
      stop();
    } else {
      speak(WELCOME_SCRIPT, "welcome", "jessica");
    }
  };

  const handlePlayStep = (step: typeof STEPS[0]) => {
    const id = `step-${step.number}`;
    if (isPlaying === id) {
      stop();
    } else {
      speak(step.ttsScript, id, "jessica");
    }
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sacred/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sacred to-sacred/70 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Get Started</h1>
              <p className="text-sm text-muted-foreground">Your 7-step guide to Sacred Greeks</p>
            </div>
          </div>

          {/* Welcome TTS + Progress */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePlayWelcome}
              className="gap-2 border-sacred/30 hover:bg-sacred/10"
            >
              {isLoading && isPlaying === "welcome" ? (
                <Loader2 className="h-4 w-4 animate-spin text-sacred" />
              ) : isPlaying === "welcome" ? (
                <VolumeX className="h-4 w-4 text-sacred" />
              ) : (
                <Volume2 className="h-4 w-4 text-sacred" />
              )}
              {isPlaying === "welcome" ? "Stop Welcome Tour" : "Listen to Welcome Tour"}
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Progress value={progress} className="w-32 h-2" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {completedSteps.size}/{STEPS.length} completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {STEPS.map((step) => {
          const isExpanded = expandedStep === step.number;
          const isComplete = completedSteps.has(step.number);
          const stepTtsId = `step-${step.number}`;
          const isStepPlaying = isPlaying === stepTtsId;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.number * 0.05 }}
            >
              <Card
                className={cn(
                  "overflow-hidden transition-all duration-300 border-2 cursor-pointer",
                  isExpanded ? "border-primary/30 shadow-lg" : "border-border hover:border-primary/20",
                  isComplete && "border-green-500/30 bg-green-500/5"
                )}
              >
                {/* Header — always visible */}
                <div
                  className="flex items-center gap-4 p-4 md:p-5"
                  onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                >
                  {/* Step number circle */}
                  <div className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-full shrink-0 font-bold text-white shadow-md",
                    isComplete
                      ? "bg-green-500"
                      : `bg-gradient-to-br ${step.gradient}`
                  )}>
                    {isComplete ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-semibold text-foreground",
                      isComplete && "line-through opacity-70"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{step.description}</p>
                  </div>

                  <ChevronRight className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                    isExpanded && "rotate-90"
                  )} />
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="pt-0 pb-5 px-4 md:px-5 space-y-4">
                        {/* Demo points */}
                        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What you'll find</p>
                          {step.demoPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-br", step.gradient)} />
                              <span className="text-sm text-foreground">{point}</span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayStep(step);
                            }}
                            className="gap-2"
                          >
                            {isLoading && isStepPlaying ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : isStepPlaying ? (
                              <VolumeX className="h-3.5 w-3.5" />
                            ) : (
                              <Play className="h-3.5 w-3.5" />
                            )}
                            {isStepPlaying ? "Stop" : "Listen"}
                          </Button>

                          <Link to={step.href} onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" className={cn("gap-2 bg-gradient-to-r text-white", step.gradient)}>
                              Try It <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>

                          <Button
                            size="sm"
                            variant={isComplete ? "secondary" : "ghost"}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkComplete(step.number);
                            }}
                            className="gap-2 ml-auto"
                          >
                            <CheckCircle2 className={cn("h-3.5 w-3.5", isComplete ? "text-green-500" : "text-muted-foreground")} />
                            {isComplete ? "Completed" : "Mark Done"}
                          </Button>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      {completedSteps.size === STEPS.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto px-4 mt-8"
        >
          <Card className="border-2 border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
            <CardContent className="p-6 text-center space-y-3">
              <Badge className="bg-sacred text-white">🎉 All Steps Complete</Badge>
              <h3 className="text-xl font-bold text-foreground">You're Ready!</h3>
              <p className="text-muted-foreground">You've explored everything Sacred Greeks has to offer. Head to your Dashboard to continue your journey.</p>
              <Link to="/dashboard">
                <Button className="bg-sacred hover:bg-sacred/90 text-white gap-2 mt-2">
                  Go to Dashboard <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
