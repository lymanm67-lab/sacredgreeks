import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Monitor, Play, ChevronLeft, ChevronRight, X, Maximize,
  FileText, Clock, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SlideData {
  title: string;
  content: string;
  notes?: string;
  layout?: string;
}

interface SlideDeck {
  id: string;
  title: string;
  description: string | null;
  slides_json: SlideData[];
  template_category: string | null;
  updated_at: string;
}

/* ─── Scaled Slide (reused pattern) ─── */
function ScaledSlide({
  slide,
  width,
  height,
  index,
  total,
}: {
  slide: SlideData;
  width: number;
  height: number;
  index: number;
  total: number;
}) {
  const scale = Math.min(width / 1920, height / 1080);

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
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
        {slide.layout === "title" ? (
          <div className="flex flex-col items-center justify-center h-full px-40 text-center">
            <h1 className="text-7xl font-bold text-foreground mb-8">
              {slide.title || "Untitled"}
            </h1>
            <p className="text-3xl text-muted-foreground whitespace-pre-wrap">
              {slide.content}
            </p>
          </div>
        ) : slide.layout === "two-column" ? (
          <div className="flex flex-col h-full p-20">
            <h2 className="text-5xl font-bold text-foreground mb-12">
              {slide.title || "Untitled"}
            </h2>
            <div className="flex-1 grid grid-cols-2 gap-16">
              <div className="text-2xl text-foreground/80 whitespace-pre-wrap">
                {slide.content}
              </div>
              <div className="text-2xl text-foreground/80 whitespace-pre-wrap">
                {slide.notes || ""}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-20">
            <h2 className="text-5xl font-bold text-foreground mb-12">
              {slide.title || "Untitled"}
            </h2>
            <p className="text-2xl text-foreground/80 whitespace-pre-wrap flex-1">
              {slide.content}
            </p>
          </div>
        )}
        <div className="absolute bottom-6 right-10 text-lg text-muted-foreground/50">
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}

/* ─── Timer hook ─── */
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return { seconds, formatted, running, start: () => setRunning(true), stop: () => setRunning(false), reset: () => { setSeconds(0); setRunning(false); } };
}

/* ─── Fullscreen Presentation ─── */
function FullscreenPresentation({
  deck,
  startIndex,
  onExit,
}: {
  deck: SlideDeck;
  startIndex: number;
  onExit: () => void;
}) {
  const slides = deck.slides_json;
  const [index, setIndex] = useState(startIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const timer = useTimer();
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Start timer & broadcast channel on mount
  useEffect(() => { timer.start(); }, []);

  // Set up broadcast channel to sync with Live Preview audience
  useEffect(() => {
    const channel = supabase.channel(`present:${deck.id}`);
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({ type: "broadcast", event: "slide-change", payload: { index } });
      }
    });
    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [deck.id]);

  // Broadcast slide changes
  useEffect(() => {
    channelRef.current?.send({ type: "broadcast", event: "slide-change", payload: { index } });
  }, [index]);

  // Resize
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          setIndex((i) => Math.min(i + 1, slides.length - 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setIndex((i) => Math.max(i - 1, 0));
          break;
        case "Escape":
          onExit();
          break;
        case "n":
          setShowNotes((v) => !v);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slides.length, onExit]);

  // Auto-hide controls
  useEffect(() => {
    const showAndHide = () => {
      setShowControls(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
    };
    window.addEventListener("mousemove", showAndHide);
    showAndHide();
    return () => {
      window.removeEventListener("mousemove", showAndHide);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Try native fullscreen
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
    return () => { document.exitFullscreen?.().catch(() => {}); };
  }, []);

  const slide = slides[index];

  // Calculate slide area (leave room for notes panel if open)
  const notesH = showNotes ? 200 : 0;
  const slideW = size.w;
  const slideH = size.h - notesH;
  const fitW = Math.min(slideW, slideH * (16 / 9));
  const fitH = Math.min(slideH, slideW * (9 / 16));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      style={{ cursor: showControls ? "default" : "none" }}
    >
      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center" style={{ height: slideH }}>
        <ScaledSlide slide={slide} width={fitW} height={fitH} index={index} total={slides.length} />
      </div>

      {/* Speaker notes panel */}
      {showNotes && (
        <div className="h-[200px] bg-zinc-900 border-t border-zinc-700 p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-400">Speaker Notes</span>
          </div>
          <p className="text-sm text-zinc-200 whitespace-pre-wrap">
            {slide.notes || "No notes for this slide."}
          </p>
        </div>
      )}

      {/* Bottom controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none",
          showNotes && "bottom-[200px]"
        )}
      >
        <div className="flex items-center justify-center gap-3 p-3 bg-black/60 backdrop-blur-sm">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIndex((i) => Math.max(i - 1, 0))} disabled={index === 0}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-white text-sm font-medium min-w-[60px] text-center">
            {index + 1} / {slides.length}
          </span>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))} disabled={index === slides.length - 1}>
            <ChevronRight className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-white/20 mx-1" />
          <Button variant="ghost" size="sm" className={cn("text-white hover:bg-white/10 text-xs gap-1", showNotes && "bg-white/20")} onClick={() => setShowNotes((v) => !v)}>
            <FileText className="w-3.5 h-3.5" /> Notes
          </Button>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {timer.formatted}
          </div>
          <div className="w-px h-6 bg-white/20 mx-1" />
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onExit}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Present Mode Tab ─── */
export function PresentMode() {
  const { user } = useAuth();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [presenting, setPresenting] = useState(false);

  // Load user's decks
  const { data: decks = [], isLoading } = useQuery({
    queryKey: ["slide-decks-for-present"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as SlideDeck[];
    },
    enabled: !!user,
  });

  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  if (presenting && selectedDeck) {
    return (
      <FullscreenPresentation
        deck={selectedDeck}
        startIndex={0}
        onExit={() => setPresenting(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Presentation Mode</h3>
              <p className="text-xs text-muted-foreground">
                Select a deck and enter fullscreen presentation with speaker notes & timer
              </p>
            </div>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground text-sm py-8 text-center">Loading decks...</p>
          ) : decks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Layers className="w-10 h-10 text-muted-foreground/50 mx-auto" />
              <p className="text-muted-foreground text-sm">
                No slide decks yet. Create one in the Slide Library first.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {decks.map((deck) => {
                  const slides = Array.isArray(deck.slides_json) ? deck.slides_json : [];
                  const isSelected = deck.id === selectedDeckId;
                  return (
                    <button
                      key={deck.id}
                      onClick={() => setSelectedDeckId(deck.id)}
                      className={cn(
                        "text-left p-4 rounded-xl border-2 transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border/50 hover:border-border bg-card"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm text-foreground line-clamp-1">
                          {deck.title}
                        </h4>
                        {isSelected && (
                          <Badge variant="default" className="text-[10px] shrink-0">Selected</Badge>
                        )}
                      </div>
                      {deck.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {deck.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {slides.length} slide{slides.length !== 1 ? "s" : ""}
                        </Badge>
                        {deck.template_category && (
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {deck.template_category}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Present button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  disabled={!selectedDeck}
                  onClick={() => setPresenting(true)}
                  className="gap-2"
                >
                  <Play className="w-4 h-4" />
                  {selectedDeck
                    ? `Present "${selectedDeck.title}"`
                    : "Select a deck to present"}
                </Button>
              </div>

              {selectedDeck && (
                <p className="text-center text-xs text-muted-foreground mt-3">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">→</kbd> Next
                  {" · "}
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">←</kbd> Previous
                  {" · "}
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">N</kbd> Notes
                  {" · "}
                  <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Esc</kbd> Exit
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
