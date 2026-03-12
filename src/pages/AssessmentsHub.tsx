import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Drama,
  ArrowRight,
  Volume2,
  VolumeX,
  Loader2,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  BarChart3,
  History,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTTS } from "@/hooks/use-tts";
import { useAuth } from "@/contexts/AuthContext";

interface Assessment {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  borderColor: string;
  path: string;
  duration: string;
  questions: number;
  tag?: string;
  step: number;
}

const assessments: Assessment[] = [
  {
    title: "Faith Snapshot",
    description: "Discover where you stand at the intersection of faith and Greek life. Get your Faith Confidence Score and personalized archetype in just 6 questions.",
    icon: Sparkles,
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    borderColor: "hover:border-blue-500/40",
    path: "/snapshot",
    duration: "3 min",
    questions: 6,
    tag: "Start Here",
    step: 1,
  },
  {
    title: "P.R.O.O.F. Quiz",
    description: "Test your knowledge of the P.R.O.O.F. framework — Purpose, Reverence, Obedience, Others, and Faith. See how well you can evaluate Greek life through scripture.",
    icon: Target,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    borderColor: "hover:border-emerald-500/40",
    path: "/proof-assessment",
    duration: "8 min",
    questions: 15,
    step: 2,
  },
  {
    title: "Shattered Masks",
    description: "A deeper self-assessment exploring identity, vulnerability, and the masks we wear in Greek organizations. Uncover what's beneath the surface.",
    icon: Drama,
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    borderColor: "hover:border-purple-500/40",
    path: "/shattered-masks",
    duration: "10 min",
    questions: 20,
    step: 3,
  },
];

const OVERVIEW_SCRIPT = `Welcome to the Assessments Hub — this is where you check in with yourself.

We have three assessments, and we recommend taking them in order.

Start with the Faith Snapshot. It's quick — just 6 questions. You'll get your Faith Confidence Score and a personalized archetype that shows where you stand at the intersection of faith and Greek life. This is your starting point.

Next, take the P.R.O.O.F. Quiz. This tests your knowledge of the P.R.O.O.F. framework — Purpose, Reverence, Obedience, Others, and Faith. It's the best way to see how well you understand the biblical lens for evaluating Greek life.

Finally, when you're ready to go deeper, take Shattered Masks. This is a more reflective assessment exploring identity, vulnerability, and the masks we wear in our organizations. It's powerful and personal.

Start with the Faith Snapshot — it only takes 3 minutes — and work your way through. Your results are saved so you can track your growth over time.`;

function AssessmentCard({ assessment, index }: { assessment: Assessment; index: number }) {
  return (
    <Link to={assessment.path}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <Card className={`h-full border-border/40 ${assessment.borderColor} transition-all duration-300 hover:shadow-xl group overflow-hidden relative`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${assessment.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

          <CardContent className="p-6 relative">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-foreground/80 text-background text-[10px] font-bold flex items-center justify-center z-10">
                  {assessment.step}
                </div>
                <div className={`p-3.5 rounded-2xl ${assessment.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <assessment.icon className="w-7 h-7 text-white drop-shadow-sm" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base text-foreground">{assessment.title}</h3>
                  {assessment.tag && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 bg-blue-500/15 text-blue-600 border-blue-500/20 animate-pulse">
                      {assessment.tag}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {assessment.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {assessment.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    {assessment.questions} questions
                  </span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export default function AssessmentsHub() {
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: "marcus" });
  const { user } = useAuth();

  const handleTTS = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(OVERVIEW_SCRIPT);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 via-background to-purple-500/10 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-blue-600">Assessments Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Know Where You Stand
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base mb-5">
              Three assessments to measure your faith confidence, biblical knowledge, and personal authenticity — take them in order for the full picture.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTTS}
                disabled={isLoading}
                className="gap-2 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <VolumeX className="w-4 h-4 text-blue-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-blue-500" />
                )}
                {isLoading ? "Loading..." : isPlaying ? "Stop Guide" : "Listen to Overview"}
              </Button>

              {user && (
                <Link to="/assessment-history">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <History className="w-4 h-4" />
                    View History
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {assessments.map((assessment, i) => (
          <AssessmentCard key={assessment.path} assessment={assessment} index={i} />
        ))}

        {/* Suggested Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-4 py-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Recommended order: Faith Snapshot → P.R.O.O.F. Quiz → Shattered Masks</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
