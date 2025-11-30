import React, { useEffect, useState } from 'react';
import { Bell, X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Current app version - update this when releasing new versions
export const CURRENT_VERSION = '2.1.0';

interface UpdateInfo {
  version: string;
  title: string;
  highlights: string[];
  date: string;
}

// Latest update info to show in notification
const latestUpdate: UpdateInfo = {
  version: CURRENT_VERSION,
  title: 'iOS Installation Fix & SEO Improvements',
  highlights: [
    'Fixed Safari "cannot find network" error on iPhone',
    'Dynamic sitemap for better search visibility',
    'Structured data for rich search snippets',
    'PWA validation tests to prevent future issues'
  ],
  date: '2024-11-30'
};

const STORAGE_KEY = 'sacred-greeks-last-seen-version';

export function UpdateNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem(STORAGE_KEY);
    
    // Show notification if user hasn't seen this version
    if (lastSeenVersion !== CURRENT_VERSION) {
      // Small delay to not interrupt initial load
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    setTimeout(() => setShowNotification(false), 300);
  };

  const handleViewChangelog = () => {
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    setShowNotification(false);
    navigate('/changelog');
  };

  if (!showNotification) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm w-full mx-4 md:mx-0"
        >
          <Card className="border-primary/30 shadow-lg bg-card/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">What's New</CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">
                        v{latestUpdate.version}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(latestUpdate.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mr-2 -mt-1"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-medium text-sm mb-2">{latestUpdate.title}</p>
              <ul className="space-y-1 mb-3">
                {latestUpdate.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-1">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={handleViewChangelog}
                >
                  View All Updates
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to check for updates programmatically
export function useUpdateCheck() {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem(STORAGE_KEY);
    setHasUpdate(lastSeenVersion !== CURRENT_VERSION);
  }, []);

  const markAsSeen = () => {
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    setHasUpdate(false);
  };

  return { hasUpdate, currentVersion: CURRENT_VERSION, markAsSeen };
}
