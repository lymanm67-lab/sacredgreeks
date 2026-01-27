import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Eye, RotateCcw, ChevronRight, Trophy } from "lucide-react";

interface SavedAssessmentPromptProps {
  assessmentTitle: string;
  resultTitle: string;
  archetype?: string;
  completedAt: string;
  score?: number;
  onViewResults: () => void;
  onRetake: () => void;
  colorScheme?: "purple" | "amber" | "fuchsia" | "blue" | "green";
}

const colorSchemes = {
  purple: {
    gradient: "from-purple-500 to-violet-600",
    bg: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  amber: {
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  fuchsia: {
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "from-fuchsia-500/10 to-pink-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-500",
    badge: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
  },
  blue: {
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  green: {
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  }
};

export function SavedAssessmentPrompt({
  assessmentTitle,
  resultTitle,
  archetype,
  completedAt,
  score,
  onViewResults,
  onRetake,
  colorScheme = "purple"
}: SavedAssessmentPromptProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${colors.border} bg-gradient-to-br ${colors.bg} overflow-hidden`}>
        <div className={`h-2 bg-gradient-to-r ${colors.gradient}`} />
        
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
            <Trophy className="w-8 h-8 text-white" />
          </div>

          <CardTitle className="text-xl">You've Already Completed This!</CardTitle>
          <CardDescription>
            You completed the {assessmentTitle} on {format(new Date(completedAt), "MMMM d, yyyy")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Previous Result Summary */}
          <div className="p-4 rounded-xl bg-background/50 border">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Your Result</p>
                <p className="font-semibold text-lg">{resultTitle}</p>
                {archetype && (
                  <Badge variant="outline" className={colors.badge}>
                    {archetype}
                  </Badge>
                )}
              </div>
              {score !== undefined && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>{score}%</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {format(new Date(completedAt), "EEEE, MMMM d, yyyy 'at' h:mm a")}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3">
            <Button
              onClick={onViewResults}
              className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90`}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Full Report
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={onRetake}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Retaking will create a new result. Your previous results are saved in your history.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
