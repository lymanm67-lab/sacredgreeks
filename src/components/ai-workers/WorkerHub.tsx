import { Shield, BookOpen, MessageSquareText, GraduationCap, History, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WorkerType } from '@/pages/AIWorkers';

const WORKERS = [
  {
    type: 'ritual_oath_coach' as WorkerType,
    title: 'Ritual & Oath Clarity Coach',
    description: 'PROOF-guided responses to claims about portals, rituals, oaths, and deity names.',
    icon: Shield,
    color: 'text-primary',
    bg: 'bg-primary/10',
    metric: 'Source-grounded accuracy',
  },
  {
    type: 'founders_guide' as WorkerType,
    title: 'Founders & History Guide',
    description: 'Balanced context for founders, Masonry claims, and historical mutual aid networks.',
    icon: BookOpen,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    metric: 'Citation completeness',
  },
  {
    type: 'conversation_coach' as WorkerType,
    title: 'Conversation Script Coach',
    description: 'Prepare scripts for talking to pastors, family, chapters, or spouses with clarity and grace.',
    icon: MessageSquareText,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    metric: 'Relationship preservation',
  },
  {
    type: 'study_navigator' as WorkerType,
    title: 'Study Plan Navigator',
    description: '7-day and 30-day plans using approved content. Track progress, build streaks.',
    icon: GraduationCap,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
    metric: 'Plan completion rate',
  },
];

interface WorkerHubProps {
  onSelectWorker: (worker: WorkerType) => void;
  onViewHistory: () => void;
}

export function WorkerHub({ onSelectWorker, onViewHistory }: WorkerHubProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-primary" />
            AI Workers
          </h1>
          <p className="text-muted-foreground mt-1">
            Source-grounded coaches for navigating faith & Greek life with clarity.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewHistory} className="gap-2">
          <History className="w-4 h-4" /> History
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {WORKERS.map((w) => (
          <Card
            key={w.type}
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary/30"
            onClick={() => onSelectWorker(w.type)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${w.bg}`}>
                  <w.icon className={`w-6 h-6 ${w.color}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{w.title}</CardTitle>
                  <CardDescription className="mt-1">{w.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">📊 {w.metric}</span>
                <Button size="sm" variant="ghost" className="text-primary">
                  Start →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick action */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Help me respond to this objection</h3>
            <p className="text-sm text-muted-foreground">One-tap entry to the Ritual & Oath Clarity Coach</p>
          </div>
          <Button onClick={() => onSelectWorker('ritual_oath_coach')}>
            Go
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
