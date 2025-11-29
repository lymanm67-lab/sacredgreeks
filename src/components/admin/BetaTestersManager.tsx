import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Mail,
  Calendar,
  Award,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface BetaTester {
  id: string;
  user_id: string;
  beta_code: string | null;
  status: string;
  signup_date: string;
  onboarding_completed: boolean;
  onboarding_completed_at: string | null;
  feedback_count: number;
  referred_by: string | null;
  created_at: string;
  profile?: {
    email: string | null;
    full_name: string | null;
  };
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
];

export function BetaTestersManager() {
  const [testers, setTesters] = useState<BetaTester[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    onboarded: 0
  });

  useEffect(() => {
    loadTesters();
  }, [statusFilter]);

  const loadTesters = async () => {
    setLoading(true);
    try {
      // Fetch beta testers
      let query = supabase
        .from("beta_testers")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data: testersData, error: testersError } = await query;
      
      if (testersError) throw testersError;
      
      // Fetch profiles separately
      const userIds = testersData?.map(t => t.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", userIds);
      
      const testersWithProfiles = testersData?.map(tester => ({
        ...tester,
        profile: profiles?.find(p => p.id === tester.user_id) || null
      })) || [];
      
      setTesters(testersWithProfiles as BetaTester[]);

      // Calculate stats
      const { data: allTesters } = await supabase
        .from("beta_testers")
        .select("status, onboarding_completed");
      
      if (allTesters) {
        setStats({
          total: allTesters.length,
          active: allTesters.filter(t => t.status === "active").length,
          pending: allTesters.filter(t => t.status === "pending").length,
          onboarded: allTesters.filter(t => t.onboarding_completed).length
        });
      }
    } catch (error) {
      console.error("Error loading testers:", error);
      toast.error("Failed to load beta testers");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (testerId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("beta_testers")
        .update({ status: newStatus })
        .eq("id", testerId);

      if (error) throw error;
      
      toast.success(`Status updated to ${newStatus}`);
      loadTesters();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredTesters = testers.filter(tester => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tester.profile?.email?.toLowerCase().includes(query) ||
      tester.profile?.full_name?.toLowerCase().includes(query) ||
      tester.beta_code?.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/30"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sacred/10">
                <Users className="w-5 h-5 text-sacred" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Testers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.onboarded}</p>
                <p className="text-xs text-muted-foreground">Onboarded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Beta Testers</CardTitle>
              <CardDescription>Manage and monitor beta program participants</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadTesters} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-sacred border-t-transparent rounded-full" />
            </div>
          ) : filteredTesters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No beta testers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Beta Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Onboarding</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTesters.map((tester) => (
                    <TableRow key={tester.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {tester.profile?.full_name || "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {tester.profile?.email || "No email"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {tester.beta_code || "N/A"}
                        </code>
                      </TableCell>
                      <TableCell>{getStatusBadge(tester.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(tester.signup_date), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        {tester.onboarding_completed ? (
                          <Badge className="bg-green-500/10 text-green-500">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{tester.feedback_count}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={tester.status}
                          onValueChange={(value) => updateStatus(tester.id, value)}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
