import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceSuggestionsManager } from "@/components/admin/ResourceSuggestionsManager";
import { UserManagement } from "@/components/admin/UserManagement";
import { QASubmissionsManager } from "@/components/admin/QASubmissionsManager";
import { HealingStoriesManager } from "@/components/admin/HealingStoriesManager";
import VideoSuggestionsManager from "@/components/admin/VideoSuggestionsManager";
import { Home, Users, FileText, Lightbulb, MessageSquare, Heart, Video, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  /**
   * SECURITY DOCUMENTATION (#5): Client-Side Admin Check Pattern
   * 
   * This client-side admin check is for USER EXPERIENCE ONLY and does NOT provide security.
   * 
   * SECURITY MODEL:
   * - Actual security is enforced by Row-Level Security (RLS) policies in the database
   * - RLS policies use the has_role() security definer function to verify admin access
   * - All admin operations (viewing submissions, managing resources) are protected server-side
   * 
   * CLIENT-SIDE CHECK PURPOSE:
   * - Provides immediate feedback to non-admin users
   * - Prevents unnecessary UI rendering for unauthorized users
   * - Improves user experience by redirecting early
   * 
   * WHY THIS IS SAFE:
   * - Even if a user modifies client code to bypass this check, they cannot access admin data
   * - RLS policies on assessment_submissions, daily_devotionals, and resource_suggestions
   *   will reject any unauthorized queries regardless of client-side state
   * - The database enforces all authorization decisions
   * 
   * IMPORTANT: Never rely on client-side checks for security decisions. Always validate
   * permissions server-side through RLS policies or edge function authorization checks.
   */
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) throw error;
        setIsAdmin(!!data);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadSubmissions();
    }
  }, [isAdmin]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assessment_submissions')
        .select('*')
        .eq('track', 'sacred_greeks')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Sacred Greeks Admin</h1>
            <div className="flex items-center gap-2">
              <Link to="/beta-checklist">
                <Button variant="outline" size="sm" className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Launch Checklist
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Q&A
            </TabsTrigger>
            <TabsTrigger value="healing" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Healing
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Submissions</CardTitle>
                  <Button variant="outline" size="sm" onClick={loadSubmissions}>
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-8 text-muted-foreground">Loading...</p>
                ) : submissions.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No submissions yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Scenario</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-mono text-xs">{submission.id.slice(0, 8)}...</TableCell>
                            <TableCell className="text-sm">
                              {new Date(submission.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-sm">{submission.scenario}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  submission.result_type === 'high_risk'
                                    ? 'border-status-high text-status-high'
                                    : submission.result_type === 'medium_risk'
                                    ? 'border-status-medium text-status-medium'
                                    : 'border-status-low text-status-low'
                                }
                              >
                                {submission.result_type.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {submission.email || <span className="text-muted-foreground">N/A</span>}
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

          <TabsContent value="qa">
            <QASubmissionsManager />
          </TabsContent>

          <TabsContent value="healing">
            <HealingStoriesManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoSuggestionsManager />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceSuggestionsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
