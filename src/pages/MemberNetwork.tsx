import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Users, 
  UserPlus,
  MessageCircle,
  Heart,
  Filter,
  Shield,
  Cross,
  Check,
  X,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { AppLayout } from "@/components/layout/AppLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useTTS } from "@/hooks/use-tts";

// Organization colors for badges
const orgColors: Record<string, string> = {
  "Alpha Phi Alpha": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Alpha Kappa Alpha": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Kappa Alpha Psi": "bg-red-500/20 text-red-400 border-red-500/30",
  "Omega Psi Phi": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Delta Sigma Theta": "bg-red-600/20 text-red-400 border-red-600/30",
  "Phi Beta Sigma": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Zeta Phi Beta": "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "Sigma Gamma Rho": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Iota Phi Theta": "bg-amber-600/20 text-amber-400 border-amber-600/30",
};

const d9Organizations = [
  "All Organizations",
  "Alpha Phi Alpha",
  "Alpha Kappa Alpha", 
  "Kappa Alpha Psi",
  "Omega Psi Phi",
  "Delta Sigma Theta",
  "Phi Beta Sigma",
  "Zeta Phi Beta",
  "Sigma Gamma Rho",
  "Iota Phi Theta"
];

interface Profile {
  id: string;
  full_name: string | null;
  greek_organization: string | null;
  chapter_name: string | null;
  member_status: string | null;
  initiation_year: number | null;
}

interface Connection {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: string;
  message: string | null;
  created_at: string;
  profile?: Profile;
}

// Sample profiles for display when no real data
const sampleProfiles: Profile[] = [
  {
    id: "1",
    full_name: "Marcus Thompson",
    greek_organization: "Alpha Phi Alpha",
    chapter_name: "Beta Lambda",
    member_status: "Financial",
    initiation_year: 2018
  },
  {
    id: "2",
    full_name: "Jasmine Williams",
    greek_organization: "Delta Sigma Theta",
    chapter_name: "Gamma Tau",
    member_status: "Financial",
    initiation_year: 2019
  },
  {
    id: "3",
    full_name: "David Johnson",
    greek_organization: "Omega Psi Phi",
    chapter_name: "Chi Psi",
    member_status: "Financial",
    initiation_year: 2017
  },
  {
    id: "4",
    full_name: "Angela Carter",
    greek_organization: "Alpha Kappa Alpha",
    chapter_name: "Beta Xi",
    member_status: "Financial",
    initiation_year: 2020
  },
];

function MemberCard({ profile, onConnect, isConnected, isPending }: { 
  profile: Profile; 
  onConnect: (userId: string) => void;
  isConnected: boolean;
  isPending: boolean;
}) {
  const orgColor = orgColors[profile.greek_organization || ""] || "bg-muted text-muted-foreground";
  const initials = profile.full_name?.split(' ').map(n => n[0]).join('') || '?';
  
  return (
    <Card className="border-border/50 hover:border-sacred/50 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14 border-2 border-sacred/30">
            <AvatarFallback className="bg-sacred/10 text-sacred text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{profile.full_name || "Sacred Greeks Member"}</h3>
            </div>
            
            {profile.greek_organization && (
              <Badge variant="outline" className={`${orgColor} mb-2`}>
                {profile.greek_organization}
              </Badge>
            )}
            
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {profile.chapter_name && (
                <span>{profile.chapter_name}</span>
              )}
              {profile.initiation_year && (
                <span>• {profile.initiation_year}</span>
              )}
            </div>
          </div>
          
          <div>
            {isConnected ? (
              <Button variant="outline" size="sm" disabled className="text-green-500">
                <Check className="w-4 h-4 mr-1" />
                Connected
              </Button>
            ) : isPending ? (
              <Button variant="outline" size="sm" disabled className="text-amber-500">
                <Clock className="w-4 h-4 mr-1" />
                Pending
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onConnect(profile.id)}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConnectionRequest({ connection, onAccept, onDecline }: {
  connection: Connection;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  const profile = connection.profile;
  const orgColor = profile?.greek_organization ? orgColors[profile.greek_organization] : "bg-muted text-muted-foreground";
  
  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-amber-500/30">
            <AvatarFallback className="bg-amber-500/10 text-amber-400">
              {profile?.full_name?.split(' ').map(n => n[0]).join('') || '?'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{profile?.full_name || "Member"}</h3>
            {profile?.greek_organization && (
              <Badge variant="outline" className={`${orgColor} text-xs`}>
                {profile.greek_organization}
              </Badge>
            )}
            {connection.message && (
              <p className="text-sm text-muted-foreground mt-1 italic">"{connection.message}"</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onAccept(connection.id)}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDecline(connection.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const NETWORK_OVERVIEW_TEXT = `Welcome to the Sacred Greeks Member Network. This is your faith-first networking hub where you can connect with fellow Divine Nine members who share your Christian faith journey.

Unlike other Greek networking platforms, we prioritize spiritual connection alongside organizational ties. Here you can discover members across all nine organizations, send connection requests, and build meaningful relationships centered on Christ.

Use the search and filter tools to find members by name, chapter, or organization. When you find someone you'd like to connect with, simply click the Connect button to send a request. They'll be notified and can accept to establish a mutual connection.

Your network grows as you engage with the community. Sign in to unlock the full experience and start building your faith-focused Greek network today.`;

export default function MemberNetwork() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("All Organizations");
  const [activeTab, setActiveTab] = useState("discover");
  const { speak, stop, isPlaying, isLoading } = useTTS({ voice: 'marcus' });

  const handleOverviewTTS = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(NETWORK_OVERVIEW_TEXT);
    }
  };

  // Fetch all profiles (excluding current user) - show members with names
  const { data: profiles } = useQuery({
    queryKey: ['member-profiles', user?.id],
    queryFn: async () => {
      const query = supabase
        .from('profiles')
        .select('*')
        .not('full_name', 'is', null)
        .neq('full_name', '');
      
      if (user) {
        query.neq('id', user.id);
      }
      
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data as Profile[];
    }
  });

  // Fetch user's connections
  const { data: connections } = useQuery({
    queryKey: ['member-connections', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('member_connections')
        .select('*')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);
      
      if (error) throw error;
      return data as Connection[];
    },
    enabled: !!user
  });

  // Fetch incoming requests
  const { data: incomingRequests } = useQuery({
    queryKey: ['incoming-requests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('member_connections')
        .select('*')
        .eq('recipient_id', user.id)
        .eq('status', 'pending');
      
      if (error) throw error;
      
      // Fetch profiles for requesters
      const requesterIds = data.map(c => c.requester_id);
      if (requesterIds.length === 0) return [];
      
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .in('id', requesterIds);
      
      return data.map(conn => ({
        ...conn,
        profile: profilesData?.find(p => p.id === conn.requester_id)
      })) as Connection[];
    },
    enabled: !!user
  });

  // Connect mutation
  const connectMutation = useMutation({
    mutationFn: async (recipientId: string) => {
      if (!user) throw new Error("Must be logged in");
      
      const { error } = await supabase
        .from('member_connections')
        .insert({
          requester_id: user.id,
          recipient_id: recipientId,
          status: 'pending'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member-connections'] });
      toast.success("Connection request sent!");
    },
    onError: () => {
      toast.error("Failed to send request");
    }
  });

  // Accept/Decline mutations
  const respondMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('member_connections')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['member-connections'] });
      queryClient.invalidateQueries({ queryKey: ['incoming-requests'] });
      toast.success(status === 'accepted' ? "Connection accepted!" : "Request declined");
    }
  });

  const getConnectionStatus = (profileId: string) => {
    if (!connections) return { isConnected: false, isPending: false };
    
    const conn = connections.find(c => 
      (c.requester_id === profileId || c.recipient_id === profileId)
    );
    
    return {
      isConnected: conn?.status === 'accepted',
      isPending: conn?.status === 'pending'
    };
  };

  // Use DB data if available, otherwise use sample data
  const displayProfiles = profiles && profiles.length > 0 ? profiles : sampleProfiles;

  // Filter profiles
  const filteredProfiles = displayProfiles.filter(profile => {
    const matchesSearch = 
      (profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (profile.chapter_name?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesOrg = selectedOrg === "All Organizations" || profile.greek_organization === selectedOrg;
    
    return matchesSearch && matchesOrg;
  });

  const acceptedConnections = connections?.filter(c => c.status === 'accepted').length || 0;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back to Dashboard */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <PageHeader
          title="Member Network"
          description="Connect with fellow Greeks who share your faith journey. Build meaningful relationships centered on Christ."
          badge={{ text: "Community", variant: "default" }}
          demoPageKey="member-network"
        />

        {/* TTS Overview Button */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOverviewTTS}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            {isLoading ? "Loading..." : isPlaying ? "Stop Overview" : "Listen to Overview"}
          </Button>
        </div>

        {/* Value Prop */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-sacred" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Faith-First Networking</h3>
                <p className="text-sm text-muted-foreground">
                  Unlike other Greek apps, we connect you with members who share your Christian faith—not just your letters.
                </p>
              </div>
              <div className="text-center hidden sm:block">
                <div className="text-2xl font-bold text-sacred">{acceptedConnections}</div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!user && (
          <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4 flex items-center gap-4">
              <Shield className="w-8 h-8 text-amber-500" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Sign in to Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Create an account to send connection requests and build your network.
                </p>
              </div>
              <Button asChild className="bg-sacred hover:bg-sacred/90">
                <a href="/auth">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="discover">
              <Sparkles className="w-4 h-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="requests">
              <UserPlus className="w-4 h-4 mr-2" />
              Requests
              {incomingRequests && incomingRequests.length > 0 && (
                <Badge className="ml-2 bg-amber-500">{incomingRequests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="connections">
              <Users className="w-4 h-4 mr-2" />
              My Network
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "discover" && (
          <>
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {d9Organizations.map(org => (
                        <SelectItem key={org} value={org}>{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Members Grid */}
            <div className="space-y-3">
              {filteredProfiles.map(profile => {
                const { isConnected, isPending } = getConnectionStatus(profile.id);
                return (
                  <MemberCard 
                    key={profile.id} 
                    profile={profile}
                    onConnect={(id) => connectMutation.mutate(id)}
                    isConnected={isConnected}
                    isPending={isPending}
                  />
                );
              })}
            </div>

            {filteredProfiles.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {activeTab === "requests" && (
          <div className="space-y-3">
            {incomingRequests && incomingRequests.length > 0 ? (
              incomingRequests.map(request => (
                <ConnectionRequest
                  key={request.id}
                  connection={request}
                  onAccept={(id) => respondMutation.mutate({ id, status: 'accepted' })}
                  onDecline={(id) => respondMutation.mutate({ id, status: 'declined' })}
                />
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No pending requests</h3>
                  <p className="text-sm text-muted-foreground">
                    Connection requests from other members will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "connections" && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {acceptedConnections > 0 ? `${acceptedConnections} Connections` : "No connections yet"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {acceptedConnections > 0 
                  ? "Your accepted connections will appear here"
                  : "Start connecting with other members to build your faith network"}
              </p>
              <Button 
                className="mt-4 bg-sacred hover:bg-sacred/90"
                onClick={() => setActiveTab("discover")}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Members
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
