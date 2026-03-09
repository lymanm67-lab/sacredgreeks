import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, Flame, BookOpen, Heart, Clock, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  chapter_name: string;
  organization: string;
  total_points: number;
  member_count: number;
  devotionals_completed: number;
  prayers_submitted: number;
  study_plans_completed: number;
  service_hours: number;
}

const RANK_ICONS = [Crown, Medal, Trophy];
const RANK_COLORS = [
  'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  'text-gray-400 bg-gray-400/10 border-gray-400/30',
  'text-amber-600 bg-amber-600/10 border-amber-600/30',
];

// Demo data for when no real data exists
const DEMO_ENTRIES: LeaderboardEntry[] = [
  { id: '1', chapter_name: 'Alpha Chapter', organization: 'Alpha Phi Alpha', total_points: 2450, member_count: 32, devotionals_completed: 156, prayers_submitted: 89, study_plans_completed: 12, service_hours: 340 },
  { id: '2', chapter_name: 'Beta Chapter', organization: 'Delta Sigma Theta', total_points: 2180, member_count: 45, devotionals_completed: 134, prayers_submitted: 76, study_plans_completed: 9, service_hours: 290 },
  { id: '3', chapter_name: 'Gamma Chapter', organization: 'Kappa Alpha Psi', total_points: 1920, member_count: 28, devotionals_completed: 112, prayers_submitted: 65, study_plans_completed: 8, service_hours: 260 },
  { id: '4', chapter_name: 'Delta Chapter', organization: 'Alpha Kappa Alpha', total_points: 1750, member_count: 38, devotionals_completed: 98, prayers_submitted: 52, study_plans_completed: 7, service_hours: 220 },
  { id: '5', chapter_name: 'Epsilon Chapter', organization: 'Omega Psi Phi', total_points: 1580, member_count: 25, devotionals_completed: 87, prayers_submitted: 43, study_plans_completed: 6, service_hours: 190 },
];

export function ChapterLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'points' | 'devotionals' | 'service'>('points');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('chapter_leaderboard')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(20);

      if (error) throw error;
      setEntries(data?.length ? data : DEMO_ENTRIES);
    } catch {
      setEntries(DEMO_ENTRIES);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...entries].sort((a, b) => {
    if (sortBy === 'devotionals') return b.devotionals_completed - a.devotionals_completed;
    if (sortBy === 'service') return b.service_hours - a.service_hours;
    return b.total_points - a.total_points;
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-sacred/5 to-warm-blue/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-sacred" />
          </div>
          <div>
            <CardTitle className="text-xl">Chapter Leaderboard</CardTitle>
            <CardDescription>See how your chapter ranks this week</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="points" className="gap-1 text-xs">
              <TrendingUp className="w-3 h-3" /> Points
            </TabsTrigger>
            <TabsTrigger value="devotionals" className="gap-1 text-xs">
              <BookOpen className="w-3 h-3" /> Devotionals
            </TabsTrigger>
            <TabsTrigger value="service" className="gap-1 text-xs">
              <Clock className="w-3 h-3" /> Service
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={sortBy}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {sorted.map((entry, idx) => {
                const RankIcon = RANK_ICONS[idx] || Trophy;
                const isTopThree = idx < 3;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                      isTopThree ? RANK_COLORS[idx] : "bg-card border-border hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                      isTopThree ? "bg-current/10" : "bg-muted text-muted-foreground"
                    )}>
                      {isTopThree ? (
                        <RankIcon className="w-4 h-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{entry.chapter_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{entry.organization}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {sortBy === 'points' && (
                        <Badge variant="secondary" className="font-mono text-xs">
                          <Flame className="w-3 h-3 mr-1" />
                          {entry.total_points.toLocaleString()}
                        </Badge>
                      )}
                      {sortBy === 'devotionals' && (
                        <Badge variant="secondary" className="font-mono text-xs">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {entry.devotionals_completed}
                        </Badge>
                      )}
                      {sortBy === 'service' && (
                        <Badge variant="secondary" className="font-mono text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {entry.service_hours}h
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {entry.member_count}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}
