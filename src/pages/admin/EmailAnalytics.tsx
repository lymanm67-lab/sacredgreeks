import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Mail, MousePointer, Eye, TrendingUp, Award, ExternalLink, Loader2 } from "lucide-react";
import { 
  useEmailCampaigns, 
  useEmailAnalytics, 
  useVariantPerformance, 
  useDailyTrends,
  useTopLinks 
} from "@/hooks/use-email-analytics";
import { format } from "date-fns";

const variantLabels: Record<string, string> = {
  control: "Control",
  urgency_curiosity: "Urgency/Curiosity",
  benefit_social: "Benefit/Social",
};

const variantColors: Record<string, string> = {
  control: "bg-slate-500",
  urgency_curiosity: "bg-orange-500",
  benefit_social: "bg-green-500",
};

export default function EmailAnalytics() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [dateRange, setDateRange] = useState<number>(30);

  const { data: campaigns, isLoading: campaignsLoading } = useEmailCampaigns();
  const { data: analytics, isLoading: analyticsLoading } = useEmailAnalytics(
    selectedCampaign !== "all" ? selectedCampaign : undefined,
    dateRange
  );
  const { data: variantPerformance, isLoading: variantsLoading } = useVariantPerformance(
    selectedCampaign !== "all" ? selectedCampaign : undefined
  );
  const { data: dailyTrends, isLoading: trendsLoading } = useDailyTrends(
    selectedCampaign !== "all" ? selectedCampaign : undefined,
    dateRange
  );
  const { data: topLinks, isLoading: linksLoading } = useTopLinks(
    selectedCampaign !== "all" ? selectedCampaign : undefined
  );

  const isLoading = campaignsLoading || analyticsLoading;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Email Analytics</h1>
          <p className="text-muted-foreground">A/B test results, open rates, and engagement metrics</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns?.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateRange.toString()} onValueChange={(v) => setDateRange(parseInt(v))}>
            <SelectTrigger className="w-[120px]">
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
      </div>

      {/* Key Metrics */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalSent.toLocaleString() || 0}</div>
              <p className="text-xs text-muted-foreground">Total emails delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.openRate.toFixed(1) || 0}%</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.uniqueOpens.toLocaleString() || 0} unique opens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.clickRate.toFixed(1) || 0}%</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.uniqueClicks.toLocaleString() || 0} unique clicks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click-to-Open</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.clickToOpenRate.toFixed(1) || 0}%</div>
              <p className="text-xs text-muted-foreground">Engagement quality</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Daily Trends</TabsTrigger>
          <TabsTrigger value="ab-test">A/B Test Results</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="links">Top Links</TabsTrigger>
        </TabsList>

        {/* Daily Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Email Performance Trends</CardTitle>
              <CardDescription>Daily sends, opens, and clicks over time</CardDescription>
            </CardHeader>
            <CardContent>
              {trendsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyTrends}>
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
                        dataKey="sent" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Sent"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="opens" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Opens"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="clicks" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        name="Clicks"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B Test Results Tab */}
        <TabsContent value="ab-test">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                A/B Test Results
              </CardTitle>
              <CardDescription>
                Compare performance across subject line variants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCampaign === "all" ? (
                <div className="text-center py-8 text-muted-foreground">
                  Select a specific campaign to view A/B test results
                </div>
              ) : variantsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !variantPerformance?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No variant data available for this campaign
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Bar Chart Comparison */}
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={variantPerformance}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="variant_type" 
                          tickFormatter={(type) => variantLabels[type] || type}
                          className="text-xs"
                        />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          labelFormatter={(type) => variantLabels[type] || type}
                        />
                        <Legend />
                        <Bar dataKey="openRate" name="Open Rate %" fill="hsl(var(--primary))" />
                        <Bar dataKey="clickRate" name="Click Rate %" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Detailed Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead>Subject Line</TableHead>
                        <TableHead className="text-right">Sent</TableHead>
                        <TableHead className="text-right">Opens</TableHead>
                        <TableHead className="text-right">Open Rate</TableHead>
                        <TableHead className="text-right">Clicks</TableHead>
                        <TableHead className="text-right">Click Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {variantPerformance.map((variant, index) => (
                        <TableRow key={variant.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={variantColors[variant.variant_type]}>
                                {variantLabels[variant.variant_type]}
                              </Badge>
                              {index === 0 && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Winner
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {variant.subject_line}
                          </TableCell>
                          <TableCell className="text-right">{variant.sent.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{variant.uniqueOpens.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">
                            {variant.openRate.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right">{variant.clicks.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">
                            {variant.clickRate.toFixed(1)}%
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

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
              <CardDescription>All email campaigns and their status</CardDescription>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !campaigns?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No campaigns created yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Started</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map(campaign => (
                      <TableRow 
                        key={campaign.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCampaign(campaign.id)}
                      >
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.template_key}</TableCell>
                        <TableCell>
                          <Badge variant={
                            campaign.status === 'active' ? 'default' :
                            campaign.status === 'completed' ? 'secondary' :
                            campaign.status === 'paused' ? 'outline' : 'outline'
                          }>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(campaign.created_at), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          {campaign.started_at 
                            ? format(new Date(campaign.started_at), "MMM d, yyyy")
                            : "-"
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Links Tab */}
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Top Clicked Links
              </CardTitle>
              <CardDescription>Most popular links across all emails</CardDescription>
            </CardHeader>
            <CardContent>
              {linksLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !topLinks?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No link clicks recorded yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topLinks.map((link, index) => (
                      <TableRow key={link.url}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="max-w-[400px] truncate">
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {link.url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>{link.label || "-"}</TableCell>
                        <TableCell className="text-right font-medium">
                          {link.clicks.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
