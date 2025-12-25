import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Mail, Users, Clock, CheckCircle, XCircle } from "lucide-react";

interface WaitlistEntry {
  id: string;
  full_name: string;
  email: string;
  organization: string | null;
  goals: string | null;
  status: string;
  created_at: string;
}

export const CoachingWaitlistManager = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadWaitlist();
  }, []);

  const loadWaitlist = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('coaching_waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error loading waitlist:', error);
      toast({
        title: "Error",
        description: "Failed to load waitlist entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('coaching_waitlist')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setEntries(entries.map(e => 
        e.id === id ? { ...e, status: newStatus } : e
      ));

      toast({
        title: "Status updated",
        description: `Entry marked as ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredEntries = entries.filter(e => 
    statusFilter === "all" || e.status === statusFilter
  );

  const stats = {
    total: entries.length,
    pending: entries.filter(e => e.status === 'pending').length,
    contacted: entries.filter(e => e.status === 'contacted').length,
    enrolled: entries.filter(e => e.status === 'enrolled').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="border-blue-500 text-blue-500"><Mail className="w-3 h-3 mr-1" />Contacted</Badge>;
      case 'enrolled':
        return <Badge variant="outline" className="border-green-500 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Enrolled</Badge>;
      case 'declined':
        return <Badge variant="outline" className="border-red-500 text-red-500"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-sacred" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Signups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.contacted}</p>
                <p className="text-sm text-muted-foreground">Contacted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.enrolled}</p>
                <p className="text-sm text-muted-foreground">Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle>Group Coaching Waitlist</CardTitle>
              <CardDescription>Manage Sacred Not Sinful coaching program signups</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={loadWaitlist}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-sacred border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredEntries.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              {statusFilter === "all" ? "No waitlist entries yet" : `No ${statusFilter} entries`}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Goals</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.full_name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${entry.email}`} className="text-sacred hover:underline">
                          {entry.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">
                        {entry.organization || <span className="text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        {entry.goals ? (
                          <p className="text-sm text-muted-foreground truncate" title={entry.goals}>
                            {entry.goals}
                          </p>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        <Select 
                          value={entry.status} 
                          onValueChange={(value) => updateStatus(entry.id, value)}
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="enrolled">Enrolled</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
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
};
