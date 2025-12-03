import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Gift, Trash2, Search, RefreshCw, Crown, Users } from "lucide-react";
import { format } from "date-fns";

interface GiftedSubscription {
  id: string;
  user_id: string;
  tier: string;
  reason: string | null;
  starts_at: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  user_email?: string;
}

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
}

export function GiftSubscriptionManager() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [giftedSubs, setGiftedSubs] = useState<GiftedSubscription[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searching, setSearching] = useState(false);
  
  // Form state
  const [tier, setTier] = useState<"pro" | "ministry">("pro");
  const [reason, setReason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    loadGiftedSubscriptions();
  }, []);

  const loadGiftedSubscriptions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gifted_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get user emails for display
      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(s => s.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', userIds);
        
        const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || []);
        const subsWithEmails = data.map(sub => ({
          ...sub,
          user_email: emailMap.get(sub.user_id) || 'Unknown'
        }));
        setGiftedSubs(subsWithEmails);
      } else {
        setGiftedSubs([]);
      }
    } catch (error) {
      console.error('Error loading gifted subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load gifted subscriptions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    if (!searchEmail.trim()) return;
    
    setSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .ilike('email', `%${searchEmail}%`)
        .limit(10);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      toast({
        title: "Error",
        description: "Failed to search users",
        variant: "destructive"
      });
    } finally {
      setSearching(false);
    }
  };

  const giftSubscription = async () => {
    if (!selectedUser) {
      toast({
        title: "Error",
        description: "Please select a user first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('gifted_subscriptions')
        .insert({
          user_id: selectedUser.id,
          tier,
          reason: reason || null,
          gifted_by: user.id,
          expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} subscription gifted to ${selectedUser.email}`,
      });

      // Reset form
      setSelectedUser(null);
      setSearchEmail("");
      setSearchResults([]);
      setReason("");
      setExpiresAt("");
      
      loadGiftedSubscriptions();
    } catch (error) {
      console.error('Error gifting subscription:', error);
      toast({
        title: "Error",
        description: "Failed to gift subscription",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const revokeSubscription = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this gifted subscription?")) return;

    try {
      const { error } = await supabase
        .from('gifted_subscriptions')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gifted subscription revoked",
      });
      
      loadGiftedSubscriptions();
    } catch (error) {
      console.error('Error revoking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to revoke subscription",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Gift New Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Gift Subscription
          </CardTitle>
          <CardDescription>
            Grant a Pro or Ministry subscription to a user without payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Search */}
          <div className="space-y-2">
            <Label>Search User by Email</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
              />
              <Button onClick={searchUsers} disabled={searching}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="border rounded-md p-2 space-y-1 max-h-40 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 rounded cursor-pointer hover:bg-muted ${
                      selectedUser?.id === user.id ? 'bg-primary/10 border border-primary' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <p className="font-medium">{user.email}</p>
                    {user.full_name && <p className="text-sm text-muted-foreground">{user.full_name}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {selectedUser && (
              <div className="p-3 bg-primary/10 rounded-md">
                <p className="text-sm font-medium">Selected: {selectedUser.email}</p>
              </div>
            )}
          </div>

          {/* Tier Selection */}
          <div className="space-y-2">
            <Label>Subscription Tier</Label>
            <Select value={tier} onValueChange={(v) => setTier(v as "pro" | "ministry")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pro">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-500" />
                    Pro
                  </div>
                </SelectItem>
                <SelectItem value="ministry">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Ministry
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label>Reason (Optional)</Label>
            <Textarea
              placeholder="e.g., Beta tester reward, Contest winner, Special partnership..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
            />
          </div>

          {/* Expiration Date */}
          <div className="space-y-2">
            <Label>Expires At (Optional - leave blank for lifetime)</Label>
            <Input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <Button 
            onClick={giftSubscription} 
            disabled={loading || !selectedUser}
            className="w-full"
          >
            <Gift className="h-4 w-4 mr-2" />
            Gift {tier.charAt(0).toUpperCase() + tier.slice(1)} Subscription
          </Button>
        </CardContent>
      </Card>

      {/* Existing Gifted Subscriptions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gifted Subscriptions</CardTitle>
              <CardDescription>
                Manage all gifted subscriptions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadGiftedSubscriptions}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {giftedSubs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No gifted subscriptions yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {giftedSubs.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.user_email}</TableCell>
                    <TableCell>
                      <Badge variant={sub.tier === 'ministry' ? 'default' : 'secondary'}>
                        {sub.tier === 'ministry' ? (
                          <Users className="h-3 w-3 mr-1" />
                        ) : (
                          <Crown className="h-3 w-3 mr-1" />
                        )}
                        {sub.tier}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {sub.reason || '-'}
                    </TableCell>
                    <TableCell>
                      {sub.expires_at 
                        ? format(new Date(sub.expires_at), 'MMM d, yyyy')
                        : 'Lifetime'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={sub.is_active ? 'default' : 'destructive'}>
                        {sub.is_active ? 'Active' : 'Revoked'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {sub.is_active && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeSubscription(sub.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
