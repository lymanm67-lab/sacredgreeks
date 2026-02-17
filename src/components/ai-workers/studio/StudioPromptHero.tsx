import { useState } from 'react';
import { Sparkles, Film, ImageIcon, Upload, Wand2, Settings2, Loader2, LayoutGrid, Play, SkipBack, SkipForward, ListChecks, Library, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload' | 'generate_image';
type ProviderType = 'runway' | 'replicate' | 'shotstack';
type StudioView = 'storyboard' | 'create_video' | 'image_to_video' | 'upload_edit' | 'ai_images' | 'library' | 'admin';

const SUGGESTIONS = [
  { label: '⚡ Quick Objection Response', prompt: 'Create a 30-second PROOF objection response video about the secret oaths in Greek life', template: 'objection_short' as const },
  { label: '📖 Mini Teaching', prompt: 'Create a 2-minute mini teaching exploring the biblical perspective on fraternity rituals', template: 'mini_teaching' as const },
  { label: '🗣️ Conversation Prep', prompt: 'Create a conversation preparation video for talking to a friend about Greek life and faith', template: 'conversation_prep' as const },
  { label: '🙏 Weekly Devotional', prompt: 'Create a 60-second devotional connecting scripture to the Greek experience', template: 'weekly_devotional' as const },
  { label: '🎓 New Member Testimony', prompt: 'Create a 90-second testimony video from a new member sharing their journey of faith and Greek life', template: 'new_member_testimony' as const },
  { label: '📢 Social Media Reel', prompt: 'Create a 15-second eye-catching social media reel highlighting a key PROOF fact about Greek organizations', template: 'social_reel' as const },
  { label: '🔥 Myth Buster', prompt: 'Create a 45-second myth-busting video debunking a common misconception about Greek life and Christianity', template: 'myth_buster' as const },
  { label: '📚 Scripture Deep Dive', prompt: 'Create a 3-minute scripture deep dive examining what the Bible says about secret societies and covenant oaths', template: 'scripture_deep_dive' as const },
  { label: '🤝 Chapter Workshop Intro', prompt: 'Create a 2-minute introductory video for a chapter workshop on aligning Greek values with biblical principles', template: 'workshop_intro' as const },
  { label: '💡 Parent FAQ', prompt: 'Create a 2-minute FAQ video answering common questions parents have about Greek life and faith concerns', template: 'parent_faq' as const },
];

const SCENE_OPTIONS = [
  { value: '4', label: '4 scenes (15-30s)' },
  { value: '6', label: '6 scenes (30-60s)' },
  { value: '8', label: '8 scenes (60-90s)' },
  { value: '10', label: '10 scenes (90-120s)' },
  { value: '12', label: '12 scenes (2-3 min)' },
];

const REPLICATE_MODELS = [
  { id: 'luma/ray', label: 'Luma Dream Machine (Recommended)' },
  { id: 'minimax/video-01-live', label: 'MiniMax Video-01-Live' },
  { id: 'kling-ai/kling-video', label: 'Kling Video' },
  { id: 'stability-ai/stable-video-diffusion', label: 'Stable Video Diffusion' },
];

interface StudioPromptHeroProps {
  generationMode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
  prompt: string;
  onPromptChange: (p: string) => void;
  onGenerate: (template?: string) => void;
  isLoading: boolean;
  isAdmin: boolean;
  selectedProvider: ProviderType;
  onProviderChange: (p: ProviderType) => void;
  selectedModel: string;
  onModelChange: (m: string) => void;
  onShowLibrary?: () => void;
  onShowAdmin?: () => void;
  sceneCount?: string;
  onSceneCountChange?: (count: string) => void;
}

export function StudioPromptHero({
  generationMode, onModeChange, prompt, onPromptChange,
  onGenerate, isLoading, isAdmin,
  selectedProvider, onProviderChange, selectedModel, onModelChange,
  onShowLibrary, onShowAdmin,
  sceneCount = '6', onSceneCountChange,
}: StudioPromptHeroProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showSteps, setShowSteps] = useState(false);

  // Map generation modes to studio view for tab highlighting
  const getActiveView = (): StudioView => {
    switch (generationMode) {
      case 'text_to_video': return 'create_video';
      case 'image_to_video': return 'image_to_video';
      case 'video_upload': return 'upload_edit';
      case 'generate_image': return 'ai_images';
      default: return 'storyboard';
    }
  };

  const activeView = getActiveView();

  const tabs: { view: StudioView; label: string; icon: React.ElementType; action?: () => void }[] = [
    { view: 'storyboard', label: 'Storyboard', icon: LayoutGrid, action: () => onModeChange('text_to_video') },
    { view: 'create_video', label: 'Create Video', icon: Film, action: () => onModeChange('text_to_video') },
    { view: 'image_to_video', label: 'Image to Video', icon: ImageIcon, action: () => onModeChange('image_to_video') },
    { view: 'upload_edit', label: 'Upload & Edit', icon: Upload, action: () => onModeChange('video_upload') },
    { view: 'ai_images', label: 'AI Images', icon: Wand2, action: () => onModeChange('generate_image') },
    { view: 'library', label: 'Library', icon: Library, action: onShowLibrary },
    ...(isAdmin ? [{ view: 'admin' as StudioView, label: 'Admin', icon: ShieldCheck, action: onShowAdmin }] : []),
  ];

  const handleTemplateSelect = (value: string) => {
    setSelectedTemplate(value);
    const suggestion = SUGGESTIONS.find(s => s.template === value);
    if (suggestion) {
      onPromptChange(suggestion.prompt);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Sacred Studio Agent
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create multi-scene videos with AI-powered storyboarding
          </p>
        </div>
      </div>

      {/* Tab navigation — pill-style like screenshot */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button
            key={t.view}
            onClick={() => t.action?.()}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-full border transition-colors ${
              activeView === t.view
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Storyboard Production Suite bar */}
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-4 py-2">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs gap-1 border-primary/30 bg-primary/5 text-primary">
            <Film className="w-3 h-3" />
            Storyboard Production Suite
          </Badge>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium flex items-center gap-1 hover:bg-primary/20 transition-colors">
              <Play className="w-3 h-3" /> Listen
            </button>
            <button className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ListChecks className="w-3.5 h-3.5" />
          {showSteps ? 'Hide Steps' : 'Show Steps'}
        </button>
      </div>

      {/* Main content card */}
      {generationMode !== 'video_upload' && (
        <div className="rounded-xl border border-border/60 bg-card p-6 space-y-5">
          {/* Card header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              {generationMode === 'generate_image' ? (
                <Wand2 className="w-5 h-5 text-primary" />
              ) : (
                <Film className="w-5 h-5 text-primary" />
              )}
              <h2 className="text-lg font-semibold text-foreground">
                {generationMode === 'generate_image' ? 'Generate Image' : 'Create Your Video'}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {generationMode === 'generate_image'
                ? 'Describe the image you want and AI will generate it.'
                : 'Describe your video idea and AI will generate a full multi-scene storyboard.'}
            </p>
          </div>

          {/* Form fields row — Template + Scenes */}
          {generationMode === 'text_to_video' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Quick Start Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose a template or start from scratch..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SUGGESTIONS.map(s => (
                      <SelectItem key={s.template} value={s.template}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Scenes</Label>
                <Select value={sceneCount} onValueChange={v => onSceneCountChange?.(v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCENE_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Image-to-video provider settings */}
          {generationMode === 'image_to_video' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Provider</Label>
                <Select value={selectedProvider} onValueChange={(v: ProviderType) => onProviderChange(v)}>
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="runway">Runway Gen-4</SelectItem>
                    <SelectItem value="replicate">Replicate</SelectItem>
                    <SelectItem value="shotstack">ShotStack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedProvider === 'replicate' && (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Model</Label>
                  <Select value={selectedModel} onValueChange={onModelChange}>
                    <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {REPLICATE_MODELS.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Main prompt textarea */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              {generationMode === 'generate_image'
                ? 'Image Description'
                : generationMode === 'image_to_video'
                ? 'Motion Description'
                : 'Video Description'}
            </Label>
            <Textarea
              placeholder={
                generationMode === 'generate_image'
                  ? "Describe the image you want... e.g. 'A photorealistic Greek temple at sunset with dramatic lighting, 16:9'"
                  : generationMode === 'image_to_video'
                  ? "Describe the motion you want... e.g. 'Slow zoom in, clouds drifting, warm golden light'"
                  : "Describe your video: topic, audience, key points, tone, and any specific visuals you want..."
              }
              value={prompt}
              onChange={e => onPromptChange(e.target.value)}
              rows={4}
              className="text-sm resize-none"
            />
          </div>

          {/* Generate button */}
          <Button
            disabled={!prompt.trim() || isLoading}
            onClick={() => {
              if (selectedTemplate) {
                onGenerate(selectedTemplate);
              } else {
                onGenerate();
              }
            }}
            size="lg"
            className="w-full gap-2 h-12 text-base"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {generationMode === 'generate_image' ? 'Generate Image' : 'Generate Storyboard'}
          </Button>
        </div>
      )}
    </div>
  );
}
