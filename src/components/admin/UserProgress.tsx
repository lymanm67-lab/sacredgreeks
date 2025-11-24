import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface UserProgressData {
  user_id: string;
  email: string;
  full_name: string;
  total_devotionals: number;
  total_assessments: number;
  total_prayers: number;
  last_activity: string;
}

export function UserProgress() {
  const [users, setUsers] = useState<UserProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserProgress();
  }, []);

  const loadUserProgress = async () => {
    setLoading(true);
    try {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name");

      if (profilesError) throw profilesError;

      // Get user progress data for each user
      const userProgressPromises = (profiles || []).map(async (profile) => {
        // Count devotionals completed
        const { count: devotionalCount } = await supabase
          .from("user_progress")
          .select("*", { count: "exact", head: true })
          .eq("user_id", profile.id)
          .eq("devotional_completed", true);

        // Count assessments
        const { count: assessmentCount } = await supabase
          .from("assessment_submissions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", profile.id);

        // Count prayer journal entries
        const { count: prayerCount } = await supabase
          .from("prayer_journal")
          .select("*", { count: "exact", head: true })
          .eq("user_id", profile.id);

        // Get last activity
        const { data: lastProgress } = await supabase
          .from("user_progress")
          .select("date")
          .eq("user_id", profile.id)
          .order("date", { ascending: false })
          .limit(1)
          .maybeSingle();

        return {
          user_id: profile.id,
          email: profile.email || "N/A",
          full_name: profile.full_name || "Unknown",
          total_devotionals: devotionalCount || 0,
          total_assessments: assessmentCount || 0,
          total_prayers: prayerCount || 0,
          last_activity: lastProgress?.date || "Never",
        };
      });

      const userData = await Promise.all(userProgressPromises);
      setUsers(userData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user progress",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getActivityBadge = (lastActivity: string) => {
    if (lastActivity === "Never") {
      return <Badge variant="outline" className="border-muted text-muted-foreground">Inactive</Badge>;
    }
    
    const daysSince = Math.floor(
      (new Date().getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSince === 0) {
      return <Badge className="bg-green-500">Today</Badge>;
    } else if (daysSince <= 7) {
      return <Badge className="bg-blue-500">Active</Badge>;
    } else if (daysSince <= 30) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Recently Active</Badge>;
    } else {
      return <Badge variant="outline" className="border-muted text-muted-foreground">Inactive</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Progress & Activity</CardTitle>
          <Button variant="outline" size="sm" onClick={loadUserProgress} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Loading user data...</p>
        ) : users.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Devotionals</TableHead>
                  <TableHead className="text-center">Assessments</TableHead>
                  <TableHead className="text-center">Prayers</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell className="font-medium">
                      {user.full_name || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{user.total_devotionals}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{user.total_assessments}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{user.total_prayers}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.last_activity !== "Never"
                        ? new Date(user.last_activity).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell>{getActivityBadge(user.last_activity)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
