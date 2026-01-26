import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Star, Lock, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofAchievementBadgesProps {
  completedLessons: number[];
  className?: string;
}

const PROOF_LETTERS = [
  { id: 1, letter: 'P', name: 'Pledge', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
  { id: 2, letter: 'R', name: 'Rituals', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
  { id: 3, letter: 'O', name: 'Oaths', color: 'orange', gradient: 'from-orange-500 to-orange-600' },
  { id: 4, letter: 'O', name: 'Obscurity', color: 'green', gradient: 'from-green-500 to-green-600' },
  { id: 5, letter: 'F', name: 'Founders', color: 'red', gradient: 'from-red-500 to-red-600' },
];

export const ProofAchievementBadges = ({ completedLessons, className }: ProofAchievementBadgesProps) => {
  const allCompleted = completedLessons.length === 5;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Achievement Badges Grid */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {PROOF_LETTERS.map((letter, index) => {
          const isUnlocked = completedLessons.includes(letter.id);
          
          return (
            <motion.div
              key={letter.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                delay: index * 0.1 
              }}
              className="relative"
            >
              {/* Glow effect for unlocked badges */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`absolute inset-0 rounded-full bg-${letter.color}-500/30 blur-lg`}
                  />
                )}
              </AnimatePresence>

              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: isUnlocked ? [0, -5, 5, 0] : 0 }}
                className={cn(
                  "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isUnlocked 
                    ? `bg-gradient-to-br ${letter.gradient} border-white/30 shadow-lg`
                    : "bg-muted/50 border-muted-foreground/20"
                )}
                style={isUnlocked ? {
                  boxShadow: `0 4px 20px -5px var(--${letter.color}-500, rgba(0,0,0,0.3))`
                } : {}}
              >
                {isUnlocked ? (
                  <>
                    <span className="text-xl font-bold text-white">{letter.letter}</span>
                    {/* Sparkle animation */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  </>
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground/50" />
                )}
              </motion.div>

              {/* Label */}
              <p className={cn(
                "text-[10px] text-center mt-1 font-medium",
                isUnlocked ? "text-foreground" : "text-muted-foreground/60"
              )}>
                {letter.name}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Master Achievement - All Complete */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative mx-auto max-w-xs"
          >
            {/* Golden glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl" />
            
            <div className="relative bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10 border-2 border-amber-500/40 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                >
                  <Trophy className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-amber-400">PROOF Master</h4>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-muted-foreground">All lessons completed!</p>
                </div>
                <motion.div
                  className="ml-auto"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
