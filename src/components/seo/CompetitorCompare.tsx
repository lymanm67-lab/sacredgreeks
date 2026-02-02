import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Minus, Trophy, Sparkles } from "lucide-react";

interface CompetitorData {
  name: string;
  isUs?: boolean;
  greekFocus: boolean | "partial";
  faithFocus: boolean | "partial";
  bgloSpecific: boolean | "partial";
  freeModel: boolean | "partial";
  proofFramework: boolean;
  aiTools: boolean;
  antiHazing: boolean;
}

const competitors: CompetitorData[] = [
  {
    name: "Sacred Greeks",
    isUs: true,
    greekFocus: true,
    faithFocus: true,
    bgloSpecific: true,
    freeModel: true,
    proofFramework: true,
    aiTools: true,
    antiHazing: true,
  },
  {
    name: "Greek IV Lead",
    greekFocus: true,
    faithFocus: true,
    bgloSpecific: false,
    freeModel: true,
    proofFramework: false,
    aiTools: false,
    antiHazing: false,
  },
  {
    name: "OmegaFi",
    greekFocus: true,
    faithFocus: false,
    bgloSpecific: false,
    freeModel: false,
    proofFramework: false,
    aiTools: false,
    antiHazing: false,
  },
  {
    name: "Black Greeks",
    greekFocus: true,
    faithFocus: false,
    bgloSpecific: true,
    freeModel: true,
    proofFramework: false,
    aiTools: false,
    antiHazing: false,
  },
  {
    name: "Glorify",
    greekFocus: false,
    faithFocus: true,
    bgloSpecific: false,
    freeModel: false,
    proofFramework: false,
    aiTools: false,
    antiHazing: false,
  },
];

const features = [
  { key: "greekFocus", label: "Greek Life Focus" },
  { key: "faithFocus", label: "Faith Resources" },
  { key: "bgloSpecific", label: "BGLO/D9 Content" },
  { key: "freeModel", label: "100% Free" },
  { key: "proofFramework", label: "P.R.O.O.F. Framework" },
  { key: "aiTools", label: "AI Tools" },
  { key: "antiHazing", label: "Anti-Hazing Resources" },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
        <Check className="w-4 h-4 text-green-500" />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
        <Minus className="w-4 h-4 text-amber-500" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
      <X className="w-4 h-4 text-red-400/60" />
    </div>
  );
}

interface CompetitorCompareProps {
  compact?: boolean;
  showTitle?: boolean;
}

export function CompetitorCompare({ compact = false, showTitle = true }: CompetitorCompareProps) {
  const displayedCompetitors = compact ? competitors.slice(0, 3) : competitors;
  const displayedFeatures = compact ? features.slice(0, 5) : features;

  return (
    <Card className="overflow-hidden border-border/50">
      {showTitle && (
        <div className="bg-muted/50 p-4 border-b border-border">
          <div className="flex items-center gap-2 justify-center">
            <Trophy className="w-5 h-5 text-sacred" />
            <h3 className="font-semibold text-foreground">Why We're Different</h3>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-1">
            The <span className="text-sacred font-medium">only app</span> combining faith + Greek life
          </p>
        </div>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-muted-foreground">Feature</th>
                {displayedCompetitors.map((comp) => (
                  <th
                    key={comp.name}
                    className={`p-3 text-center min-w-[80px] ${
                      comp.isUs ? "bg-sacred/5" : ""
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        comp.isUs ? "text-sacred" : "text-muted-foreground"
                      }`}
                    >
                      {comp.name}
                    </span>
                    {comp.isUs && (
                      <div className="text-[10px] text-sacred/70 mt-0.5">★ US</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedFeatures.map((feature, index) => (
                <tr
                  key={feature.key}
                  className={`border-b border-border/50 ${
                    index % 2 === 0 ? "bg-muted/20" : ""
                  }`}
                >
                  <td className="p-3 text-foreground">{feature.label}</td>
                  {displayedCompetitors.map((comp) => (
                    <td
                      key={`${comp.name}-${feature.key}`}
                      className={`p-3 ${comp.isUs ? "bg-sacred/5" : ""}`}
                    >
                      <div className="flex justify-center">
                        <StatusIcon value={comp[feature.key as keyof CompetitorData] as boolean} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function CompetitorHighlight() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sacred/10 border border-sacred/20">
        <Sparkles className="w-4 h-4 text-sacred" />
        <span className="text-sm text-sacred font-medium">6 Unique Features</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
        <Check className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-600 dark:text-green-400 font-medium">100% Free</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
        <Trophy className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Zero Direct Competitors</span>
      </div>
    </div>
  );
}
