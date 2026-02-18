import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Radio, Wifi, WifiOff, Users, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

/* ─── Scaled Slide (audience view – no notes) ─── */
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
    <div className="relative overflow-hidden rounded-xl" style={{ width, height }}>
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
              <div className="text-2xl text-foreground/80 whitespace-pre-wrap" />
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

/* ─── Audience Live View ─── */
function AudienceView({ deckId }: { deckId: string }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [connected, setConnected] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load deck
  const { data: deck } = useQuery({
    queryKey: ["live-preview-deck", deckId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks")
        .select("*")
        .eq("id", deckId)
        .single();
      if (error) throw error;
      return data as unknown as SlideDeck;
    },
  });

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Subscribe to presenter broadcast
  useEffect(() => {
    const channel = supabase.channel(`present:${deckId}`);
    channel
      .on("broadcast", { event: "slide-change" }, (payload) => {
        if (typeof payload.payload?.index === "number") {
          setSlideIndex(payload.payload.index);
        }
      })
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deckId]);

  const slides = deck ? (Array.isArray(deck.slides_json) ? deck.slides_json : []) : [];
  const slide = slides[slideIndex];

  const fitW = Math.min(size.w, size.h * (16 / 9));
  const fitH = Math.min(size.h, size.w * (9 / 16));

  return (
    <div className="space-y-4">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{deck?.title || "Loading..."}</h3>
          <Badge variant={connected ? "default" : "secondary"} className="gap-1 text-[10px]">
            {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {connected ? "Live" : "Connecting..."}
          </Badge>
        </div>
        {slides.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Slide {slideIndex + 1} of {slides.length}
          </span>
        )}
      </div>

      {/* Slide display */}
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
            <p className="text-sm text-muted-foreground">
              Waiting for presenter to start...
            </p>
          </div>
        )}
      </div>

      {!connected && (
        <p className="text-xs text-muted-foreground text-center">
          This view auto-syncs when the presenter begins. No action needed.
        </p>
      )}
    </div>
  );
}

/* ─── Live Preview Tab ─── */
export function LivePreview() {
  const [joinCode, setJoinCode] = useState("");
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // If already viewing
  if (activeDeckId) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-foreground">Audience View</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveDeckId(null)}>
              Leave
            </Button>
          </div>
          <AudienceView deckId={activeDeckId} />
        </CardContent>
      </Card>
    );
  }

  const handleJoin = () => {
    const code = joinCode.trim();
    if (!code) return;
    // The share code is the deck ID (simplified approach)
    setActiveDeckId(code);
  };

  const copyShareUrl = (deckId: string) => {
    const url = `${window.location.origin}/present?tab=preview&code=${deckId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Share link copied!");
    setTimeout(() => setCopied(false), 2000);
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
              Follow along with a live presentation on your own device
            </p>
          </div>
        </div>

        {/* Join section */}
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Join a Presentation</label>
            <p className="text-xs text-muted-foreground">
              Enter the share code provided by the presenter to sync with their slides in real-time.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Paste share code or link..."
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
              <Button onClick={handleJoin} disabled={!joinCode.trim()} className="gap-1.5 shrink-0">
                <Users className="w-4 h-4" />
                Join
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
                <p className="text-xs text-muted-foreground">When presenting, a share code is generated automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600 shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-sm font-medium text-foreground">Audience joins with the code</p>
                <p className="text-xs text-muted-foreground">Paste the code above to connect</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-600 shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-sm font-medium text-foreground">Slides sync in real-time</p>
                <p className="text-xs text-muted-foreground">As the presenter advances slides, your view updates instantly</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
