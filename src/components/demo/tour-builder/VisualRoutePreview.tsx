import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TourStep } from '@/data/demoOnboardingTemplates';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Heart, 
  Users, 
  Trophy, 
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  ArrowRight,
  Circle
} from 'lucide-react';

interface VisualRoutePreviewProps {
  steps: TourStep[];
  activeStepIndex?: number;
}

const ROUTE_ICONS: Record<string, React.ReactNode> = {
  '/': <Home className="h-4 w-4" />,
  '/dashboard': <LayoutDashboard className="h-4 w-4" />,
  '/devotional': <BookOpen className="h-4 w-4" />,
  '/prayer-journal': <Heart className="h-4 w-4" />,
  '/prayer-wall': <Users className="h-4 w-4" />,
  '/bible-study': <BookOpen className="h-4 w-4" />,
  '/journey': <TrendingUp className="h-4 w-4" />,
  '/achievements': <Trophy className="h-4 w-4" />,
  '/progress': <TrendingUp className="h-4 w-4" />,
  '/service-tracker': <Calendar className="h-4 w-4" />,
  '/forum': <MessageSquare className="h-4 w-4" />,
  '/resources': <FileText className="h-4 w-4" />,
};

const ROUTE_COLORS: Record<string, string> = {
  '/': 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  '/dashboard': 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
  '/devotional': 'bg-purple-500/20 text-purple-700 border-purple-500/30',
  '/prayer-journal': 'bg-pink-500/20 text-pink-700 border-pink-500/30',
  '/prayer-wall': 'bg-orange-500/20 text-orange-700 border-orange-500/30',
  '/bible-study': 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30',
  '/journey': 'bg-teal-500/20 text-teal-700 border-teal-500/30',
  '/achievements': 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  '/progress': 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30',
  '/service-tracker': 'bg-rose-500/20 text-rose-700 border-rose-500/30',
  '/forum': 'bg-violet-500/20 text-violet-700 border-violet-500/30',
  '/resources': 'bg-slate-500/20 text-slate-700 border-slate-500/30',
};

export function VisualRoutePreview({ steps, activeStepIndex = -1 }: VisualRoutePreviewProps) {
  // Group consecutive steps by route
  const routeGroups = steps.reduce((acc, step, index) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup && lastGroup.route === step.route) {
      lastGroup.steps.push({ step, index });
    } else {
      acc.push({ route: step.route, steps: [{ step, index }] });
    }
    return acc;
  }, [] as { route: string; steps: { step: TourStep; index: number }[] }[]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Circle className="h-3 w-3 fill-primary text-primary" />
          Tour Flow Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Linear flow */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all ${
                  ROUTE_COLORS[step.route] || 'bg-muted text-muted-foreground border-border'
                } ${activeStepIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              >
                {ROUTE_ICONS[step.route] || <Circle className="h-4 w-4" />}
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Route summary */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Route Summary</p>
          <div className="grid grid-cols-2 gap-2">
            {routeGroups.map((group, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md border ${
                  ROUTE_COLORS[group.route] || 'bg-muted'
                }`}
              >
                {ROUTE_ICONS[group.route] || <Circle className="h-4 w-4" />}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{group.route}</p>
                  <p className="text-[10px] opacity-70">
                    {group.steps.length} step{group.steps.length > 1 ? 's' : ''}
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px] h-5">
                  {group.steps.map(s => s.index + 1).join(', ')}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>{steps.length} total steps</span>
          <span>{new Set(steps.map(s => s.route)).size} unique routes</span>
        </div>
      </CardContent>
    </Card>
  );
}
