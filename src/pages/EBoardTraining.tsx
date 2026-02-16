import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Crown, Shield, DollarSign, FileText, 
  Heart, Users, PartyPopper, Camera, Gavel, Scale, 
  CheckCircle, Play, BookOpen, Award, Trophy, Sparkles,
  ChevronRight, Lock, Star
} from 'lucide-react';
import { EBOARD_MODULES, getTotalEBoardPoints, type TrainingModule } from '@/data/eboard-training-content';
import { EBoardTrainingModule } from '@/components/training/EBoardTrainingModule';
import { useAuth } from '@/contexts/AuthContext';
import { useStudyProgress } from '@/hooks/use-study-progress';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Crown, Shield, DollarSign, FileText, Heart, Users, 
  PartyPopper, Camera, Gavel, Scale
};

export default function EBoardTraining() {
  const { user } = useAuth();
  const { progress } = useStudyProgress();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModule, setSelectedModule] = useState<string | null>(
    searchParams.get('module')
  );

  // Get completed session IDs from progress
  const completedSessions = useMemo(() => {
    return progress.filter(p => p.completed).map(p => p.session_id);
  }, [progress]);

  useEffect(() => {
    const module = searchParams.get('module');
    if (module) setSelectedModule(module);
  }, [searchParams]);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSearchParams({ module: moduleId });
  };

  const handleBackToOverview = () => {
    setSelectedModule(null);
    setSearchParams({});
  };

  // Calculate progress
  const completedModules = EBOARD_MODULES.filter(m => 
    completedSessions.includes(m.sessionId)
  ).length;
  const totalModules = EBOARD_MODULES.length;
  const progressPercent = (completedModules / totalModules) * 100;
  const totalPoints = getTotalEBoardPoints();
  const earnedPoints = EBOARD_MODULES
    .filter(m => completedSessions.includes(m.sessionId))
    .reduce((sum, m) => sum + m.points, 0);

  // Check for master certificate
  const hasMasterCertificate = completedModules === totalModules;

  const activeModule = selectedModule 
    ? EBOARD_MODULES.find(m => m.id === selectedModule) 
    : null;

  if (activeModule) {
    return (
      <EBoardTrainingModule 
        module={activeModule} 
        onBack={handleBackToOverview}
        isCompleted={completedSessions.includes(activeModule.sessionId)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-600/10 pointer-events-none" />
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-amber-500/20">
                  <Crown className="h-6 w-6 text-amber-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">Sacred E-Board Training</h1>
              </div>
              <p className="text-slate-400 max-w-xl">
                Position-specific training for chapter executive board members. 
                Master your role with biblical wisdom, practical scenarios, and hands-on workflows.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                  <Star className="h-3 w-3 mr-1" />
                  {totalPoints} Total Points
                </Badge>
                <Badge variant="outline" className="border-slate-500/50 text-slate-400">
                  {totalModules} Position Modules
                </Badge>
              </div>
            </div>
            
            {/* Progress Card */}
            <Card className="bg-slate-800/50 border-slate-700 w-full lg:w-80">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">Your Progress</span>
                  <span className="text-sm font-semibold text-white">
                    {completedModules}/{totalModules} Positions
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{earnedPoints} pts earned</span>
                  {hasMasterCertificate && (
                    <Badge className="bg-amber-500/20 text-amber-400">
                      <Trophy className="h-3 w-3 mr-1" />
                      Master Complete!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {EBOARD_MODULES.map((module, index) => {
            const Icon = ICON_MAP[module.icon] || Crown;
            const isCompleted = completedSessions.includes(module.sessionId);
            const isLocked = false; // Can add prerequisite logic here
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`relative h-full cursor-pointer transition-all hover:scale-[1.02] ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-emerald-900/30 to-slate-800 border-emerald-500/30' 
                      : isLocked
                        ? 'bg-slate-800/30 border-slate-700 opacity-60'
                        : 'bg-slate-800/50 border-slate-700 hover:border-primary/50'
                  }`}
                  onClick={() => !isLocked && handleSelectModule(module.id)}
                >
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-emerald-500 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${module.color}20` }}
                      >
                        <Icon 
                          className="h-6 w-6" 
                          style={{ color: module.color }} 
                        />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {module.points} pts
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white mt-3">
                      {module.position}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {module.title}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                      {module.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-slate-700">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {module.sections.length} Lessons
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-slate-700">
                        <Play className="h-3 w-3 mr-1" />
                        {module.scenarios.length} Scenarios
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-slate-700">
                        <Award className="h-3 w-3 mr-1" />
                        {module.quiz.length} Quiz Qs
                      </Badge>
                    </div>
                    
                    <Button 
                      variant={isCompleted ? "outline" : "default"}
                      size="sm" 
                      className="w-full"
                      disabled={isLocked}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </>
                      ) : isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review Module
                        </>
                      ) : (
                        <>
                          Start Training
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Master Certificate Section */}
        {hasMasterCertificate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-amber-500/10 via-purple-600/10 to-amber-500/10 border-amber-500/30">
              <CardContent className="py-8 text-center">
                <div className="inline-flex p-4 rounded-full bg-amber-500/20 mb-4">
                  <Trophy className="h-12 w-12 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  E-Board Master Certificate Unlocked!
                </h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Congratulations! You've completed training for all executive board positions.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Award className="h-4 w-4 mr-2" />
                  Download Master Certificate
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Access Section */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Link to="/chapter-finance" className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-emerald-400" />
                  <div>
                    <h4 className="font-semibold text-white">Finance Hub</h4>
                    <p className="text-sm text-slate-400">Practice financial management</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Link to="/proof-course" className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                  <div>
                    <h4 className="font-semibold text-white">P.R.O.O.F. Course</h4>
                    <p className="text-sm text-slate-400">Biblical framework foundation</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Link to="/financial-stewardship" className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">Financial Stewardship</h4>
                    <p className="text-sm text-slate-400">Biblical money principles</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
