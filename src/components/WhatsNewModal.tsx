import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Rocket, Bug, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const APP_VERSION = '2.5.4';
const VERSION_STORAGE_KEY = 'last-seen-version';

interface ChangelogEntry {
  version: string;
  date: string;
  highlights: string[];
  features: string[];
  fixes: string[];
  improvements: string[];
}

// Recent changelog entries to show
const recentChanges: ChangelogEntry[] = [
  {
    version: '2.5.4',
    date: '2026-01-30T11:50:00-05:00',
    highlights: ['Auto-Refresh on Login', 'Idle Detection', 'Cache Invalidation'],
    features: [
      'Automatic cache invalidation when users sign in',
      'Idle detection auto-refreshes page after 5+ minutes',
    ],
    fixes: [],
    improvements: [
      'Service worker updated on login for latest app version',
      'SW cache bumped to v10 for forced refresh',
    ],
  },
  {
    version: '2.5.3',
    date: '2026-01-30T07:45:00-05:00',
    highlights: ['Live Preview Fix', 'Cache Refresh', 'SW Update'],
    features: [],
    fixes: [
      'Fixed stale preview showing old UI after login',
      'Service worker now only caches index.html for offline fallback',
    ],
    improvements: [
      'Bumped SW cache version to v8 to force cache refresh',
      'Added version query string to SW registration for reliable updates',
    ],
  },
  {
    version: '2.5.2',
    date: '2026-01-30T10:45:00-05:00',
    highlights: ['Cache & Data Freshness', 'Current Date Display', 'NetworkFirst Caching'],
    features: [
      'Current date now shown on dashboard',
      'NetworkFirst caching prevents stale data',
    ],
    fixes: [],
    improvements: [
      'Improved demo stats detection for returning users',
      'Enhanced service worker cache strategy',
    ],
  },
  {
    version: '2.5.1',
    date: '2026-01-29T15:30:00-05:00',
    highlights: ['Sidebar Progress Bars', 'Remember Password', 'Enhanced Sign-In'],
    features: [
      'Progress bars now visible on all courses in sidebar menu',
      'Remember password support with browser autofill',
    ],
    fixes: [],
    improvements: [
      'Color-coded progress status: muted (0%), primary (in-progress), emerald (complete)',
      'Enhanced sign-in form with proper autocomplete attributes',
    ],
  },
  {
    version: '2.5.0',
    date: '2026-01-28T09:00:00-05:00',
    highlights: ['Hidden in Plain Sight Course', 'Interactive Modules', 'TTS Narration'],
    features: [
      'New "Hidden in Plain Sight" course exploring pagan roots in American & Christian traditions',
      '9 interactive modules covering birthdays, weddings, holidays, symbols, and more',
      'Case study format with TTS narration using Marcus voice',
      '200 points awarded upon course completion',
    ],
    fixes: [],
    improvements: [
      'Achievement tracking for course completion on Achievements page',
    ],
  },
  {
    version: '2.4.0',
    date: '2025-12-03T14:00:00-05:00',
    highlights: ['Admin Gift Subscriptions', 'Feature Customization', 'Tiered Access'],
    features: [
      'Admin gift subscription manager - gift Pro or Ministry access to users',
      'Tiered feature customization - personalize your dashboard experience',
      'Free users can hide up to 5 features, Pro/Ministry get unlimited',
    ],
    fixes: [],
    improvements: [
      'Subscription system now checks gifted subscriptions automatically',
      'Better RLS policies for feature preferences',
    ],
  },
  {
    version: '2.3.0',
    date: '2025-12-02T11:00:00-05:00',
    highlights: ['Personalization', 'Dashboard Updates', 'Mobile Improvements'],
    features: [
      'Personalization survey for new users',
      'Dashboard adapts based on user preferences',
    ],
    fixes: [],
    improvements: [
      'Improved quick actions organization',
      'Better mobile responsiveness across all pages',
    ],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'features':
      return <Rocket className="h-4 w-4 text-emerald-500" />;
    case 'fixes':
      return <Bug className="h-4 w-4 text-orange-500" />;
    case 'improvements':
      return <Zap className="h-4 w-4 text-blue-500" />;
    case 'security':
      return <Shield className="h-4 w-4 text-red-500" />;
    default:
      return <Sparkles className="h-4 w-4 text-purple-500" />;
  }
};

export function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const lastSeenVersion = localStorage.getItem(VERSION_STORAGE_KEY);
    
    // Show modal if user hasn't seen the current version
    if (lastSeenVersion !== APP_VERSION) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    localStorage.setItem(VERSION_STORAGE_KEY, APP_VERSION);
    setIsOpen(false);
  };

  const latestEntry = recentChanges[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">What's New</DialogTitle>
              <DialogDescription className="text-sm">
                Version {latestEntry.version} • {new Date(latestEntry.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          {/* Highlights */}
          {latestEntry.highlights.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {latestEntry.highlights.map((highlight, i) => (
                  <Badge key={i} variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {latestEntry.features.length > 0 && (
            <div className="mb-4">
              <h4 className="flex items-center gap-2 font-semibold text-sm mb-2">
                {getCategoryIcon('features')}
                New Features
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {latestEntry.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {latestEntry.improvements.length > 0 && (
            <div className="mb-4">
              <h4 className="flex items-center gap-2 font-semibold text-sm mb-2">
                {getCategoryIcon('improvements')}
                Improvements
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {latestEntry.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fixes */}
          {latestEntry.fixes.length > 0 && (
            <div className="mb-4">
              <h4 className="flex items-center gap-2 font-semibold text-sm mb-2">
                {getCategoryIcon('fixes')}
                Bug Fixes
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {latestEntry.fixes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ScrollArea>

        <div className="flex items-center justify-between pt-2 border-t">
          <Button variant="link" size="sm" asChild className="px-0">
            <a href="/changelog">View full changelog</a>
          </Button>
          <Button onClick={handleClose} className="bg-emerald-600 hover:bg-emerald-700">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
