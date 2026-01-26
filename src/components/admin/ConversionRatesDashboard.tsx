import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, TrendingDown, Users, UserCheck, Target, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface SegmentConversion {
  segment: string;
  label: string;
  total: number;
  converted: number;
  rate: number;
  color: string;
}

const segmentLabels: Record<string, { label: string; color: string }> = {
  opened_no_click: { label: "Opened, Didn't Click", color: "#eab308" },
  clicked_no_convert: { label: "Clicked, Didn't Convert", color: "#f97316" },
  converted: { label: "Converted", color: "#22c55e" },
  inactive: { label: "Inactive", color: "#64748b" },
};

export const ConversionRatesDashboard = () => {
  const { data: conversionData, isLoading } = useQuery({
    queryKey: ["segment-conversion-rates"],
    queryFn: async (): Promise<SegmentConversion[]> => {
      // Get all lead segments
      const { data: segments, error } = await supabase
        .from("lead_segments")
        .select("segment_type, user_id");

      if (error) throw error;

      // Count by segment
      const segmentCounts: Record<string, { total: number; converted: number }> = {};
      
      for (const segment of segments || []) {
        const type = segment.segment_type;
        if (!segmentCounts[type]) {
          segmentCounts[type] = { total: 0, converted: 0 };
        }
        segmentCounts[type].total++;
        
        // If segment is 'converted', count as converted
        if (type === 'converted') {
          segmentCounts[type].converted++;
        }
      }

      // For non-converted segments, check if they later converted
      const nonConvertedSegments = segments?.filter(s => s.segment_type !== 'converted') || [];
      for (const segment of nonConvertedSegments) {
        if (segment.user_id) {
          // Check if this user later signed up (has a profile)
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", segment.user_id)
            .single();
          
          if (profile) {
            segmentCounts[segment.segment_type].converted++;
          }
        }
      }

      return Object.entries(segmentCounts).map(([segment, counts]) => ({
        segment,
        label: segmentLabels[segment]?.label || segment,
        total: counts.total,
        converted: counts.converted,
        rate: counts.total > 0 ? (counts.converted / counts.total) * 100 : 0,
        color: segmentLabels[segment]?.color || "#64748b",
      }));
    },
  });

  const { data: overallStats } = useQuery({
    queryKey: ["overall-conversion-stats"],
    queryFn: async () => {
      // Get total visitors from landing page
      const { count: totalVisits } = await supabase
        .from("landing_page_visits")
        .select("*", { count: "exact", head: true });

      // Get total conversions
      const { count: totalConversions } = await supabase
        .from("landing_page_conversions")
        .select("*", { count: "exact", head: true })
        .eq("conversion_type", "signup_started");

      // Get signups from lead segments
      const { count: signups } = await supabase
        .from("lead_segments")
        .select("*", { count: "exact", head: true })
        .eq("segment_type", "converted");

      const visits = totalVisits || 0;
      const conversions = totalConversions || 0;
      const registered = signups || 0;

      return {
        totalVisits: visits,
        totalConversions: conversions,
        totalSignups: registered,
        visitToConversion: visits > 0 ? (conversions / visits) * 100 : 0,
        conversionToSignup: conversions > 0 ? (registered / conversions) * 100 : 0,
        overallRate: visits > 0 ? (registered / visits) * 100 : 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const chartData = conversionData?.map(d => ({
    name: d.label,
    total: d.total,
    converted: d.converted,
    rate: d.rate,
  })) || [];

  const pieData = conversionData?.map(d => ({
    name: d.label,
    value: d.total,
    color: d.color,
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Conversion Rates by Segment</h2>
        <p className="text-muted-foreground">Track how different behavioral segments convert to signups</p>
      </div>

      {/* Funnel Overview */}
      {overallStats && (
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallStats.totalVisits.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallStats.totalConversions.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">CTA Clicks</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {overallStats.visitToConversion.toFixed(1)}% of visits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallStats.totalSignups.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Signups</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {overallStats.conversionToSignup.toFixed(1)}% of clicks
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallStats.overallRate.toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Overall Rate</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Visit → Signup
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Conversion Funnel Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold">{overallStats?.totalVisits.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Visits</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold">{overallStats?.totalConversions.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Clicks</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold">{overallStats?.totalSignups.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Signups</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Segment Performance</CardTitle>
            <CardDescription>Total leads and conversions by behavioral segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">Total: {data.total}</p>
                            <p className="text-sm text-muted-foreground">Converted: {data.converted}</p>
                            <p className="text-sm font-medium text-green-500">Rate: {data.rate.toFixed(1)}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--muted))" name="Total" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="converted" fill="hsl(var(--primary))" name="Converted" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
            <CardDescription>Breakdown of leads by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment Details */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {conversionData?.map((segment) => (
          <Card key={segment.segment} className="relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-1 h-full" 
              style={{ backgroundColor: segment.color }}
            />
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">{segment.label}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">{segment.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Converted</span>
                  <span className="font-medium">{segment.converted}</span>
                </div>
                <Progress 
                  value={segment.rate} 
                  className="h-2"
                  style={{ 
                    // @ts-ignore
                    '--progress-background': segment.color 
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Conversion Rate</span>
                  <Badge 
                    variant={segment.rate > 10 ? "default" : "secondary"}
                    style={{ backgroundColor: segment.rate > 10 ? segment.color : undefined }}
                  >
                    {segment.rate.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
