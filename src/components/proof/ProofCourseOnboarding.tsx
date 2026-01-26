import { motion } from "framer-motion";
import { Target, BookOpen, CheckCircle2, Play, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProofCourseOnboardingProps {
  onStartCourse: () => void;
  completedLessons: number;
  totalLessons: number;
}

export function ProofCourseOnboarding({ 
  onStartCourse, 
  completedLessons, 
  totalLessons 
}: ProofCourseOnboardingProps) {
  const hasStarted = completedLessons > 0;
  const isComplete = completedLessons === totalLessons;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 mb-8"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium">
                {isComplete ? "Course Complete!" : hasStarted ? "Continue Your Journey" : "Start Your Journey"}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              P.R.O.O.F.{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Framework
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/70 mb-6 max-w-xl"
            >
              Master the biblical framework for navigating Greek life with faith, wisdom, and confidence. 
              Five powerful lessons with practical applications.
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-white/80 text-sm">5 Lessons</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span className="text-white/80 text-sm">Worksheets</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 text-sm">Audio Included</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                size="lg"
                onClick={onStartCourse}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold shadow-lg shadow-amber-500/25"
              >
                <Play className="w-5 h-5 mr-2" />
                {isComplete ? "Review Course" : hasStarted ? "Continue Learning" : "Start First Lesson"}
              </Button>
            </motion.div>
          </div>

          {/* Right: Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* PROOF Letters Circle - Balanced Pentagon Layout */}
            <div className="relative w-52 h-52 md:w-60 md:h-60">
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Target className="w-10 h-10 text-amber-400" />
                </div>
              </div>

              {/* Letter Badges - Pentagon arrangement for visual balance */}
              {[
                { letter: "P", color: "bg-blue-500", top: "0%", left: "50%", transform: "-translate-x-1/2", completed: completedLessons >= 1 },
                { letter: "R", color: "bg-purple-500", top: "31%", left: "95%", transform: "-translate-x-1/2", completed: completedLessons >= 2 },
                { letter: "O", color: "bg-orange-500", top: "81%", left: "79%", transform: "-translate-x-1/2", completed: completedLessons >= 3 },
                { letter: "O", color: "bg-green-500", top: "81%", left: "21%", transform: "-translate-x-1/2", completed: completedLessons >= 4 },
                { letter: "F", color: "bg-red-500", top: "31%", left: "5%", transform: "-translate-x-1/2", completed: completedLessons >= 5 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{ top: item.top, left: item.left }}
                  className={`absolute -translate-x-1/2 w-12 h-12 rounded-xl ${item.completed ? 'bg-green-500/20 border-green-500/50' : `${item.color}/20 border-white/20`} border-2 flex items-center justify-center shadow-lg backdrop-blur-sm`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <span className="text-white font-bold text-lg">{item.letter}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress indicator */}
            {hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
              >
                <span className="text-white/80 text-sm font-medium">
                  {completedLessons}/{totalLessons} Complete
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
