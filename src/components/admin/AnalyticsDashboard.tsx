import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, Heart, TrendingUp } from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalDevotionals: number;
  totalAssessments: number;
  totalPrayers: number;
  activeUsersToday: number;
  activeUsersWeek: number;
  completedDevotionalsToday: number;
  completedDevotionalsWeek: number;
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalDevotionals: 0,
    totalAssessments: 0,
    totalPrayers: 0,
    activeUsersToday: 0,
    activeUsersWeek: 0,
    completedDevotionalsToday: 0,
    completedDevotionalsWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Total devotionals
      const { count: totalDevotionals } = await supabase
        .from("daily_devotionals")
        .select("*", { count: "exact", head: true });

      // Total assessments
      const { count: totalAssessments } = await supabase
        .from("assessment_submissions")
        .select("*", { count: "exact", head: true });

      // Total prayers
      const { count: totalPrayers } = await supabase
        .from("prayer_journal")
        .select("*", { count: "exact", head: true });

      // Active users today
      const { data: activeToday } = await supabase
        .from("user_progress")
        .select("user_id", { count: "exact" })
        .eq("date", today);

      const activeUsersToday = new Set(activeToday?.map(p => p.user_id) || []).size;

      // Active users this week
      const { data: activeWeek } = await supabase
        .from("user_progress")
        .select("user_id")
        .gte("date", weekAgo);

      const activeUsersWeek = new Set(activeWeek?.map(p => p.user_id) || []).size;

      // Completed devotionals today
      const { count: completedToday } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .eq("date", today)
        .eq("devotional_completed", true);

      // Completed devotionals this week
      const { count: completedWeek } = await supabase
        .from("user_progress")
        .select("*", { count: "exact", head: true })
        .gte("date", weekAgo)
        .eq("devotional_completed", true);

      setAnalytics({
        totalUsers: totalUsers || 0,
        totalDevotionals: totalDevotionals || 0,
        totalAssessments: totalAssessments || 0,
        totalPrayers: totalPrayers || 0,
        activeUsersToday,
        activeUsersWeek,
        completedDevotionalsToday: completedToday || 0,
        completedDevotionalsWeek: completedWeek || 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    subtitle 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    subtitle?: string 
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={Users}
          subtitle="Registered accounts"
        />
        <StatCard
          title="Total Devotionals"
          value={analytics.totalDevotionals}
          icon={BookOpen}
          subtitle="Available content"
        />
        <StatCard
          title="Assessments Taken"
          value={analytics.totalAssessments}
          icon={FileText}
          subtitle="All-time submissions"
        />
        <StatCard
          title="Prayer Entries"
          value={analytics.totalPrayers}
          icon={Heart}
          subtitle="Journal entries"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today</span>
                  <span className="text-2xl font-bold text-sacred">{analytics.activeUsersToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Week</span>
                  <span className="text-2xl font-bold">{analytics.activeUsersWeek}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Devotionals Completed</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today</span>
                  <span className="text-2xl font-bold text-sacred">{analytics.completedDevotionalsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Week</span>
                  <span className="text-2xl font-bold">{analytics.completedDevotionalsWeek}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
