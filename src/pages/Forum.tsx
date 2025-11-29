import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Eye,
  Clock,
  Filter,
  Users,
  Pin,
  PinOff,
  Send,
  ChevronDown,
  ChevronUp,
  Award,
  MoreVertical,
  Shield,
  CheckCircle2,
  Pencil,
  Trash2,
  AtSign,
} from "lucide-react";
import { toast } from "sonner";
import { GREEK_COUNCILS } from "@/data/greekOrganizations";
import { formatDistanceToNow } from "date-fns";
import { useGamification } from "@/hooks/use-gamification";
import { ForumNotifications } from "@/components/forum/ForumNotifications";

interface Discussion {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  greek_council: string | null;
  greek_organization: string | null;
  is_pinned: boolean;
  view_count: number;
  reply_count: number;
  created_at: string;
  profiles?: {
    full_name: string | null;
    greek_organization: string | null;
  };
}

interface Reply {
  id: string;
  discussion_id: string;
  user_id: string;
  content: string;
  is_best_answer: boolean;
  created_at: string;
  profiles?: {
    full_name: string | null;
    greek_organization: string | null;
  };
}

interface UserProfile {
  id: string;
  full_name: string | null;
  greek_organization: string | null;
}

const CATEGORIES = [
  { value: "general", label: "General Discussion" },
  { value: "faith", label: "Faith & Greek Life" },
  { value: "chapter", label: "Chapter Leadership" },
  { value: "service", label: "Community Service" },
  { value: "prayer", label: "Prayer Requests" },
  { value: "testimony", label: "Testimonies" },
  { value: "questions", label: "Questions" },
];

// Parse @mentions from content
const parseMentions = (content: string): string[] => {
  const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
  const mentions: string[] = [];
  let match;
  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[2]); // user_id
  }
  return mentions;
};

// Render content with highlighted mentions
const renderContentWithMentions = (content: string) => {
  const parts = content.split(/(@\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const mentionMatch = part.match(/@\[([^\]]+)\]\(([^)]+)\)/);
    if (mentionMatch) {
      return (
        <span key={index} className="text-primary font-medium bg-primary/10 px-1 rounded">
          @{mentionMatch[1]}
        </span>
      );
    }
    return part;
  });
};

const Forum = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { awardPoints } = useGamification();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCouncil, setFilterCouncil] = useState<string>("all");
  const [newDiscussionOpen, setNewDiscussionOpen] = useState(false);
  const [expandedDiscussion, setExpandedDiscussion] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  
  // Edit states
  const [editingDiscussion, setEditingDiscussion] = useState<Discussion | null>(null);
  const [editDiscussionTitle, setEditDiscussionTitle] = useState("");
  const [editDiscussionContent, setEditDiscussionContent] = useState("");
  const [editingReply, setEditingReply] = useState<Reply | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  
  // Delete states
  const [deletingDiscussion, setDeletingDiscussion] = useState<Discussion | null>(null);
  const [deletingReply, setDeletingReply] = useState<Reply | null>(null);
  
  // Mention states
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [activeMentionField, setActiveMentionField] = useState<string | null>(null);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  // Check if user is admin
  const { data: isAdmin = false } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
    enabled: !!user,
  });

  const { data: userProfile } = useQuery({
    queryKey: ["forum-user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("greek_council, greek_organization, full_name")
        .eq("id", user.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  // Search users for mentions
  const { data: mentionUsers = [] } = useQuery({
    queryKey: ["mention-users", mentionQuery],
    queryFn: async () => {
      if (!mentionQuery || mentionQuery.length < 2) return [];
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, greek_organization")
        .ilike("full_name", `%${mentionQuery}%`)
        .limit(5);
      return (data || []) as UserProfile[];
    },
    enabled: mentionQuery.length >= 2,
  });

  const { data: discussions = [], isLoading } = useQuery({
    queryKey: ["forum-discussions", filterCategory, filterCouncil],
    queryFn: async () => {
      let query = supabase
        .from("forum_discussions")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (filterCategory !== "all") {
        query = query.eq("category", filterCategory);
      }
      if (filterCouncil !== "all") {
        query = query.eq("greek_council", filterCouncil);
      }

      const { data, error } = await query;
      if (error) throw error;

      const userIds = [...new Set((data || []).map((d) => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, greek_organization")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]));
      return (data || []).map((d) => ({
        ...d,
        profiles: profileMap.get(d.user_id),
      })) as Discussion[];
    },
  });

  const { data: replies = [] } = useQuery({
    queryKey: ["forum-replies", expandedDiscussion],
    queryFn: async () => {
      if (!expandedDiscussion) return [];
      const { data, error } = await supabase
        .from("forum_replies")
        .select("*")
        .eq("discussion_id", expandedDiscussion)
        .order("is_best_answer", { ascending: false })
        .order("created_at", { ascending: true });

      if (error) throw error;

      const userIds = [...new Set((data || []).map((r) => r.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, greek_organization")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]));
      return (data || []).map((r) => ({
        ...r,
        profiles: profileMap.get(r.user_id),
      })) as Reply[];
    },
    enabled: !!expandedDiscussion,
  });

  // Send mention notifications
  const sendMentionNotifications = async (content: string, discussionId: string, replyId?: string) => {
    const mentionedUserIds = parseMentions(content);
    const uniqueUserIds = [...new Set(mentionedUserIds)].filter(id => id !== user?.id);
    
    for (const userId of uniqueUserIds) {
      await supabase.from("forum_notifications").insert({
        user_id: userId,
        discussion_id: discussionId,
        reply_id: replyId || null,
        notification_type: "mention",
        title: "You were mentioned!",
        message: `${userProfile?.full_name || "Someone"} mentioned you in a discussion`,
      });
    }
  };

  const createDiscussionMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in");
      const { data, error } = await supabase.from("forum_discussions").insert({
        user_id: user.id,
        title: newTitle,
        content: newContent,
        category: newCategory,
        greek_council: userProfile?.greek_council,
        greek_organization: userProfile?.greek_organization,
      }).select().single();
      if (error) throw error;
      
      // Send mention notifications
      await sendMentionNotifications(newContent, data.id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      setNewDiscussionOpen(false);
      setNewTitle("");
      setNewContent("");
      setNewCategory("general");
      toast.success("Discussion created!");
      awardPoints({ points: 10, actionType: "forum_post" });
    },
    onError: () => toast.error("Failed to create discussion"),
  });

  const updateDiscussionMutation = useMutation({
    mutationFn: async ({ id, title, content }: { id: string; title: string; content: string }) => {
      const { error } = await supabase
        .from("forum_discussions")
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user?.id);
      if (error) throw error;
      
      // Send mention notifications for new mentions
      await sendMentionNotifications(content, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      setEditingDiscussion(null);
      toast.success("Discussion updated!");
    },
    onError: () => toast.error("Failed to update discussion"),
  });

  const deleteDiscussionMutation = useMutation({
    mutationFn: async (discussionId: string) => {
      // First delete related replies
      await supabase.from("forum_replies").delete().eq("discussion_id", discussionId);
      // Then delete the discussion
      const { error } = await supabase
        .from("forum_discussions")
        .delete()
        .eq("id", discussionId)
        .eq("user_id", user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      setDeletingDiscussion(null);
      if (expandedDiscussion === deletingDiscussion?.id) {
        setExpandedDiscussion(null);
      }
      toast.success("Discussion deleted!");
    },
    onError: () => toast.error("Failed to delete discussion"),
  });

  const createReplyMutation = useMutation({
    mutationFn: async (discussionId: string) => {
      if (!user) throw new Error("Must be logged in");
      const content = replyContent[discussionId];
      if (!content?.trim()) throw new Error("Reply cannot be empty");

      const { data, error } = await supabase.from("forum_replies").insert({
        discussion_id: discussionId,
        user_id: user.id,
        content: content.trim(),
      }).select().single();
      if (error) throw error;
      
      // Send mention notifications
      await sendMentionNotifications(content, discussionId, data.id);
      return data;
    },
    onSuccess: (_, discussionId) => {
      queryClient.invalidateQueries({ queryKey: ["forum-replies"] });
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      setReplyContent((prev) => ({ ...prev, [discussionId]: "" }));
      toast.success("Reply posted!");
      awardPoints({ points: 5, actionType: "forum_reply" });
    },
    onError: () => toast.error("Failed to post reply"),
  });

  const updateReplyMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      const { error } = await supabase
        .from("forum_replies")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user?.id);
      if (error) throw error;
      
      // Send mention notifications for new mentions
      if (expandedDiscussion) {
        await sendMentionNotifications(content, expandedDiscussion, id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-replies"] });
      setEditingReply(null);
      toast.success("Reply updated!");
    },
    onError: () => toast.error("Failed to update reply"),
  });

  const deleteReplyMutation = useMutation({
    mutationFn: async (replyId: string) => {
      const { error } = await supabase
        .from("forum_replies")
        .delete()
        .eq("id", replyId)
        .eq("user_id", user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-replies"] });
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      setDeletingReply(null);
      toast.success("Reply deleted!");
    },
    onError: () => toast.error("Failed to delete reply"),
  });

  const togglePinMutation = useMutation({
    mutationFn: async ({ discussionId, isPinned }: { discussionId: string; isPinned: boolean }) => {
      const { error } = await supabase
        .from("forum_discussions")
        .update({ is_pinned: !isPinned })
        .eq("id", discussionId);
      if (error) throw error;
    },
    onSuccess: (_, { isPinned }) => {
      queryClient.invalidateQueries({ queryKey: ["forum-discussions"] });
      toast.success(isPinned ? "Discussion unpinned" : "Discussion pinned");
    },
    onError: () => toast.error("Failed to update discussion"),
  });

  const toggleBestAnswerMutation = useMutation({
    mutationFn: async ({ replyId, isBestAnswer }: { replyId: string; isBestAnswer: boolean }) => {
      const { error } = await supabase
        .from("forum_replies")
        .update({ is_best_answer: !isBestAnswer })
        .eq("id", replyId);
      if (error) throw error;

      // Send notification if marking as best answer
      if (!isBestAnswer) {
        const reply = replies.find((r) => r.id === replyId);
        if (reply && reply.user_id !== user?.id) {
          await supabase.from("forum_notifications").insert({
            user_id: reply.user_id,
            discussion_id: expandedDiscussion,
            reply_id: replyId,
            notification_type: "best_answer",
            title: "Your answer was marked as best!",
            message: "Your reply was marked as the best answer",
          });
        }
      }
    },
    onSuccess: (_, { isBestAnswer }) => {
      queryClient.invalidateQueries({ queryKey: ["forum-replies"] });
      toast.success(isBestAnswer ? "Best answer removed" : "Marked as best answer");
    },
    onError: () => toast.error("Failed to update reply"),
  });

  const handleExpandDiscussion = async (discussionId: string) => {
    if (expandedDiscussion === discussionId) {
      setExpandedDiscussion(null);
    } else {
      setExpandedDiscussion(discussionId);
      await supabase
        .from("forum_discussions")
        .update({ view_count: discussions.find((d) => d.id === discussionId)?.view_count! + 1 })
        .eq("id", discussionId);
    }
  };

  const canMarkBestAnswer = (discussion: Discussion) => {
    return isAdmin || discussion.user_id === user?.id;
  };

  const handleTextareaChange = useCallback((fieldId: string, value: string, setter: (value: string) => void) => {
    setter(value);
    
    // Check for @ mention trigger
    const textarea = textareaRefs.current[fieldId];
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPos);
      const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
      
      if (mentionMatch) {
        setMentionQuery(mentionMatch[1]);
        setActiveMentionField(fieldId);
        setShowMentionPopover(true);
        
        // Calculate position
        const rect = textarea.getBoundingClientRect();
        setMentionPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      } else {
        setShowMentionPopover(false);
        setMentionQuery("");
      }
    }
  }, []);

  const insertMention = useCallback((fieldId: string, user: UserProfile, currentValue: string, setter: (value: string) => void) => {
    const textarea = textareaRefs.current[fieldId];
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = currentValue.substring(0, cursorPos);
      const textAfterCursor = currentValue.substring(cursorPos);
      
      // Remove the partial @mention
      const newTextBefore = textBeforeCursor.replace(/@\w*$/, '');
      const mention = `@[${user.full_name || 'User'}](${user.id})`;
      const newValue = newTextBefore + mention + ' ' + textAfterCursor;
      
      setter(newValue);
      setShowMentionPopover(false);
      setMentionQuery("");
      
      // Focus back on textarea
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = newTextBefore.length + mention.length + 1;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  }, []);

  const startEditDiscussion = (discussion: Discussion) => {
    setEditingDiscussion(discussion);
    setEditDiscussionTitle(discussion.title);
    setEditDiscussionContent(discussion.content);
  };

  const startEditReply = (reply: Reply) => {
    setEditingReply(reply);
    setEditReplyContent(reply.content);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Join the Discussion</h2>
          <p className="text-muted-foreground mb-4">
            Sign in to participate in community discussions
          </p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Community Forum
                {isAdmin && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground text-sm">
                Connect and discuss with fellow members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ForumNotifications />
            <Dialog open={newDiscussionOpen} onOpenChange={setNewDiscussionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start a Discussion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Discussion title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <div className="relative">
                    <Textarea
                      ref={(el) => { textareaRefs.current['new-discussion'] = el; }}
                      placeholder="Share your thoughts... Use @ to mention someone"
                      value={newContent}
                      onChange={(e) => handleTextareaChange('new-discussion', e.target.value, setNewContent)}
                      rows={4}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground flex items-center gap-1">
                      <AtSign className="h-3 w-3" />
                      to mention
                    </div>
                  </div>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full"
                    onClick={() => createDiscussionMutation.mutate()}
                    disabled={!newTitle.trim() || !newContent.trim()}
                  >
                    Post Discussion
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Mention Popover */}
        {showMentionPopover && mentionUsers.length > 0 && (
          <div
            className="fixed z-50 bg-popover border rounded-md shadow-md p-1 min-w-[200px]"
            style={{ top: mentionPosition.top, left: mentionPosition.left }}
          >
            {mentionUsers.map((mentionUser) => (
              <button
                key={mentionUser.id}
                className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm flex items-center gap-2"
                onClick={() => {
                  if (activeMentionField === 'new-discussion') {
                    insertMention('new-discussion', mentionUser, newContent, setNewContent);
                  } else if (activeMentionField === 'edit-discussion') {
                    insertMention('edit-discussion', mentionUser, editDiscussionContent, setEditDiscussionContent);
                  } else if (activeMentionField === 'edit-reply') {
                    insertMention('edit-reply', mentionUser, editReplyContent, setEditReplyContent);
                  } else if (activeMentionField?.startsWith('reply-')) {
                    const discussionId = activeMentionField.replace('reply-', '');
                    insertMention(activeMentionField, mentionUser, replyContent[discussionId] || '', (val) =>
                      setReplyContent((prev) => ({ ...prev, [discussionId]: val }))
                    );
                  }
                }}
              >
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{mentionUser.full_name || 'Unknown User'}</span>
                {mentionUser.greek_organization && (
                  <span className="text-xs text-muted-foreground">({mentionUser.greek_organization})</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Edit Discussion Dialog */}
        <Dialog open={!!editingDiscussion} onOpenChange={(open) => !open && setEditingDiscussion(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Discussion title"
                value={editDiscussionTitle}
                onChange={(e) => setEditDiscussionTitle(e.target.value)}
              />
              <div className="relative">
                <Textarea
                  ref={(el) => { textareaRefs.current['edit-discussion'] = el; }}
                  placeholder="Share your thoughts... Use @ to mention someone"
                  value={editDiscussionContent}
                  onChange={(e) => handleTextareaChange('edit-discussion', e.target.value, setEditDiscussionContent)}
                  rows={4}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground flex items-center gap-1">
                  <AtSign className="h-3 w-3" />
                  to mention
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => editingDiscussion && updateDiscussionMutation.mutate({
                  id: editingDiscussion.id,
                  title: editDiscussionTitle,
                  content: editDiscussionContent,
                })}
                disabled={!editDiscussionTitle.trim() || !editDiscussionContent.trim()}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Reply Dialog */}
        <Dialog open={!!editingReply} onOpenChange={(open) => !open && setEditingReply(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Reply</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="relative">
                <Textarea
                  ref={(el) => { textareaRefs.current['edit-reply'] = el; }}
                  placeholder="Edit your reply... Use @ to mention someone"
                  value={editReplyContent}
                  onChange={(e) => handleTextareaChange('edit-reply', e.target.value, setEditReplyContent)}
                  rows={4}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground flex items-center gap-1">
                  <AtSign className="h-3 w-3" />
                  to mention
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => editingReply && updateReplyMutation.mutate({
                  id: editingReply.id,
                  content: editReplyContent,
                })}
                disabled={!editReplyContent.trim()}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Discussion Alert */}
        <AlertDialog open={!!deletingDiscussion} onOpenChange={(open) => !open && setDeletingDiscussion(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Discussion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this discussion? This will also delete all replies and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deletingDiscussion && deleteDiscussionMutation.mutate(deletingDiscussion.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Reply Alert */}
        <AlertDialog open={!!deletingReply} onOpenChange={(open) => !open && setDeletingReply(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Reply</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this reply? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deletingReply && deleteReplyMutation.mutate(deletingReply.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCouncil} onValueChange={setFilterCouncil}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Council" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Councils</SelectItem>
                {GREEK_COUNCILS.map((council) => (
                  <SelectItem key={council.id} value={council.id}>
                    {council.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Discussions */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading discussions...</p>
            </Card>
          ) : discussions.length === 0 ? (
            <Card className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No discussions yet</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Be the first to start a conversation!
              </p>
              <Button onClick={() => setNewDiscussionOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            </Card>
          ) : (
            discussions.map((discussion) => (
              <Card key={discussion.id} className={`overflow-hidden ${discussion.is_pinned ? "border-primary/50" : ""}`}>
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleExpandDiscussion(discussion.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {discussion.is_pinned && (
                          <Badge variant="default" className="text-xs">
                            <Pin className="h-3 w-3 mr-1" />
                            Pinned
                          </Badge>
                        )}
                        <h3 className="font-semibold truncate">{discussion.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {renderContentWithMentions(discussion.content)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary">{discussion.category}</Badge>
                        {discussion.greek_council && (
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {GREEK_COUNCILS.find((c) => c.id === discussion.greek_council)?.name}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                        </span>
                        <span>by {discussion.profiles?.full_name || "Anonymous"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {discussion.view_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {discussion.reply_count}
                        </span>
                        {expandedDiscussion === discussion.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                      {(isAdmin || discussion.user_id === user?.id) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {discussion.user_id === user?.id && (
                              <>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditDiscussion(discussion);
                                  }}
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Discussion
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeletingDiscussion(discussion);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Discussion
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            {isAdmin && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePinMutation.mutate({
                                    discussionId: discussion.id,
                                    isPinned: discussion.is_pinned,
                                  });
                                }}
                              >
                                {discussion.is_pinned ? (
                                  <>
                                    <PinOff className="h-4 w-4 mr-2" />
                                    Unpin Discussion
                                  </>
                                ) : (
                                  <>
                                    <Pin className="h-4 w-4 mr-2" />
                                    Pin Discussion
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Discussion */}
                {expandedDiscussion === discussion.id && (
                  <div className="border-t bg-muted/30 p-4 space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{renderContentWithMentions(discussion.content)}</p>
                    </div>

                    {/* Replies */}
                    {replies.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">
                          Replies ({replies.length})
                        </h4>
                        {replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`bg-background rounded-lg p-3 border ${
                              reply.is_best_answer ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""
                            }`}
                          >
                            {reply.is_best_answer && (
                              <div className="flex items-center gap-1 text-green-600 text-xs font-medium mb-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Best Answer
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap mb-2">
                              {renderContentWithMentions(reply.content)}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{reply.profiles?.full_name || "Anonymous"}</span>
                                <span>•</span>
                                <span>
                                  {formatDistanceToNow(new Date(reply.created_at), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {reply.user_id === user?.id && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs"
                                      onClick={() => startEditReply(reply)}
                                    >
                                      <Pencil className="h-3 w-3 mr-1" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-xs text-destructive hover:text-destructive"
                                      onClick={() => setDeletingReply(reply)}
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </Button>
                                  </>
                                )}
                                {canMarkBestAnswer(discussion) && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() =>
                                      toggleBestAnswerMutation.mutate({
                                        replyId: reply.id,
                                        isBestAnswer: reply.is_best_answer,
                                      })
                                    }
                                  >
                                    <Award className="h-3 w-3 mr-1" />
                                    {reply.is_best_answer ? "Remove Best" : "Mark Best"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Textarea
                          ref={(el) => { textareaRefs.current[`reply-${discussion.id}`] = el; }}
                          placeholder="Write a reply... Use @ to mention someone"
                          value={replyContent[discussion.id] || ""}
                          onChange={(e) =>
                            handleTextareaChange(`reply-${discussion.id}`, e.target.value, (val) =>
                              setReplyContent((prev) => ({
                                ...prev,
                                [discussion.id]: val,
                              }))
                            )
                          }
                          rows={2}
                          className="pr-16"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground flex items-center gap-1">
                          <AtSign className="h-3 w-3" />
                        </div>
                      </div>
                      <Button
                        size="icon"
                        onClick={() => createReplyMutation.mutate(discussion.id)}
                        disabled={!replyContent[discussion.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
