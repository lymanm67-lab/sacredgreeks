import { useState } from "react";
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
  ArrowLeft,
  MessageSquare,
  Plus,
  Eye,
  Clock,
  Filter,
  Users,
  Pin,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { GREEK_COUNCILS } from "@/data/greekOrganizations";
import { formatDistanceToNow } from "date-fns";
import { useGamification } from "@/hooks/use-gamification";

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

const CATEGORIES = [
  { value: "general", label: "General Discussion" },
  { value: "faith", label: "Faith & Greek Life" },
  { value: "chapter", label: "Chapter Leadership" },
  { value: "service", label: "Community Service" },
  { value: "prayer", label: "Prayer Requests" },
  { value: "testimony", label: "Testimonies" },
  { value: "questions", label: "Questions" },
];

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

      // Fetch profiles separately
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
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Fetch profiles
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

  const createDiscussionMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in");
      const { error } = await supabase.from("forum_discussions").insert({
        user_id: user.id,
        title: newTitle,
        content: newContent,
        category: newCategory,
        greek_council: userProfile?.greek_council,
        greek_organization: userProfile?.greek_organization,
      });
      if (error) throw error;
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

  const createReplyMutation = useMutation({
    mutationFn: async (discussionId: string) => {
      if (!user) throw new Error("Must be logged in");
      const content = replyContent[discussionId];
      if (!content?.trim()) throw new Error("Reply cannot be empty");

      const { error } = await supabase.from("forum_replies").insert({
        discussion_id: discussionId,
        user_id: user.id,
        content: content.trim(),
      });
      if (error) throw error;
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

  const handleExpandDiscussion = async (discussionId: string) => {
    if (expandedDiscussion === discussionId) {
      setExpandedDiscussion(null);
    } else {
      setExpandedDiscussion(discussionId);
      // Increment view count
      await supabase
        .from("forum_discussions")
        .update({ view_count: discussions.find((d) => d.id === discussionId)?.view_count! + 1 })
        .eq("id", discussionId);
    }
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
              <h1 className="text-2xl font-bold">Community Forum</h1>
              <p className="text-muted-foreground text-sm">
                Connect and discuss with fellow members
              </p>
            </div>
          </div>

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
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                />
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
              <Card key={discussion.id} className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleExpandDiscussion(discussion.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {discussion.is_pinned && (
                          <Pin className="h-4 w-4 text-primary" />
                        )}
                        <h3 className="font-semibold truncate">{discussion.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {discussion.content}
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
                  </div>
                </div>

                {/* Expanded Discussion */}
                {expandedDiscussion === discussion.id && (
                  <div className="border-t bg-muted/30 p-4 space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{discussion.content}</p>
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
                            className="bg-background rounded-lg p-3 border"
                          >
                            <p className="text-sm whitespace-pre-wrap mb-2">
                              {reply.content}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{reply.profiles?.full_name || "Anonymous"}</span>
                              <span>•</span>
                              <span>
                                {formatDistanceToNow(new Date(reply.created_at), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent[discussion.id] || ""}
                        onChange={(e) =>
                          setReplyContent((prev) => ({
                            ...prev,
                            [discussion.id]: e.target.value,
                          }))
                        }
                        rows={2}
                        className="flex-1"
                      />
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
