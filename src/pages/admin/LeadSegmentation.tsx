import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { 
  Users, Mail, TrendingUp, Loader2, Target, 
  Clock, CheckCircle2, XCircle, Eye, MousePointer 
} from "lucide-react";
import { 
  useSegmentStats, 
  useSegmentConversionRates, 
  useEmailAutomationWorkflows,
  SegmentType 
} from "@/hooks/use-lead-segments";
import { cn } from "@/lib/utils";

const segmentColors: Record<SegmentType, string> = {
  opened_no_click: "#eab308",
  clicked_no_convert: "#f97316",
  converted: "#22c55e",
  inactive: "#64748b",
};

const segmentIcons: Record<SegmentType, React.ElementType> = {
  opened_no_click: Eye,
  clicked_no_convert: MousePointer,
  converted: CheckCircle2,
  inactive: XCircle,
};

export default function LeadSegmentation() {
  const { data: segmentStats, isLoading: statsLoading } = useSegmentStats();
  const { data: conversionRates, isLoading: ratesLoading } = useSegmentConversionRates();
  const { data: workflows, isLoading: workflowsLoading } = useEmailAutomationWorkflows();

  const totalLeads = segmentStats?.reduce((sum, s) => sum + s.count, 0) || 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lead Segmentation</h1>
          <p className="text-muted-foreground">
            Segment leads by behavior and track conversion rates
          </p>
        </div>
      </div>

      {/* Segment Overview Cards */}
      {statsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {segmentStats?.map((segment) => {
            const Icon = segmentIcons[segment.segment_type];
            return (
              <Card key={segment.segment_type}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{segment.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{segment.count.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {totalLeads > 0 
                      ? `${((segment.count / totalLeads) * 100).toFixed(1)}% of leads`
                      : 'No leads yet'
                    }
                  </p>
                  <div 
                    className={cn("h-1 mt-2 rounded-full", segment.color)}
                    style={{ width: totalLeads > 0 ? `${(segment.count / totalLeads) * 100}%` : '0%' }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">Segment Distribution</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Tracking</TabsTrigger>
          <TabsTrigger value="workflows">Automation Workflows</TabsTrigger>
        </TabsList>

        {/* Segment Distribution Tab */}
        <TabsContent value="distribution">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Lead Distribution
                </CardTitle>
                <CardDescription>Breakdown by behavior segment</CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : !segmentStats?.length || totalLeads === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No lead data available yet
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={segmentStats}
                          dataKey="count"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {segmentStats.map((entry) => (
                            <Cell 
                              key={entry.segment_type} 
                              fill={segmentColors[entry.segment_type]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Descriptions</CardTitle>
                <CardDescription>Understanding each lead segment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {segmentStats?.map((segment) => {
                  const Icon = segmentIcons[segment.segment_type];
                  return (
                    <div 
                      key={segment.segment_type}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        segment.color.replace('bg-', 'bg-opacity-20 ')
                      )}>
                        <Icon className="h-5 w-5" style={{ color: segmentColors[segment.segment_type] }} />
                      </div>
                      <div>
                        <h4 className="font-medium">{segment.label}</h4>
                        <p className="text-sm text-muted-foreground">{segment.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversion Tracking Tab */}
        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Segment Conversion Rates
              </CardTitle>
              <CardDescription>
                Track how each segment converts to completed signups
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ratesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !conversionRates?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No conversion data available yet
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionRates}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="segment_type" 
                          tickFormatter={(type) => {
                            const labels: Record<string, string> = {
                              opened_no_click: "Opened",
                              clicked_no_convert: "Clicked",
                              converted: "Converted",
                              inactive: "Inactive",
                            };
                            return labels[type] || type;
                          }}
                          className="text-xs"
                        />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar 
                          dataKey="conversionRate" 
                          name="Conversion Rate %" 
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Segment</TableHead>
                        <TableHead className="text-right">Total Leads</TableHead>
                        <TableHead className="text-right">Converted</TableHead>
                        <TableHead className="text-right">Conversion Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conversionRates.map((rate) => (
                        <TableRow key={rate.segment_type}>
                          <TableCell>
                            <Badge 
                              style={{ backgroundColor: segmentColors[rate.segment_type] }}
                              className="text-white"
                            >
                              {rate.segment_type.replace(/_/g, ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{rate.total.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{rate.converted.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">
                            {rate.conversionRate.toFixed(2)}%
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

        {/* Automation Workflows Tab */}
        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Automation Workflows
              </CardTitle>
              <CardDescription>
                Automated follow-up sequences for each segment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {workflowsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !workflows?.length ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No automation workflows configured</p>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Create First Workflow
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow Name</TableHead>
                      <TableHead>Trigger Segment</TableHead>
                      <TableHead>Delay</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Variant</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {workflow.trigger_segment.replace(/_/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {workflow.delay_hours}h
                          </div>
                        </TableCell>
                        <TableCell>{workflow.email_template_key}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {workflow.subject_variant_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Switch checked={workflow.is_active} />
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
