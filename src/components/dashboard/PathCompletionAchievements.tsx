import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Trophy, 
  Target, 
  Building2, 
  Shield, 
  Flame, 
  Award,
  Sparkles,
  Lock,
  CheckCircle2,
  Share2,
  Printer
} from 'lucide-react';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { MasterCertificateDialog } from './MasterCertificateDialog';

interface PathAchievement {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  progressKey: 'proofCourse' | 'greekLifeTraining' | 'mythBuster' | 'faithAuthority';
  description: string;
  unlockedTitle: string;
}

const pathAchievements: PathAchievement[] = [
  {
    id: 'proof-master',
    title: 'P.R.O.O.F. Master',
    icon: Target,
    color: 'text-amber-500',
    bgGradient: 'from-amber-500 to-orange-500',
    progressKey: 'proofCourse',
    description: 'Complete all 5 P.R.O.O.F. framework modules',
    unlockedTitle: 'Framework Scholar'
  },
  {
    id: 'guild-historian',
    title: 'Guild Historian',
    icon: Building2,
    color: 'text-violet-500',
    bgGradient: 'from-violet-500 to-purple-500',
    progressKey: 'greekLifeTraining',
    description: 'Complete Greek Life & Guild training',
    unlockedTitle: 'Heritage Guardian'
  },
  {
    id: 'truth-seeker',
    title: 'Truth Seeker',
    icon: Shield,
    color: 'text-orange-500',
    bgGradient: 'from-orange-500 to-red-500',
    progressKey: 'mythBuster',
    description: 'Review all myths in Myth Busters',
    unlockedTitle: 'Myth Buster Elite'
  },
  {
    id: 'faith-leader',
    title: 'Faith Leader',
    icon: Flame,
    color: 'text-rose-500',
    bgGradient: 'from-rose-500 to-pink-500',
    progressKey: 'faithAuthority',
    description: 'Complete Faith & Authority training',
    unlockedTitle: 'Authority Champion'
  }
];

const CELEBRATED_STORAGE_KEY = 'celebrated-path-achievements';

export function PathCompletionAchievements() {
  const { progressData, isLoading } = useNavigationProgress();
  const { user } = useAuth();
  const [celebratedAchievements, setCelebratedAchievements] = useState<Set<string>>(() => {
    // Initialize from localStorage to prevent re-celebration on reload
    try {
      const stored = localStorage.getItem(CELEBRATED_STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [selectedAchievement, setSelectedAchievement] = useState<PathAchievement | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const completedPaths = pathAchievements.filter(
    path => (progressData?.[path.progressKey] || 0) >= 100
  );

  const allComplete = completedPaths.length === pathAchievements.length;

  // Celebrate new achievements (only truly new ones)
  useEffect(() => {
    if (!progressData) return;

    const newlyCompleted = completedPaths.filter(path => !celebratedAchievements.has(path.id));
    
    if (newlyCompleted.length > 0) {
      // Trigger celebration only for genuinely new achievements
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#9333EA'],
      });
      
      // Persist to localStorage and state
      const updated = new Set([...celebratedAchievements, ...newlyCompleted.map(p => p.id)]);
      setCelebratedAchievements(updated);
      localStorage.setItem(CELEBRATED_STORAGE_KEY, JSON.stringify([...updated]));
    }
  }, [completedPaths, celebratedAchievements, progressData]);

  if (isLoading || !user) return null;

  return (
    <>
      <Card className="border-primary/20 bg-gradient-to-br from-amber-500/5 to-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Path Achievements</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {completedPaths.length}/{pathAchievements.length} paths mastered
                </p>
              </div>
            </div>
            {allComplete && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                All Complete!
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pathAchievements.map((achievement, index) => {
              const progress = progressData?.[achievement.progressKey] || 0;
              const isComplete = progress >= 100;

              return (
                <motion.button
                  key={achievement.id}
                  onClick={() => isComplete && setSelectedAchievement(achievement)}
                  className={cn(
                    "relative p-4 rounded-xl border transition-all duration-300",
                    isComplete 
                      ? "border-primary/30 bg-gradient-to-br from-primary/10 to-transparent cursor-pointer hover:shadow-lg hover:scale-105" 
                      : "border-border/50 bg-muted/30 cursor-not-allowed opacity-60"
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={isComplete ? { scale: 1.05 } : {}}
                  disabled={!isComplete}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    {/* Badge Icon */}
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center relative",
                      isComplete 
                        ? `bg-gradient-to-br ${achievement.bgGradient} shadow-lg` 
                        : "bg-muted border border-border"
                    )}>
                      {isComplete ? (
                        <achievement.icon className="w-7 h-7 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      )}
                      
                      {/* Completion checkmark */}
                      {isComplete && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <p className={cn(
                        "text-xs font-semibold",
                        isComplete ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {isComplete ? achievement.unlockedTitle : achievement.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {isComplete ? "Unlocked!" : `${Math.round(progress)}%`}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Master Achievement */}
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-primary/20 to-violet-500/20 border border-amber-500/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 via-primary to-violet-500 flex items-center justify-center shadow-xl">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Sacred Greeks Master</p>
                    <p className="text-xs text-muted-foreground">You've completed all learning paths!</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowCertificate(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Get Certificate
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Achievement Detail Dialog */}
      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center shadow-xl",
                selectedAchievement && `bg-gradient-to-br ${selectedAchievement.bgGradient}`
              )}>
                {selectedAchievement && <selectedAchievement.icon className="w-10 h-10 text-white" />}
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              {selectedAchievement?.unlockedTitle}
            </DialogTitle>
            <DialogDescription className="text-center">
              {selectedAchievement?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-500">Achievement Unlocked!</p>
              <p className="text-xs text-muted-foreground mt-1">
                You've mastered this learning path
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedAchievement(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Master Certificate Dialog */}
      <MasterCertificateDialog 
        open={showCertificate} 
        onOpenChange={setShowCertificate}
        completedPaths={completedPaths.map(p => p.title)}
      />
    </>
  );
}
