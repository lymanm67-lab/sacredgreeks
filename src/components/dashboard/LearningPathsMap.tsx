import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Building2, 
  Shield, 
  Flame, 
  CheckCircle2, 
  Circle,
  ArrowRight,
  Sparkles,
  Map,
  Award,
  ChevronDown,
  DollarSign
} from 'lucide-react';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';
import { cn } from '@/lib/utils';
import { MasterCertificateDialog } from './MasterCertificateDialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  progressKey: 'proofCourse' | 'greekLifeTraining' | 'mythBuster' | 'faithAuthority' | 'sacredMoneyCourse';
  totalItems: number;
  itemLabel: string;
}

const learningPaths: LearningPath[] = [
  {
    id: 'proof',
    title: 'P.R.O.O.F. Course',
    subtitle: 'Foundation Framework',
    href: '/proof-course',
    icon: Target,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    borderColor: 'border-amber-500/30',
    progressKey: 'proofCourse',
    totalItems: 5,
    itemLabel: 'modules'
  },
  {
    id: 'greek-life',
    title: 'Greek Life & Guild',
    subtitle: 'Biblical Foundation',
    href: '/greek-life-training',
    icon: Building2,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500',
    borderColor: 'border-violet-500/30',
    progressKey: 'greekLifeTraining',
    totalItems: 14,
    itemLabel: 'sections'
  },
  {
    id: 'myth-buster',
    title: 'Myth Busters',
    subtitle: 'Debunk Misconceptions',
    href: '/myth-buster',
    icon: Shield,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    borderColor: 'border-orange-500/30',
    progressKey: 'mythBuster',
    totalItems: 20,
    itemLabel: 'myths'
  },
  {
    id: 'faith-authority',
    title: 'Faith & Authority',
    subtitle: 'Leadership Training',
    href: '/faith-authority',
    icon: Flame,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
    borderColor: 'border-rose-500/30',
    progressKey: 'faithAuthority',
    totalItems: 5,
    itemLabel: 'modules'
  },
  {
    id: 'sacred-money',
    title: 'Sacred Money Course',
    subtitle: 'Financial Literacy',
    href: '/financial-stewardship',
    icon: DollarSign,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
    borderColor: 'border-emerald-500/30',
    progressKey: 'sacredMoneyCourse',
    totalItems: 11,
    itemLabel: 'sections'
  }
];

export function LearningPathsMap() {
  const { progressData, isLoading } = useNavigationProgress();
  const [showCertificate, setShowCertificate] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const getCompletedCount = (path: LearningPath): number => {
    if (!progressData) return 0;
    const percentage = progressData[path.progressKey] || 0;
    return Math.round((percentage / 100) * path.totalItems);
  };

  const totalProgress = progressData 
    ? Math.round(
        (progressData.proofCourse + 
         progressData.greekLifeTraining + 
         progressData.mythBuster + 
         progressData.faithAuthority +
         (progressData.sacredMoneyCourse || 0)) / 5
      )
    : 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-4 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Map className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Learning Paths</CardTitle>
                  <p className="text-sm text-muted-foreground">Your journey through Sacred Greeks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {totalProgress}% Complete
                </Badge>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-200",
                  isOpen ? "rotate-0" : "-rotate-90"
                )} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4">
        {/* Progress Path Visualization */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500 via-violet-500 via-orange-500 to-rose-500 opacity-30" />
          
          {/* Path Nodes */}
          <div className="space-y-4">
            {learningPaths.map((path, index) => {
              const progress = progressData?.[path.progressKey] || 0;
              const completedCount = getCompletedCount(path);
              const isComplete = progress >= 100;
              const isActive = progress > 0 && progress < 100;

              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={path.href} className="block group">
                    <div className={cn(
                      "relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                      path.borderColor,
                      "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40",
                      isComplete && "bg-gradient-to-r from-green-500/10 to-transparent"
                    )}>
                      {/* Node Indicator */}
                      <div className="relative z-10">
                        <motion.div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                            isComplete 
                              ? "bg-green-500 shadow-lg shadow-green-500/30" 
                              : isActive 
                                ? `${path.bgColor} shadow-lg` 
                                : "bg-muted border border-border"
                          )}
                          whileHover={{ scale: 1.05 }}
                        >
                          {isComplete ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <path.icon className={cn(
                              "w-6 h-6",
                              isActive ? "text-white" : path.color
                            )} />
                          )}
                        </motion.div>
                        
                        {/* Pulse effect for active paths */}
                        {isActive && (
                          <motion.div
                            className={cn("absolute inset-0 rounded-xl", path.bgColor)}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Path Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {path.title}
                          </h3>
                          {isComplete && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-500 text-[10px]">
                              Complete
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{path.subtitle}</p>
                        
                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <Progress 
                            value={progress} 
                            className="h-1.5 flex-1" 
                          />
                          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                            {completedCount}/{path.totalItems} {path.itemLabel}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>

                  {/* Milestone connector */}
                  {index < learningPaths.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        progress >= 100 ? "bg-green-500" : "bg-muted"
                      )} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Completion Reward Teaser */}
        {totalProgress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <p className="text-xs text-muted-foreground">
              Complete all learning paths to unlock your <span className="font-semibold text-amber-500">Sacred Greeks Certificate</span>
            </p>
          </motion.div>
        )}

        {totalProgress >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold text-green-500">All Paths Complete!</p>
                <p className="text-xs text-muted-foreground">You've mastered the Sacred Greeks curriculum</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCertificate(true)}
              variant="outline"
              size="sm"
              className="border-green-500/50 text-green-600 hover:bg-green-500/10"
            >
              <Award className="w-4 h-4 mr-2" />
              Certificate
            </Button>
          </motion.div>
        )}
        </CardContent>
        </CollapsibleContent>

        <MasterCertificateDialog
          open={showCertificate}
          onOpenChange={setShowCertificate}
          completedPaths={learningPaths.map(p => p.title)}
        />
      </Card>
    </Collapsible>
  );
}