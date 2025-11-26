import { useEffect, useRef, useState } from 'react';
import { InvolveMeCompletionDialog } from './InvolveMeCompletionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface InvolveMeAssessmentProps {
  projectId: string;
  title: string;
  assessmentType: string;
  className?: string;
}

export function InvolveMeAssessment({ 
  projectId, 
  title, 
  assessmentType,
  className = '' 
}: InvolveMeAssessmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load involve.me embed script
    const script = document.createElement('script');
    script.src = 'https://drlymanmontgomery.involve.me/embed';
    script.async = true;
    document.body.appendChild(script);

    // Listen for postMessage events from involve.me
    const handleMessage = async (event: MessageEvent) => {
      // involve.me sends completion events
      if (event.data?.type === 'involve-submit' || 
          event.data?.event === 'form-submit' ||
          event.data?.status === 'completed') {
        
        console.log('Assessment completed:', event.data);
        
        // Save completion to database
        try {
          await supabase.from('assessment_submissions').insert({
            track: 'involve_me',
            scenario: projectId,
            answers_json: event.data || {},
            scores_json: {},
            result_type: 'completed',
            user_id: user?.id || null,
          });
        } catch (error) {
          console.error('Error saving assessment completion:', error);
        }

        // Show completion dialog
        setShowCompletion(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleMessage);
    };
  }, [projectId, user]);

  return (
    <>
      <div 
        ref={containerRef}
        className={`involveme_embed ${className}`}
        data-project={projectId}
        data-title={title}
      />
      
      <InvolveMeCompletionDialog
        open={showCompletion}
        onOpenChange={setShowCompletion}
        assessmentTitle={title}
        assessmentType={assessmentType}
      />
    </>
  );
}
