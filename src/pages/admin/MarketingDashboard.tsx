import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLandingAnalytics, useLandingTrends, useLandingVariants } from "@/hooks/use-landing-ab-test";
import { StatisticalSignificance } from "@/components/admin/StatisticalSignificance";
import { EmailCampaignBuilder } from "@/components/admin/EmailCampaignBuilder";
import { EmailTemplateEditor } from "@/components/admin/EmailTemplateEditor";
import { AdCopyGenerator } from "@/components/admin/AdCopyGenerator";
import { ConversionRatesDashboard } from "@/components/admin/ConversionRatesDashboard";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MousePointer, 
  UserPlus,
  BarChart3,
  Mail,
  Sparkles,
  Target,
  Loader2,
  Paintbrush
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MarketingDashboard() {
  const [dateRange, setDateRange] = useState(30);
  const { data: analytics, isLoading: analyticsLoading } = useLandingAnalytics(dateRange);
  const { data: trends, isLoading: trendsLoading } = useLandingTrends(dateRange);
  const { data: variants } = useLandingVariants();

  // Calculate totals
  const totals = analytics?.reduce(
    (acc, v) => ({
      visits: acc.visits + v.visits,
      ctaClicks: acc.ctaClicks + v.ctaClicks,
      signups: acc.signups + v.signupsStarted,
      completed: acc.completed + v.signupsCompleted,
    }),
    { visits: 0, ctaClicks: 0, signups: 0, completed: 0 }
  ) || { visits: 0, ctaClicks: 0, signups: 0, completed: 0 };

  // Prepare variant data for statistical significance
  const variantData = analytics?.map(a => {
    const variant = variants?.find(v => v.variant_key === a.variantKey);
    return {
      name: a.variantName,
      key: a.variantKey,
      visitors: a.visits,
      conversions: a.signupsStarted,
      isControl: variant?.is_control || false,
    };
  }) || [];

  // Funnel data
  const funnelData = [
    { name: "Visits", value: totals.visits, fill: "hsl(var(--primary))" },
    { name: "CTA Clicks", value: totals.ctaClicks, fill: "hsl(217, 91%, 60%)" },
    { name: "Signups Started", value: totals.signups, fill: "hsl(142, 71%, 45%)" },
    { name: "Signups Completed", value: totals.completed, fill: "hsl(142, 76%, 36%)" },
  ];

  const isLoading = analyticsLoading || trendsLoading;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
              <p className="text-muted-foreground">
                A/B testing, email campaigns, and conversion analytics
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {[7, 14, 30, 90].map((days) => (
              <Button
                key={days}
                variant={dateRange === days ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange(days)}
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="ab-testing">
                <Target className="w-4 h-4 mr-2" />
                A/B Testing
              </TabsTrigger>
              <TabsTrigger value="conversions">
                <TrendingUp className="w-4 h-4 mr-2" />
                Conversions
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 mr-2" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="template-editor">
                <Paintbrush className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="ads">
                <Sparkles className="w-4 h-4 mr-2" />
                Ad Copy
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totals.visits.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Visits</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                        <MousePointer className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totals.ctaClicks.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">CTA Clicks</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {totals.visits > 0 ? ((totals.ctaClicks / totals.visits) * 100).toFixed(1) : 0}% CTR
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totals.signups.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Signups Started</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {totals.visits > 0 ? ((totals.signups / totals.visits) * 100).toFixed(1) : 0}% conversion
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
                        <p className="text-2xl font-bold">{totals.completed.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {totals.signups > 0 ? ((totals.completed / totals.signups) * 100).toFixed(1) : 0}% completion
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Trends Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Trends</CardTitle>
                    <CardDescription>Visits and conversions over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis />
                          <Tooltip 
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          />
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
                            stroke="hsl(142, 71%, 45%)" 
                            strokeWidth={2}
                            name="Conversions"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Variant Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Variant Performance</CardTitle>
                    <CardDescription>Conversion rate by landing page variant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" unit="%" />
                          <YAxis dataKey="variantName" type="category" width={100} tick={{ fontSize: 12 }} />
                          <Tooltip 
                            formatter={(value: number) => [`${value.toFixed(2)}%`, "Signup Rate"]}
                          />
                          <Bar 
                            dataKey="signupRate" 
                            fill="hsl(var(--primary))" 
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>User journey from visit to signup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-around py-8">
                    {funnelData.map((step, index) => (
                      <div key={step.name} className="text-center">
                        <div 
                          className="mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ 
                            width: 80 - (index * 12), 
                            height: 80 - (index * 12),
                            backgroundColor: step.fill 
                          }}
                        >
                          {step.value.toLocaleString()}
                        </div>
                        <p className="text-sm font-medium">{step.name}</p>
                        {index > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {funnelData[index - 1].value > 0 
                              ? ((step.value / funnelData[index - 1].value) * 100).toFixed(1)
                              : 0}%
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* A/B Testing Tab */}
            <TabsContent value="ab-testing">
              <StatisticalSignificance 
                variants={variantData}
                testName="Landing Page A/B Test"
              />
            </TabsContent>

            {/* Conversions Tab */}
            <TabsContent value="conversions">
              <ConversionRatesDashboard />
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email">
              <EmailCampaignBuilder />
            </TabsContent>

            {/* Template Editor Tab */}
            <TabsContent value="template-editor">
              <EmailTemplateEditor />
            </TabsContent>

            {/* Ad Copy Tab */}
            <TabsContent value="ads">
              <AdCopyGenerator />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
