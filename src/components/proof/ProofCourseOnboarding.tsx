import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Play, Sparkles, GraduationCap, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProofCourseOnboardingProps {
  onStartCourse: () => void;
  completedLessons: number;
  totalLessons: number;
}

// PROOF letter data with colors
const PROOF_LETTERS = [
  { letter: "P", label: "Pledge", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-500" },
  { letter: "R", label: "Ritual", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-500" },
  { letter: "O", label: "Oaths", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-500" },
  { letter: "O", label: "Obscurity", color: "from-green-500 to-green-600", bgColor: "bg-green-500" },
  { letter: "F", label: "Founders", color: "from-red-500 to-red-600", bgColor: "bg-red-500" },
];

export function ProofCourseOnboarding({ 
  onStartCourse, 
  completedLessons, 
  totalLessons 
}: ProofCourseOnboardingProps) {
  const hasStarted = completedLessons > 0;
  const isComplete = completedLessons === totalLessons;
  const progressPercent = (completedLessons / totalLessons) * 100;

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
        {/* Animated floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400/30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
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
                <Zap className="w-4 h-4 text-amber-400" />
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

          {/* Right: PROOF Letters as Horizontal Progress Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="w-full lg:w-auto"
          >
            <div className="flex flex-col gap-2">
              {/* PROOF Letters Row */}
              <div className="flex justify-center gap-2">
                {PROOF_LETTERS.map((item, index) => {
                  const isCompleted = completedLessons > index;
                  const isCurrent = completedLessons === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                      className="relative group"
                    >
                      {/* Letter Card */}
                      <div 
                        className={`
                          w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center
                          transition-all duration-300 border-2
                          ${isCompleted 
                            ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/20' 
                            : isCurrent 
                              ? `bg-gradient-to-br ${item.color} border-white/30 shadow-lg shadow-amber-500/20 animate-pulse` 
                              : 'bg-white/5 border-white/10 opacity-50'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <>
                            <span className={`text-lg md:text-xl font-bold ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                              {item.letter}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Label below */}
                      <span className={`
                        block text-center text-[10px] mt-1 font-medium
                        ${isCompleted ? 'text-green-400' : isCurrent ? 'text-amber-300' : 'text-white/40'}
                      `}>
                        {item.label}
                      </span>
                      
                      {/* Current indicator */}
                      {isCurrent && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-3 px-2"
              >
                <div className="flex items-center gap-3">
                  <Progress value={progressPercent} className="h-2 flex-1 bg-white/10" />
                  <span className="text-white/70 text-sm font-medium w-12 text-right">
                    {completedLessons}/{totalLessons}
                  </span>
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mt-2"
                  >
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-amber-300 text-sm font-medium">Course Complete!</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
