import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, FileText, Newspaper, Search, Crown, CheckCircle, XCircle, Clock, TrendingUp, Users, BarChart3, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfWeek, subWeeks, isAfter, isBefore, addWeeks } from "date-fns";
import { useState } from "react";

interface MarketingRun {
  id: string;
  run_date: string;
  status: string;
  topic: string | null;
  email_sent_count: number | null;
  email_campaign_subject: string | null;
  social_linkedin: string | null;
  social_twitter: string | null;
  social_facebook: string | null;
  blog_draft_id: string | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  run_metadata: Record<string, unknown> | null;
}

// Agent definitions mapped to what the marketing agent produces
const agents = [
  { key: "blake", name: "Blake", role: "Blog Specialist", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "mara", name: "Mara", role: "Marketing Specialist", icon: Mail, color: "text-pink-500", bg: "bg-pink-500/10" },
  { key: "preston", name: "Preston", role: "PR Specialist", icon: Newspaper, color: "text-blue-500", bg: "bg-blue-500/10" },
  { key: "sierra", name: "Sierra", role: "SEO Specialist", icon: Search, color: "text-amber-500", bg: "bg-amber-500/10" },
];

function getWeekLabel(weekStart: Date): string {
  const weekEnd = addWeeks(weekStart, 1);
  return `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;
}

function groupRunsByWeek(runs: MarketingRun[]): { weekStart: Date; label: string; runs: MarketingRun[] }[] {
  const now = new Date();
  const weeks: { weekStart: Date; label: string; runs: MarketingRun[] }[] = [];

  for (let i = 0; i < 8; i++) {
    const ws = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 }); // Monday
    const we = addWeeks(ws, 1);
    const weekRuns = runs.filter((r) => {
      const d = new Date(r.created_at);
      return !isBefore(d, ws) && isBefore(d, we);
    });
    weeks.push({ weekStart: ws, label: getWeekLabel(ws), runs: weekRuns });
  }

  return weeks;
}

function AgentStatus({ run, agentKey }: { run: MarketingRun; agentKey: string }) {
  if (run.status === "failed") {
    return <XCircle className="w-4 h-4 text-destructive" />;
  }
  if (run.status === "running") {
    return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
  }

  // Determine per-agent completion
  switch (agentKey) {
    case "blake":
      return run.blog_draft_id ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />;
    case "mara":
      return (run.email_sent_count ?? 0) > 0 ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />;
    case "preston":
      return run.social_linkedin || run.social_twitter || run.social_facebook
        ? <CheckCircle className="w-4 h-4 text-green-500" />
        : <Clock className="w-4 h-4 text-muted-foreground" />;
    case "sierra":
      // Sierra's work is embedded in the blog SEO — mark complete if blog was created
      return run.blog_draft_id ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
}

function WeekCard({ week }: { week: { weekStart: Date; label: string; runs: MarketingRun[] } }) {
  const [expanded, setExpanded] = useState(false);
  const completed = week.runs.filter((r) => r.status === "completed").length;
  const failed = week.runs.filter((r) => r.status === "failed").length;
  const totalEmails = week.runs.reduce((sum, r) => sum + (r.email_sent_count ?? 0), 0);
  const topics = week.runs.filter((r) => r.topic).map((r) => r.topic!);
  const hasRuns = week.runs.length > 0;

  return (
    <Card className={`transition-all ${hasRuns ? "border-border" : "border-border/50 opacity-60"}`}>
      <button
        className="w-full text-left"
        onClick={() => hasRuns && setExpanded(!expanded)}
        disabled={!hasRuns}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">{week.label}</CardTitle>
              {hasRuns ? (
                <CardDescription className="mt-0.5">
                  {completed} completed · {totalEmails} emails · {failed > 0 ? `${failed} failed` : "no failures"}
                </CardDescription>
              ) : (
                <CardDescription className="mt-0.5 italic">No runs this week</CardDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasRuns && (
                <>
                  <Badge variant="outline" className={completed > 0 ? "border-green-500/40 text-green-600 dark:text-green-400" : "border-muted"}>
                    {completed}/{week.runs.length}
                  </Badge>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0 space-y-4">
              {/* Agent Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {agents.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <div key={agent.key} className={`rounded-xl p-3 ${agent.bg} flex flex-col gap-2`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-4 h-4 ${agent.color}`} />
                          <span className="text-sm font-medium">{agent.name}</span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          {week.runs.map((run) => (
                            <AgentStatus key={run.id} run={run} agentKey={agent.key} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-muted-foreground">{agent.role}</span>
                    </div>
                  );
                })}
              </div>

              {/* Run Details */}
              {week.runs.map((run) => (
                <div key={run.id} className="rounded-lg border bg-muted/20 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={run.status === "completed" ? "bg-green-500/20 text-green-600" : run.status === "failed" ? "bg-red-500/20 text-red-600" : "bg-blue-500/20 text-blue-600"}>
                        {run.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(run.created_at), "EEE, MMM d 'at' h:mm a")}
                      </span>
                    </div>
                    {(run.email_sent_count ?? 0) > 0 && (
                      <span className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-3 h-3" /> {run.email_sent_count} sent
                      </span>
                    )}
                  </div>
                  {run.topic && (
                    <p className="text-sm font-medium">{run.topic}</p>
                  )}
                  {run.error_message && (
                    <p className="text-xs text-destructive">{run.error_message}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function TeamReport() {
  const { data: runs, isLoading } = useQuery({
    queryKey: ["team-report-runs"],
    queryFn: async () => {
      const eightWeeksAgo = subWeeks(new Date(), 8);
      const { data, error } = await supabase
        .from("marketing_runs")
        .select("*")
        .gte("created_at", eightWeeksAgo.toISOString())
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as MarketingRun[];
    },
  });

  const weeks = groupRunsByWeek(runs ?? []);
  const totalRuns = runs?.length ?? 0;
  const completedRuns = runs?.filter((r) => r.status === "completed").length ?? 0;
  const totalEmails = runs?.reduce((s, r) => s + (r.email_sent_count ?? 0), 0) ?? 0;
  const successRate = totalRuns > 0 ? Math.round((completedRuns / totalRuns) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-sacred" />
          Weekly Team Report
        </h1>
        <p className="text-muted-foreground mt-1">
          Last 8 weeks of automated marketing activity. Reports populate every Monday as agents run.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{totalRuns}</p>
            <p className="text-xs text-muted-foreground">Total Runs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{totalEmails}</p>
            <p className="text-xs text-muted-foreground">Emails Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{completedRuns}</p>
            <p className="text-xs text-muted-foreground">Posts Published</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Roster */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4" /> Active Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-sacred/10">
              <Crown className="w-4 h-4 text-sacred" />
              <div>
                <p className="text-sm font-medium">Dr. Lyman</p>
                <p className="text-[11px] text-muted-foreground">Founder</p>
              </div>
            </div>
            {agents.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.key} className={`flex items-center gap-2 p-2 rounded-lg ${a.bg}`}>
                  <Icon className={`w-4 h-4 ${a.color}`} />
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-[11px] text-muted-foreground">{a.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-3">
          {weeks.map((week, i) => (
            <motion.div
              key={week.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <WeekCard week={week} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
