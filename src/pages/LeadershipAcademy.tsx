import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Target,
  Building2,
  Zap,
  BookOpen,
  Scale,
  Crown,
  Landmark,
  DollarSign,
  Calendar,
  BookHeart,
  Heart,
  Trophy,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Volume2,
  VolumeX,
  Loader2,
  Shield,
  Search,
  Coins,
  Compass,
  Video,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";
import { useAuth } from "@/contexts/AuthContext";
import { useTTS } from "@/hooks/use-tts";

// ─── Track interface ───
interface AcademyTrack {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  borderColor: string;
  path: string;
  progressKey: string;
  modules: number;
  tag?: string;
  step: number;
}

// ─── Category definitions with logical learning flow ───
interface CourseCategory {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  tracks: AcademyTrack[];
}

const categories: CourseCategory[] = [
  {
    key: "foundation",
    title: "Step 1: Build Your Foundation",
    subtitle: "Start here — establish the biblical framework before diving deeper",
    icon: Target,
    iconColor: "text-amber-500",
    tracks: [
      {
        title: "P.R.O.O.F. Course",
        description: "The essential biblical framework for evaluating Greek life — Purpose, Reverence, Obedience, Others, and Faith",
        icon: Target,
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
        borderColor: "hover:border-amber-500/40",
        path: "/proof-course",
        progressKey: "/proof-course",
        modules: 5,
        tag: "Start Here",
        step: 1,
      },
      {
        title: "Faith & Authority",
        description: "Understanding the power of belief and spiritual conviction as your armor",
        icon: BookOpen,
        gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
        borderColor: "hover:border-sky-500/40",
        path: "/faith-authority",
        progressKey: "/faith-authority",
        modules: 5,
        step: 2,
      },
    ],
  },
  {
    key: "history",
    title: "Step 2: Understand the History",
    subtitle: "Discover the origins — separate myth from truth with historical evidence",
    icon: Search,
    iconColor: "text-violet-500",
    tracks: [
      {
        title: "Greek Life & Guild Training",
        description: "1st-century trade associations, biblical parallels, and the real roots of fraternal fellowship",
        icon: Building2,
        gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
        borderColor: "hover:border-violet-500/40",
        path: "/greek-life-training",
        progressKey: "/greek-life-training",
        modules: 14,
        step: 3,
      },
      {
        title: "Hidden in Plain Sight",
        description: "Exploring pagan influences in church architecture and worship — a surprising history lesson",
        icon: Landmark,
        gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
        borderColor: "hover:border-rose-500/40",
        path: "/hidden-in-plain-sight",
        progressKey: "/hidden-in-plain-sight",
        modules: 9,
        step: 4,
      },
      {
        title: "Myth Busters",
        description: "Addressing the most common misconceptions about Greek organizations and faith head-on",
        icon: Zap,
        gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
        borderColor: "hover:border-yellow-500/40",
        path: "/myth-buster",
        progressKey: "/myth-buster",
        modules: 48,
        step: 5,
      },
      {
        title: "Symbol Guide",
        description: "Explore Greek letters, symbols, and their historical and spiritual meanings",
        icon: Compass,
        gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
        borderColor: "hover:border-teal-500/40",
        path: "/symbol-guide",
        progressKey: "/symbol-guide",
        modules: 0,
        step: 0,
      },
    ],
  },
  {
    key: "discernment",
    title: "Step 3: Apply Discernment",
    subtitle: "Navigate real decisions — biblical wisdom for the hardest questions",
    icon: Shield,
    iconColor: "text-teal-500",
    tracks: [
      {
        title: "Should You Stay or Leave?",
        description: "A biblical and legal framework for discernment — the question every Greek Christian faces",
        icon: Scale,
        gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600",
        borderColor: "hover:border-teal-500/40",
        path: "/should-you-stay-or-leave",
        progressKey: "/should-you-stay-or-leave",
        modules: 6,
        step: 6,
      },
      {
        title: "Saints or Sellouts?",
        description: "Joseph, Daniel, and Esther — biblical models of living faithfully inside secular institutions",
        icon: Crown,
        gradient: "from-orange-500/20 via-red-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
        borderColor: "hover:border-orange-500/40",
        path: "/saints-or-sellouts",
        progressKey: "/saints-or-sellouts",
        modules: 6,
        step: 7,
      },
    ],
  },
  {
    key: "stewardship",
    title: "Step 4: Master Stewardship",
    subtitle: "Build generational wealth with biblical principles",
    icon: Coins,
    iconColor: "text-emerald-500",
    tracks: [
      {
        title: "Sacred Money Course",
        description: "Biblical stewardship, financial leadership, and God's economy for your chapter and career",
        icon: DollarSign,
        gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
        borderColor: "hover:border-emerald-500/40",
        path: "/sacred-money-course",
        progressKey: "/sacred-money-course",
        modules: 11,
        step: 8,
      },
    ],
  },
  {
    key: "spiritual",
    title: "Daily Spiritual Practices",
    subtitle: "Ongoing disciplines to deepen your walk — do these alongside any step",
    icon: Heart,
    iconColor: "text-rose-500",
    tracks: [
      {
        title: "30-Day Journey",
        description: "Daily spiritual growth and discipleship — one day at a time",
        icon: Calendar,
        gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-cyan-500 to-sky-600",
        borderColor: "hover:border-cyan-500/40",
        path: "/journey",
        progressKey: "/journey",
        modules: 30,
        step: 0,
      },
      {
        title: "Bible Study",
        description: "Deep scripture exploration and guided research tools",
        icon: BookOpen,
        gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
        borderColor: "hover:border-purple-500/40",
        path: "/bible-study",
        progressKey: "/bible-study",
        modules: 10,
        step: 0,
      },
      {
        title: "Prayer Journal",
        description: "Track and deepen your prayer life with guided journaling",
        icon: BookHeart,
        gradient: "from-rose-500/20 via-fuchsia-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-rose-500 to-fuchsia-600",
        borderColor: "hover:border-rose-500/40",
        path: "/prayer-journal",
        progressKey: "/prayer-journal",
        modules: 10,
        step: 0,
      },
      {
        title: "Video Library",
        description: "Essential training videos for Christian Greeks navigating faith and fraternity life",
        icon: Video,
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
        iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
        borderColor: "hover:border-amber-500/40",
        path: "/video-library",
        progressKey: "/video-library",
        modules: 0,
        step: 0,
      },
    ],
  },
];

// ─── TTS Script ───
const ACADEMY_OVERVIEW_SCRIPT = `Welcome to the Sacred Leaders Academy — your complete training pathway for navigating Greek life with Christ at the center.

Here's how the journey works. We've organized everything into four steps, plus daily spiritual practices you can do alongside any step.

Step one is Build Your Foundation. Start with the P.R.O.O.F. Course — that's Purpose, Reverence, Obedience, Others, and Faith. This is the essential biblical framework. Then strengthen your armor with Faith and Authority.

Step two is Understand the History. Dive into Greek Life and Guild Training to explore the real roots of fraternal organizations in the 1st century. Then discover Hidden in Plain Sight and the Myth Busters course to separate fact from fiction.

Step three is Apply Discernment. This is where it gets personal. Should You Stay or Leave helps you make the hardest decision with biblical and legal clarity. Saints or Sellouts shows you how Joseph, Daniel, and Esther lived faithfully inside secular institutions.

Step four is Master Stewardship. The Sacred Money Course teaches you God's economy — biblical financial principles for your chapter and your career.

And finally, we have Daily Spiritual Practices — the 30-Day Journey, Bible Study, and Prayer Journal. These run alongside everything else to deepen your walk.

Start with Step 1 — the P.R.O.O.F. Course — and work your way through. You've got this!`;

// ─── Track Card ───
function TrackCard({ track, progress, index }: { track: AcademyTrack; progress: number; index: number }) {
  const completedModules = Math.round((progress / 100) * track.modules);
  const isComplete = progress >= 100;
  const isStarted = progress > 0;

  return (
    <Link to={track.path}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <Card className={`h-full border-border/40 ${track.borderColor} transition-all duration-300 hover:shadow-xl group overflow-hidden relative`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

          <CardContent className="p-5 relative">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                {track.step > 0 && (
                  <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-foreground/80 text-background text-[10px] font-bold flex items-center justify-center z-10">
                    {track.step}
                  </div>
                )}
                <div className={`p-3 rounded-2xl ${track.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <track.icon className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-sm text-foreground truncate">{track.title}</h3>
                  {track.tag && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0 bg-amber-500/15 text-amber-600 border-amber-500/20 animate-pulse">
                      {track.tag}
                    </Badge>
                  )}
                  {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{track.description}</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{completedModules}/{track.modules} modules</span>
                    <span className={isStarted ? "text-foreground font-semibold" : "text-muted-foreground"}>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

// ─── Page Component ───
export default function LeadershipAcademy() {
  const { getProgressForPath, progressData } = useNavigationProgress();
  const { user } = useAuth();
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: "marcus" });

  const allTracks = categories.flatMap((c) => c.tracks);
  const totalProgress = allTracks.reduce((sum, t) => sum + getProgressForPath(t.progressKey), 0);
  const overallProgress = Math.round(totalProgress / allTracks.length);
  const completedCourses = allTracks.filter((t) => getProgressForPath(t.progressKey) >= 100).length;
  const inProgressCourses = allTracks.filter((t) => {
    const p = getProgressForPath(t.progressKey);
    return p > 0 && p < 100;
  }).length;

  const handleTTS = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(ACADEMY_OVERVIEW_SCRIPT);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sacred/20 via-background to-primary/10 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sacred/10 border border-sacred/20 mb-4">
              <GraduationCap className="w-4 h-4 text-sacred" />
              <span className="text-xs font-medium text-sacred">Sacred Leaders Academy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Your Leadership Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mb-5">
              A guided 4-step pathway — from biblical foundation to financial stewardship — with daily spiritual practices to deepen your walk.
            </p>

            {/* TTS Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleTTS}
              disabled={isLoading}
              className="gap-2 border-sacred/30 hover:bg-sacred/10 hover:border-sacred/50 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPlaying ? (
                <VolumeX className="w-4 h-4 text-sacred" />
              ) : (
                <Volume2 className="w-4 h-4 text-sacred" />
              )}
              {isLoading ? "Loading..." : isPlaying ? "Stop Guide" : "Listen to Overview"}
            </Button>
          </motion.div>

          {user && progressData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center gap-6 md:gap-10 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{overallProgress}%</div>
                <div className="text-[11px] text-muted-foreground">Overall</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">{completedCourses}</div>
                <div className="text-[11px] text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{inProgressCourses}</div>
                <div className="text-[11px] text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{allTracks.length}</div>
                <div className="text-[11px] text-muted-foreground">Total</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* Course Categories */}
        {categories.map((category, catIdx) => {
          const CategoryIcon = category.icon;
          const catTracks = category.tracks;
          const catCompleted = catTracks.filter((t) => getProgressForPath(t.progressKey) >= 100).length;
          const isCategoryComplete = catCompleted === catTracks.length;

          return (
            <motion.section
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className={`p-2 rounded-xl ${category.iconColor.replace("text-", "bg-").replace("500", "500/15")} shrink-0 mt-0.5`}>
                  <CategoryIcon className={`w-5 h-5 ${category.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg md:text-xl font-bold text-foreground">{category.title}</h2>
                    {isCategoryComplete && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    <Badge variant="outline" className="text-[10px] ml-auto shrink-0">
                      {catCompleted}/{catTracks.length}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{category.subtitle}</p>
                </div>
              </div>

              {/* Course Cards */}
              <div className={`grid grid-cols-1 ${catTracks.length === 1 ? "md:grid-cols-1 max-w-lg" : catTracks.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
                {catTracks.map((track, i) => (
                  <TrackCard key={track.path} track={track} progress={getProgressForPath(track.progressKey)} index={catIdx * 3 + i} />
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Quick Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Link to="/mentor-dashboard">
            <Card className="hover:border-sacred/30 transition-all h-full group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-sacred to-sacred/70 shrink-0">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Mentor Hub</h3>
                  <p className="text-xs text-muted-foreground">Guide & track students</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link to="/prayer-wall">
            <Card className="hover:border-pink-500/30 transition-all h-full group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Prayer Wall</h3>
                  <p className="text-xs text-muted-foreground">Share prayer requests</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link to="/healing-stories">
            <Card className="hover:border-amber-500/30 transition-all h-full group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Stories</h3>
                  <p className="text-xs text-muted-foreground">Testimonies of growth</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
