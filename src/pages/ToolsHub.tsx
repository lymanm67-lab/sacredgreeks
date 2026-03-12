import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot,
  DollarSign,
  Presentation,
  Music,
  Video,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ToolItem {
  title: string;
  description: string;
  icon: React.ElementType;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
  path: string;
  tag?: string;
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
  },
  {
    title: "Financial Stewardship",
    description: "Biblical stewardship journey — budgets, credit, chapter finance, debt freedom, and wealth building",
    icon: DollarSign,
    accentFrom: "from-emerald-400",
    accentTo: "to-teal-600",
    glowColor: "shadow-emerald-500/20",
    path: "/financial-stewardship",
  },
  {
    title: "Worship Playlists",
    description: "Curated worship music for chapter meetings, retreats, and personal devotion",
    icon: Music,
    accentFrom: "from-fuchsia-500",
    accentTo: "to-purple-600",
    glowColor: "shadow-fuchsia-500/20",
    path: "/worship-playlists",
  },
  {
    title: "Present & Polls",
    description: "Slide decks, live polls, and presentation mode for chapter meetings and workshops",
    icon: Presentation,
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-600",
    glowColor: "shadow-blue-500/20",
    path: "/present",
  },
  {
    title: "Video Library",
    description: "Essential training videos for Christian Greeks navigating faith and fraternity life",
    icon: Video,
    accentFrom: "from-amber-500",
    accentTo: "to-orange-600",
    glowColor: "shadow-amber-500/20",
    path: "/video-library",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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

function ToolCard({ tool }: { tool: ToolItem }) {
  const Icon = tool.icon;

  return (
    <motion.div variants={itemVariants}>
      <Link to={tool.path} className="block group">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-2xl ${tool.glowColor} transition-shadow duration-500`}
        >
          {/* Gradient accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.accentFrom} ${tool.accentTo} opacity-60 group-hover:opacity-100 transition-opacity`} />

          {/* Background glow */}
          <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${tool.accentFrom} ${tool.accentTo} rounded-full opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-700`} />

          <div className="relative p-6 flex flex-col h-full min-h-[180px]">
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
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {tool.description}
            </p>

            {/* Action hint */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/40">
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Open tool
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-300" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ToolsHub() {
  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-fuchsia-500/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_hsl(var(--primary)/0.15),transparent)] pointer-events-none" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/10 to-indigo-500/5 blur-2xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-5 right-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-2xl"
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
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
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
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              AI assistants, financial tools, presentations, worship playlists — all in one place.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tools grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {tools.map((tool) => (
            <ToolCard key={tool.path} tool={tool} />
          ))}
        </motion.div>

        {/* Quick stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-center"
        >
          {[
            { value: "5", label: "Tools Available" },
            { value: "AI", label: "Powered Coaching" },
            { value: "∞", label: "Growth Potential" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
