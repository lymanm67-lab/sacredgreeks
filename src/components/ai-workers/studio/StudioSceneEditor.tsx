import { useState } from 'react';
import { Film, FileText, Sparkles, Copy, RotateCcw, AlertTriangle, ChevronLeft, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface StudioSceneEditorProps {
  scriptData: any;
  videoRequest: any;
  selectedProvider: string;
  onBack: () => void;
  onRegenerate: () => void;
  onExportToInVideo?: () => void;
  isLoading: boolean;
}

export function StudioSceneEditor({
  scriptData, videoRequest, selectedProvider,
  onBack, onRegenerate, onExportToInVideo, isLoading,
}: StudioSceneEditorProps) {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'scenes' | 'script' | 'captions' | 'meta'>('scenes');
  const [selectedScene, setSelectedScene] = useState(0);

  const scenes = scriptData?.scenePlan || [];
  const script = scriptData?.script || [];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied!` });
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <div>
            <h3 className="font-bold text-foreground text-lg">{scriptData?.title || 'Your Video'}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-xs">
                {videoRequest?.provider === 'invideo' ? 'InVideo.ai' : videoRequest?.provider || 'InVideo.ai'}
              </Badge>
              {videoRequest?.provider_model && (
                <Badge variant="outline" className="text-xs">{videoRequest.provider_model}</Badge>
              )}
              {videoRequest?.is_custom_content && (
                <Badge className="bg-primary/10 text-primary text-xs border-0">Custom</Badge>
              )}
              {videoRequest?.generation_mode === 'image_to_video' && (
                <Badge className="bg-violet-500/10 text-violet-600 text-xs border-0">Image→Video</Badge>
              )}
              {videoRequest?.version_number > 1 && (
                <Badge variant="secondary" className="text-xs">v{videoRequest.version_number}</Badge>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-1 text-muted-foreground">
          <RotateCcw className="w-3 h-3" /> Regenerate
        </Button>
      </div>

      {/* Blocked alert */}
      {videoRequest?.status === 'blocked' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Video Blocked</AlertTitle>
          <AlertDescription>
            Missing citations. <strong>{videoRequest.blocked_reason}</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Input image preview */}
      {videoRequest?.input_image_url && (
        <div className="rounded-xl border overflow-hidden bg-muted max-w-xs">
          <img src={videoRequest.input_image_url} alt="Source" className="w-full h-32 object-cover" />
          <p className="text-xs text-center text-muted-foreground py-1">🖼️ Source frame</p>
        </div>
      )}

      {/* Section tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
        {[
          { key: 'scenes' as const, label: 'Scenes', icon: Film },
          { key: 'script' as const, label: 'Script', icon: FileText },
          { key: 'captions' as const, label: 'Captions', icon: Clock },
          { key: 'meta' as const, label: 'Meta', icon: Sparkles },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeSection === tab.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scenes view - timeline-like */}
      {activeSection === 'scenes' && (
        <div className="grid md:grid-cols-[240px_1fr] gap-4">
          {/* Scene list / timeline */}
          <div className="space-y-1.5 md:border-r md:pr-4 border-border/30">
            {scenes.map((scene: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedScene(i)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedScene === i
                    ? 'bg-primary/10 border-2 border-primary/30'
                    : 'bg-card border-2 border-transparent hover:border-border/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center ${
                    selectedScene === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {scene.sceneNumber || i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{scene.visual?.slice(0, 40)}...</p>
                    <p className="text-[10px] text-muted-foreground">{scene.duration}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Scene detail */}
          {scenes[selectedScene] && (
            <Card className="border-border/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">Scene {scenes[selectedScene].sceneNumber || selectedScene + 1}</Badge>
                  <Badge variant="outline" className="text-xs">{scenes[selectedScene].duration}</Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Visual Direction</p>
                  <p className="text-sm">{scenes[selectedScene].visual}</p>
                </div>
                {scenes[selectedScene].textOverlay && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Text Overlay</p>
                    <p className="text-sm text-primary font-medium">"{scenes[selectedScene].textOverlay}"</p>
                  </div>
                )}
                {/* Matching narration */}
                {script[selectedScene] && (
                  <div className="border-t border-border/30 pt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Narration</p>
                    <p className="text-sm">{script[selectedScene].narration}</p>
                    {script[selectedScene].sourceRef && (
                      <Badge variant="secondary" className="text-xs mt-2">📖 {script[selectedScene].sourceRef}</Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Script view */}
      {activeSection === 'script' && (
        <div className="space-y-2">
          {script.map((segment: any, i: number) => (
            <Card key={i} className="border-border/30">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs">{segment.timestamp}</Badge>
                  {segment.sourceRef && <Badge variant="secondary" className="text-xs">📖 {segment.sourceRef}</Badge>}
                </div>
                <p className="text-sm">{segment.narration}</p>
                {segment.visual && <p className="text-xs text-muted-foreground mt-1">🎬 {segment.visual}</p>}
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(script.map((s: any) => s.narration).join('\n\n'), 'Script')}>
            <Copy className="w-3 h-3" /> Copy Script
          </Button>
        </div>
      )}

      {/* Captions view */}
      {activeSection === 'captions' && (
        <Card className="border-border/30">
          <CardContent className="p-4 space-y-3">
            <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground bg-muted/50 p-3 rounded-lg max-h-64 overflow-y-auto">
              {scriptData?.captions || 'No captions generated'}
            </pre>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(scriptData?.captions || '', 'Captions (SRT)')}>
                <Copy className="w-3 h-3" /> Copy SRT
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(scriptData?.transcript || '', 'Transcript')}>
                <Copy className="w-3 h-3" /> Copy Transcript
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meta view */}
      {activeSection === 'meta' && (
        <Card className="border-border/30">
          <CardContent className="p-4 space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Description</p>
              <p className="text-sm mt-0.5">{scriptData?.description}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {(scriptData?.tags || []).map((tag: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Thumbnail Prompt</p>
              <p className="text-sm italic mt-0.5">{scriptData?.thumbnailPrompt}</p>
            </div>
            {(scriptData?.citationsUsed || []).length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Citations</p>
                <ul className="text-sm space-y-1 mt-1">
                  {scriptData.citationsUsed.map((c: string, i: number) => (
                    <li key={i} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Next Steps panel */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Next Steps</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Your script is ready! Copy it below, then paste it into InVideo.ai to generate your video.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {onExportToInVideo && (
              <Button
                onClick={onExportToInVideo}
                className="flex-1 gap-2 h-12 text-base rounded-2xl shadow-lg"
                size="lg"
              >
                <Copy className="w-5 h-5" /> Copy Script
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="flex-1 gap-2 h-12 text-base rounded-2xl border-primary/30 hover:bg-primary/10"
              size="lg"
            >
              <a href="https://ai.invideo.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5" /> Open InVideo.ai
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: The "Open InVideo.ai" link works on your published site. It may be blocked in the Lovable preview.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
