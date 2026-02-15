import { useState } from 'react';
import { ArrowLeft, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { getDemoResult } from '@/data/aiWorkerDemoData';
import type { WorkerType, AudienceType, ClaimCategory, WorkerResult } from '@/pages/AIWorkers';

const AUDIENCES: { value: AudienceType; label: string; emoji: string }[] = [
  { value: 'pastor', label: 'Pastor / Church Leader', emoji: '⛪' },
  { value: 'parent', label: 'Parent / Family Member', emoji: '👨‍👩‍👧' },
  { value: 'chapter', label: 'Chapter / Greek Peers', emoji: '🏛️' },
  { value: 'spouse', label: 'Spouse / Partner', emoji: '💍' },
  { value: 'friend', label: 'Friend / Peer', emoji: '🤝' },
];

const CLAIMS: { value: ClaimCategory; label: string; emoji: string }[] = [
  { value: 'portals', label: 'Rituals open demonic portals', emoji: '🚪' },
  { value: 'oaths', label: 'Oaths compete with allegiance to Christ', emoji: '✋' },
  { value: 'deity_names', label: 'Deity names are spiritual invocations', emoji: '🏛️' },
  { value: 'secrecy', label: 'Secret language / hidden knowledge', emoji: '🔒' },
  { value: 'founders_masonry', label: 'Founders connected to Masonry', emoji: '🧱' },
];

const WORKER_TITLES: Record<WorkerType, string> = {
  ritual_oath_coach: 'Ritual & Oath Clarity Coach',
  founders_guide: 'Founders & History Guide',
  conversation_coach: 'Conversation Script Coach',
  study_navigator: 'Study Plan Navigator',
};

interface WorkerIntakeFlowProps {
  workerType: WorkerType;
  onBack: () => void;
  onResult: (result: WorkerResult) => void;
}

export function WorkerIntakeFlow({ workerType, onBack, onResult }: WorkerIntakeFlowProps) {
  const { toast } = useToast();
  const { isDemoMode } = useDemoMode();
  const [audience, setAudience] = useState<AudienceType | null>(null);
  const [claim, setClaim] = useState<ClaimCategory | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showAudience = workerType !== 'study_navigator';
  const showClaims = workerType !== 'study_navigator';
  const canSubmit = workerType === 'study_navigator' || (audience && claim);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);

    try {
      // Demo mode: return curated demo data instead of calling edge function
      if (isDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate loading
        const demoResult = getDemoResult(workerType, audience, claim);
        onResult(demoResult);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-worker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          workerType,
          audience,
          claimCategory: claim,
          userMessage: message || undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || `Error ${response.status}`);
      }

      const result = await response.json();
      onResult(result);
    } catch (error) {
      console.error('Worker error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground">{WORKER_TITLES[workerType]}</h2>
          {isDemoMode && (
            <Badge variant="secondary" className="mt-1 gap-1 text-xs">
              <Sparkles className="w-3 h-3" /> Demo — curated responses
            </Badge>
          )}
        </div>
      </div>

      {/* Audience selector */}
      {showAudience && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Who are you talking to?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <Button
                key={a.value}
                variant={audience === a.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAudience(a.value)}
                className="gap-1.5"
              >
                {a.emoji} {a.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Claim selector */}
      {showClaims && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">What is the claim or objection?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {CLAIMS.map((c) => (
              <Button
                key={c.value}
                variant={claim === c.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setClaim(c.value)}
                className="gap-1.5"
              >
                {c.emoji} {c.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Optional message */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {workerType === 'study_navigator' ? 'What would you like to study?' : 'Add context (optional)'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={workerType === 'study_navigator'
              ? "e.g., I want to understand the PROOF framework deeply..."
              : "e.g., My pastor said our rituals are demonic and I need to renounce..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isLoading}
        className="w-full gap-2"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {isDemoMode ? 'Loading Demo Response...' : 'Processing...'}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {isDemoMode ? 'View Demo Response' : 'Generate Response'}
          </>
        )}
      </Button>
    </div>
  );
}
