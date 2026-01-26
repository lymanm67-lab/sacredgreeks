import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Eye, TrendingUp, Award, Loader2, Target, Percent } from "lucide-react";
import { useLandingAnalytics, useLandingTrends } from "@/hooks/use-landing-ab-test";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const variantColors: Record<string, string> = {
  control: "bg-slate-500",
  urgency: "bg-orange-500",
  benefit: "bg-green-500",
};

export default function LandingAnalytics() {
  const [dateRange, setDateRange] = useState<number>(30);

  const { data: analytics, isLoading: analyticsLoading } = useLandingAnalytics(dateRange);
  const { data: trends, isLoading: trendsLoading } = useLandingTrends(dateRange);

  const totalVisits = analytics?.reduce((sum, a) => sum + a.visits, 0) || 0;
  const totalConversions = analytics?.reduce((sum, a) => sum + a.signupsCompleted, 0) || 0;
  const overallConversionRate = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;
  const winningVariant = analytics?.[0];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Landing Page A/B Testing</h1>
          <p className="text-muted-foreground">Conversion rates, variant performance, and daily trends</p>
        </div>
        
        <Select value={dateRange.toString()} onValueChange={(v) => setDateRange(parseInt(v))}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      {analyticsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Landing page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Completed signups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallConversionRate.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Winning Variant</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winningVariant?.variantName || '-'}</div>
              <p className="text-xs text-muted-foreground">
                {winningVariant ? `${winningVariant.signupRate.toFixed(1)}% signup rate` : 'No data yet'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="variants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="variants">A/B Test Results</TabsTrigger>
          <TabsTrigger value="trends">Daily Trends</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
        </TabsList>

        {/* A/B Test Results Tab */}
        <TabsContent value="variants">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Variant Performance Comparison
              </CardTitle>
              <CardDescription>
                Compare conversion rates across headline variants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !analytics?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No data available yet. Visit /land to generate test data.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Bar Chart */}
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="variantName" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="ctaClickRate" name="CTA Click %" fill="hsl(var(--primary))" />
                        <Bar dataKey="signupRate" name="Signup %" fill="#22c55e" />
                        <Bar dataKey="completionRate" name="Completion %" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Detailed Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead className="text-right">Visits</TableHead>
                        <TableHead className="text-right">CTA Clicks</TableHead>
                        <TableHead className="text-right">Click Rate</TableHead>
                        <TableHead className="text-right">Signups Started</TableHead>
                        <TableHead className="text-right">Completed</TableHead>
                        <TableHead className="text-right">Conversion Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analytics.map((data, index) => (
                        <TableRow key={data.variantKey}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={variantColors[data.variantKey] || 'bg-slate-500'}>
                                {data.variantName}
                              </Badge>
                              {index === 0 && analytics.length > 1 && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Winner
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{data.visits.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{data.ctaClicks.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">{data.ctaClickRate.toFixed(1)}%</TableCell>
                          <TableCell className="text-right">{data.signupsStarted.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{data.signupsCompleted.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium text-green-500">
                            {data.signupRate.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance Trends</CardTitle>
              <CardDescription>Visits and conversions over time</CardDescription>
            </CardHeader>
            <CardContent>
              {trendsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), "MMM d")}
                        className="text-xs"
                      />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        labelFormatter={(date) => format(new Date(date), "MMMM d, yyyy")}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="visits" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Visits"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversions" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Conversions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Conversion Funnel
              </CardTitle>
              <CardDescription>Track drop-off at each stage</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { label: "Page Visits", value: totalVisits, color: "bg-blue-500" },
                    { label: "CTA Clicks", value: analytics?.reduce((s, a) => s + a.ctaClicks, 0) || 0, color: "bg-cyan-500" },
                    { label: "Signups Started", value: analytics?.reduce((s, a) => s + a.signupsStarted, 0) || 0, color: "bg-teal-500" },
                    { label: "Signups Completed", value: totalConversions, color: "bg-green-500" },
                  ].map((stage, index, arr) => {
                    const prevValue = index > 0 ? arr[index - 1].value : stage.value;
                    const dropOff = prevValue > 0 ? ((prevValue - stage.value) / prevValue * 100) : 0;
                    const width = totalVisits > 0 ? (stage.value / totalVisits * 100) : 0;

                    return (
                      <div key={stage.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stage.label}</span>
                          <span className="text-muted-foreground">
                            {stage.value.toLocaleString()}
                            {index > 0 && dropOff > 0 && (
                              <span className="text-red-400 ml-2">(-{dropOff.toFixed(1)}%)</span>
                            )}
                          </span>
                        </div>
                        <div className="h-8 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full transition-all", stage.color)}
                            style={{ width: `${Math.max(width, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
