import { CheckCircle, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudioContentPickerProps {
  availableContent: any[];
  selectedContentIds: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  isLoading: boolean;
  imagePreview?: string | null;
}

export function StudioContentPicker({
  availableContent, selectedContentIds, onToggle,
  onBack, onGenerate, isLoading, imagePreview,
}: StudioContentPickerProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <h3 className="font-bold text-foreground">Select PROOF Content</h3>
        </div>
        <Badge variant="secondary">{selectedContentIds.length} selected</Badge>
      </div>

      <p className="text-sm text-muted-foreground">Choose objection cards and library sources to ground your video.</p>

      {imagePreview && (
        <div className="rounded-xl border overflow-hidden bg-muted max-w-xs">
          <img src={imagePreview} alt="Frame" className="w-full h-24 object-cover" />
          <p className="text-xs text-center text-muted-foreground py-1">Attached frame</p>
        </div>
      )}

      <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
        {availableContent.map(c => (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
              selectedContentIds.includes(c.id)
                ? 'bg-primary/5 border-2 border-primary/30'
                : 'bg-card border-2 border-transparent hover:border-border/50'
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
              selectedContentIds.includes(c.id) ? 'bg-primary border-primary' : 'border-muted-foreground/30'
            }`}>
              {selectedContentIds.includes(c.id) && <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />}
            </div>
            <span className="text-sm flex-1">{c.label}</span>
            {c.tier && <Badge variant="outline" className="text-xs">T{c.tier}</Badge>}
          </button>
        ))}
      </div>

      <Button
        disabled={selectedContentIds.length === 0 || isLoading}
        onClick={onGenerate}
        className="w-full gap-2 h-11 rounded-xl"
      >
        {isLoading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating Script...</>
          : <><Sparkles className="w-4 h-4" /> Generate Script ({selectedContentIds.length} sources)</>
        }
      </Button>
    </div>
  );
}
