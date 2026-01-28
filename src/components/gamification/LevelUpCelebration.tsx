import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Award,
  Sparkles,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useTTS } from "@/hooks/use-tts";

interface LevelUpCelebrationProps {
  show: boolean;
  newLevel: number;
  onClose: () => void;
}

const LEVEL_BADGES: Record<number, { icon: React.ElementType; title: string; color: string; description: string }> = {
  1: { icon: Star, title: "Beginner", color: "text-blue-500", description: "You've started your spiritual journey!" },
  2: { icon: Zap, title: "Seeker", color: "text-teal-500", description: "You're actively seeking growth." },
  3: { icon: Award, title: "Learner", color: "text-green-500", description: "Knowledge is your foundation." },
  4: { icon: Sparkles, title: "Faithful", color: "text-purple-500", description: "Your faith is growing stronger." },
  5: { icon: Trophy, title: "Devoted", color: "text-amber-500", description: "True devotion shines through." },
  6: { icon: Crown, title: "Leader", color: "text-orange-500", description: "You lead by example." },
  7: { icon: Star, title: "Master", color: "text-rose-500", description: "Wisdom guides your path." },
  8: { icon: Crown, title: "Champion", color: "text-indigo-500", description: "A champion of faith!" },
  9: { icon: Sparkles, title: "Sage", color: "text-cyan-500", description: "Ancient wisdom flows through you." },
  10: { icon: Crown, title: "Legend", color: "text-yellow-500", description: "A legendary spiritual warrior!" },
};

export const LevelUpCelebration = ({ show, newLevel, onClose }: LevelUpCelebrationProps) => {
  const { speak, isPlaying, stop } = useTTS();
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  // Guard against invalid level - default to level 1
  const safeLevel = newLevel > 0 ? newLevel : 1;
  const levelData = LEVEL_BADGES[safeLevel] || LEVEL_BADGES[Math.min(safeLevel, 10)] || LEVEL_BADGES[1];
  const Icon = levelData.icon;

  useEffect(() => {
    if (show) {
      setHasPlayedAudio(false);
      
      // Trigger confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Star burst in center
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 },
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
        });
      }, 500);
    }
  }, [show]);

  const handlePlayAnnouncement = () => {
    if (isPlaying) {
      stop();
    } else {
      const announcement = `Congratulations! You've reached Level ${newLevel}! You are now a ${levelData.title}. ${levelData.description} Keep up the amazing work on your spiritual journey. Every action you take brings you closer to your next achievement. You're doing incredible!`;
      speak(announcement);
      setHasPlayedAudio(true);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative bg-gradient-to-br from-background via-background to-primary/10 p-8 rounded-3xl border border-primary/30 shadow-2xl max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10" />

            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
              className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 mb-6"
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className={`w-16 h-16 ${levelData.color}`} />
                </motion.div>
              </div>
            </motion.div>

            {/* Level Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Level Up!</span>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              
              <h2 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Level {newLevel}
                </span>
              </h2>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <span className={`text-2xl font-bold ${levelData.color}`}>
                  {levelData.title}
                </span>
              </motion.div>
              
              <p className="text-muted-foreground mt-3">
                {levelData.description}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 space-y-3"
            >
              <Button
                variant="outline"
                onClick={handlePlayAnnouncement}
                className="w-full gap-2"
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-primary' : ''}`} />
                {isPlaying ? 'Playing...' : 'Hear Congratulations'}
              </Button>
              
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Continue Journey
              </Button>
            </motion.div>

            {/* Decorative stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  top: `${10 + Math.random() * 20}%`,
                  left: `${5 + (i * 15)}%`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Star className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
