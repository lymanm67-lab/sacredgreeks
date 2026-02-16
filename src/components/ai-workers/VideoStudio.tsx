import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Film, Play, Loader2, AlertTriangle, CheckCircle, Copy, RefreshCw, Video, FileText, Clock, Sparkles, Settings2, RotateCcw, Upload, ImageIcon, VideoIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type TemplateType = 'objection_short' | 'mini_teaching' | 'conversation_prep' | 'weekly_devotional' | 'custom';
type ProviderType = 'runway' | 'replicate';
type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload';

const TEMPLATES = [
  { type: 'objection_short' as TemplateType, title: 'PROOF Objection Short', duration: '30–60s', icon: '⚡', description: 'Quick, punchy response to a common claim' },
  { type: 'mini_teaching' as TemplateType, title: 'PROOF Mini Teaching', duration: '2–3 min', icon: '📖', description: 'Deeper exploration of a PROOF topic' },
  { type: 'conversation_prep' as TemplateType, title: 'Conversation Prep', duration: '45–75s', icon: '🗣️', description: 'Rehearsal-ready script for a real conversation' },
  { type: 'weekly_devotional' as TemplateType, title: 'Weekly Devotional', duration: '60s', icon: '🙏', description: 'Scripture-grounded encouragement' },
];

const CUSTOM_TEMPLATE = { type: 'custom' as TemplateType, title: 'Custom Video', duration: '30s–3min', icon: '✨', description: 'Create any content video from your own prompt' };

const REPLICATE_MODELS = [
  { id: 'minimax/video-01-live', label: 'MiniMax Video-01-Live', desc: 'Fast, good quality shorts' },
  { id: 'luma/ray', label: 'Luma Ray', desc: 'Cinematic quality, slower' },
];

interface VideoStudioProps {
  onBack: () => void;
}

export function VideoStudio({ onBack }: VideoStudioProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<'template' | 'content' | 'script' | 'generate' | 'library'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [availableContent, setAvailableContent] = useState<any[]>([]);
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptData, setScriptData] = useState<any>(null);
  const [videoRequest, setVideoRequest] = useState<any>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [myVideos, setMyVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('script');

  // Provider & custom state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('runway');
  const [selectedModel, setSelectedModel] = useState('minimax/video-01-live');

  // Generation mode & upload state
  const [generationMode, setGenerationMode] = useState<GenerationMode>('text_to_video');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadedVideoPreview, setUploadedVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Check admin role
  useEffect(() => {
    if (!user) return;
    supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  // Load available content
  useEffect(() => {
    const loadContent = async () => {
      const [{ data: cards }, { data: sources }] = await Promise.all([
        supabase.from('objection_cards').select('id, claim_category, claim_text').eq('is_active', true),
        supabase.from('golden_library_sources').select('id, title, proof_category, tier, source_type').eq('is_active', true).order('tier', { ascending: true }).limit(50),
      ]);
      setAvailableContent([
        ...(cards || []).map(c => ({ ...c, contentType: 'objection_card', label: `📋 ${c.claim_category}: ${c.claim_text?.slice(0, 60)}` })),
        ...(sources || []).map(s => ({ ...s, contentType: 'source', label: `📚 [T${s.tier}] ${s.title}` })),
      ]);
    };
    loadContent();
  }, []);

  // Load user's video library
  useEffect(() => {
    if (step === 'library' && user) {
      supabase
        .from('video_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setMyVideos(data || []));
    }
  }, [step, user]);

  const toggleContent = (id: string) => {
    setSelectedContentIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // ===== FILE UPLOAD HANDLERS =====
  const handleFileUpload = async (file: File, type: 'image' | 'video') => {
    if (!user) return;
    setIsUploading(true);

    try {
      const ext = file.name.split('.').pop() || (type === 'image' ? 'jpg' : 'mp4');
      const filePath = `${user.id}/${Date.now()}_${type}.${ext}`;

      const { data, error } = await supabase.storage
        .from('video-studio-uploads')
        .upload(filePath, file, { upsert: false });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('video-studio-uploads')
        .getPublicUrl(data.path);

      const publicUrl = urlData.publicUrl;

      if (type === 'image') {
        setUploadedImageUrl(publicUrl);
        setUploadedImagePreview(URL.createObjectURL(file));
        toast({ title: '📸 Image uploaded', description: 'Ready for video generation.' });
      } else {
        setUploadedVideoUrl(publicUrl);
        setUploadedVideoPreview(URL.createObjectURL(file));
        toast({ title: '🎬 Video uploaded', description: 'Ready for editing.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Failed to upload file', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const clearUpload = (type: 'image' | 'video') => {
    if (type === 'image') {
      setUploadedImageUrl(null);
      setUploadedImagePreview(null);
    } else {
      setUploadedVideoUrl(null);
      setUploadedVideoPreview(null);
    }
  };

  const handleGenerateScript = async (parentRequestId?: string) => {
    if (generationMode === 'video_upload') {
      // For video uploads, save directly to library
      if (!uploadedVideoUrl) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({
            action: 'upload_video',
            videoUrl: uploadedVideoUrl,
            title: customPrompt.trim() || 'Uploaded Video',
            description: customPrompt.trim() || '',
          }),
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({ error: 'Upload failed' }));
          throw new Error(err.error || `Error ${response.status}`);
        }
        toast({ title: '✅ Video saved', description: 'Your video has been added to your library.' });
        setStep('library');
      } catch (error) {
        toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to save video', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (isCustomMode) {
      if (!customPrompt.trim()) return;
    } else {
      if (!selectedTemplate || selectedContentIds.length === 0) return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'generate_script',
          templateType: isCustomMode ? 'custom' : selectedTemplate,
          contentIds: isCustomMode ? [] : selectedContentIds,
          isCustomContent: isCustomMode,
          customPrompt: isCustomMode ? customPrompt : undefined,
          provider: selectedProvider,
          providerModel: selectedProvider === 'replicate' ? selectedModel : undefined,
          parentRequestId,
          generationMode,
          inputImageUrl: generationMode === 'image_to_video' ? uploadedImageUrl : undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || `Error ${response.status}`);
      }

      const result = await response.json();
      setScriptData(result.scriptData);
      setVideoRequest(result.videoRequest);

      if (result.blocked) {
        toast({ title: '⚠️ Video Blocked', description: `Missing citations: ${result.blockedReason?.join(', ')}`, variant: 'destructive' });
      }

      setStep('script');
    } catch (error) {
      console.error('Script generation error:', error);
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to generate script', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateScript = () => {
    if (!videoRequest?.id) return;
    handleGenerateScript(videoRequest.id);
  };

  const handleSubmitVideo = async () => {
    if (!videoRequest?.id) return;
    setIsLoading(true);
    setJobStatus('submitting');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'submit_video',
          videoRequestId: videoRequest.id,
          provider: selectedProvider,
          providerModel: selectedProvider === 'replicate' ? selectedModel : undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Submit failed' }));
        throw new Error(err.error || `Error ${response.status}`);
      }

      setJobStatus('submitted');
      setStep('generate');
      pollJobStatus(videoRequest.id);
    } catch (error) {
      console.error('Submit error:', error);
      setJobStatus('failed');
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Failed to submit video', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const pollJobStatus = async (requestId: string) => {
    const poll = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/video-studio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({ action: 'check_status', videoRequestId: requestId }),
        });

        const result = await response.json();
        setJobStatus(result.status);

        if (result.status === 'completed' && result.videoUrl) {
          setVideoUrl(result.videoUrl);
          toast({ title: '🎬 Video Ready!', description: 'Your video has been generated.' });
          return;
        }
        if (result.status === 'failed') {
          toast({ title: 'Video Failed', description: result.error || 'Generation failed', variant: 'destructive' });
          return;
        }
        setTimeout(poll, 5000);
      } catch {
        setTimeout(poll, 10000);
      }
    };
    setTimeout(poll, 5000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied!` });
  };

  const resetFlow = () => {
    setStep('template');
    setScriptData(null);
    setVideoRequest(null);
    setVideoUrl(null);
    setJobStatus(null);
    setIsCustomMode(false);
    setCustomPrompt('');
    setSelectedContentIds([]);
    setSelectedTemplate(null);
    setGenerationMode('text_to_video');
    setUploadedImageUrl(null);
    setUploadedImagePreview(null);
    setUploadedVideoUrl(null);
    setUploadedVideoPreview(null);
  };

  // ===== Upload Zone Component =====
  const UploadZone = ({ type, accept, onFile, preview, url, onClear }: {
    type: 'image' | 'video';
    accept: string;
    onFile: (f: File) => void;
    preview: string | null;
    url: string | null;
    onClear: () => void;
  }) => {
    const inputRef = type === 'image' ? imageInputRef : videoInputRef;
    const Icon = type === 'image' ? ImageIcon : VideoIcon;

    return (
      <div className="space-y-3">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />

        {preview ? (
          <div className="relative rounded-xl border-2 border-primary/30 overflow-hidden bg-muted">
            {type === 'image' ? (
              <img src={preview} alt="Uploaded preview" className="w-full max-h-64 object-contain" />
            ) : (
              <video src={preview} controls className="w-full max-h-64" />
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={onClear}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            {isUploading ? (
              <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin mb-2" />
            ) : (
              <Icon className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
            )}
            <p className="text-sm font-medium text-foreground">
              {isUploading ? 'Uploading...' : `Click to upload ${type}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {type === 'image' ? 'JPG, PNG, WebP, GIF (max 20MB)' : 'MP4, WebM, MOV (max 100MB)'}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="w-5 h-5" /></Button>
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" /> Video Studio
            </h2>
            <p className="text-sm text-muted-foreground">Generate AI videos{isAdmin ? ' — Admin: custom content unlocked' : ' from approved PROOF content'}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStep('library')} className="gap-2"><Video className="w-4 h-4" /> My Videos</Button>
      </div>

      {/* Step: Template Selection */}
      {step === 'template' && (
        <div className="space-y-4">
          {/* Generation Mode Selector */}
          <Card className="border-muted">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium">Creation Mode</span></div>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { mode: 'text_to_video' as GenerationMode, label: 'Text to Video', icon: FileText, desc: 'Generate from script' },
                  { mode: 'image_to_video' as GenerationMode, label: 'Image to Video', icon: ImageIcon, desc: 'Animate a still frame' },
                  { mode: 'video_upload' as GenerationMode, label: 'Upload Video', icon: Upload, desc: 'Upload & manage' },
                ]).map(m => (
                  <button
                    key={m.mode}
                    onClick={() => setGenerationMode(m.mode)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${generationMode === m.mode ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                  >
                    <m.icon className={`w-5 h-5 mb-1 ${generationMode === m.mode ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className="text-sm font-medium">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Provider selector */}
          {generationMode !== 'video_upload' && (
            <Card className="border-muted">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium">Video Provider</span></div>
                <div className="flex gap-3 flex-wrap">
                  <Select value={selectedProvider} onValueChange={(v: ProviderType) => setSelectedProvider(v)}>
                    <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="runway">Runway Gen-4</SelectItem>
                      <SelectItem value="replicate">Replicate</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedProvider === 'replicate' && (
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-[240px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {REPLICATE_MODELS.map(m => (
                          <SelectItem key={m.id} value={m.id}>{m.label} — {m.desc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ===== IMAGE TO VIDEO MODE ===== */}
          {generationMode === 'image_to_video' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Upload Still Frame</h3>
              <p className="text-sm text-muted-foreground">Upload an image to animate into a video. Add a prompt to guide the motion.</p>

              <UploadZone
                type="image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onFile={(f) => handleFileUpload(f, 'image')}
                preview={uploadedImagePreview}
                url={uploadedImageUrl}
                onClear={() => clearUpload('image')}
              />

              {/* Admin custom toggle */}
              {isAdmin && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Custom Content Mode</p>
                      <p className="text-xs text-muted-foreground">Use free-form prompt (admin only)</p>
                    </div>
                    <Switch checked={isCustomMode} onCheckedChange={setIsCustomMode} />
                  </CardContent>
                </Card>
              )}

              {isCustomMode ? (
                <Textarea
                  placeholder="Describe the motion you want... (e.g., 'Slow zoom in, clouds drifting, warm golden light')"
                  value={customPrompt}
                  onChange={e => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              ) : (
                <>
                  <h4 className="text-sm font-medium">Select a Template</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {TEMPLATES.map(t => (
                      <Card
                        key={t.type}
                        className={`cursor-pointer transition-all text-sm ${selectedTemplate === t.type ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/30'}`}
                        onClick={() => setSelectedTemplate(t.type)}
                      >
                        <CardContent className="p-3 flex items-center gap-2">
                          <span>{t.icon}</span>
                          <div>
                            <p className="font-medium">{t.title}</p>
                            <p className="text-xs text-muted-foreground">{t.duration}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {uploadedImageUrl && (isCustomMode ? customPrompt.trim() : selectedTemplate) && (
                <Button
                  disabled={isLoading}
                  onClick={() => isCustomMode ? handleGenerateScript() : setStep('content')}
                  className="w-full gap-2"
                >
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : isCustomMode ? <><Sparkles className="w-4 h-4" /> Generate Script from Image</> : <>Next: Select Content →</>}
                </Button>
              )}
            </div>
          )}

          {/* ===== VIDEO UPLOAD MODE ===== */}
          {generationMode === 'video_upload' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Upload Video</h3>
              <p className="text-sm text-muted-foreground">Upload a video to your library for management and sharing.</p>

              <UploadZone
                type="video"
                accept="video/mp4,video/webm,video/quicktime"
                onFile={(f) => handleFileUpload(f, 'video')}
                preview={uploadedVideoPreview}
                url={uploadedVideoUrl}
                onClear={() => clearUpload('video')}
              />

              <Textarea
                placeholder="Video title / description (optional)"
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                rows={2}
              />

              {uploadedVideoUrl && (
                <Button
                  disabled={isLoading}
                  onClick={() => handleGenerateScript()}
                  className="w-full gap-2"
                >
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Upload className="w-4 h-4" /> Save to Library</>}
                </Button>
              )}
            </div>
          )}

          {/* ===== TEXT TO VIDEO MODE ===== */}
          {generationMode === 'text_to_video' && (
            <>
              {/* Admin custom toggle */}
              {isAdmin && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Custom Content Mode</p>
                      <p className="text-xs text-muted-foreground">Create videos from your own prompt (admin only)</p>
                    </div>
                    <Switch checked={isCustomMode} onCheckedChange={setIsCustomMode} />
                  </CardContent>
                </Card>
              )}

              {isCustomMode ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Custom Video</h3>
                  <Textarea
                    placeholder="Describe the video you want to create... (e.g., 'A 60-second motivational video about the power of community in Greek life')"
                    value={customPrompt}
                    onChange={e => setCustomPrompt(e.target.value)}
                    rows={5}
                  />
                  <Button
                    disabled={!customPrompt.trim() || isLoading}
                    onClick={() => handleGenerateScript()}
                    className="w-full gap-2"
                  >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Script...</> : <><Sparkles className="w-4 h-4" /> Generate Custom Script</>}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Choose a Template</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {TEMPLATES.map(t => (
                      <Card
                        key={t.type}
                        className={`cursor-pointer transition-all hover:shadow-lg ${selectedTemplate === t.type ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/30'}`}
                        onClick={() => setSelectedTemplate(t.type)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2"><span className="text-xl">{t.icon}</span> {t.title}</CardTitle>
                          <CardDescription>{t.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Badge variant="secondary" className="text-xs"><Clock className="w-3 h-3 mr-1" />{t.duration}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button disabled={!selectedTemplate} onClick={() => setStep('content')} className="w-full">Next: Select Content →</Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Step: Content Selection */}
      {step === 'content' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Select Approved Content</h3>
            <Button variant="ghost" size="sm" onClick={() => setStep('template')}>← Back</Button>
          </div>
          <p className="text-sm text-muted-foreground">Choose objection cards and library sources to include in your video.</p>

          {generationMode === 'image_to_video' && uploadedImagePreview && (
            <div className="rounded-lg border overflow-hidden bg-muted">
              <img src={uploadedImagePreview} alt="Selected frame" className="w-full max-h-40 object-contain" />
              <p className="text-xs text-center text-muted-foreground p-1">Still frame attached</p>
            </div>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {availableContent.map(c => (
              <Card
                key={c.id}
                className={`cursor-pointer transition-all ${selectedContentIds.includes(c.id) ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'}`}
                onClick={() => toggleContent(c.id)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedContentIds.includes(c.id) ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
                    {selectedContentIds.includes(c.id) && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <span className="text-sm flex-1">{c.label}</span>
                  {c.tier && <Badge variant="outline" className="text-xs">Tier {c.tier}</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
          <Badge variant="secondary">{selectedContentIds.length} selected</Badge>
          <Button
            disabled={selectedContentIds.length === 0 || isLoading}
            onClick={() => handleGenerateScript()}
            className="w-full gap-2"
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Script...</> : <><Sparkles className="w-4 h-4" /> Generate Script</>}
          </Button>
        </div>
      )}

      {/* Step: Script Preview */}
      {step === 'script' && scriptData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-semibold text-foreground">{scriptData.title || 'Generated Script'}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleRegenerateScript} className="gap-1"><RotateCcw className="w-3 h-3" /> Regenerate</Button>
              <Button variant="ghost" size="sm" onClick={() => isCustomMode ? setStep('template') : setStep('content')}>← Back</Button>
            </div>
          </div>

          {videoRequest?.version_number > 1 && (
            <Badge variant="secondary">Version {videoRequest.version_number}</Badge>
          )}

          {videoRequest?.status === 'blocked' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Video Blocked</AlertTitle>
              <AlertDescription>
                Missing citations detected. Video generation is blocked until sources are approved.
                <br /><strong>{videoRequest.blocked_reason}</strong>
              </AlertDescription>
            </Alert>
          )}

          {videoRequest?.input_image_url && (
            <div className="rounded-lg border overflow-hidden bg-muted">
              <img src={videoRequest.input_image_url} alt="Input frame" className="w-full max-h-40 object-contain" />
              <p className="text-xs text-center text-muted-foreground p-1">🖼️ Image-to-video source</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">{videoRequest?.provider === 'replicate' ? 'Replicate' : 'Runway'}</Badge>
            {videoRequest?.provider_model && <Badge variant="outline">{videoRequest.provider_model}</Badge>}
            {videoRequest?.is_custom_content && <Badge className="bg-primary/10 text-primary">Custom</Badge>}
            {videoRequest?.generation_mode === 'image_to_video' && <Badge className="bg-violet-500/10 text-violet-600">Image→Video</Badge>}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="script" className="text-xs gap-1"><FileText className="w-3 h-3" /> Script</TabsTrigger>
              <TabsTrigger value="scenes" className="text-xs gap-1"><Film className="w-3 h-3" /> Scenes</TabsTrigger>
              <TabsTrigger value="captions" className="text-xs gap-1"><FileText className="w-3 h-3" /> Captions</TabsTrigger>
              <TabsTrigger value="meta" className="text-xs gap-1"><Sparkles className="w-3 h-3" /> Meta</TabsTrigger>
            </TabsList>

            <TabsContent value="script" className="space-y-3 mt-4">
              {(scriptData.script || []).map((segment: any, i: number) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="text-xs">{segment.timestamp}</Badge>
                      {segment.sourceRef && <Badge variant="secondary" className="text-xs">📖 {segment.sourceRef}</Badge>}
                    </div>
                    <p className="text-sm font-medium">{segment.narration}</p>
                    {segment.visual && <p className="text-xs text-muted-foreground mt-1">🎬 {segment.visual}</p>}
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard((scriptData.script || []).map((s: any) => s.narration).join('\n\n'), 'Script')}>
                <Copy className="w-3 h-3" /> Copy Script
              </Button>
            </TabsContent>

            <TabsContent value="scenes" className="space-y-3 mt-4">
              {(scriptData.scenePlan || []).map((scene: any, i: number) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs">Scene {scene.sceneNumber || i + 1}</Badge>
                      <span className="text-xs text-muted-foreground">{scene.duration}</span>
                    </div>
                    <p className="text-sm">{scene.visual}</p>
                    {scene.textOverlay && <p className="text-xs text-primary mt-1">📝 {scene.textOverlay}</p>}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="captions" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground">{scriptData.captions || 'No captions generated'}</pre>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(scriptData.captions || '', 'Captions (SRT)')}>
                      <Copy className="w-3 h-3" /> Copy SRT
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(scriptData.transcript || '', 'Transcript')}>
                      <Copy className="w-3 h-3" /> Copy Transcript
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meta" className="space-y-3 mt-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div><p className="text-xs text-muted-foreground">Description</p><p className="text-sm">{scriptData.description}</p></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">{(scriptData.tags || []).map((tag: string, i: number) => (<Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>))}</div>
                  </div>
                  <div><p className="text-xs text-muted-foreground">Thumbnail Prompt</p><p className="text-sm italic">{scriptData.thumbnailPrompt}</p></div>
                  {(scriptData.citationsUsed || []).length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">Citations Used</p>
                      <ul className="text-sm space-y-1 mt-1">
                        {scriptData.citationsUsed.map((c: string, i: number) => (
                          <li key={i} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleSubmitVideo}
            disabled={isLoading || videoRequest?.status === 'blocked'}
            className="w-full gap-2"
            size="lg"
          >
            {isLoading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              : <><Play className="w-4 h-4" /> Generate Video ({selectedProvider === 'replicate' ? 'Replicate' : 'Runway'})</>
            }
          </Button>
        </div>
      )}

      {/* Step: Video Generation Progress */}
      {step === 'generate' && (
        <div className="space-y-4 text-center">
          <div className="p-8">
            {jobStatus === 'completed' && videoUrl ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Video Ready! 🎬</h3>
                <video src={videoUrl} controls className="w-full max-w-md mx-auto rounded-lg shadow-lg" style={{ aspectRatio: '9/16', maxHeight: '500px' }} />
                <div className="flex gap-2 justify-center mt-4 flex-wrap">
                  <Button asChild><a href={videoUrl} target="_blank" rel="noopener noreferrer">Download</a></Button>
                  <Button variant="outline" onClick={resetFlow}>Create Another</Button>
                  <Button variant="ghost" onClick={handleRegenerateScript} className="gap-1"><RotateCcw className="w-4 h-4" /> Regenerate</Button>
                </div>
              </>
            ) : jobStatus === 'failed' ? (
              <>
                <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Generation Failed</h3>
                <p className="text-muted-foreground">The video generation encountered an error. Please try again.</p>
                <Button className="mt-4" onClick={() => setStep('script')}>← Back to Script</Button>
              </>
            ) : (
              <>
                <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-bold mb-2">Generating Video...</h3>
                <p className="text-muted-foreground">This may take 1–5 minutes. You can leave and check back later.</p>
                <Badge className="mt-2">{jobStatus || 'Processing'}</Badge>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step: Video Library */}
      {step === 'library' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">My Videos</h3>
            <Button variant="ghost" size="sm" onClick={() => setStep('template')}>← New Video</Button>
          </div>
          {myVideos.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Film className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No videos yet. Create your first video!</p>
                <Button className="mt-4" onClick={() => setStep('template')}>Get Started</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {myVideos.map(v => (
                <Card key={v.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{v.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{v.template_type}</Badge>
                        <Badge variant="outline" className="text-xs">{v.provider || 'runway'}</Badge>
                        {v.generation_mode === 'image_to_video' && <Badge className="bg-violet-500/10 text-violet-600 text-xs">Image→Video</Badge>}
                        {v.generation_mode === 'video_upload' && <Badge className="bg-blue-500/10 text-blue-600 text-xs">Uploaded</Badge>}
                        {v.version_number > 1 && <Badge variant="secondary" className="text-xs">v{v.version_number}</Badge>}
                        {v.is_custom_content && <Badge className="bg-primary/10 text-primary text-xs">Custom</Badge>}
                        <Badge variant={v.status === 'completed' ? 'default' : v.status === 'blocked' ? 'destructive' : 'secondary'} className="text-xs">{v.status}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {v.status === 'completed' && (
                      <Button size="sm" variant="outline" className="gap-1"><Play className="w-3 h-3" /> View</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
