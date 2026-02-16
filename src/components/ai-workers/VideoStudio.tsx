import { useState, useEffect } from 'react';
import { ArrowLeft, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { StudioPromptHero } from './studio/StudioPromptHero';
import { StudioSceneEditor } from './studio/StudioSceneEditor';
import { StudioImageGenerator } from './studio/StudioImageGenerator';
import { StudioUploadZone } from './studio/StudioUploadZone';
import { StudioGenerationProgress } from './studio/StudioGenerationProgress';
import { StudioLibrary } from './studio/StudioLibrary';
import { StudioContentPicker } from './studio/StudioContentPicker';

type TemplateType = 'objection_short' | 'mini_teaching' | 'conversation_prep' | 'weekly_devotional' | 'custom';
type ProviderType = 'runway' | 'replicate';
type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload' | 'generate_image';
type Step = 'prompt' | 'content' | 'script' | 'generate' | 'library';

interface VideoStudioProps {
  onBack: () => void;
}

export function VideoStudio({ onBack }: VideoStudioProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  // Flow state
  const [step, setStep] = useState<Step>('prompt');
  const [generationMode, setGenerationMode] = useState<GenerationMode>('text_to_video');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Prompt & template
  const [prompt, setPrompt] = useState('');
  const [pendingTemplate, setPendingTemplate] = useState<TemplateType | null>(null);

  // Provider
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('runway');
  const [selectedModel, setSelectedModel] = useState('minimax/video-01-live');

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
    if (step === 'library' && user) {
      supabase.from('video_requests').select('*').eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setMyVideos(data || []));
    }
  }, [step, user]);

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
    setIsLoading(true);
    setJobStatus('submitting');
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST', headers: await getAuthHeader(),
        body: JSON.stringify({ action: 'submit_video', videoRequestId: videoRequest.id, provider: selectedProvider, providerModel: selectedProvider === 'replicate' ? selectedModel : undefined }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
      setJobStatus('submitted');
      setStep('generate');
      pollJobStatus(videoRequest.id);
    } catch (e) {
      setJobStatus('failed');
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed', variant: 'destructive' });
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
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
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
          />

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
        />
      )}

      {/* ===== LIBRARY ===== */}
      {step === 'library' && (
        <StudioLibrary
          videos={myVideos}
          onNewVideo={() => setStep('prompt')}
        />
      )}
    </div>
  );
}
