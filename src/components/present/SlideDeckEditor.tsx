import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Save, GripVertical,
  Type, AlignLeft, Layout, Copy, Wand2, Loader2, ImageIcon, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import type { SlideData } from "./slideTypes";

interface SlideDeck {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_template: boolean;
  template_category: string | null;
  slides_json: SlideData[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const LAYOUTS = [
  { value: "title", label: "Title Slide" },
  { value: "content", label: "Content" },
  { value: "two-column", label: "Two Column" },
  { value: "blank", label: "Blank" },
];

// Scaled slide component renders at 1920x1080 inside any container
function ScaledSlide({
  slide,
  containerWidth,
  containerHeight,
  isActive,
  onClick,
  index,
}: {
  slide: SlideData;
  containerWidth: number;
  containerHeight: number;
  isActive?: boolean;
  onClick?: () => void;
  index: number;
}) {
  const scale = Math.min(containerWidth / 1920, containerHeight / 1080);
  const hasImage = !!slide.image_url;

  return (
    <div
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all rounded-lg",
        isActive ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-border/50 hover:ring-border"
      )}
      style={{ width: containerWidth, height: containerHeight }}
      onClick={onClick}
    >
      <div
        className="absolute slide-content bg-background"
        style={{
          width: 1920,
          height: 1080,
          left: "50%",
          top: "50%",
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {hasImage && (
          <div className="absolute inset-0">
            <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        {slide.layout === "title" ? (
          <div className={cn("flex flex-col items-center justify-center h-full px-40 text-center relative z-10", hasImage && "text-white")}>
            <h1 className={cn("text-7xl font-bold mb-8", hasImage ? "text-white drop-shadow-lg" : "text-foreground")}>{slide.title || "Untitled"}</h1>
            <p className={cn("text-3xl whitespace-pre-wrap", hasImage ? "text-white/90 drop-shadow" : "text-muted-foreground")}>{slide.content}</p>
          </div>
        ) : slide.layout === "two-column" ? (
          <div className="flex flex-col h-full p-20 relative z-10">
            <h2 className={cn("text-5xl font-bold mb-12", hasImage ? "text-white drop-shadow-lg" : "text-foreground")}>{slide.title || "Untitled"}</h2>
            <div className="flex-1 grid grid-cols-2 gap-16">
              <div className={cn("text-2xl whitespace-pre-wrap", hasImage ? "text-white/90" : "text-foreground/80")}>{slide.content}</div>
              <div className={cn("text-2xl whitespace-pre-wrap", hasImage ? "text-white/90" : "text-foreground/80")}>{slide.notes || ""}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-20 relative z-10">
            <h2 className={cn("text-5xl font-bold mb-12", hasImage ? "text-white drop-shadow-lg" : "text-foreground")}>{slide.title || "Untitled"}</h2>
            <p className={cn("text-2xl whitespace-pre-wrap flex-1", hasImage ? "text-white/90" : "text-foreground/80")}>{slide.content}</p>
          </div>
        )}
        <div className={cn("absolute bottom-6 right-10 text-lg", hasImage ? "text-white/50" : "text-muted-foreground/50")}>
          {index + 1}
        </div>
      </div>
    </div>
  );
}

const PROMPT_IDEAS_DEFAULT = ["Abstract gradient background", "Elegant dark texture", "Soft bokeh lights", "Minimalist geometric shapes"];

function getPromptIdeas(title: string, content: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const ideas: string[] = [];
  // P — Pledge Process
  if (text.includes("pledge") || text.includes("process") || text.includes("intake") || text.includes("probate"))
    ideas.push("Candidates crossing burning sands", "Pledge line silhouette at dawn", "Initiation ceremony candlelight");
  // R — Rituals
  if (text.includes("ritual") || text.includes("ceremony") || text.includes("sacred") || text.includes("tradition"))
    ideas.push("Candlelit ceremonial altar", "Sacred symbols on marble", "Stained glass Greek letters");
  // O — Oaths
  if (text.includes("oath") || text.includes("vow") || text.includes("commitment") || text.includes("covenant"))
    ideas.push("Hand on Bible swearing oath", "Parchment with calligraphy vows", "Unity hands circle");
  // O — Obscurity
  if (text.includes("obscur") || text.includes("hidden") || text.includes("secret") || text.includes("mystery"))
    ideas.push("Fog-covered Gothic cathedral", "Hidden doorway with light", "Ancient manuscript close-up");
  // F — Founders
  if (text.includes("founder") || text.includes("history") || text.includes("providential") || text.includes("1906"))
    ideas.push("Vintage sepia campus 1906", "Historical founders portrait style", "Timeline with golden milestones");
  // PROOF Framework overview
  if (text.includes("proof") || text.includes("framework"))
    ideas.push("Golden shield with P.R.O.O.F. letters", "Five pillars on ancient columns", "Framework diagram with divine light");
  // Faith & spiritual
  if (text.includes("prayer") || text.includes("faith") || text.includes("spiritual") || text.includes("bible") || text.includes("scripture"))
    ideas.push("Sunrise over mountains prayer", "Chapel with divine light rays", "Praying hands golden glow");
  // Leadership & service
  if (text.includes("leader") || text.includes("service") || text.includes("community"))
    ideas.push("Diverse group serving community", "Leadership podium spotlight", "Hands building together");
  // Greek life general
  if (text.includes("greek") || text.includes("fraternity") || text.includes("sorority") || text.includes("d9") || text.includes("divine nine"))
    ideas.push("Gold crest on marble", "Greek columns at sunset", "D9 organization shield mosaic");
  return ideas.length ? ideas.slice(0, 4) : PROMPT_IDEAS_DEFAULT;
}

function SlideImageSection({
  imageUrl,
  onImageChange,
  slideTitle,
  slideContent,
}: {
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
  slideTitle: string;
  slideContent: string;
}) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("video-studio", {
        body: { action: "generate_image", imagePrompt: aiPrompt, imageModel: "fast" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.imageUrl) {
        onImageChange(data.imageUrl);
        toast({ title: "Image generated!" });
        setAiPrompt("");
      }
    } catch (err: any) {
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
        <ImageIcon className="w-3 h-3" /> Background Image
      </label>
      {imageUrl && (
        <div className="relative rounded-lg overflow-hidden mb-2 border border-border/50">
          <img src={imageUrl} alt="" className="w-full h-20 object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={() => onImageChange(null)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
      <div className="flex gap-1.5">
        <Input
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isGenerating && generateImage()}
          placeholder="Describe an image..."
          className="h-7 text-xs flex-1"
          disabled={isGenerating}
        />
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1 px-2 shrink-0"
          onClick={generateImage}
          disabled={!aiPrompt.trim() || isGenerating}
        >
          {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
          AI
        </Button>
      </div>
      {!aiPrompt && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {getPromptIdeas(slideTitle, slideContent).map((idea) => (
            <button
              key={idea}
              onClick={() => setAiPrompt(idea)}
              className="px-2 py-0.5 rounded-full text-[10px] bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            >
              {idea}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SlideDeckEditor({
  deckId,
  onBack,
}: {
  deckId: string;
  onBack: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckTitle, setDeckTitle] = useState("");
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 450 });

  // Load deck
  const { data: deck, isLoading } = useQuery({
    queryKey: ["slide-deck", deckId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks")
        .select("*")
        .eq("id", deckId)
        .single();
      if (error) throw error;
      return data as unknown as SlideDeck;
    },
    enabled: !!deckId,
  });

  useEffect(() => {
    if (deck) {
      setDeckTitle(deck.title);
      const s = Array.isArray(deck.slides_json) ? deck.slides_json : [];
      setSlides(s.length ? s : [{ title: "Title Slide", content: "", layout: "title" }]);
    }
  }, [deck]);

  // Measure canvas container
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setCanvasSize({ w: width, h: height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("slide_decks")
        .update({
          title: deckTitle,
          slides_json: slides as unknown as any,
        })
        .eq("id", deckId);
      if (error) throw error;
    },
    onSuccess: () => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
    },
  });

  // Auto-save debounce
  const triggerAutoSave = useCallback(() => {
    setHasChanges(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveMutation.mutate();
    }, 2000);
  }, [saveMutation]);

  const updateSlide = (index: number, patch: Partial<SlideData>) => {
    setSlides((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
    triggerAutoSave();
  };

  const addSlide = () => {
    const newSlide: SlideData = { title: "New Slide", content: "", layout: "content" };
    setSlides((prev) => {
      const next = [...prev];
      next.splice(activeIndex + 1, 0, newSlide);
      return next;
    });
    setActiveIndex(activeIndex + 1);
    triggerAutoSave();
  };

  const duplicateSlide = () => {
    setSlides((prev) => {
      const next = [...prev];
      next.splice(activeIndex + 1, 0, { ...prev[activeIndex] });
      return next;
    });
    setActiveIndex(activeIndex + 1);
    triggerAutoSave();
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== activeIndex));
    setActiveIndex(Math.min(activeIndex, slides.length - 2));
    triggerAutoSave();
  };

  const moveSlide = (dir: -1 | 1) => {
    const to = activeIndex + dir;
    if (to < 0 || to >= slides.length) return;
    setSlides((prev) => {
      const next = [...prev];
      [next[activeIndex], next[to]] = [next[to], next[activeIndex]];
      return next;
    });
    setActiveIndex(to);
    triggerAutoSave();
  };

  const updateTitle = (t: string) => {
    setDeckTitle(t);
    triggerAutoSave();
  };

  const currentSlide = slides[activeIndex];

  if (isLoading) {
    return <div className="text-center py-20 text-muted-foreground">Loading deck...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Input
          value={deckTitle}
          onChange={(e) => updateTitle(e.target.value)}
          className="max-w-xs font-semibold text-sm h-8"
        />
        <div className="flex-1" />
        <Badge variant={hasChanges ? "secondary" : "outline"} className="text-[10px]">
          {saveMutation.isPending ? "Saving..." : hasChanges ? "Unsaved" : "Saved"}
        </Badge>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs"
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending || !hasChanges}
        >
          <Save className="w-3.5 h-3.5" /> Save
        </Button>
      </div>

      <div className="flex flex-1 gap-4 pt-4 min-h-0">
        {/* Sidebar thumbnails */}
        <div className="w-44 shrink-0 overflow-y-auto space-y-2 pr-2">
          {slides.map((slide, i) => (
            <div key={i} className="relative group">
              <div className="text-[10px] text-muted-foreground mb-0.5 px-1">{i + 1}</div>
              <ScaledSlide
                slide={slide}
                containerWidth={160}
                containerHeight={90}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                index={i}
              />
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs gap-1 text-muted-foreground"
            onClick={addSlide}
          >
            <Plus className="w-3 h-3" /> Add Slide
          </Button>
        </div>

        {/* Main canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          <div ref={canvasRef} className="flex-1 bg-muted/30 rounded-xl flex items-center justify-center p-4 min-h-0">
            {currentSlide && (
              <ScaledSlide
                slide={currentSlide}
                containerWidth={Math.min(canvasSize.w - 32, (canvasSize.h - 32) * (16 / 9))}
                containerHeight={Math.min(canvasSize.h - 32, (canvasSize.w - 32) * (9 / 16))}
                isActive={false}
                index={activeIndex}
              />
            )}
          </div>
        </div>

        {/* Properties panel */}
        {currentSlide && (
          <div className="w-72 shrink-0 overflow-y-auto space-y-4 border-l border-border/50 pl-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Slide {activeIndex + 1}</h4>
              <div className="flex gap-0.5">
                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => moveSlide(-1)} disabled={activeIndex === 0}>
                  <ChevronUp className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => moveSlide(1)} disabled={activeIndex === slides.length - 1}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={duplicateSlide}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7 text-destructive" onClick={deleteSlide} disabled={slides.length <= 1}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <Layout className="w-3 h-3" /> Layout
              </label>
              <Select
                value={currentSlide.layout || "content"}
                onValueChange={(v) => updateSlide(activeIndex, { layout: v })}
              >
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LAYOUTS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <Type className="w-3 h-3" /> Title
              </label>
              <Input
                value={currentSlide.title}
                onChange={(e) => updateSlide(activeIndex, { title: e.target.value })}
                className="h-8 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <AlignLeft className="w-3 h-3" /> Content
              </label>
              <Textarea
                value={currentSlide.content}
                onChange={(e) => updateSlide(activeIndex, { content: e.target.value })}
                rows={6}
                className="text-xs"
              />
            </div>

            {/* Slide Background Image */}
            <SlideImageSection
              imageUrl={currentSlide.image_url || null}
              onImageChange={(url) => updateSlide(activeIndex, { image_url: url || undefined })}
              slideTitle={currentSlide.title}
              slideContent={currentSlide.content}
            />

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Speaker Notes
              </label>
              <Textarea
                value={currentSlide.notes || ""}
                onChange={(e) => updateSlide(activeIndex, { notes: e.target.value })}
                rows={3}
                className="text-xs"
                placeholder="Notes visible only to presenter..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
