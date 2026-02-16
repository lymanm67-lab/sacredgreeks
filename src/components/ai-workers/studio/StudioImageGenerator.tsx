import { useRef } from 'react';
import { Wand2, Loader2, CheckCircle, Download, RefreshCw, Play, Copy, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface StudioImageGeneratorProps {
  imagePrompt: string;
  onPromptChange: (p: string) => void;
  imageModel: 'fast' | 'quality';
  onModelChange: (m: 'fast' | 'quality') => void;
  isGenerating: boolean;
  onGenerate: () => void;
  generatedImageUrl: string | null;
  imageEditSource: string | null;
  imageEditPreview: string | null;
  onSetEditSource: (url: string | null, preview: string | null) => void;
  onUploadEditSource: (file: File) => void;
  isUploading: boolean;
  onUseForVideo: (url: string) => void;
}

export function StudioImageGenerator({
  imagePrompt, onPromptChange, imageModel, onModelChange,
  isGenerating, onGenerate, generatedImageUrl,
  imageEditSource, imageEditPreview, onSetEditSource,
  onUploadEditSource, isUploading, onUseForVideo,
}: StudioImageGeneratorProps) {
  const { toast } = useToast();
  const imageEditInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Quality toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onModelChange('fast')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            imageModel === 'fast'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          ⚡ Fast
        </button>
        <button
          onClick={() => onModelChange('quality')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            imageModel === 'quality'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          ✨ High Quality
        </button>
      </div>

      {/* Edit source image (optional) */}
      <div className="bg-card rounded-xl border border-border/50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Edit Existing Image <span className="text-muted-foreground font-normal">(optional)</span></p>
          {imageEditSource && (
            <Button variant="ghost" size="sm" onClick={() => onSetEditSource(null, null)} className="h-7">
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <input
          ref={imageEditInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUploadEditSource(file);
          }}
        />
        {imageEditPreview ? (
          <div className="relative rounded-xl overflow-hidden bg-muted border border-border/30">
            <img src={imageEditPreview} alt="Source" className="w-full max-h-40 object-contain" />
          </div>
        ) : (
          <button
            onClick={() => imageEditInputRef.current?.click()}
            className="w-full border-2 border-dashed border-border/50 rounded-xl p-4 text-center cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 mx-auto text-primary animate-spin" />
            ) : (
              <ImageIcon className="w-5 h-5 mx-auto text-muted-foreground" />
            )}
            <p className="text-xs text-muted-foreground mt-1">Upload source image to modify</p>
          </button>
        )}
      </div>

      {/* Prompt + generate */}
      <div className="relative">
        <Textarea
          placeholder={imageEditSource
            ? "Describe how to edit this image..."
            : "Describe the image you want..."
          }
          value={imagePrompt}
          onChange={e => onPromptChange(e.target.value)}
          rows={3}
          className="text-base rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm resize-none pr-28"
        />
        <Button
          disabled={!imagePrompt.trim() || isGenerating}
          onClick={onGenerate}
          size="lg"
          className="absolute bottom-3 right-3 rounded-xl gap-2 shadow-lg"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          Generate
        </Button>
      </div>

      {/* Result */}
      {generatedImageUrl && (
        <Card className="border-primary/20 overflow-hidden">
          <div className="rounded-t-xl overflow-hidden bg-muted">
            <img src={generatedImageUrl} alt="AI Generated" className="w-full max-h-96 object-contain" />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Image Generated</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" asChild>
                <a href={generatedImageUrl} target="_blank" rel="noopener noreferrer" download className="gap-1.5">
                  <Download className="w-3 h-3" /> Download
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                onSetEditSource(generatedImageUrl, generatedImageUrl);
                toast({ title: 'Set as edit source', description: 'Modify your prompt to refine.' });
              }} className="gap-1.5">
                <RefreshCw className="w-3 h-3" /> Refine
              </Button>
              <Button variant="outline" size="sm" onClick={() => onUseForVideo(generatedImageUrl)} className="gap-1.5">
                <Play className="w-3 h-3" /> Use for Video
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                navigator.clipboard.writeText(generatedImageUrl);
                toast({ title: 'URL copied!' });
              }} className="gap-1.5">
                <Copy className="w-3 h-3" /> Copy URL
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
