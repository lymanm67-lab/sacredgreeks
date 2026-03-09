import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

/**
 * Celebration burst animation for achievements/completions
 */
export function CelebrationBurst({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={show ? {
        scale: [1, 1.15, 1],
        rotate: [0, -3, 3, 0],
      } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered list entrance animation
 */
export function StaggeredList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Success checkmark animation
 */
export function SuccessCheck({ show }: { show: boolean }) {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="w-12 h-12 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center"
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="w-6 h-6 text-green-500"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
      </motion.svg>
    </motion.div>
  );
}

/**
 * Pulse animation for call-to-action elements
 */
export function PulseHighlight({ active, children, className }: { active: boolean; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={active ? { 
        boxShadow: [
          '0 0 0 0 hsl(var(--sacred) / 0.4)',
          '0 0 0 8px hsl(var(--sacred) / 0)',
        ]
      } : {}}
      transition={active ? { duration: 1.5, repeat: Infinity } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
