import { useRef } from 'react';
import { ImageIcon, VideoIcon, Upload, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface StudioUploadZoneProps {
  type: 'image' | 'video';
  accept: string;
  onFile: (f: File) => void;
  preview: string | null;
  onClear: () => void;
  isUploading: boolean;
  prompt?: string;
  onPromptChange?: (p: string) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export function StudioUploadZone({
  type, accept, onFile, preview, onClear,
  isUploading, prompt, onPromptChange, onSubmit, isLoading,
}: StudioUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = type === 'image' ? ImageIcon : VideoIcon;

  return (
    <div className="max-w-xl mx-auto space-y-4">
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
        <div className="relative rounded-2xl border-2 border-primary/20 overflow-hidden bg-muted shadow-sm">
          {type === 'image' ? (
            <img src={preview} alt="Preview" className="w-full max-h-64 object-contain" />
          ) : (
            <video src={preview} controls className="w-full max-h-64" />
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 rounded-lg"
            onClick={onClear}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-border/50 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all group"
        >
          {isUploading ? (
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-3" />
          ) : (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          )}
          <p className="text-sm font-medium text-foreground">
            {isUploading ? 'Uploading...' : `Drop your ${type} here or click to browse`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {type === 'image' ? 'JPG, PNG, WebP, GIF (max 20MB)' : 'MP4, WebM, MOV (max 100MB)'}
          </p>
        </button>
      )}

      {/* Optional prompt/title */}
      {onPromptChange && (
        <Textarea
          placeholder={type === 'video' ? 'Video title / description (optional)' : 'Describe the motion you want...'}
          value={prompt || ''}
          onChange={e => onPromptChange(e.target.value)}
          rows={2}
          className="rounded-xl border-border/50"
        />
      )}

      {onSubmit && preview && (
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="w-full gap-2 h-11 rounded-xl"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Upload className="w-4 h-4" /> Save to Library</>
          )}
        </Button>
      )}
    </div>
  );
}
