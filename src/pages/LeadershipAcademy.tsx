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
  Users,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";
import { useAuth } from "@/contexts/AuthContext";

interface AcademyTrack {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  path: string;
  progressKey: string;
  modules: number;
  tag?: string;
}

const coreTracks: AcademyTrack[] = [
  {
    title: "P.R.O.O.F. Course",
    description: "Biblical framework for evaluating Greek life through scripture",
    icon: Target,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    path: "/proof-course",
    progressKey: "/proof-course",
    modules: 5,
    tag: "Foundation",
  },
  {
    title: "Greek Life & Guild Training",
    description: "Historical context of 1st-century trade associations and biblical parallels",
    icon: Building2,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    path: "/greek-life-training",
    progressKey: "/greek-life-training",
    modules: 14,
  },
  {
    title: "Faith & Authority",
    description: "Understanding the power of belief and spiritual conviction",
    icon: BookOpen,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    path: "/faith-authority",
    progressKey: "/faith-authority",
    modules: 5,
  },
  {
    title: "Myth Busters",
    description: "Addressing common misconceptions about Greek organizations and faith",
    icon: Zap,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    path: "/myth-buster",
    progressKey: "/myth-buster",
    modules: 48,
  },
  {
    title: "Should You Stay or Leave?",
    description: "A biblical and legal framework for discernment",
    icon: Scale,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-500/10",
    path: "/should-you-stay-or-leave",
    progressKey: "/should-you-stay-or-leave",
    modules: 6,
  },
  {
    title: "Saints or Sellouts?",
    description: "Joseph, Daniel, and Esther as models of integration",
    icon: Crown,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
    path: "/saints-or-sellouts",
    progressKey: "/saints-or-sellouts",
    modules: 6,
  },
  {
    title: "Hidden in Plain Sight",
    description: "Exploring pagan influences in church architecture and worship",
    icon: Landmark,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    path: "/hidden-in-plain-sight",
    progressKey: "/hidden-in-plain-sight",
    modules: 9,
  },
  {
    title: "Sacred Money Course",
    description: "Biblical stewardship and financial leadership principles",
    icon: DollarSign,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    path: "/sacred-money-course",
    progressKey: "/sacred-money-course",
    modules: 11,
  },
];

const spiritualTracks = [
  {
    title: "30-Day Journey",
    description: "Daily spiritual growth and discipleship",
    icon: Calendar,
    iconColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    path: "/journey",
    progressKey: "/journey",
    modules: 30,
  },
  {
    title: "Bible Study",
    description: "Deep scripture exploration and research",
    icon: BookOpen,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    path: "/bible-study",
    progressKey: "/bible-study",
    modules: 10,
  },
  {
    title: "Prayer Journal",
    description: "Track and deepen your prayer life",
    icon: BookHeart,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    path: "/prayer-journal",
    progressKey: "/prayer-journal",
    modules: 10,
  },
];

function TrackCard({ track, progress }: { track: AcademyTrack; progress: number }) {
  const completedModules = Math.round((progress / 100) * track.modules);
  const isComplete = progress >= 100;

  return (
    <Link to={track.path}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${track.bgColor} shrink-0`}>
                <track.icon className={`w-6 h-6 ${track.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {track.title}
                  </h3>
                  {track.tag && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                      {track.tag}
                    </Badge>
                  )}
                  {isComplete && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {track.description}
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">
                      {completedModules}/{track.modules} modules
                    </span>
                    <span className={progress > 0 ? "text-primary font-medium" : "text-muted-foreground"}>
                      {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export default function LeadershipAcademy() {
  const { getProgressForPath, progressData } = useNavigationProgress();
  const { user } = useAuth();

  // Calculate overall academy progress
  const allTracks = [...coreTracks, ...spiritualTracks];
  const totalProgress = allTracks.reduce((sum, t) => sum + getProgressForPath(t.progressKey), 0);
  const overallProgress = Math.round(totalProgress / allTracks.length);

  const completedCourses = allTracks.filter(t => getProgressForPath(t.progressKey) >= 100).length;
  const inProgressCourses = allTracks.filter(t => {
    const p = getProgressForPath(t.progressKey);
    return p > 0 && p < 100;
  }).length;

  return (
    <div className="min-h-screen pb-28">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sacred/20 via-background to-primary/10 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sacred/10 border border-sacred/20 mb-4">
              <GraduationCap className="w-4 h-4 text-sacred" />
              <span className="text-xs font-medium text-sacred">Sacred Leaders Academy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Leadership Journey
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Equipping pastors, campus ministers, and youth leaders with biblical frameworks 
              to guide fraternity and sorority members toward a Christ-centered life.
            </p>
          </motion.div>

          {/* Stats Row */}
          {user && progressData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-6 md:gap-10 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{overallProgress}%</div>
                <div className="text-[11px] text-muted-foreground">Overall Progress</div>
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
                <div className="text-[11px] text-muted-foreground">Total Courses</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Link to="/proof-course">
            <Card className="hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Play className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Start Learning</span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/mentor-dashboard">
            <Card className="hover:border-sacred/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Crown className="w-5 h-5 text-sacred group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Mentor Hub</span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/forum">
            <Card className="hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Users className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Community</span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/journey">
            <Card className="hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Challenges</span>
              </CardContent>
            </Card>
          </Link>
          <Link to="/events">
            <Card className="hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Live Events</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Core Training Tracks */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Trophy className="w-5 h-5 text-sacred" />
            <h2 className="text-xl font-bold text-foreground">Core Training Tracks</h2>
            <Badge variant="outline" className="text-[10px]">
              {coreTracks.length} courses
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreTracks.map((track, i) => (
              <motion.div
                key={track.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TrackCard track={track} progress={getProgressForPath(track.progressKey)} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Spiritual Practices */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <Heart className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-foreground">Spiritual Practices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spiritualTracks.map((track, i) => (
              <motion.div
                key={track.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TrackCard track={track} progress={getProgressForPath(track.progressKey)} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community & Resources CTA */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/prayer-wall">
            <Card className="hover:border-pink-500/30 transition-all h-full group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-pink-500/10 shrink-0">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Prayer Wall</h3>
                  <p className="text-xs text-muted-foreground">Share and support prayer requests</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link to="/healing-stories">
            <Card className="hover:border-amber-500/30 transition-all h-full group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Transformation Stories</h3>
                  <p className="text-xs text-muted-foreground">Real testimonies of faith and growth</p>
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
