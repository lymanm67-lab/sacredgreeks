import { useState } from 'react';
import { Sparkles, Film, ImageIcon, Upload, FileText, Wand2, ChevronDown, ChevronUp, Settings2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type GenerationMode = 'text_to_video' | 'image_to_video' | 'video_upload' | 'generate_image';
type ProviderType = 'runway' | 'replicate';

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
  const [showSettings, setShowSettings] = useState(false);

  const modes = [
    { mode: 'text_to_video' as GenerationMode, label: 'Text → Video', icon: FileText, active: true },
    { mode: 'image_to_video' as GenerationMode, label: 'Image → Video', icon: ImageIcon, active: true },
    { mode: 'generate_image' as GenerationMode, label: 'AI Thumbnails', icon: Wand2, active: true },
    { mode: 'video_upload' as GenerationMode, label: 'Upload', icon: Upload, active: true },
  ];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center space-y-6 py-8 px-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Film className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Studio Agent
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Turn any idea into a video, thumbnail, or animation — powered by AI
          </p>
        </div>

        {/* Mode pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {modes.map(m => (
            <button
              key={m.mode}
              onClick={() => onModeChange(m.mode)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                generationMode === m.mode
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <m.icon className="w-4 h-4" />
              {m.label}
            </button>
          ))}
        </div>

        {/* Main prompt area */}
        {generationMode !== 'video_upload' && (
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="relative">
              <Textarea
                placeholder={
                  generationMode === 'generate_image'
                    ? "Describe the image you want... e.g. 'A photorealistic Greek temple at sunset with dramatic lighting, 16:9'"
                    : generationMode === 'image_to_video'
                    ? "Describe the motion you want... e.g. 'Slow zoom in, clouds drifting, warm golden light'"
                    : "Describe the video you want to create..."
                }
                value={prompt}
                onChange={e => onPromptChange(e.target.value)}
                rows={3}
                className="text-base rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm focus:border-primary/50 resize-none pr-28 shadow-sm"
              />
              <Button
                disabled={!prompt.trim() || isLoading}
                onClick={() => onGenerate()}
                size="lg"
                className="absolute bottom-3 right-3 rounded-xl gap-2 shadow-lg"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {generationMode === 'generate_image' ? 'Generate' : 'Create'}
              </Button>
            </div>

            {/* Suggestion chips */}
            {generationMode === 'text_to_video' && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-muted-foreground">Try:</span>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onPromptChange(s.prompt);
                      onGenerate(s.template);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings toggle */}
        {generationMode !== 'video_upload' && generationMode !== 'generate_image' && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings2 className="w-3 h-3" />
              Settings
              {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showSettings && (
              <div className="mt-3 p-4 rounded-xl bg-card border border-border/50 flex items-center gap-3 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Provider:</span>
                  <Select value={selectedProvider} onValueChange={(v: ProviderType) => onProviderChange(v)}>
                    <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="runway">Runway Gen-4</SelectItem>
                      <SelectItem value="replicate">Replicate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedProvider === 'replicate' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Model:</span>
                    <Select value={selectedModel} onValueChange={onModelChange}>
                      <SelectTrigger className="w-[200px] h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {REPLICATE_MODELS.map(m => (
                          <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {isAdmin && (
                  <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                    Admin: Custom Content Unlocked
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
