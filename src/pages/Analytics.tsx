import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, TrendingUp, Users, Eye, Clock, Home } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AnalyticsData {
  mostPopularResources: Array<{ title: string; count: number; category: string }>;
  audienceEngagement: Array<{ audience: string; count: number }>;
  pageViews: Array<{ path: string; count: number }>;
  averageTimeSpent: Array<{ path: string; avg_seconds: number }>;
  recentActivity: Array<{ 
    event_type: string; 
    event_category: string; 
    created_at: string;
    event_data: any;
  }>;
}

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    mostPopularResources: [],
    audienceEngagement: [],
    pageViews: [],
    averageTimeSpent: [],
    recentActivity: [],
  });

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      
      if (data?.role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch most popular resources
      const { data: resourceClicks } = await supabase
        .from("analytics_events")
        .select("event_data")
        .eq("event_type", "resource_click")
        .order("created_at", { ascending: false })
        .limit(1000);

      const resourceCounts = new Map<string, { count: number; category: string }>();
      resourceClicks?.forEach((event) => {
        const data = event.event_data as any;
        const title = data?.resource_title;
        const category = data?.resource_category;
        if (title) {
          const existing = resourceCounts.get(title) || { count: 0, category: category || 'unknown' };
          resourceCounts.set(title, { count: existing.count + 1, category });
        }
      });

      const mostPopularResources = Array.from(resourceCounts.entries())
        .map(([title, data]) => ({ title, count: data.count, category: data.category }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Fetch audience tab engagement
      const { data: tabClicks } = await supabase
        .from("analytics_events")
        .select("event_data")
        .eq("event_type", "audience_tab_click")
        .order("created_at", { ascending: false })
        .limit(1000);

      const audienceCounts = new Map<string, number>();
      tabClicks?.forEach((event) => {
        const data = event.event_data as any;
        const tab = data?.tab_value;
        if (tab) {
          audienceCounts.set(tab, (audienceCounts.get(tab) || 0) + 1);
        }
      });

      const audienceEngagement = Array.from(audienceCounts.entries())
        .map(([audience, count]) => ({ audience, count }))
        .sort((a, b) => b.count - a.count);

      // Fetch page views
      const { data: pageViewData } = await supabase
        .from("analytics_events")
        .select("page_path")
        .eq("event_type", "page_view")
        .order("created_at", { ascending: false })
        .limit(1000);

      const pageCounts = new Map<string, number>();
      pageViewData?.forEach((event) => {
        const path = event.page_path;
        if (path) {
          pageCounts.set(path, (pageCounts.get(path) || 0) + 1);
        }
      });

      const pageViews = Array.from(pageCounts.entries())
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Fetch average time spent
      const { data: timeSpentData } = await supabase
        .from("analytics_events")
        .select("page_path, event_data")
        .eq("event_type", "time_spent")
        .order("created_at", { ascending: false })
        .limit(1000);

      const timeByPage = new Map<string, { total: number; count: number }>();
      timeSpentData?.forEach((event) => {
        const path = event.page_path;
        const data = event.event_data as any;
        const seconds = data?.duration_seconds;
        if (path && seconds) {
          const existing = timeByPage.get(path) || { total: 0, count: 0 };
          timeByPage.set(path, {
            total: existing.total + seconds,
            count: existing.count + 1,
          });
        }
      });

      const averageTimeSpent = Array.from(timeByPage.entries())
        .map(([path, data]) => ({
          path,
          avg_seconds: Math.round(data.total / data.count),
        }))
        .sort((a, b) => b.avg_seconds - a.avg_seconds)
        .slice(0, 10);

      // Fetch recent activity
      const { data: recentActivity } = await supabase
        .from("analytics_events")
        .select("event_type, event_category, created_at, event_data")
        .order("created_at", { ascending: false })
        .limit(20);

      setAnalytics({
        mostPopularResources,
        audienceEngagement,
        pageViews,
        averageTimeSpent,
        recentActivity: recentActivity || [],
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const getAudienceLabel = (value: string) => {
    const labels: Record<string, string> = {
      all: "All Resources",
      greeks: "Greek Members",
      prospective: "Prospective Members",
      parents: "Parents & Families",
      church: "Church Leaders",
    };
    return labels[value] || value;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-sacred" />
              <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
            </div>
            <div className="w-24" /> {/* Spacer for layout */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.pageViews.reduce((sum, p) => sum + p.count, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resource Clicks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.mostPopularResources.reduce((sum, r) => sum + r.count, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tab Interactions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.audienceEngagement.reduce((sum, a) => sum + a.count, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="resources" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resources">Popular Resources</TabsTrigger>
            <TabsTrigger value="audience">Audience Engagement</TabsTrigger>
            <TabsTrigger value="pages">Page Views</TabsTrigger>
            <TabsTrigger value="time">Time Spent</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Resources</CardTitle>
                <CardDescription>
                  Top 10 resources by click count
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.mostPopularResources.map((resource, index) => (
                    <div key={resource.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sacred/10 text-sacred flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground capitalize">{resource.category}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-sacred">{resource.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Audience Tab Engagement</CardTitle>
                <CardDescription>
                  Which audience tabs are most popular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.audienceEngagement.map((item) => (
                    <div key={item.audience} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="font-medium">{getAudienceLabel(item.audience)}</div>
                      <div className="text-2xl font-bold text-sacred">{item.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>
                  Most viewed pages in the app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.pageViews.map((page) => (
                    <div key={page.path} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="font-mono text-sm">{page.path}</div>
                      <div className="text-2xl font-bold text-sacred">{page.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle>Average Time Spent</CardTitle>
                <CardDescription>
                  Where users spend the most time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.averageTimeSpent.map((page) => (
                    <div key={page.path} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="font-mono text-sm">{page.path}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div className="text-lg font-bold text-sacred">
                          {Math.floor(page.avg_seconds / 60)}m {page.avg_seconds % 60}s
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest 20 analytics events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium capitalize">{activity.event_type.replace(/_/g, ' ')}</span>
                        <span className="text-muted-foreground text-xs">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        {(activity.event_data as any)?.resource_title || (activity.event_data as any)?.tab_value || 'No details'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;