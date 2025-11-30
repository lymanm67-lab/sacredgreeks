import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, MousePointer, Clock, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/SEOHead';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface AnalyticsData {
  pageViews: number;
  uniqueSessions: number;
  avgTimeOnPage: number;
  topPages: { page: string; views: number }[];
  eventsByType: { type: string; count: number }[];
  dailyTrend: { date: string; views: number; sessions: number }[];
  conversionRate: number;
}

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics-dashboard', dateRange],
    queryFn: async (): Promise<AnalyticsData> => {
      const startDate = subDays(new Date(), parseInt(dateRange));
      
      // Fetch analytics events
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      const eventsData = events || [];

      // Calculate metrics
      const pageViews = eventsData.filter(e => e.event_type === 'page_view').length;
      const uniqueSessions = new Set(eventsData.map(e => e.session_id)).size;
      
      // Calculate average time on page
      const timeEvents = eventsData.filter(e => e.event_type === 'time_on_page');
      const avgTime = timeEvents.length > 0 
        ? timeEvents.reduce((sum, e) => sum + ((e.event_data as { seconds?: number })?.seconds || 0), 0) / timeEvents.length 
        : 0;

      // Top pages
      const pageCounts: Record<string, number> = {};
      eventsData.filter(e => e.event_type === 'page_view').forEach(e => {
        const page = e.page_path || '/';
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });
      const topPages = Object.entries(pageCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Events by type
      const typeCounts: Record<string, number> = {};
      eventsData.forEach(e => {
        typeCounts[e.event_type] = (typeCounts[e.event_type] || 0) + 1;
      });
      const eventsByType = Object.entries(typeCounts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      // Daily trend
      const dailyCounts: Record<string, { views: number; sessions: Set<string> }> = {};
      for (let i = parseInt(dateRange) - 1; i >= 0; i--) {
        const date = format(subDays(new Date(), i), 'MMM dd');
        dailyCounts[date] = { views: 0, sessions: new Set() };
      }
      
      eventsData.filter(e => e.event_type === 'page_view').forEach(e => {
        const date = format(new Date(e.created_at!), 'MMM dd');
        if (dailyCounts[date]) {
          dailyCounts[date].views++;
          if (e.session_id) dailyCounts[date].sessions.add(e.session_id);
        }
      });

      const dailyTrend = Object.entries(dailyCounts).map(([date, data]) => ({
        date,
        views: data.views,
        sessions: data.sessions.size,
      }));

      // Conversion rate (forms submitted / page views)
      const formSubmits = eventsData.filter(e => e.event_type === 'form_submit').length;
      const conversionRate = pageViews > 0 ? (formSubmits / pageViews) * 100 : 0;

      return {
        pageViews,
        uniqueSessions,
        avgTimeOnPage: Math.round(avgTime),
        topPages,
        eventsByType,
        dailyTrend,
        conversionRate,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const StatCard = ({ title, value, icon: Icon, trend, description }: { 
    title: string; 
    value: string | number; 
    icon: React.ElementType;
    trend?: number;
    description?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <p className={`text-xs flex items-center gap-1 ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(trend)}% from last period
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Analytics Dashboard | Sacred Greeks"
        description="View app analytics and user engagement metrics"
        noindex
      />
      
      <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track user engagement and app performance</p>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select range" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Page Views"
            value={analytics?.pageViews.toLocaleString() || '0'}
            icon={Eye}
            description="Total page views"
          />
          <StatCard
            title="Unique Sessions"
            value={analytics?.uniqueSessions.toLocaleString() || '0'}
            icon={Users}
            description="Distinct visitors"
          />
          <StatCard
            title="Avg. Time on Page"
            value={`${analytics?.avgTimeOnPage || 0}s`}
            icon={Clock}
            description="Average engagement"
          />
          <StatCard
            title="Conversion Rate"
            value={`${(analytics?.conversionRate || 0).toFixed(1)}%`}
            icon={TrendingUp}
            description="Form submissions / views"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Top Pages</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trend</CardTitle>
                <CardDescription>Daily page views and sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics?.dailyTrend || []}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Page Views"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Sessions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most viewed pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.topPages || []} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="page" type="category" width={120} className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Events by Type</CardTitle>
                  <CardDescription>Distribution of tracked events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics?.eventsByType || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="type"
                          label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {(analytics?.eventsByType || []).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Breakdown</CardTitle>
                  <CardDescription>All tracked events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(analytics?.eventsByType || []).map((event, i) => (
                      <div key={event.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                          />
                          <span className="text-sm capitalize">{event.type.replace('_', ' ')}</span>
                        </div>
                        <Badge variant="secondary">{event.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
