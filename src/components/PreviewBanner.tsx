import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PreviewBannerProps {
  featureName?: string;
}

export function PreviewBanner({ featureName = "this feature" }: PreviewBannerProps) {
  const { user } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show banner if user is authenticated or dismissed
  if (user || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Demo</span>
              </div>
              <p className="text-sm text-muted-foreground hidden sm:block">
                You're previewing {featureName}. Sign up for full access to all features.
              </p>
              <p className="text-sm text-muted-foreground sm:hidden">
                Preview mode — sign up for full access
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button size="sm" className="gap-1.5 text-xs h-8 px-3">
                  <Sparkles className="w-3 h-3" />
                  Sign Up Free
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setIsDismissed(true)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
