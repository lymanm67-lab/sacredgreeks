import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Users, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/hooks/use-gamification";
import { useMinistryGroups } from "@/hooks/use-ministry-groups";
import { getAcademyLevel, getNextAcademyLevel, getAcademyLevelProgress } from "@/lib/academy-levels";

export function DashboardMentorWidget() {
  const { stats } = useGamification();
  const { ledGroups, joinedGroups } = useMinistryGroups();

  const totalGroups = ledGroups.length + joinedGroups.length;
  const points = stats?.total_points || 0;
  const level = getAcademyLevel(points);
  const nextLevel = getNextAcademyLevel(points);
  const progress = getAcademyLevelProgress(points);
  const LevelIcon = level.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden border-sacred/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sacred" />
              <h3 className="font-semibold text-sm">Sacred Leaders Academy</h3>
            </div>
            <Link to="/leadership-academy" className="text-xs text-primary hover:underline flex items-center gap-1">
              View <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Academy Level */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 rounded-xl ${level.bgColor}`}>
              <LevelIcon className={`w-5 h-5 ${level.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{level.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  {points} pts
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">{level.description}</p>
            </div>
          </div>

          {/* Progress to next level */}
          {nextLevel && (
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Next: {nextLevel.name}</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
              <p className="text-[10px] text-muted-foreground">
                {nextLevel.minPoints - points} more points needed
              </p>
            </div>
          )}

          {/* Ministry Groups Summary */}
          <div className="flex items-center gap-4 pt-3 border-t border-border/50">
            {ledGroups.length > 0 && (
              <Link to="/mentor-dashboard" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Crown className="w-3.5 h-3.5 text-sacred" />
                <span>{ledGroups.length} group{ledGroups.length !== 1 ? "s" : ""} led</span>
              </Link>
            )}
            {joinedGroups.length > 0 && (
              <Link to="/mentor-dashboard" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Users className="w-3.5 h-3.5 text-violet-500" />
                <span>{joinedGroups.length} group{joinedGroups.length !== 1 ? "s" : ""} joined</span>
              </Link>
            )}
            {totalGroups === 0 && (
              <Link to="/mentor-dashboard" className="text-xs text-primary hover:underline">
                Create or join a ministry group →
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
