import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Star } from 'lucide-react';

interface CelebrationAnimationProps {
  show: boolean;
  onComplete?: () => void;
  points?: number;
  title?: string;
}

export const CelebrationAnimation = ({
  show,
  onComplete,
  points = 10,
  title = 'Challenge Complete!',
}) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
      }));
      setConfetti(pieces);

      // Auto-hide after animation
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Confetti */}
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
                animate={{
                  y: '100vh',
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  delay: piece.delay,
                  ease: 'easeOut',
                }}
                className="absolute"
                style={{ left: 0, top: 0 }}
              >
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{
                    backgroundColor: [
                      '#3b82f6',
                      '#8b5cf6',
                      '#ec4899',
                      '#f59e0b',
                      '#10b981',
                    ][Math.floor(Math.random() * 5)],
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Center celebration badge */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Main badge */}
              <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 shadow-2xl border-4 border-white/20">
                <motion.div
                  className="text-center space-y-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Trophy icon with sparkles */}
                  <div className="relative inline-block">
                    <Trophy className="w-16 h-16 mx-auto mb-2" />
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-2"
                      animate={{
                        rotate: [360, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      <Star className="w-5 h-5 text-yellow-200" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold">{title}</h3>
                  <motion.p
                    className="text-4xl font-extrabold"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    +{points} 🎉
                  </motion.p>
                  <p className="text-sm text-white/90">Points earned!</p>
                </motion.div>
              </div>

              {/* Orbiting stars */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2,
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-8px',
                    marginLeft: '-8px',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      transformOrigin: `${80 + i * 10}px center`,
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
