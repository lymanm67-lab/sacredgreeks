import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, CheckCircle2, Share2 } from "lucide-react";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { Link } from "react-router-dom";
import { studyGuideSessions } from "@/sacredGreeksContent";
import { ShareCompletionDialog } from "@/components/study-guide/ShareCompletionDialog";
import { useState } from "react";

export const StudyGuideWidget = () => {
  const {
    completedCount,
    totalSessions,
    progressPercentage,
    isAuthenticated,
    progress,
  } = useStudyProgress();

  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sacred" />
            <CardTitle>Sacred, Not Sinful Study Guide</CardTitle>
          </div>
          <CardDescription>
            A 5-session journey through faith and Greek life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Sign in to track your progress through our comprehensive study guide with scripture-based teaching, discussion questions, and action steps.
          </p>
          <Link to="/study">
            <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
              View Study Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Find the next incomplete session
  const completedSessionIds = progress
    .filter((p) => p.completed)
    .map((p) => p.session_id);
  
  const nextSession = studyGuideSessions.find(
    (session) => !completedSessionIds.includes(session.id)
  );

  const isComplete = completedCount === totalSessions;

  return (
    <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sacred" />
            <CardTitle>Study Guide Progress</CardTitle>
          </div>
          {isComplete && (
            <CheckCircle2 className="w-6 h-6 text-sacred animate-scale-in" />
          )}
        </div>
        <CardDescription>
          {isComplete
            ? "🎉 All sessions completed!"
            : `${completedCount} of ${totalSessions} sessions completed`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>

        {isComplete ? (
          <div className="space-y-4">
            <div className="bg-sacred/10 border border-sacred/20 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                Congratulations! 🎊
              </p>
              <p className="text-xs text-muted-foreground">
                You've completed all 5 sessions of the Sacred, Not Sinful study guide. Consider going deeper with the full book or explore coaching with Dr. Lyman.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setShareDialogOpen(true)}
                className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Link to="/study" className="w-full">
                <Button variant="outline" className="w-full">
                  Review
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : nextSession ? (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sacred text-sacred-foreground flex items-center justify-center text-xs font-bold">
                  {nextSession.id}
                </div>
                <p className="text-sm font-medium text-foreground">
                  Next Session
                </p>
              </div>
              <p className="text-sm font-semibold line-clamp-2">
                {nextSession.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                Theme: {nextSession.theme}
              </p>
            </div>
            <Link to="/study">
              <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                Continue Session {nextSession.id}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/study">
            <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
              View Study Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </CardContent>

      <ShareCompletionDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />
    </Card>
  );
};
