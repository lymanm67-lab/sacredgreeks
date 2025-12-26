import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, ChevronDown, History, Scroll } from "lucide-react";
import { symbolGuideContent } from "@/data/symbolGuideContent";

type OathTone = "amber" | "blue" | "emerald" | "muted";

function OathSection({
  title,
  content,
  tone,
  defaultOpen,
}: {
  title: string;
  content: string;
  tone: OathTone;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  const toneDef: Record<OathTone, { summary: string; icon: React.ReactNode; label?: string }> = {
    amber: {
      summary: "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40",
      icon: <History className="w-4 h-4" />,
    },
    blue: {
      summary: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/40",
      icon: <BookOpen className="w-4 h-4" />,
      label: "English Translation",
    },
    emerald: {
      summary: "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40",
      icon: <Scroll className="w-4 h-4" />,
    },
    muted: {
      summary: "bg-muted/50 hover:bg-muted border-border",
      icon: <Scroll className="w-4 h-4" />,
    },
  };

  return (
    <div className="space-y-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between",
          toneDef[tone].summary,
        )}
        aria-expanded={open}
      >
        <h4 className="font-semibold text-sm flex items-center gap-2 text-left">
          {toneDef[tone].icon}
          {toneDef[tone].label ?? title}
        </h4>
        <ChevronDown className={cn("w-4 h-4 transition-transform", open ? "rotate-180" : "")} />
      </button>

      {open && (
        <div className="bg-muted/40 p-3 rounded-b-lg border border-t-0">
          <p className={cn("text-sm text-foreground whitespace-pre-wrap", title.startsWith("ORIGINAL") ? "italic font-serif" : "")}>
            {content?.trim() ? content : "(No text found for this section)"}
          </p>
        </div>
      )}
    </div>
  );
}

function parseOathNote(note: string) {
  const headerRegex = /(ORIGINAL GREEK TEXT[^:]*:|ORIGINAL LATIN[^:]*:|ORIGINAL ENGLISH TRANSLATION:|MODERN[^:]*:|DECLARATION OF GENEVA[^:]*:|CONSTITUTIONAL TEXT[^:]*:|TRADITIONAL ADDITION[^:]*:|AFFIRMATION OPTION[^:]*:)/g;
  const headers = Array.from(note.matchAll(headerRegex));
  if (headers.length === 0) return [];

  return headers.map((h, i) => {
    const title = h[0].replace(/:$/, "");
    const start = (h.index ?? 0) + h[0].length;
    const end = i + 1 < headers.length ? (headers[i + 1].index ?? note.length) : note.length;
    const rawContent = note.slice(start, end).trim();
    const content = rawContent.replace(/^'+|'+$/g, "");

    const isOriginal = title.startsWith("ORIGINAL GREEK TEXT") || title.startsWith("ORIGINAL LATIN");
    const isEnglish = title.startsWith("ORIGINAL ENGLISH TRANSLATION");
    const isModern =
      title.startsWith("MODERN") ||
      title.startsWith("DECLARATION OF GENEVA") ||
      title.startsWith("CONSTITUTIONAL TEXT") ||
      title.startsWith("TRADITIONAL ADDITION") ||
      title.startsWith("AFFIRMATION OPTION");

    const tone: OathTone = isOriginal ? "amber" : isEnglish ? "blue" : isModern ? "emerald" : "muted";

    return {
      title,
      content,
      tone,
      defaultOpen: isModern,
    };
  });
}

export default function OathsGuide() {
  const [query, setQuery] = useState("");

  const oaths = useMemo(() => {
    return symbolGuideContent
      .filter((s) => s.category === "oaths")
      .filter((s) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.cautionNote ?? "").toLowerCase().includes(q)
        );
      });
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <Link to="/symbol-guide" aria-label="Back to Symbol & Ritual Guide">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">Oaths & Pledges Guide</h1>
            <p className="text-sm text-muted-foreground">Tap a section bar to reveal the text.</p>
          </div>
          <Badge variant="outline" className="ml-auto">{oaths.length} oaths</Badge>
        </div>
      </header>

      <section className="mb-6">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search oaths..." />
      </section>

      <section className="space-y-4">
        {oaths.map((oath) => {
          const sections = parseOathNote(oath.cautionNote ?? "");
          return (
            <article key={oath.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{oath.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{oath.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sections.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No expandable oath sections found.</p>
                  ) : (
                    sections.map((s, idx) => (
                      <OathSection
                        key={`${oath.id}-${idx}`}
                        title={s.title}
                        content={s.content}
                        tone={s.tone}
                        defaultOpen={s.defaultOpen}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </article>
          );
        })}
      </section>

      <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/oaths` : "/oaths"} />
    </main>
  );
}
