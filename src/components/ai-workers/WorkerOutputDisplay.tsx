import { useState } from 'react';
import { ArrowLeft, RefreshCw, BookmarkPlus, Clock, Timer, LayoutGrid, MessageSquare, Heart, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import type { WorkerType, WorkerResult } from '@/pages/AIWorkers';

interface WorkerOutputDisplayProps {
  result: WorkerResult;
  workerType: WorkerType;
  onBack: () => void;
  onNewQuery: () => void;
}

export function WorkerOutputDisplay({ result, workerType, onBack, onNewQuery }: WorkerOutputDisplayProps) {
  const [activeTab, setActiveTab] = useState('quick');

  // Safety response
  if (result.safety) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg">We care about you</AlertTitle>
          <AlertDescription className="mt-2 whitespace-pre-line text-base">
            {result.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const output = result.output || {};
  const card = result.objectionCard;

  // Determine what to show based on worker type
  const sixtySecond = card?.sixtySecondResponse || output.sixtySecondResponse || '';
  const fiveMinute = card?.fiveMinuteResponse || output.fiveMinuteResponse || output.historicalContext || '';
  const proofBreakdown = card?.proofBreakdown || output.proofBreakdown || output.proofBreakdown || {};
  const questions = card?.dialogueQuestions || output.dialogueQuestions || output.questionsToAsk || [];
  const boundary = card?.boundaryStatement || output.boundaryStatement || output.boundaryStatements?.[0] || '';
  const prayer = card?.prayer || output.prayer || output.closingPrayer || '';

  // Conversation coach specific
  const talkingPoints = output.keyTalkingPoints || [];
  const toneGuidance = output.toneGuidance || '';
  const whatToAvoid = output.whatToAvoid || [];
  const openingApproach = output.openingApproach || '';
  const responsesToExpect = output.responsesToExpect || [];

  // Founders guide specific
  const foundersAnalysis = output.foundersAnalysis || '';
  const masonryConnection = output.masonryConnection || '';
  const mutualAidContext = output.mutualAidContext || '';
  const unsourcedClaims = output.unsourcedClaims || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="outline" size="sm" onClick={onNewQuery} className="gap-2">
          <RefreshCw className="w-4 h-4" /> New Query
        </Button>
      </div>

      {/* Escalation notice */}
      {result.escalated && (
        <Alert className="border-amber-500/50 bg-amber-500/5">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-700 dark:text-amber-400">Additional Guidance Recommended</AlertTitle>
          <AlertDescription className="text-amber-600 dark:text-amber-300">
            {result.escalationReason || output.escalationNote || 'We recommend seeking pastoral counsel for deeper discernment on this topic.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Main output tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="quick" className="gap-1 text-xs">
            <Clock className="w-3.5 h-3.5" /> 60s
          </TabsTrigger>
          <TabsTrigger value="detailed" className="gap-1 text-xs">
            <Timer className="w-3.5 h-3.5" /> 5min
          </TabsTrigger>
          <TabsTrigger value="proof" className="gap-1 text-xs">
            <LayoutGrid className="w-3.5 h-3.5" /> PROOF
          </TabsTrigger>
          <TabsTrigger value="dialogue" className="gap-1 text-xs">
            <MessageSquare className="w-3.5 h-3.5" /> Talk
          </TabsTrigger>
          <TabsTrigger value="prayer" className="gap-1 text-xs">
            <Heart className="w-3.5 h-3.5" /> Prayer
          </TabsTrigger>
          <TabsTrigger value="next" className="gap-1 text-xs">
            <ArrowRight className="w-3.5 h-3.5" /> Next
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> 60-Second Response
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{sixtySecond || 'No quick response available for this query.'}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary" /> 5-Minute Response
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{fiveMinute || 'No detailed response available.'}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Founders-specific sections */}
          {workerType === 'founders_guide' && foundersAnalysis && (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Founders Analysis</CardTitle></CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{foundersAnalysis}</ReactMarkdown>
                </CardContent>
              </Card>
              {masonryConnection && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Masonry Connection Assessment</CardTitle></CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{masonryConnection}</ReactMarkdown>
                  </CardContent>
                </Card>
              )}
              {mutualAidContext && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Historical Mutual Aid Context</CardTitle></CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{mutualAidContext}</ReactMarkdown>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Conversation coach specific */}
          {workerType === 'conversation_coach' && openingApproach && (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Opening Approach</CardTitle></CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{openingApproach}</ReactMarkdown>
                </CardContent>
              </Card>
              {toneGuidance && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Tone Guidance</CardTitle></CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{toneGuidance}</ReactMarkdown>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="proof" className="mt-4">
          <div className="grid gap-3">
            {Object.entries(proofBreakdown).map(([key, value]) => {
              if (!value) return null;
              const labels: Record<string, string> = {
                P: 'P — Pledge Process',
                R: 'R — Rituals',
                O_oaths: 'O — Oaths',
                O_obscurity: 'O — Obscurity',
                F: 'F — Founders',
              };
              return (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">
                      <Badge variant="outline" className="mr-2">{key}</Badge>
                      {labels[key] || key}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{String(value)}</ReactMarkdown>
                  </CardContent>
                </Card>
              );
            })}
            {Object.keys(proofBreakdown).length === 0 && (
              <p className="text-muted-foreground text-center py-8">No PROOF breakdown available for this query.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="dialogue" className="mt-4 space-y-4">
          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dialogue Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {questions.length > 0 ? (
                <ol className="space-y-3 list-decimal list-inside">
                  {questions.map((q: string, i: number) => (
                    <li key={i} className="text-sm text-foreground">{q}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground text-sm">No dialogue questions available.</p>
              )}
            </CardContent>
          </Card>

          {/* Boundary */}
          {boundary && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Boundary Statement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{typeof boundary === 'string' ? boundary : JSON.stringify(boundary)}</ReactMarkdown>
              </CardContent>
            </Card>
          )}

          {/* What to avoid */}
          {whatToAvoid.length > 0 && (
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-base text-destructive">What to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {whatToAvoid.map((item: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-destructive">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Responses to expect */}
          {responsesToExpect.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Responses to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {responsesToExpect.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-foreground">💡 {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prayer" className="mt-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" /> Prayer
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none italic">
              <ReactMarkdown>{prayer || 'Lord, grant me wisdom and grace in this conversation. Help me speak truth with love, listen with patience, and trust You with the outcome. Amen.'}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="next" className="mt-4 space-y-4">
          {/* Next steps */}
          {(output.nextSteps || []).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Suggested Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {output.nextSteps.map((step: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary font-bold">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Unsourced claims warning */}
          {unsourcedClaims.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Claims Requiring Further Sources</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 space-y-1">
                  {unsourcedClaims.map((c: string, i: number) => (
                    <li key={i} className="text-sm">⚠️ {c}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Citations */}
          {result.citations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sources & Citations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.citations.map((c: any, i: number) => (
                    <li key={i} className="text-xs text-muted-foreground border-b border-border/50 pb-2 last:border-0">
                      <span className="font-medium text-foreground">{c.title}</span>
                      <span className="mx-1">·</span>
                      <span>{c.section}</span>
                      {c.tier && <Badge variant="outline" className="ml-2 text-[10px]">Tier {c.tier}</Badge>}
                      {c.lastUpdated && <span className="ml-2">Updated: {new Date(c.lastUpdated).toLocaleDateString()}</span>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
