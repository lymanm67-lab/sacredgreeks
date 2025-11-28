import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Shield, ShieldOff, RefreshCw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string | null;
  isAdmin?: boolean;
}

export function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleActionDialog, setRoleActionDialog] = useState<{
    open: boolean;
    userId: string;
    userName: string;
    action: 'grant' | 'revoke';
  }>({ open: false, userId: '', userName: '', action: 'grant' });
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Get all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get all admin roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      // Combine data
      const adminUserIds = new Set(rolesData?.map(r => r.user_id) || []);
      const enrichedProfiles = (profilesData || []).map(profile => ({
        ...profile,
        isAdmin: adminUserIds.has(profile.id)
      }));

      setProfiles(enrichedProfiles);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleAction = async () => {
    if (!roleActionDialog.userId) return;
    
    setActionLoading(true);
    try {
      if (roleActionDialog.action === 'grant') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: roleActionDialog.userId, role: 'admin' });
        
        if (error) throw error;
        
        toast({
          title: "Admin granted",
          description: `${roleActionDialog.userName} is now an admin.`,
        });
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', roleActionDialog.userId)
          .eq('role', 'admin');
        
        if (error) throw error;
        
        toast({
          title: "Admin revoked",
          description: `${roleActionDialog.userName} is no longer an admin.`,
        });
      }
      
      // Refresh the list
      await loadUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update role",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
      setRoleActionDialog({ open: false, userId: '', userName: '', action: 'grant' });
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const search = searchTerm.toLowerCase();
    return (
      profile.email?.toLowerCase().includes(search) ||
      profile.full_name?.toLowerCase().includes(search)
    );
  });

  const totalUsers = profiles.length;
  const totalAdmins = profiles.filter(p => p.isAdmin).length;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-sacred" />
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  {totalUsers} users • {totalAdmins} admins
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={loadUsers} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading users...</div>
          ) : filteredProfiles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No users match your search' : 'No users found'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.full_name || 'No name'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {profile.email || 'No email'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {profile.created_at
                          ? new Date(profile.created_at).toLocaleDateString()
                          : 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {profile.isAdmin ? (
                          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary">User</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {profile.isAdmin ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setRoleActionDialog({
                              open: true,
                              userId: profile.id,
                              userName: profile.full_name || profile.email || 'this user',
                              action: 'revoke'
                            })}
                          >
                            <ShieldOff className="h-4 w-4 mr-1" />
                            Revoke Admin
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRoleActionDialog({
                              open: true,
                              userId: profile.id,
                              userName: profile.full_name || profile.email || 'this user',
                              action: 'grant'
                            })}
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            Make Admin
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={roleActionDialog.open} onOpenChange={(open) => 
        setRoleActionDialog(prev => ({ ...prev, open }))
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {roleActionDialog.action === 'grant' ? 'Grant Admin Access' : 'Revoke Admin Access'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {roleActionDialog.action === 'grant'
                ? `Are you sure you want to make ${roleActionDialog.userName} an admin? They will have full access to manage users, view all submissions, and modify content.`
                : `Are you sure you want to revoke admin access from ${roleActionDialog.userName}? They will no longer be able to access admin features.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRoleAction}
              disabled={actionLoading}
              className={roleActionDialog.action === 'revoke' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              {actionLoading ? 'Processing...' : roleActionDialog.action === 'grant' ? 'Grant Admin' : 'Revoke Admin'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}