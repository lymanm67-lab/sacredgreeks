import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot,
  DollarSign,
  Landmark,
  Cross,
  Presentation,
  Music,
  Compass,
  Video,
  ArrowRight,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolItem {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  borderColor: string;
  path: string;
  tag?: string;
}

const toolCategories = [
  {
    key: "ai",
    label: "AI & Research",
    tools: [
      {
        title: "PROOF Command Center",
        description: "AI-powered research, content generation, and biblical analysis tools",
        icon: Bot,
        gradient: "from-primary/20 via-primary/5 to-transparent",
        iconBg: "bg-gradient-to-br from-primary to-primary/70",
        borderColor: "hover:border-primary/40",
        path: "/ai-workers",
        tag: "AI",
      },
    ] as ToolItem[],
  },
  {
    key: "finance",
    label: "Financial Tools",
    tools: [
      {
        title: "Financial Stewardship",
        description: "Biblical stewardship journey — budgets, credit, debt freedom, and wealth building",
        icon: DollarSign,
        gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
        borderColor: "hover:border-emerald-500/40",
        path: "/financial-stewardship",
      },
      {
        title: "Chapter Finance",
        description: "Treasurer tools — track expenses, manage budgets, and approve reimbursements",
        icon: Landmark,
        gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600",
        borderColor: "hover:border-teal-500/40",
        path: "/chapter-finance",
      },
    ] as ToolItem[],
  },
  {
    key: "ministry",
    label: "Ministry & Worship",
    tools: [
      {
        title: "Chaplain Toolkit",
        description: "Generate prayers, devotionals, and theological resources as downloadable PDFs",
        icon: Cross,
        gradient: "from-sacred/20 via-sacred/5 to-transparent",
        iconBg: "bg-gradient-to-br from-sacred to-sacred/70",
        borderColor: "hover:border-sacred/40",
        path: "/chaplain-toolkit",
      },
      {
        title: "Worship Playlists",
        description: "Curated worship music for chapter meetings, retreats, and personal devotion",
        icon: Music,
        gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
        borderColor: "hover:border-purple-500/40",
        path: "/worship-playlists",
      },
    ] as ToolItem[],
  },
  {
    key: "present",
    label: "Present & Media",
    tools: [
      {
        title: "Present & Polls",
        description: "Slide decks, live polls, and presentation mode for chapter meetings and workshops",
        icon: Presentation,
        gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        borderColor: "hover:border-indigo-500/40",
        path: "/present",
      },
      {
        title: "Video Library",
        description: "Essential training videos for Christian Greeks navigating faith and fraternity life",
        icon: Video,
        gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-sky-500 to-blue-500",
        borderColor: "hover:border-sky-500/40",
        path: "/video-library",
      },
    ] as ToolItem[],
  },
  {
    key: "reference",
    label: "Reference",
    tools: [
      {
        title: "Symbol Guide",
        description: "Explore Greek letters, symbols, and their historical and spiritual meanings",
        icon: Compass,
        gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
        borderColor: "hover:border-teal-500/40",
        path: "/symbol-guide",
      },
    ] as ToolItem[],
  },
];

function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  return (
    <Link to={tool.path}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <Card className={`h-full border-border/40 ${tool.borderColor} transition-all duration-300 hover:shadow-xl group overflow-hidden relative`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
          <CardContent className="p-5 relative">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${tool.iconBg} shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-sm text-foreground truncate">{tool.title}</h3>
                  {tool.tag && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 bg-primary/15 text-primary border-primary/20">
                      {tool.tag}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export default function ToolsHub() {
  let globalIndex = 0;

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-background to-emerald-500/10 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Toolkit</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Your Toolkit</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              AI assistants, financial tools, presentation resources, worship playlists, and everything you need to lead effectively.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {toolCategories.map((category) => (
          <section key={category.key}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{category.label}</h2>
            <div className={`grid grid-cols-1 ${category.tools.length === 1 ? "max-w-lg" : "md:grid-cols-2"} gap-4`}>
              {category.tools.map((tool) => {
                const idx = globalIndex++;
                return <ToolCard key={tool.path} tool={tool} index={idx} />;
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
