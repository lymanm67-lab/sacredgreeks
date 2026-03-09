import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface MinistryGroup {
  id: string;
  name: string;
  description: string | null;
  leader_id: string;
  invite_code: string;
  is_active: boolean;
  max_members: number;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    full_name: string | null;
    email: string | null;
    greek_organization: string | null;
  };
}

export function useMinistryGroups() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Groups I lead
  const { data: ledGroups, isLoading: loadingLed } = useQuery({
    queryKey: ["ministry-groups-led", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ministry_groups")
        .select("*")
        .eq("leader_id", user!.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as MinistryGroup[];
    },
    enabled: !!user,
  });

  // Groups I'm a member of
  const { data: joinedGroups, isLoading: loadingJoined } = useQuery({
    queryKey: ["ministry-groups-joined", user?.id],
    queryFn: async () => {
      const { data: memberships, error: memError } = await supabase
        .from("ministry_group_members")
        .select("group_id")
        .eq("user_id", user!.id);
      if (memError) throw memError;
      if (!memberships?.length) return [];

      const groupIds = memberships.map(m => m.group_id);
      const { data, error } = await supabase
        .from("ministry_groups")
        .select("*")
        .in("id", groupIds)
        .eq("is_active", true);
      if (error) throw error;
      return data as MinistryGroup[];
    },
    enabled: !!user,
  });

  // Create group
  const createGroup = useMutation({
    mutationFn: async ({ name, description }: { name: string; description?: string }) => {
      const { data, error } = await supabase
        .from("ministry_groups")
        .insert({ name, description: description || null, leader_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data as MinistryGroup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ministry-groups-led"] });
      toast({ title: "Group created", description: "Share the invite code with your students." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Join group by invite code
  const joinGroup = useMutation({
    mutationFn: async (inviteCode: string) => {
      // Look up the group
      const { data: group, error: lookupError } = await supabase
        .from("ministry_groups")
        .select("id, name, max_members")
        .eq("invite_code", inviteCode.trim().toLowerCase())
        .eq("is_active", true)
        .single();
      if (lookupError || !group) throw new Error("Invalid invite code. Please check and try again.");

      // Check member count
      const { count } = await supabase
        .from("ministry_group_members")
        .select("id", { count: "exact", head: true })
        .eq("group_id", group.id);
      if ((count || 0) >= group.max_members) throw new Error("This group is full.");

      // Join
      const { error } = await supabase
        .from("ministry_group_members")
        .insert({ group_id: group.id, user_id: user!.id, role: "student" });
      if (error) {
        if (error.code === "23505") throw new Error("You're already in this group.");
        throw error;
      }
      return group;
    },
    onSuccess: (group) => {
      queryClient.invalidateQueries({ queryKey: ["ministry-groups-joined"] });
      toast({ title: "Joined group!", description: `You've joined "${group.name}".` });
    },
    onError: (error) => {
      toast({ title: "Couldn't join", description: error.message, variant: "destructive" });
    },
  });

  // Get members of a group (for leaders)
  const useGroupMembers = (groupId: string | null) =>
    useQuery({
      queryKey: ["ministry-group-members", groupId],
      queryFn: async () => {
        const { data: members, error } = await supabase
          .from("ministry_group_members")
          .select("*")
          .eq("group_id", groupId!);
        if (error) throw error;

        // Fetch profiles for each member
        const userIds = members.map(m => m.user_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, email, greek_organization")
          .in("id", userIds);

        const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
        return members.map(m => ({
          ...m,
          profile: profileMap.get(m.user_id) || null,
        })) as GroupMember[];
      },
      enabled: !!groupId,
    });

  // Remove member
  const removeMember = useMutation({
    mutationFn: async ({ memberId, groupId }: { memberId: string; groupId: string }) => {
      const { error } = await supabase
        .from("ministry_group_members")
        .delete()
        .eq("id", memberId)
        .eq("group_id", groupId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ministry-group-members"] });
      toast({ title: "Member removed" });
    },
  });

  return {
    ledGroups: ledGroups || [],
    joinedGroups: joinedGroups || [],
    isLoading: loadingLed || loadingJoined,
    createGroup,
    joinGroup,
    useGroupMembers,
    removeMember,
  };
}
