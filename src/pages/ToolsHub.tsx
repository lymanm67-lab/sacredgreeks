import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  DollarSign,
  Presentation,
  Music,
  ArrowRight,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Loader2,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTTS } from "@/hooks/use-tts";

interface ToolItem {
  title: string;
  description: string;
  icon: React.ElementType;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  path: string;
  tag?: string;
  tips: string[];
}

const tools: ToolItem[] = [
  {
    title: "PROOF Command Center",
    description: "AI-powered research, content generation, and biblical analysis tools",
    icon: Bot,
    accentFrom: "from-violet-500",
    accentTo: "to-indigo-600",
    glowColor: "shadow-violet-500/20",
    path: "/ai-workers",
    tag: "AI",
    tips: [
      "Use the Ritual & Oath Coach for specific claims about Greek rituals",
      "The Conversation Script Coach prepares you for real pastor dialogues",
      "Try the Study Plan Navigator for structured multi-day learning",
    ],
  },
  {
    title: "Financial Stewardship",
    description: "Biblical stewardship journey — budgets, credit, chapter finance, debt freedom, and wealth building",
    icon: DollarSign,
    accentFrom: "from-emerald-400",
    accentTo: "to-teal-600",
    glowColor: "shadow-emerald-500/20",
    path: "/financial-stewardship",
    tips: [
      "Start with Foundation to understand biblical money principles",
      "Use the Kingdom Budget Calculator to align spending with your values",
      "Chapter treasurers: access the Chapter Finance hub in step 6",
    ],
  },
  {
    title: "Worship Playlists",
    description: "Curated worship music for chapter meetings, retreats, and personal devotion",
    icon: Music,
    accentFrom: "from-fuchsia-500",
    accentTo: "to-purple-600",
    glowColor: "shadow-fuchsia-500/20",
    path: "/worship-playlists",
    tips: [
      "Use 'Chapter Meeting' playlists to set the tone before meetings",
      "Share retreat playlists with your chapter's group chat",
      "Great for personal quiet time and morning devotionals",
    ],
  },
  {
    title: "Present & Polls",
    description: "Slide decks, live polls, and presentation mode for chapter meetings and workshops",
    icon: Presentation,
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-600",
    glowColor: "shadow-blue-500/20",
    path: "/present",
    tips: [
      "Use live polls to engage your chapter during meetings",
      "Download slide decks for workshops and Bible study sessions",
      "Presentation mode works great on projectors and shared screens",
    ],
  },
];

const TOOLKIT_OVERVIEW_SCRIPT = `Welcome to your Sacred Greeks Toolkit — your command center for leading effectively.

Here's how to get the most out of each tool.

First, the PROOF Command Center. This is your AI-powered research hub. Use the Ritual and Oath Coach when someone makes a specific claim about Greek rituals — it pulls from our verified library of sources. The Conversation Script Coach helps you prepare for real dialogues with pastors, parents, or chapter members. And the Study Plan Navigator creates structured multi-day learning paths tailored to your needs.

Second, Financial Stewardship. This is a complete 7-step journey from biblical money principles to generational wealth building. Start with the Foundation to understand stewardship theology, then use the Kingdom Budget Calculator. If you're a chapter treasurer, step 6 gives you access to expense tracking, budgets, and reimbursement workflows.

Third, Worship Playlists. Curated music collections organized for different settings — chapter meetings, retreats, and personal devotion time. Share them with your chapter or use them during your own quiet time.

Fourth, Present and Polls. Create engaging chapter meetings with live polls and downloadable slide decks. The presentation mode is designed for projectors and shared screens during workshops or Bible study sessions.

Each tool is designed to make you more effective as a Christian Greek leader. Explore them at your own pace, and remember — you can always come back here to find what you need.`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  const Icon = tool.icon;
  const [showTips, setShowTips] = useState(false);

  return (
    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{ y: -6 }}
        className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-2xl ${tool.glowColor} transition-shadow duration-500 group`}
      >
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.accentFrom} ${tool.accentTo} opacity-60 group-hover:opacity-100 transition-opacity`} />

        {/* Background glow */}
        <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${tool.accentFrom} ${tool.accentTo} rounded-full opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-700`} />

        {/* Step number watermark */}
        <div className="absolute top-3 right-4 text-[64px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none">
          {index + 1}
        </div>

        <div className="relative p-6 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-br ${tool.accentFrom} ${tool.accentTo} shadow-lg`}
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>

            {tool.tag && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3 h-3 mr-1" />
                {tool.tag}
              </Badge>
            )}
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {tool.description}
          </p>

          {/* Tips toggle */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary/70 hover:text-primary transition-colors mb-3"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showTips ? "Hide tips" : "How to use this tool"}
          </button>

          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mb-4 p-3 rounded-lg bg-muted/50 border border-border/40">
                  {tool.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action */}
          <Link to={tool.path} className="mt-auto">
            <div className="flex items-center gap-2 pt-3 border-t border-border/40 group/link cursor-pointer">
              <span className="text-xs font-medium text-muted-foreground group-hover/link:text-primary transition-colors">
                Open tool
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-primary group-hover/link:translate-x-1.5 transition-all duration-300" />
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ToolsHub() {
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: "marcus" });

  const handleOverviewTTS = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(TOOLKIT_OVERVIEW_SCRIPT);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-fuchsia-500/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_hsl(var(--primary)/0.15),transparent)] pointer-events-none" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/10 to-indigo-500/5 blur-2xl pointer-events-none"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-5 right-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-2xl pointer-events-none"
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide">Your Toolkit</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                lead effectively
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-6">
              AI assistants, financial tools, presentations, and worship playlists — all in one place.
            </p>

            {/* TTS Overview Button */}
            <Button
              onClick={handleOverviewTTS}
              variant="outline"
              size="lg"
              className="gap-2 rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPlaying ? (
                <VolumeX className="w-4 h-4 text-primary" />
              ) : (
                <Volume2 className="w-4 h-4 text-primary" />
              )}
              {isLoading ? "Loading audio..." : isPlaying ? "Stop Overview" : "Listen to Toolkit Guide"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Tools grid — 2x2 balanced */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {tools.map((tool, i) => (
            <ToolCard key={tool.path} tool={tool} index={i} />
          ))}
        </motion.div>

        {/* How to get the most out of your toolkit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-14"
        >
          <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.05),transparent)] pointer-events-none" />
            <CardContent className="p-6 md:p-8 relative">
              <div className="flex items-start gap-4 mb-5">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">How to Get the Most Out of Your Toolkit</h2>
                  <p className="text-sm text-muted-foreground">Follow these steps to maximize your effectiveness as a Sacred Greek leader.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    step: "1",
                    title: "Start with AI Coaching",
                    desc: "Use the PROOF Command Center to get personalized guidance on your specific faith and Greek life questions.",
                    color: "from-violet-500 to-indigo-600",
                  },
                  {
                    step: "2",
                    title: "Build Financial Foundation",
                    desc: "Walk through the 7-step stewardship journey to align your finances with biblical principles.",
                    color: "from-emerald-400 to-teal-600",
                  },
                  {
                    step: "3",
                    title: "Set the Atmosphere",
                    desc: "Use worship playlists to create the right environment for chapter meetings and personal devotion.",
                    color: "from-fuchsia-500 to-purple-600",
                  },
                  {
                    step: "4",
                    title: "Engage Your Chapter",
                    desc: "Use presentations and live polls to facilitate impactful discussions and workshops.",
                    color: "from-blue-500 to-cyan-600",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/60 border border-border/30 hover:border-border/60 transition-colors"
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} text-white text-sm font-bold shrink-0`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
