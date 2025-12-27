import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, Check, ChevronDown, History, Scale, Scroll } from "lucide-react";
import { symbolGuideContent } from "@/data/symbolGuideContent";

type OathTone = "amber" | "blue" | "emerald" | "muted";

interface ComparisonRow {
  element: string;
  professional: string;
  greek: string;
  accepted: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    element: "Divine/Sacred Witness",
    professional: "\"So help me God\" (courtroom, military)",
    greek: "Invocation of organizational values or principles",
    accepted: true,
  },
  {
    element: "Binding Commitment",
    professional: "\"I solemnly swear\" (attorneys, physicians)",
    greek: "\"I pledge my loyalty and commitment\"",
    accepted: true,
  },
  {
    element: "Confidentiality Clause",
    professional: "Attorney-client privilege, HIPAA",
    greek: "Protection of organizational traditions",
    accepted: true,
  },
  {
    element: "Mutual Aid Promise",
    professional: "\"Support fellow officers\" (police oath)",
    greek: "\"Support my brothers/sisters in need\"",
    accepted: true,
  },
  {
    element: "Ethical Standards",
    professional: "\"First, do no harm\" (Hippocratic)",
    greek: "Commitment to scholarship, service, character",
    accepted: true,
  },
  {
    element: "Lifelong Obligation",
    professional: "\"Till death do us part\" (marriage)",
    greek: "\"Bond that lasts a lifetime\"",
    accepted: true,
  },
  {
    element: "Sacred Objects",
    professional: "Hand on Bible (courtroom oath)",
    greek: "Organizational symbols or regalia",
    accepted: true,
  },
  {
    element: "Penalties for Violation",
    professional: "Disbarment, court martial, excommunication",
    greek: "Expulsion from organization",
    accepted: true,
  },
];

function OathComparisonChart() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Oath Structure Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">
                Professional oaths vs. Greek organization oaths — same structure, different treatment
              </p>
            </div>
          </div>
          <ChevronDown className={cn("w-5 h-5 transition-transform", expanded ? "rotate-180" : "")} />
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Oath Element</th>
                  <th className="text-left py-3 px-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    Professional Oaths
                    <span className="block text-xs font-normal text-muted-foreground">Accepted by Christians</span>
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-amber-600 dark:text-amber-400">
                    Greek Org Oaths
                    <span className="block text-xs font-normal text-muted-foreground">Often criticized</span>
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-muted-foreground w-20">Same?</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={cn("border-b border-border/50", idx % 2 === 0 ? "bg-muted/20" : "")}>
                    <td className="py-3 px-2 font-medium">{row.element}</td>
                    <td className="py-3 px-2 text-emerald-700 dark:text-emerald-300">{row.professional}</td>
                    <td className="py-3 px-2 text-amber-700 dark:text-amber-300">{row.greek}</td>
                    <td className="py-3 px-2 text-center">
                      {row.accepted && (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              The Double Standard Revealed
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every structural element found in Greek organization oaths exists identically in professional oaths 
              that Christians take without hesitation. The difference is not in the oath structure—it is in 
              selective application of criticism. If oath-taking with binding commitments, confidentiality clauses, 
              and sacred witnesses were inherently sinful, then every attorney, physician, soldier, and married 
              person would be in violation. The key question is always: <span className="text-foreground font-medium">Does the specific content 
              contradict Scripture?</span>—not whether the form resembles ancient traditions.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

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
  const headerRegex = /(ORIGINAL GREEK TEXT[^:]*:|ORIGINAL LATIN[^:]*:|ORIGINAL ENGLISH TRANSLATION:|MODERN[^:]*:|DECLARATION OF GENEVA[^:]*:|CONSTITUTIONAL TEXT[^:]*:|TRADITIONAL ADDITION[^:]*:|AFFIRMATION OPTION[^:]*:|ANCIENT ROMAN[^:]*:|ANCIENT HEBREW[^:]*:|ANCIENT BABYLONIAN[^:]*:|ANCIENT EGYPTIAN[^:]*:|NORSE RING OATH[^:]*:|CHRISTIANIZED BIBLE OATH[^:]*:|METHODIST WATCHNIGHT[^:]*:|CONTEMPORARY[^:]*:|EXAMPLE FRATERNITY[^:]*:|COMPARISON TO[^:]*:)/g;
  const headers = Array.from(note.matchAll(headerRegex));
  if (headers.length === 0) return [];

  return headers.map((h, i) => {
    const title = h[0].replace(/:$/, "");
    const start = (h.index ?? 0) + h[0].length;
    const end = i + 1 < headers.length ? (headers[i + 1].index ?? note.length) : note.length;
    const rawContent = note.slice(start, end).trim();
    const content = rawContent.replace(/^'+|'+$/g, "");

    const isOriginal = title.startsWith("ORIGINAL GREEK TEXT") || title.startsWith("ORIGINAL LATIN") || title.startsWith("NORSE RING OATH") || title.startsWith("ANCIENT");
    const isEnglish = title.startsWith("ORIGINAL ENGLISH TRANSLATION") || title.startsWith("CHRISTIANIZED");
    const isModern =
      title.startsWith("MODERN") ||
      title.startsWith("DECLARATION OF GENEVA") ||
      title.startsWith("CONSTITUTIONAL TEXT") ||
      title.startsWith("TRADITIONAL ADDITION") ||
      title.startsWith("AFFIRMATION OPTION") ||
      title.startsWith("METHODIST") ||
      title.startsWith("CONTEMPORARY") ||
      title.startsWith("EXAMPLE FRATERNITY") ||
      title.startsWith("COMPARISON TO");

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
          <Link to="/symbol-guide" aria-label="Back to Symbols and Rituals Guide">
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

      <OathComparisonChart />

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