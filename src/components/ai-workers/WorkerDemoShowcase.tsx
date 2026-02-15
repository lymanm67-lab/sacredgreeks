import { useState } from 'react';
import { ArrowLeft, Eye, AlertTriangle, Wrench, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DEMO_SCENARIOS, type DemoScenario } from '@/data/aiWorkerDemoData';
import type { WorkerType, WorkerResult } from '@/pages/AIWorkers';

const WORKER_COLORS: Record<WorkerType, { text: string; bg: string }> = {
  ritual_oath_coach: { text: 'text-primary', bg: 'bg-primary/10' },
  founders_guide: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  conversation_coach: { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
  study_navigator: { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10' },
};

const WORKER_NAMES: Record<WorkerType, string> = {
  ritual_oath_coach: 'Ritual & Oath Coach',
  founders_guide: 'Founders Guide',
  conversation_coach: 'Conversation Coach',
  study_navigator: 'Study Navigator',
};

interface WorkerDemoShowcaseProps {
  onBack: () => void;
  onViewResult: (result: WorkerResult, workerType: WorkerType) => void;
}

export function WorkerDemoShowcase({ onBack, onViewResult }: WorkerDemoShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            PROOF Command Center
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Scenario showcase — real objections, real responses, real tools
          </p>
        </div>
      </div>

      {/* Overview card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-4">
          <p className="text-sm text-foreground leading-relaxed">
            Explore <strong>{DEMO_SCENARIOS.length} curated scenarios</strong> that demonstrate how the AI Workers handle 
            the most common objections Christians face in Greek life. Each scenario includes the full response, 
            common <strong>pitfalls</strong> to avoid, and <strong>tools</strong> available to the user.
          </p>
        </CardContent>
      </Card>

      {/* Scenario cards */}
      <div className="space-y-4">
        {DEMO_SCENARIOS.map((scenario) => {
          const colors = WORKER_COLORS[scenario.workerType];
          const isExpanded = expandedId === scenario.id;

          return (
            <Card 
              key={scenario.id} 
              className="overflow-hidden transition-all"
            >
              <CardHeader 
                className="cursor-pointer hover:bg-muted/30 transition-colors pb-3"
                onClick={() => toggleExpand(scenario.id)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="outline" className={`text-[10px] ${colors.text}`}>
                        {WORKER_NAMES[scenario.workerType]}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-tight">{scenario.title}</CardTitle>
                    <CardDescription className="mt-1">{scenario.subtitle}</CardDescription>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-4">
                  <Separator />
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>

                  {/* Pitfalls */}
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2 text-destructive">
                      <AlertTriangle className="w-4 h-4" /> Common Pitfalls
                    </h4>
                    <ul className="space-y-1.5">
                      {scenario.pitfalls.map((p, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive mt-0.5">✕</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2 text-primary">
                      <Wrench className="w-4 h-4" /> Tools Used
                    </h4>
                    <ul className="space-y-1.5">
                      {scenario.tools.map((t, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View result button */}
                  <Button
                    onClick={() => onViewResult(scenario.result, scenario.workerType)}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4" /> View Full Response
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
