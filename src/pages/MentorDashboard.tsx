import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Copy,
  Check,
  UserPlus,
  GraduationCap,
  Crown,
  MoreVertical,
  Trash2,
  BookOpen,
  ArrowRight,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMinistryGroups, type MinistryGroup } from "@/hooks/use-ministry-groups";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

function CopyInviteButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const inviteUrl = `${window.location.origin}/join-group?code=${code}`;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Invite Link"}
    </Button>
  );
}

function CreateGroupDialog() {
  const { createGroup } = useMinistryGroups();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;
    createGroup.mutate({ name: name.trim(), description: description.trim() }, {
      onSuccess: () => {
        setName("");
        setDescription("");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="create-group-desc">
        <DialogHeader>
          <DialogTitle>Create Ministry Group</DialogTitle>
          <DialogDescription id="create-group-desc">
            Create a private group and invite your students with a shareable link.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="e.g., Faith & Greek Life Study Group"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="group-desc">Description (optional)</Label>
            <Textarea
              id="group-desc"
              placeholder="What is this group about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
          <Button onClick={handleCreate} disabled={!name.trim() || createGroup.isPending} className="w-full">
            {createGroup.isPending ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function JoinGroupDialog() {
  const { joinGroup } = useMinistryGroups();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);

  const handleJoin = () => {
    if (!code.trim()) return;
    joinGroup.mutate(code.trim(), {
      onSuccess: () => {
        setCode("");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" /> Join Group
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="join-group-desc">
        <DialogHeader>
          <DialogTitle>Join a Ministry Group</DialogTitle>
          <DialogDescription id="join-group-desc">
            Enter the invite code shared by your pastor or mentor.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="invite-code">Invite Code</Label>
            <Input
              id="invite-code"
              placeholder="Enter invite code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={50}
            />
          </div>
          <Button onClick={handleJoin} disabled={!code.trim() || joinGroup.isPending} className="w-full">
            {joinGroup.isPending ? "Joining..." : "Join Group"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GroupMembersView({ group }: { group: MinistryGroup }) {
  const { useGroupMembers, removeMember } = useMinistryGroups();
  const { user } = useAuth();
  const { data: members, isLoading } = useGroupMembers(group.id);
  const isLeader = group.leader_id === user?.id;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred/10">
              <Users className="w-5 h-5 text-sacred" />
            </div>
            <div>
              <CardTitle className="text-base">{group.name}</CardTitle>
              {group.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{group.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {members?.length || 0} members
            </Badge>
            {isLeader && <CopyInviteButton code={group.invite_code} />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading members...</p>
        ) : !members?.length ? (
          <div className="text-center py-6">
            <Share2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No members yet.</p>
            <p className="text-xs text-muted-foreground">Share the invite link to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {member.profile?.full_name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.profile?.full_name || "Member"}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {member.profile?.greek_organization || "No org listed"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {member.role === "student" ? "Student" : member.role}
                  </Badge>
                  {isLeader && member.user_id !== user?.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => removeMember.mutate({ memberId: member.id, groupId: group.id })}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MentorDashboard() {
  const { user, profile } = useAuth();
  const { ledGroups, joinedGroups, isLoading } = useMinistryGroups();

  const isLeader = ledGroups.length > 0;
  const totalMembers = 0; // Will be populated per-group

  return (
    <div className="min-h-screen pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sacred/15 via-background to-indigo-500/5 border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred/10 border border-sacred/20 mb-3">
                <Crown className="w-3.5 h-3.5 text-sacred" />
                <span className="text-[11px] font-medium text-sacred">Mentor Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome, {profile?.full_name?.split(" ")[0] || "Leader"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your ministry groups and track student progress.
              </p>
            </div>
            <div className="flex gap-2">
              <CreateGroupDialog />
              <JoinGroupDialog />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue={isLeader ? "my-groups" : "joined"}>
          <TabsList className="mb-6">
            <TabsTrigger value="my-groups" className="gap-1.5">
              <Crown className="w-3.5 h-3.5" /> My Groups ({ledGroups.length})
            </TabsTrigger>
            <TabsTrigger value="joined" className="gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Joined ({joinedGroups.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4">
            {isLoading ? (
              <p className="text-muted-foreground text-sm">Loading...</p>
            ) : ledGroups.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <GraduationCap className="w-10 h-10 text-muted-foreground mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">No groups yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                    Create a ministry group and share the invite link with your students to start mentoring.
                  </p>
                  <CreateGroupDialog />
                </CardContent>
              </Card>
            ) : (
              ledGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GroupMembersView group={group} />
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="joined" className="space-y-4">
            {isLoading ? (
              <p className="text-muted-foreground text-sm">Loading...</p>
            ) : joinedGroups.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <UserPlus className="w-10 h-10 text-muted-foreground mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Not in any groups</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                    Ask your pastor or mentor for an invite code to join their ministry group.
                  </p>
                  <JoinGroupDialog />
                </CardContent>
              </Card>
            ) : (
              joinedGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GroupMembersView group={group} />
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
