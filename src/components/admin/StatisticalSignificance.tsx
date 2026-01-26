import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  BarChart3,
  Target,
  Trophy
} from "lucide-react";
import { 
  calculateSignificance, 
  findOverallWinner,
  type ABTestResult,
  type SignificanceResult 
} from "@/lib/statistical-significance";

interface VariantData {
  name: string;
  key: string;
  visitors: number;
  conversions: number;
  isControl: boolean;
}

interface StatisticalSignificanceProps {
  variants: VariantData[];
  testName?: string;
}

const SignificanceCard = ({ 
  variant, 
  control, 
  significance 
}: { 
  variant: VariantData; 
  control: VariantData;
  significance: SignificanceResult;
}) => {
  const conversionRate = variant.visitors > 0 
    ? (variant.conversions / variant.visitors * 100).toFixed(2) 
    : "0.00";

  return (
    <Card className={`border-2 ${
      significance.isSignificant && significance.relativeImprovement > 0
        ? "border-green-500/50 bg-green-500/5"
        : significance.isSignificant && significance.relativeImprovement < 0
          ? "border-red-500/50 bg-red-500/5"
          : "border-slate-700"
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{variant.name}</CardTitle>
            {variant.isControl && (
              <Badge variant="outline" className="text-xs">Control</Badge>
            )}
          </div>
          {significance.isSignificant && (
            significance.relativeImprovement > 0 ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                Winner
              </Badge>
            ) : (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <TrendingDown className="w-3 h-3 mr-1" />
                Underperforming
              </Badge>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Visitors</p>
            <p className="text-lg font-semibold">{variant.visitors.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversions</p>
            <p className="text-lg font-semibold">{variant.conversions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Rate</p>
            <p className="text-lg font-semibold">{conversionRate}%</p>
          </div>
        </div>

        {!variant.isControl && (
          <>
            {/* Relative Improvement */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">vs Control</span>
              <span className={`font-semibold ${
                significance.relativeImprovement > 0 ? "text-green-500" : 
                significance.relativeImprovement < 0 ? "text-red-500" : ""
              }`}>
                {significance.relativeImprovement > 0 ? "+" : ""}
                {significance.relativeImprovement.toFixed(1)}%
              </span>
            </div>

            {/* Confidence Level */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Confidence Level</span>
                <span className="text-xs font-medium">
                  {(significance.confidenceLevel * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={significance.confidenceLevel * 100} 
                className={`h-2 ${
                  significance.confidenceLevel >= 0.95 ? "[&>div]:bg-green-500" :
                  significance.confidenceLevel >= 0.80 ? "[&>div]:bg-yellow-500" :
                  "[&>div]:bg-slate-500"
                }`}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">0%</span>
                <span className="text-xs text-slate-500">95% threshold</span>
                <span className="text-xs text-slate-500">100%</span>
              </div>
            </div>

            {/* Statistical Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">Z-Score: </span>
                <span className="font-mono">{significance.zScore.toFixed(3)}</span>
              </div>
              <div className="p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">P-Value: </span>
                <span className="font-mono">{significance.pValue.toFixed(4)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const StatisticalSignificance = ({ variants, testName = "A/B Test" }: StatisticalSignificanceProps) => {
  const analysis = useMemo(() => {
    const control = variants.find(v => v.isControl);
    if (!control) return null;

    const controlResult: ABTestResult = {
      variantName: control.name,
      visitors: control.visitors,
      conversions: control.conversions,
      conversionRate: control.visitors > 0 ? control.conversions / control.visitors : 0,
    };

    const variantResults: ABTestResult[] = variants
      .filter(v => !v.isControl)
      .map(v => ({
        variantName: v.name,
        visitors: v.visitors,
        conversions: v.conversions,
        conversionRate: v.visitors > 0 ? v.conversions / v.visitors : 0,
      }));

    const significanceResults = new Map<string, SignificanceResult>();
    for (const variant of variantResults) {
      significanceResults.set(variant.variantName, calculateSignificance(controlResult, variant));
    }

    const { winner, significance: winnerSignificance } = findOverallWinner(controlResult, variantResults);

    // Calculate overall progress
    const totalVisitors = variants.reduce((sum, v) => sum + v.visitors, 0);
    const baselineRate = controlResult.conversionRate || 0.05;
    const minSampleNeeded = significanceResults.values().next().value?.sampleSizeNeeded || 2000;
    const progress = Math.min(100, (totalVisitors / minSampleNeeded) * 100);

    return {
      control,
      controlResult,
      significanceResults,
      winner,
      winnerSignificance,
      totalVisitors,
      minSampleNeeded,
      progress,
    };
  }, [variants]);

  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No control variant found. Please designate a control for A/B testing.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle>{testName} - Statistical Analysis</CardTitle>
          </div>
          <CardDescription>
            Comparing {variants.length} variants with {analysis.totalVisitors.toLocaleString()} total visitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress to Significance */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Target className="w-4 h-4" />
                Progress to Statistical Significance
              </span>
              <span className="text-sm font-medium">{analysis.progress.toFixed(0)}%</span>
            </div>
            <Progress value={analysis.progress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              {analysis.totalVisitors.toLocaleString()} / {analysis.minSampleNeeded.toLocaleString()} visitors needed
            </p>
          </div>

          {/* Winner Announcement */}
          {analysis.winner && analysis.winnerSignificance?.isSignificant ? (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-500">Winner Found!</span>
              </div>
              <p className="text-sm">{analysis.winnerSignificance.recommendedAction}</p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-500">Test In Progress</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {analysis.significanceResults.values().next().value?.recommendedAction || 
                  "Continue collecting data to reach statistical significance."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Variant Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((variant) => {
          const significance = variant.isControl 
            ? {
                isSignificant: false,
                confidenceLevel: 1,
                zScore: 0,
                pValue: 1,
                relativeImprovement: 0,
                winner: null,
                recommendedAction: "Control baseline",
                sampleSizeNeeded: 0,
                currentSampleSize: variant.visitors,
                progressToSignificance: 100,
              }
            : analysis.significanceResults.get(variant.name)!;
          
          return (
            <SignificanceCard
              key={variant.key}
              variant={variant}
              control={analysis.control}
              significance={significance}
            />
          );
        })}
      </div>

      {/* Methodology Note */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <p className="text-xs text-muted-foreground">
            <strong>Methodology:</strong> Uses two-proportion Z-test with 95% confidence threshold. 
            Sample size calculations assume 20% minimum detectable effect and 80% statistical power.
            Results become statistically significant when confidence level exceeds 95%.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
