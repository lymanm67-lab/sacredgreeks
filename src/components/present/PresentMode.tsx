import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Monitor, Play, ChevronLeft, ChevronRight, X, Maximize,
  FileText, Clock, Layers, Globe, Copy, Check, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { SlideData } from "./slideTypes";

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
  const hasImage = !!slide.image_url;

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <div
        className="absolute slide-content bg-background"
        style={{
          width: 1920, height: 1080,
          left: "50%", top: "50%", marginLeft: -960, marginTop: -540,
          transform: `scale(${scale})`, transformOrigin: "center center",
        }}
      >
        {hasImage && (
          <div className="absolute inset-0">
            <img
              src={slide.image_url}
              alt=""
              className="w-full h-full"
              style={{ objectFit: slide.image_fit === "stretch" ? "fill" : (slide.image_fit || "cover") }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        {slide.layout === "title" ? (
          <div className={cn("flex flex-col items-center justify-center h-full px-40 text-center relative z-10")}>
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

/* ─── Page Share Broadcaster ─── */
function PageShareBroadcaster() {
  const { user } = useAuth();
  const location = useLocation();
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const startPageShare = () => {
    const code = crypto.randomUUID().slice(0, 8);
    setSessionCode(code);
  };

  // Set up broadcast channel and sync location
  useEffect(() => {
    if (!sessionCode) return;
    const channel = supabase.channel(`page-share:${sessionCode}`);
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({ type: "broadcast", event: "page-change", payload: { path: location.pathname + location.search } });
      }
    });
    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); channelRef.current = null; };
  }, [sessionCode]);

  // Broadcast route changes
  useEffect(() => {
    if (!sessionCode || !channelRef.current) return;
    channelRef.current.send({ type: "broadcast", event: "page-change", payload: { path: location.pathname + location.search } });
  }, [location.pathname, location.search, sessionCode]);

  const handleCopy = () => {
    if (!sessionCode) return;
    navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Share App Pages</h3>
            <p className="text-xs text-muted-foreground">
              Broadcast your current page to audience devices in real-time
            </p>
          </div>
        </div>

        {sessionCode ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Share2 className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-foreground">Session active — navigating the app broadcasts your page to viewers.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Share Code:</span>
              <code className="px-2 py-1 rounded bg-muted text-sm font-mono text-foreground">{sessionCode}</code>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Audience joins via Live Preview → "Join Page Share" with this code.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSessionCode(null)}>
              Stop Sharing
            </Button>
          </div>
        ) : (
          <Button onClick={startPageShare} className="gap-2">
            <Globe className="w-4 h-4" />
            Start Page Share Session
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Present Mode Tab ─── */
export function PresentMode() {
  const { user } = useAuth();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [presenting, setPresenting] = useState(false);

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

      {/* Page Share section */}
      <PageShareBroadcaster />
    </div>
  );
}
