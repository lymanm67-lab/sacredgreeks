import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Radio, Wifi, WifiOff, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
}

/* ─── Scaled Slide (audience view) ─── */
function ScaledSlide({
  slide, width, height, index, total,
}: {
  slide: SlideData; width: number; height: number; index: number; total: number;
}) {
  const scale = Math.min(width / 1920, height / 1080);
  return (
    <div className="relative overflow-hidden rounded-xl" style={{ width, height }}>
      <div
        className="absolute slide-content bg-background"
        style={{
          width: 1920, height: 1080,
          left: "50%", top: "50%", marginLeft: -960, marginTop: -540,
          transform: `scale(${scale})`, transformOrigin: "center center",
        }}
      >
        {slide.layout === "title" ? (
          <div className="flex flex-col items-center justify-center h-full px-40 text-center">
            <h1 className="text-7xl font-bold text-foreground mb-8">{slide.title || "Untitled"}</h1>
            <p className="text-3xl text-muted-foreground whitespace-pre-wrap">{slide.content}</p>
          </div>
        ) : slide.layout === "two-column" ? (
          <div className="flex flex-col h-full p-20">
            <h2 className="text-5xl font-bold text-foreground mb-12">{slide.title || "Untitled"}</h2>
            <div className="flex-1 grid grid-cols-2 gap-16">
              <div className="text-2xl text-foreground/80 whitespace-pre-wrap">{slide.content}</div>
              <div className="text-2xl text-foreground/80 whitespace-pre-wrap" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-20">
            <h2 className="text-5xl font-bold text-foreground mb-12">{slide.title || "Untitled"}</h2>
            <p className="text-2xl text-foreground/80 whitespace-pre-wrap flex-1">{slide.content}</p>
          </div>
        )}
        <div className="absolute bottom-6 right-10 text-lg text-muted-foreground/50">
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}

/* ─── Audience Slide View ─── */
function AudienceSlideView({ deckId }: { deckId: string }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [connected, setConnected] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: deck } = useQuery({
    queryKey: ["live-preview-deck", deckId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks").select("*").eq("id", deckId).single();
      if (error) throw error;
      return data as unknown as SlideDeck;
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const channel = supabase.channel(`present:${deckId}`);
    channel
      .on("broadcast", { event: "slide-change" }, (payload) => {
        if (typeof payload.payload?.index === "number") setSlideIndex(payload.payload.index);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));
    return () => { supabase.removeChannel(channel); };
  }, [deckId]);

  const slides = deck ? (Array.isArray(deck.slides_json) ? deck.slides_json : []) : [];
  const slide = slides[slideIndex];
  const fitW = Math.min(size.w, size.h * (16 / 9));
  const fitH = Math.min(size.h, size.w * (9 / 16));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{deck?.title || "Loading..."}</h3>
          <Badge variant={connected ? "default" : "secondary"} className="gap-1 text-[10px]">
            {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {connected ? "Live" : "Connecting..."}
          </Badge>
        </div>
        {slides.length > 0 && (
          <span className="text-xs text-muted-foreground">Slide {slideIndex + 1} of {slides.length}</span>
        )}
      </div>
      <div
        ref={containerRef}
        className="w-full bg-muted/30 rounded-xl flex items-center justify-center border-2 border-border/50"
        style={{ aspectRatio: "16/9", minHeight: 300 }}
      >
        {slide && size.w > 0 ? (
          <ScaledSlide slide={slide} width={fitW} height={fitH} index={slideIndex} total={slides.length} />
        ) : (
          <div className="text-center space-y-2 p-8">
            <Radio className="w-8 h-8 text-muted-foreground/50 mx-auto animate-pulse" />
            <p className="text-sm text-muted-foreground">Waiting for presenter to start...</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Audience Page View (iframe synced to presenter's route) ─── */
function AudiencePageView({ sessionCode }: { sessionCode: string }) {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = supabase.channel(`page-share:${sessionCode}`);
    channel
      .on("broadcast", { event: "page-change" }, (payload) => {
        if (typeof payload.payload?.path === "string") setCurrentPath(payload.payload.path);
      })
      .subscribe((status) => setConnected(status === "SUBSCRIBED"));
    return () => { supabase.removeChannel(channel); };
  }, [sessionCode]);

  const iframeSrc = currentPath ? `${window.location.origin}${currentPath}` : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Page Share Session</h3>
          <Badge variant={connected ? "default" : "secondary"} className="gap-1 text-[10px]">
            {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {connected ? "Live" : "Connecting..."}
          </Badge>
        </div>
        {currentPath && (
          <Badge variant="outline" className="text-[10px] font-mono">{currentPath}</Badge>
        )}
      </div>
      <div
        className="w-full bg-muted/30 rounded-xl overflow-hidden border-2 border-border/50"
        style={{ aspectRatio: "16/9", minHeight: 400 }}
      >
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            className="w-full h-full rounded-xl border-0"
            title="Shared page view"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2 p-8">
              <Globe className="w-8 h-8 text-muted-foreground/50 mx-auto animate-pulse" />
              <p className="text-sm text-muted-foreground">Waiting for presenter to share a page...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Live Preview Tab ─── */
export function LivePreview() {
  const [joinCode, setJoinCode] = useState("");
  const [activeSession, setActiveSession] = useState<{ type: "slides" | "pages"; code: string } | null>(null);

  if (activeSession) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {activeSession.type === "slides" ? (
                <Eye className="w-5 h-5 text-emerald-500" />
              ) : (
                <Globe className="w-5 h-5 text-primary" />
              )}
              <span className="text-sm font-medium text-foreground">
                {activeSession.type === "slides" ? "Slide Audience View" : "Page Share View"}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveSession(null)}>
              Leave
            </Button>
          </div>
          {activeSession.type === "slides" ? (
            <AudienceSlideView deckId={activeSession.code} />
          ) : (
            <AudiencePageView sessionCode={activeSession.code} />
          )}
        </CardContent>
      </Card>
    );
  }

  const handleJoin = (type: "slides" | "pages" = "slides") => {
    const code = joinCode.trim();
    if (!code) return;
    setActiveSession({ type, code });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            <p className="text-xs text-muted-foreground">
              Follow along with a live presentation or page walkthrough on your own device
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Join a Session</label>
            <p className="text-xs text-muted-foreground">
              Enter the share code provided by the presenter to sync in real-time.
            </p>
            <Input
              placeholder="Paste share code..."
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin("slides")}
            />
            <div className="flex gap-2">
              <Button onClick={() => handleJoin("slides")} disabled={!joinCode.trim()} className="gap-1.5 flex-1">
                <Layers className="w-4 h-4" />
                Join Slides
              </Button>
              <Button onClick={() => handleJoin("pages")} disabled={!joinCode.trim()} variant="outline" className="gap-1.5 flex-1">
                <Globe className="w-4 h-4" />
                Join Page Share
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">How it works</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600 shrink-0 mt-0.5">1</div>
              <div>
                <p className="text-sm font-medium text-foreground">Presenter starts a session</p>
                <p className="text-xs text-muted-foreground">Share code is generated for slides or page sharing</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600 shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-sm font-medium text-foreground">Audience joins with the code</p>
                <p className="text-xs text-muted-foreground">Choose "Join Slides" or "Join Page Share" based on session type</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600 shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-sm font-medium text-foreground">Content syncs in real-time</p>
                <p className="text-xs text-muted-foreground">Slides advance or pages change as the presenter navigates</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
