import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { WorkerHub } from '@/components/ai-workers/WorkerHub';
import { WorkerIntakeFlow } from '@/components/ai-workers/WorkerIntakeFlow';
import { WorkerOutputDisplay } from '@/components/ai-workers/WorkerOutputDisplay';
import { WorkerHistoryPanel } from '@/components/ai-workers/WorkerHistoryPanel';
import { WorkerDemoShowcase } from '@/components/ai-workers/WorkerDemoShowcase';
import { VideoStudio } from '@/components/ai-workers/VideoStudio';
import { useDemoMode } from '@/contexts/DemoModeContext';

export type WorkerType = 'ritual_oath_coach' | 'founders_guide' | 'conversation_coach' | 'study_navigator';
export type AudienceType = 'pastor' | 'parent' | 'chapter' | 'spouse' | 'friend';
export type ClaimCategory = 'portals' | 'oaths' | 'deity_names' | 'secrecy' | 'founders_masonry';

export interface WorkerResult {
  output: any;
  citations: any[];
  escalated: boolean;
  escalationReason?: string;
  objectionCard?: any;
  runId?: string;
  safety?: boolean;
  message?: string;
}

type ViewState = 'hub' | 'intake' | 'output' | 'history' | 'showcase' | 'video_studio';

export default function AIWorkers() {
  const { isDemoMode } = useDemoMode();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<ViewState>(() => {
    return searchParams.get('view') === 'video-studio' ? 'video_studio' : 'hub';
  });

  const [selectedWorker, setSelectedWorker] = useState<WorkerType | null>(null);
  const [result, setResult] = useState<WorkerResult | null>(null);

  const handleSelectWorker = (worker: WorkerType) => {
    setSelectedWorker(worker);
    setView('intake');
  };

  const handleResult = (res: WorkerResult) => {
    setResult(res);
    setView('output');
  };

  const handleBack = () => {
    if (view === 'output') setView('intake');
    else if (view === 'intake') { setView('hub'); setSelectedWorker(null); }
    else if (view === 'history') setView('hub');
    else if (view === 'showcase') setView('hub');
    else if (view === 'video_studio') setView('hub');
    else setView('hub');
  };

  return (
    <>
      <SEOHead
        title="PROOF Command Center | Sacred Greeks"
        description="AI-powered coaches grounded in the PROOF framework to help you navigate faith and Greek life conversations."
      />
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        {view === 'hub' && (
          <WorkerHub
            onSelectWorker={handleSelectWorker}
            onViewHistory={() => setView('history')}
            onViewShowcase={isDemoMode ? () => setView('showcase') : undefined}
            onViewVideoStudio={() => setView('video_studio')}
          />
        )}
        {view === 'intake' && selectedWorker && (
          <WorkerIntakeFlow
            workerType={selectedWorker}
            onBack={handleBack}
            onResult={handleResult}
          />
        )}
        {view === 'output' && result && (
          <WorkerOutputDisplay
            result={result}
            workerType={selectedWorker!}
            onBack={handleBack}
            onNewQuery={() => setView('intake')}
          />
        )}
        {view === 'history' && (
          <WorkerHistoryPanel onBack={handleBack} />
        )}
        {view === 'showcase' && (
          <WorkerDemoShowcase
            onBack={handleBack}
            onViewResult={(res, workerType) => {
              setResult(res);
              setSelectedWorker(workerType);
              setView('output');
            }}
          />
        )}
        {view === 'video_studio' && (
          <VideoStudio onBack={handleBack} />
        )}
      </div>
    </>
  );
}
