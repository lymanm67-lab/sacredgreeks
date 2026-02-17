import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoPageBadge } from '@/components/demo/DemoPageBadge';
import { StudioPromptHero } from './studio/StudioPromptHero';
import { StudioSceneEditor } from './studio/StudioSceneEditor';
import { StudioImageGenerator } from './studio/StudioImageGenerator';
import { StudioUploadZone } from './studio/StudioUploadZone';
import { StudioGenerationProgress } from './studio/StudioGenerationProgress';
import { StudioLibrary } from './studio/StudioLibrary';
import { StudioContentPicker } from './studio/StudioContentPicker';
import { StudioDemoOverview } from './studio/StudioDemoOverview';
import { usePuter } from '@/hooks/usePuter';

// Demo data for showcase when demo mode is active
const DEMO_VIDEOS = [
  {
    id: 'demo-1',
    title: 'Secret Oaths: What the Bible Says',
    description: 'A 30-second PROOF objection response about secret oaths in Greek organizations.',
    template_type: 'objection_short',
    status: 'completed',
    provider: 'runway',
    generation_mode: 'text_to_video',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    tags: ['oaths', 'PROOF', 'objection'],
    script_json: {
      title: 'Secret Oaths: What the Bible Says',
      script: [
        { timestamp: '0:00-0:05', narration: 'Many Greek organizations require secret oaths during initiation. But what does Scripture say?', visual: 'Dark background with glowing Bible icon' },
        { timestamp: '0:05-0:15', narration: 'Jesus commands in Matthew 5:34: "Do not swear an oath at all." James 5:12 echoes this: "Let your yes be yes and your no be no."', visual: 'Scripture text appearing on screen with highlights' },
        { timestamp: '0:15-0:25', narration: 'The PROOF framework helps us evaluate: Are these oaths aligned with biblical instruction? The evidence says they are not.', visual: 'PROOF framework graphic with "Oaths" category highlighted' },
        { timestamp: '0:25-0:30', narration: 'Know the truth. Walk in clarity.', visual: 'Sacred Greeks logo with tagline' },
      ],
      scenePlan: [
        { sceneNumber: 1, duration: '5s', visual: 'Bible icon animation', textOverlay: 'Secret Oaths' },
        { sceneNumber: 2, duration: '10s', visual: 'Scripture on screen', textOverlay: 'Matthew 5:34' },
        { sceneNumber: 3, duration: '10s', visual: 'PROOF framework', textOverlay: 'Evaluate with PROOF' },
        { sceneNumber: 4, duration: '5s', visual: 'Logo closing', textOverlay: 'Sacred Greeks' },
      ],
      captions: '1\n00:00:00,000 --> 00:00:05,000\nMany Greek organizations require secret oaths during initiation.\n\n2\n00:00:05,000 --> 00:00:15,000\nJesus commands in Matthew 5:34: Do not swear an oath at all.',
      transcript: 'Many Greek organizations require secret oaths during initiation. But what does Scripture say? Jesus commands in Matthew 5:34: Do not swear an oath at all. James 5:12 echoes this: Let your yes be yes and your no be no. The PROOF framework helps us evaluate: Are these oaths aligned with biblical instruction? The evidence says they are not. Know the truth. Walk in clarity.',
      citationsUsed: ['Matthew 5:34', 'James 5:12', 'PROOF Framework - Oaths Category'],
    },
  },
  {
    id: 'demo-2',
    title: 'Founders & Faith: A 2-Minute History',
    description: 'A mini teaching exploring the faith roots and Masonic connections of Greek letter organizations.',
    template_type: 'mini_teaching',
    status: 'completed',
    provider: 'replicate',
    generation_mode: 'text_to_video',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    tags: ['founders', 'history', 'masonry', 'teaching'],
    script_json: {
      title: 'Founders & Faith: A 2-Minute History',
      script: [
        { timestamp: '0:00-0:10', narration: 'The nine historically Black Greek-letter organizations were founded between 1906 and 1963. But many members don\'t know the faith connections — and contradictions — embedded in their origins.', visual: 'Timeline graphic of founding dates' },
        { timestamp: '0:10-0:30', narration: 'Several founders were Freemasons. Alpha Phi Alpha\'s founding members included men with Masonic ties. The structure of pledging, secret rituals, and hierarchical brotherhood mirrors Masonic lodge culture.', visual: 'Side-by-side comparison of Greek and Masonic symbols' },
        { timestamp: '0:30-0:50', narration: 'At the same time, many founders were devoted Christians. They built organizations rooted in community service and uplift. The tension between faith and fraternal ritual has existed since day one.', visual: 'Historical photos with overlay text' },
      ],
    },
  },
  {
    id: 'demo-3',
    title: 'Talking to Your Line Sister About Faith',
    description: 'A conversation prep video for discussing faith concerns with a close sorority sister.',
    template_type: 'conversation_prep',
    status: 'completed',
    provider: 'shotstack',
    generation_mode: 'text_to_video',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    tags: ['conversation', 'sorority', 'relationships'],
    script_json: {
      title: 'Talking to Your Line Sister About Faith',
      script: [
        { timestamp: '0:00-0:08', narration: 'Having a conversation about faith with your line sister doesn\'t have to end the friendship. Here\'s how to approach it with love and clarity.', visual: 'Two women talking over coffee' },
        { timestamp: '0:08-0:20', narration: 'Start with your shared bond: "Our sisterhood means everything to me. That\'s exactly why I want to share what I\'ve been learning."', visual: 'Text overlay with opening line' },
      ],
    },
  },
];

type TemplateType = 'objection_short' | 'mini_teaching' | 'conversation_prep' | 'weekly_devotional' | 'custom';
type ProviderType = 'runway' | 'replicate' | 'shotstack' | 'puter';
type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload' | 'generate_image';
type Step = 'prompt' | 'content' | 'script' | 'generate' | 'library';

interface VideoStudioProps {
  onBack: () => void;
}

export function VideoStudio({ onBack }: VideoStudioProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isDemoMode } = useDemoMode();
  const puter = usePuter();

  // Flow state
  const [step, setStep] = useState<Step>('prompt');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('text_to_video');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoOverview, setShowDemoOverview] = useState(isDemoMode);
  const [isAdmin, setIsAdmin] = useState(false);

  // Prompt & template
  const [prompt, setPrompt] = useState('');
  const [pendingTemplate, setPendingTemplate] = useState<TemplateType | null>(null);

  // Provider
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('puter');
  const [selectedModel, setSelectedModel] = useState('minimax/video-01-live');
  const [sceneCount, setSceneCount] = useState('6');
  const [outputDimensions, setOutputDimensions] = useState('1920x1080');

  // Content selection
  const [availableContent, setAvailableContent] = useState<any[]>([]);
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);

  // Script & video
  const [scriptData, setScriptData] = useState<any>(null);
  const [videoRequest, setVideoRequest] = useState<any>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [myVideos, setMyVideos] = useState<any[]>([]);

  // Upload state
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadedVideoPreview, setUploadedVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Image generation
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageModel, setImageModel] = useState<'fast' | 'quality'>('fast');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageEditSource, setImageEditSource] = useState<string | null>(null);
  const [imageEditPreview, setImageEditPreview] = useState<string | null>(null);

  // Check admin
  useEffect(() => {
    if (!user) return;
    supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  // Load content
  useEffect(() => {
    const load = async () => {
      const [{ data: cards }, { data: sources }] = await Promise.all([
        supabase.from('objection_cards').select('id, claim_category, claim_text').eq('is_active', true),
        supabase.from('golden_library_sources').select('id, title, proof_category, tier, source_type').eq('is_active', true).order('tier', { ascending: true }).limit(50),
      ]);
      setAvailableContent([
        ...(cards || []).map(c => ({ ...c, contentType: 'objection_card', label: `📋 ${c.claim_category}: ${c.claim_text?.slice(0, 60)}` })),
        ...(sources || []).map(s => ({ ...s, contentType: 'source', label: `📚 [T${s.tier}] ${s.title}` })),
      ]);
    };
    load();
  }, []);

  // Load library
  useEffect(() => {
    if (step === 'library') {
      if (isDemoMode) {
        setMyVideos(DEMO_VIDEOS as any[]);
        return;
      }
      if (user) {
        supabase.from('video_requests').select('*').eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .then(({ data }) => setMyVideos(data || []));
      }
    }
  }, [step, user, isDemoMode]);

  // === HANDLERS ===

  const getAuthHeader = async () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
  });

  const handleFileUpload = async (file: File, type: 'image' | 'video') => {
    if (!user) return;
    setIsUploading(true);
    try {
      const ext = file.name.split('.').pop() || (type === 'image' ? 'jpg' : 'mp4');
      const filePath = `${user.id}/${Date.now()}_${type}.${ext}`;
      const { data, error } = await supabase.storage.from('video-studio-uploads').upload(filePath, file, { upsert: false });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('video-studio-uploads').getPublicUrl(data.path);
      if (type === 'image') {
        setUploadedImageUrl(urlData.publicUrl);
        setUploadedImagePreview(URL.createObjectURL(file));
        toast({ title: '📸 Image uploaded' });
      } else {
        setUploadedVideoUrl(urlData.publicUrl);
        setUploadedVideoPreview(URL.createObjectURL(file));
        toast({ title: '🎬 Video uploaded' });
      }
    } catch (error) {
      toast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Failed', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerate = async (suggestionTemplate?: string) => {
    const template = suggestionTemplate || pendingTemplate;

    // Video upload mode - save directly
    if (generationMode === 'video_upload') {
      if (!uploadedVideoUrl) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
          method: 'POST', headers: await getAuthHeader(),
          body: JSON.stringify({ action: 'upload_video', videoUrl: uploadedVideoUrl, title: prompt.trim() || 'Uploaded Video', description: prompt.trim() || '' }),
        });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
        toast({ title: '✅ Video saved' });
        setStep('library');
      } catch (e) {
        toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
      } finally { setIsLoading(false); }
      return;
    }

    // For non-custom text_to_video without a template, need content selection
    const isCustom = isAdmin && (generationMode === 'text_to_video' || generationMode === 'image_to_video');
    if (!isCustom && generationMode !== 'generate_image') {
      // Need to pick content — go to content step
      if (!template) {
        // If prompt is set but no template, treat as custom if admin, otherwise default to objection_short
        setPendingTemplate(isAdmin ? 'custom' : 'objection_short');
      } else {
        setPendingTemplate(template as TemplateType);
      }
      setStep('content');
      return;
    }

    // Custom / admin flow - generate script directly
    await generateScript(template || 'custom');
  };

  const generateScript = async (template?: string, parentRequestId?: string) => {
    const isCustom = template === 'custom' || isAdmin;
    if (!isCustom && selectedContentIds.length === 0 && generationMode !== 'generate_image') return;
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST', headers: await getAuthHeader(),
        body: JSON.stringify({
          action: 'generate_script',
          templateType: isCustom ? 'custom' : (template || pendingTemplate || 'custom'),
          contentIds: isCustom ? [] : selectedContentIds,
          isCustomContent: isCustom,
          customPrompt: prompt || undefined,
          provider: selectedProvider,
          providerModel: selectedProvider === 'replicate' ? selectedModel : undefined,
          parentRequestId,
          generationMode,
          inputImageUrl: generationMode === 'image_to_video' ? uploadedImageUrl : undefined,
          outputDimensions,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
      const result = await res.json();
      setScriptData(result.scriptData);
      setVideoRequest(result.videoRequest);
      if (result.blocked) {
        toast({ title: '⚠️ Blocked', description: `Missing citations: ${result.blockedReason?.join(', ')}`, variant: 'destructive' });
      }
      setStep('script');
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
    } finally { setIsLoading(false); }
  };

  const handleContentGenerate = () => generateScript(pendingTemplate || 'custom');

  const handleRegenerate = () => {
    if (videoRequest?.id) generateScript(pendingTemplate || 'custom', videoRequest.id);
  };

  const handleSubmitVideo = async () => {
    if (!videoRequest?.id) return;

    // Validate script has actual content before submitting
    const scriptEntries = scriptData?.script || [];
    const hasContent = scriptEntries.length > 0 && scriptEntries.some((s: any) => (s.narration || s.visual || '').trim());
    if (!hasContent && !scriptData?.title && !prompt) {
      toast({ title: 'No content', description: 'The script is empty. Please go back and provide a prompt or select content first.', variant: 'destructive' });
      return;
    }

    // === PUTER CLIENT-SIDE GENERATION ===
    if (selectedProvider === 'puter') {
      setIsLoading(true);
      setJobStatus('generating');
      setStep('generate');
      try {
        // Build a combined prompt from the script data
        const sceneTexts = scriptEntries.map((s: any) => s.narration || s.visual || '').filter(Boolean);
        const videoPrompt = sceneTexts.length > 0
          ? sceneTexts.join('. ')
          : scriptData?.title || prompt;

        const truncatedPrompt = videoPrompt.slice(0, 500);
        
        let result;
        if (generationMode === 'image_to_video' && uploadedImageUrl) {
          result = await puter.generateImageToVideo(uploadedImageUrl, truncatedPrompt);
        } else {
          result = await puter.generateVideo(truncatedPrompt);
        }

        // Upload to Supabase storage
        setJobStatus('uploading');
        const fileName = `puter-${Date.now()}.mp4`;
        const filePath = `${user!.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('proof-videos')
          .upload(filePath, result.blob, { contentType: 'video/mp4', upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('proof-videos').getPublicUrl(filePath);
        const finalUrl = urlData.publicUrl;

        // Update the video_request record
        await supabase.from('video_requests').update({
          status: 'completed',
          video_url: finalUrl,
          provider: 'puter',
        }).eq('id', videoRequest.id);

        setVideoUrl(finalUrl);
        setJobStatus('completed');
        toast({ title: '🎬 Video Ready!' });

        // Clean up object URL
        URL.revokeObjectURL(result.objectUrl);
      } catch (e) {
        setJobStatus('failed');
        toast({ title: 'Video generation failed', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // === EXISTING SERVER-SIDE PROVIDERS ===
    setIsLoading(true);
    setJobStatus('submitting');
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST', headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'submit_video', videoRequestId: videoRequest.id, provider: selectedProvider, providerModel: selectedProvider === 'replicate' ? selectedModel : undefined, outputDimensions }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const errMsg = errBody.error || errBody.details || 'Failed';
        const isCredits = typeof errMsg === 'string' && errMsg.toLowerCase().includes('credits');
        throw new Error(isCredits ? 'Your Runway account has no credits remaining. Please add credits at runway.dev or switch to Replicate/ShotStack.' : errMsg);
      }
      setJobStatus('submitted');
      setStep('generate');
      pollJobStatus(videoRequest.id);
    } catch (e) {
      setJobStatus('failed');
      setStep('script'); // Go back to script editor instead of blank screen
      toast({ title: 'Video generation failed', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
    } finally { setIsLoading(false); }
  };

  const pollJobStatus = async (requestId: string) => {
    const poll = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
          method: 'POST', headers: await getAuthHeader(),
          body: JSON.stringify({ action: 'check_status', videoRequestId: requestId }),
        });
        const result = await res.json();
        setJobStatus(result.status);
        if (result.status === 'completed' && result.videoUrl) {
          setVideoUrl(result.videoUrl);
          toast({ title: '🎬 Video Ready!' });
          return;
        }
        if (result.status === 'failed') {
          toast({ title: 'Failed', description: result.error || 'Generation failed', variant: 'destructive' });
          return;
        }
        setTimeout(poll, 5000);
      } catch { setTimeout(poll, 10000); }
    };
    setTimeout(poll, 5000);
  };

  // Image generation
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST', headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'generate_image', imagePrompt: imagePrompt.trim(), imageModel, imageEditSource: imageEditSource || undefined }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
      const result = await res.json();
      setGeneratedImageUrl(result.imageUrl);
      toast({ title: '🖼️ Image generated!' });
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
    } finally { setIsGeneratingImage(false); }
  };

  const handleImageEditUpload = async (file: File) => {
    if (!user) return;
    setIsUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const filePath = `${user.id}/${Date.now()}_edit_source.${ext}`;
      const { data, error } = await supabase.storage.from('video-studio-uploads').upload(filePath, file, { upsert: false });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('video-studio-uploads').getPublicUrl(data.path);
      setImageEditSource(urlData.publicUrl);
      setImageEditPreview(URL.createObjectURL(file));
    } catch (e) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    } finally { setIsUploading(false); }
  };

  const resetFlow = () => {
    setStep('prompt');
    setScriptData(null);
    setVideoRequest(null);
    setVideoUrl(null);
    setJobStatus(null);
    setPrompt('');
    setSelectedContentIds([]);
    setPendingTemplate(null);
    setGenerationMode('text_to_video');
    setUploadedImageUrl(null);
    setUploadedImagePreview(null);
    setUploadedVideoUrl(null);
    setUploadedVideoPreview(null);
    setImagePrompt('');
    setGeneratedImageUrl(null);
    setImageEditSource(null);
    setImageEditPreview(null);
  };

  return (
    <div className="space-y-4">
      {/* Minimal top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <DemoPageBadge pageKey="video-studio" />
        </div>
        {step !== 'library' && (
          <Button variant="ghost" size="sm" onClick={() => setStep('library')} className="gap-1.5 text-muted-foreground">
            <Video className="w-4 h-4" /> My Videos
          </Button>
        )}
      </div>

      {/* ===== PROMPT STEP ===== */}
      {step === 'prompt' && (
        <>
          <StudioPromptHero
            generationMode={generationMode}
            onModeChange={setGenerationMode}
            prompt={generationMode === 'generate_image' ? imagePrompt : prompt}
            onPromptChange={p => generationMode === 'generate_image' ? setImagePrompt(p) : setPrompt(p)}
            onGenerate={(template) => {
              if (generationMode === 'generate_image') {
                handleGenerateImage();
              } else {
                handleGenerate(template);
              }
            }}
            isLoading={generationMode === 'generate_image' ? isGeneratingImage : isLoading}
            isAdmin={isAdmin}
            selectedProvider={selectedProvider}
            onProviderChange={setSelectedProvider}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onShowLibrary={() => setStep('library')}
            onShowAdmin={() => {}}
            sceneCount={sceneCount}
            onSceneCountChange={setSceneCount}
            outputDimensions={outputDimensions}
            onOutputDimensionsChange={setOutputDimensions}
          />

          {/* Demo Overview - shown in demo mode */}
          {isDemoMode && showDemoOverview && (
            <StudioDemoOverview onDismiss={() => setShowDemoOverview(false)} />
          )}

          {/* Mode-specific content below hero */}
          {generationMode === 'image_to_video' && (
            <StudioUploadZone
              type="image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onFile={f => handleFileUpload(f, 'image')}
              preview={uploadedImagePreview}
              onClear={() => { setUploadedImageUrl(null); setUploadedImagePreview(null); }}
              isUploading={isUploading}
            />
          )}

          {generationMode === 'video_upload' && (
            <StudioUploadZone
              type="video"
              accept="video/mp4,video/webm,video/quicktime"
              onFile={f => handleFileUpload(f, 'video')}
              preview={uploadedVideoPreview}
              onClear={() => { setUploadedVideoUrl(null); setUploadedVideoPreview(null); }}
              isUploading={isUploading}
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={() => handleGenerate()}
              isLoading={isLoading}
            />
          )}

          {generationMode === 'generate_image' && (
            <StudioImageGenerator
              imagePrompt={imagePrompt}
              onPromptChange={setImagePrompt}
              imageModel={imageModel}
              onModelChange={setImageModel}
              isGenerating={isGeneratingImage}
              onGenerate={handleGenerateImage}
              generatedImageUrl={generatedImageUrl}
              imageEditSource={imageEditSource}
              imageEditPreview={imageEditPreview}
              onSetEditSource={(url, preview) => { setImageEditSource(url); setImageEditPreview(preview); setGeneratedImageUrl(null); }}
              onUploadEditSource={handleImageEditUpload}
              isUploading={isUploading}
              onUseForVideo={(url) => {
                setUploadedImageUrl(url);
                setUploadedImagePreview(url);
                setGenerationMode('image_to_video');
                toast({ title: 'Switched to Image→Video', description: 'Add a motion prompt above.' });
              }}
            />
          )}
        </>
      )}

      {/* ===== CONTENT PICKER ===== */}
      {step === 'content' && (
        <StudioContentPicker
          availableContent={availableContent}
          selectedContentIds={selectedContentIds}
          onToggle={id => setSelectedContentIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
          onBack={() => setStep('prompt')}
          onGenerate={handleContentGenerate}
          isLoading={isLoading}
          imagePreview={generationMode === 'image_to_video' ? uploadedImagePreview : null}
        />
      )}

      {/* ===== SCENE EDITOR ===== */}
      {step === 'script' && scriptData && (
        <StudioSceneEditor
          scriptData={scriptData}
          videoRequest={videoRequest}
          selectedProvider={selectedProvider}
          onBack={() => setStep('prompt')}
          onRegenerate={handleRegenerate}
          onSubmitVideo={handleSubmitVideo}
          isLoading={isLoading}
        />
      )}

      {/* ===== GENERATION PROGRESS ===== */}
      {step === 'generate' && (
        <StudioGenerationProgress
          jobStatus={jobStatus}
          videoUrl={videoUrl}
          onReset={resetFlow}
          onRegenerate={handleRegenerate}
          onBackToScript={() => setStep('script')}
          videoTitle={scriptData?.title || prompt || ''}
          videoDescription={scriptData?.description || ''}
          videoRequestId={videoRequest?.id}
        />
      )}

      {/* ===== LIBRARY ===== */}
      {step === 'library' && (
        <StudioLibrary
          videos={myVideos}
          onNewVideo={() => setStep('prompt')}
          onVideosChanged={() => {
            if (user) {
              supabase.from('video_requests').select('*').eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .then(({ data }) => setMyVideos(data || []));
            }
          }}
          onViewVideo={(video) => {
            if (video.video_url) {
              setVideoUrl(video.video_url);
              setScriptData(video.script_json || null);
              setVideoRequest(video);
              setJobStatus('completed');
              setStep('generate');
            } else {
              toast({ title: 'No video available', description: 'This video has not finished generating yet.', variant: 'destructive' });
            }
          }}
        />
      )}
    </div>
  );
}
