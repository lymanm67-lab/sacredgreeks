import { useState } from 'react';
import { Sparkles, Film, ImageIcon, Upload, FileText, Wand2, Settings2, Loader2, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload' | 'generate_image';
type ProviderType = 'runway' | 'replicate' | 'shotstack';

const SUGGESTIONS = [
  { label: '⚡ Quick Objection Response', prompt: 'Create a 30-second PROOF objection response video about the secret oaths in Greek life', template: 'objection_short' as const },
  { label: '📖 Mini Teaching', prompt: 'Create a 2-minute mini teaching exploring the biblical perspective on fraternity rituals', template: 'mini_teaching' as const },
  { label: '🗣️ Conversation Prep', prompt: 'Create a conversation preparation video for talking to a friend about Greek life and faith', template: 'conversation_prep' as const },
  { label: '🙏 Weekly Devotional', prompt: 'Create a 60-second devotional connecting scripture to the Greek experience', template: 'weekly_devotional' as const },
];

const REPLICATE_MODELS = [
  { id: 'minimax/video-01-live', label: 'MiniMax Video-01-Live' },
  { id: 'luma/ray', label: 'Luma Ray' },
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
}

export function StudioPromptHero({
  generationMode, onModeChange, prompt, onPromptChange,
  onGenerate, isLoading, isAdmin,
  selectedProvider, onProviderChange, selectedModel, onModelChange,
}: StudioPromptHeroProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const tabs = [
    { mode: 'text_to_video' as GenerationMode, label: 'Create Video', icon: Film },
    { mode: 'image_to_video' as GenerationMode, label: 'Image to Video', icon: ImageIcon },
    { mode: 'video_upload' as GenerationMode, label: 'Upload & Edit', icon: Upload },
    { mode: 'generate_image' as GenerationMode, label: 'AI Images', icon: Wand2 },
  ];

  const handleTemplateSelect = (value: string) => {
    setSelectedTemplate(value);
    const suggestion = SUGGESTIONS.find(s => s.template === value);
    if (suggestion) {
      onPromptChange(suggestion.prompt);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Studio Agent
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create multi-scene videos with AI-powered storyboarding
          </p>
        </div>
        {isAdmin && (
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 shrink-0">
            <Settings2 className="w-3 h-3 mr-1" /> Admin
          </Badge>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 border-b border-border/50 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.mode}
            onClick={() => onModeChange(t.mode)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              generationMode === t.mode
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
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

          {/* Form fields row */}
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
                <Label className="text-sm font-medium">Provider</Label>
                <Select value={selectedProvider} onValueChange={(v: ProviderType) => onProviderChange(v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="runway">Runway Gen-4</SelectItem>
                    <SelectItem value="replicate">Replicate</SelectItem>
                    <SelectItem value="shotstack">ShotStack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Model selector for replicate */}
          {generationMode === 'text_to_video' && selectedProvider === 'replicate' && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Model</Label>
              <Select value={selectedModel} onValueChange={onModelChange}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REPLICATE_MODELS.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
