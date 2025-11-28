import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export const ScrollIndicator = ({ targetId, className = "" }: ScrollIndicatorProps) => {
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 text-muted-foreground hover:text-sacred transition-colors cursor-pointer ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Scroll down"
    >
      <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
};
