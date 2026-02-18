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

import type { SlideData, ImageFit, ImageLayer, FontSize } from "./slideTypes";

const FONT_SIZE_MAP: Record<FontSize, { title: string; titleTwo: string; content: string }> = {
  sm: { title: "text-5xl", titleTwo: "text-4xl", content: "text-xl" },
  md: { title: "text-7xl", titleTwo: "text-5xl", content: "text-2xl" },
  lg: { title: "text-8xl", titleTwo: "text-6xl", content: "text-3xl" },
  xl: { title: "text-9xl", titleTwo: "text-7xl", content: "text-4xl" },
};

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: "sm", label: "S" },
  { value: "md", label: "M" },
  { value: "lg", label: "L" },
  { value: "xl", label: "XL" },
];

const COLOR_PRESETS = [
  { value: "", label: "Auto" },
  { value: "#ffffff", label: "White" },
  { value: "#000000", label: "Black" },
  { value: "#f59e0b", label: "Gold" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#ef4444", label: "Red" },
  { value: "#10b981", label: "Green" },
  { value: "#8b5cf6", label: "Purple" },
];

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
  const fs = FONT_SIZE_MAP[slide.font_size || "md"];
  const titleColor = slide.title_color || undefined;
  const contentColor = slide.content_color || undefined;

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
        {hasImage && (slide.image_layer || "behind") === "behind" && (
          <div className="absolute inset-0">
            <img
              src={slide.image_url}
              alt=""
              className="w-full h-full"
              style={{
                objectFit: slide.image_fit === "stretch" ? "fill" : (slide.image_fit || "cover"),
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        {slide.layout === "title" ? (
          <div className={cn("flex flex-col items-center justify-center h-full px-40 text-center relative z-10", hasImage && (slide.image_layer || "behind") === "behind" && "text-white")}>
            <h1 className={cn(fs.title, "font-bold mb-8", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white drop-shadow-lg" : "text-foreground")} style={titleColor ? { color: titleColor } : undefined}>{slide.title || "Untitled"}</h1>
            <p className={cn(fs.content, "whitespace-pre-wrap", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white/90 drop-shadow" : "text-muted-foreground")} style={contentColor ? { color: contentColor } : undefined}>{slide.content}</p>
          </div>
        ) : slide.layout === "two-column" ? (
          <div className="flex flex-col h-full p-20 relative z-10">
            <h2 className={cn(fs.titleTwo, "font-bold mb-12", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white drop-shadow-lg" : "text-foreground")} style={titleColor ? { color: titleColor } : undefined}>{slide.title || "Untitled"}</h2>
            <div className="flex-1 grid grid-cols-2 gap-16">
              <div className={cn(fs.content, "whitespace-pre-wrap", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white/90" : "text-foreground/80")} style={contentColor ? { color: contentColor } : undefined}>{slide.content}</div>
              <div className={cn(fs.content, "whitespace-pre-wrap", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white/90" : "text-foreground/80")} style={contentColor ? { color: contentColor } : undefined}>{slide.notes || ""}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-20 relative z-10">
            <h2 className={cn(fs.titleTwo, "font-bold mb-12", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white drop-shadow-lg" : "text-foreground")} style={titleColor ? { color: titleColor } : undefined}>{slide.title || "Untitled"}</h2>
            <p className={cn(fs.content, "whitespace-pre-wrap flex-1", hasImage && (slide.image_layer || "behind") === "behind" ? "text-white/90" : "text-foreground/80")} style={contentColor ? { color: contentColor } : undefined}>{slide.content}</p>
          </div>
        )}
        {hasImage && slide.image_layer === "infront" && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-20">
            <img
              src={slide.image_url}
              alt=""
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              style={{
                objectFit: slide.image_fit === "stretch" ? "fill" : (slide.image_fit || "contain"),
                width: slide.image_fit === "stretch" ? "100%" : undefined,
                height: slide.image_fit === "stretch" ? "100%" : undefined,
              }}
            />
          </div>
        )}
        <div className={cn("absolute bottom-6 right-10 text-lg", hasImage ? "text-white/50" : "text-muted-foreground/50")}>
          {index + 1}
        </div>
      </div>
    </div>
  );
}

// Topic detection rules: [keywords[], image suggestions[]]
const TOPIC_RULES: [string[], string[]][] = [
  // PROOF pillars
  [["pledge", "process", "intake", "probate", "membership", "joining", "candidate"], ["Candidates crossing burning sands", "Pledge line silhouette at dawn", "Initiation ceremony candlelight"]],
  [["ritual", "ceremony", "sacred", "tradition", "rite", "symbolic", "liturgy"], ["Candlelit ceremonial altar", "Sacred symbols on marble", "Stained glass Greek letters"]],
  [["oath", "vow", "commitment", "covenant", "promise", "swear", "allegiance"], ["Hand on Bible swearing oath", "Parchment with calligraphy vows", "Unity hands circle"]],
  [["obscur", "hidden", "secret", "mystery", "esoteric", "conceal", "unknown"], ["Fog-covered Gothic cathedral", "Hidden doorway with light", "Ancient manuscript close-up"]],
  [["founder", "history", "providential", "1906", "origin", "legacy", "heritage"], ["Vintage sepia campus 1906", "Historical founders portrait style", "Timeline with golden milestones"]],
  [["proof", "framework"], ["Golden shield with P.R.O.O.F. letters", "Five pillars on ancient columns", "Framework diagram with divine light"]],
  // Faith & spiritual
  [["prayer", "faith", "spiritual", "bible", "scripture", "god", "christ", "worship", "devotion"], ["Sunrise over mountains prayer", "Chapel with divine light rays", "Praying hands golden glow"]],
  // Leadership & accountability
  [["leader", "leadership", "mentor", "guide", "role model", "shepherd"], ["Leader speaking to crowd at podium", "Torch being passed between hands", "Eagle soaring over mountains"]],
  [["action", "corrective", "target", "deadline", "assign", "owner", "accountability", "responsible"], ["Checklist on clipboard with checkmarks", "Team at whiteboard planning strategy", "Clock with gears and targets"]],
  [["gap", "audit", "assess", "evaluat", "review", "compliance", "measure", "benchmark"], ["Magnifying glass over data chart", "Bridge spanning a gap in canyon", "Scales of justice balanced"]],
  [["goal", "vision", "mission", "purpose", "objective", "strategy", "plan"], ["Compass pointing north on map", "Mountain summit with flag", "Blueprint with architectural plans"]],
  // Community & service
  [["service", "community", "volunteer", "outreach", "philanthrop", "give back"], ["Diverse group serving community", "Hands planting a tree together", "Food bank volunteers working"]],
  [["unity", "brother", "sister", "bond", "together", "fellowship", "solidar"], ["Linked arms in a circle", "Chain links in gold", "Group silhouette at sunset"]],
  // Education & growth
  [["education", "learn", "study", "scholar", "academic", "knowledge", "teach"], ["Open book with glowing pages", "Graduation caps thrown in air", "Library with golden light"]],
  [["growth", "develop", "transform", "progress", "evolve", "journey", "path"], ["Seedling growing into oak tree", "Winding road through sunrise valley", "Butterfly emerging from cocoon"]],
  // Greek life
  [["greek", "fraternity", "sorority", "d9", "divine nine", "chapter", "nphc"], ["Gold crest on marble pedestal", "Greek columns at sunset", "D9 organization shield mosaic"]],
  // Challenges
  [["challenge", "obstacle", "struggle", "overcome", "persever", "resilien", "adversity"], ["Rock climber reaching summit", "Storm breaking into sunlight", "Phoenix rising from ashes"]],
  // Wellness & healing
  [["heal", "wellness", "mental health", "self-care", "restor", "hazing"], ["Calm lake reflecting mountains", "Hands holding broken chain", "Garden path with blooming flowers"]],
  // Celebration
  [["celebrat", "achievement", "accomplish", "success", "victory", "milestone", "award"], ["Confetti and golden trophy", "Fireworks over city skyline", "Medal on velvet cushion"]],
  // Data & results
  [["data", "result", "metric", "statistic", "survey", "finding", "report", "percent"], ["Infographic on digital screen", "Rising bar chart in gold", "Dashboard with glowing metrics"]],
  // Call to action
  [["next step", "call to action", "moving forward", "implement", "apply", "take action"], ["Open door with bright light beyond", "Footsteps on a path forward", "Rocket launching into sky"]],
  // Welcome & intro
  [["welcome", "introduc", "overview", "agenda", "today", "opening"], ["Sunrise over calm ocean", "Grand entrance with golden doors", "Warm handshake close-up"]],
  // Closing
  [["closing", "conclusion", "reflect", "summary", "takeaway", "final", "thank"], ["Sunset over peaceful landscape", "Candle flame in darkness", "Hands applauding"]],
];

function getPromptIdeas(title: string, content: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const ideas: string[] = [];
  for (const [keywords, suggestions] of TOPIC_RULES) {
    if (keywords.some((kw) => text.includes(kw))) {
      for (const s of suggestions) {
        if (!ideas.includes(s)) ideas.push(s);
      }
    }
  }
  return ideas.length ? ideas.slice(0, 4) : ["Abstract gradient background", "Elegant dark texture", "Soft bokeh lights", "Minimalist geometric shapes"];
}

function SlideImageSection({
  imageUrl,
  imageFit,
  imageLayer,
  onImageChange,
  onImageFitChange,
  onImageLayerChange,
  slideTitle,
  slideContent,
}: {
  imageUrl: string | null;
  imageFit: ImageFit;
  imageLayer: ImageLayer;
  onImageChange: (url: string | null) => void;
  onImageFitChange: (fit: ImageFit) => void;
  onImageLayerChange: (layer: ImageLayer) => void;
  slideTitle: string;
  slideContent: string;
}) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async (promptOverride?: string) => {
    const prompt = promptOverride || aiPrompt;
    if (!prompt.trim()) return;
    if (promptOverride) setAiPrompt(promptOverride);
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("video-studio", {
        body: { action: "generate_image", imagePrompt: prompt, imageModel: "fast" },
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

  const FIT_OPTIONS: { value: ImageFit; label: string }[] = [
    { value: "cover", label: "Cover" },
    { value: "contain", label: "Contain" },
    { value: "stretch", label: "Stretch" },
  ];

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
        <ImageIcon className="w-3 h-3" /> Background Image
      </label>
      {imageUrl && (
        <div className="mb-2 space-y-1.5">
          <div className="relative rounded-lg overflow-hidden border border-border/50">
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
          <div className="flex gap-1">
            {FIT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onImageFitChange(opt.value)}
                className={cn(
                  "flex-1 px-2 py-1 rounded text-[10px] font-medium transition-colors border",
                  imageFit === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {([
              { value: "behind" as ImageLayer, label: "Behind Text" },
              { value: "infront" as ImageLayer, label: "In Front" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => onImageLayerChange(opt.value)}
                className={cn(
                  "flex-1 px-2 py-1 rounded text-[10px] font-medium transition-colors border",
                  imageLayer === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
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
          onClick={() => generateImage()}
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
              onClick={() => generateImage(idea)}
              disabled={isGenerating}
              className="px-2 py-0.5 rounded-full text-[10px] bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors disabled:opacity-50"
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
                <Type className="w-3 h-3" /> Font Size
              </label>
              <div className="flex gap-1">
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateSlide(activeIndex, { font_size: opt.value })}
                    className={cn(
                      "flex-1 px-2 py-1 rounded text-xs font-bold transition-colors border",
                      (currentSlide.font_size || "md") === opt.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title Color</label>
              <div className="flex gap-1 flex-wrap">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.value || "auto"}
                    onClick={() => updateSlide(activeIndex, { title_color: c.value })}
                    title={c.label}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all",
                      (currentSlide.title_color || "") === c.value ? "border-primary scale-110" : "border-border/50 hover:border-border"
                    )}
                    style={{ background: c.value || "linear-gradient(135deg, #888 50%, #fff 50%)" }}
                  />
                ))}
                <input
                  type="color"
                  value={currentSlide.title_color || "#ffffff"}
                  onChange={(e) => updateSlide(activeIndex, { title_color: e.target.value })}
                  className="w-6 h-6 rounded-full cursor-pointer border-0 p-0"
                  title="Custom color"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Content Color</label>
              <div className="flex gap-1 flex-wrap">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.value || "auto"}
                    onClick={() => updateSlide(activeIndex, { content_color: c.value })}
                    title={c.label}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all",
                      (currentSlide.content_color || "") === c.value ? "border-primary scale-110" : "border-border/50 hover:border-border"
                    )}
                    style={{ background: c.value || "linear-gradient(135deg, #888 50%, #fff 50%)" }}
                  />
                ))}
                <input
                  type="color"
                  value={currentSlide.content_color || "#ffffff"}
                  onChange={(e) => updateSlide(activeIndex, { content_color: e.target.value })}
                  className="w-6 h-6 rounded-full cursor-pointer border-0 p-0"
                  title="Custom color"
                />
              </div>
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
              imageFit={currentSlide.image_fit || "cover"}
              imageLayer={currentSlide.image_layer || "behind"}
              onImageChange={(url) => updateSlide(activeIndex, { image_url: url || undefined })}
              onImageFitChange={(fit) => updateSlide(activeIndex, { image_fit: fit })}
              onImageLayerChange={(layer) => updateSlide(activeIndex, { image_layer: layer })}
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
