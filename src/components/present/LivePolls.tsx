import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3, Plus, Trash2, Play, Square, MessageCircleQuestion,
  Vote, Check, Copy, Users, ThumbsUp, Eye, EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface PollOption {
  label: string;
}

interface LivePoll {
  id: string;
  user_id: string;
  title: string;
  poll_type: string;
  options_json: PollOption[];
  is_active: boolean;
  is_anonymous: boolean;
  allow_multiple: boolean;
  share_code: string;
  created_at: string;
  updated_at: string;
}

interface PollResponse {
  id: string;
  poll_id: string;
  user_id: string | null;
  option_index: number | null;
  question_text: string | null;
  upvotes: number;
  is_answered: boolean;
  is_moderated: boolean;
  created_at: string;
}

export function LivePolls() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LivePoll | null>(null);
  const [activePoll, setActivePoll] = useState<LivePoll | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"poll" | "qa">("poll");
  const [newOptions, setNewOptions] = useState(["", "", ""]);
  const [questionText, setQuestionText] = useState("");

  // Fetch user's polls
  const { data: polls = [], isLoading } = useQuery({
    queryKey: ["live-polls", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_polls")
        .select("*")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as LivePoll[];
    },
    enabled: !!user,
  });

  // Fetch responses for active poll
  const { data: responses = [] } = useQuery({
    queryKey: ["poll-responses", activePoll?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_poll_responses")
        .select("*")
        .eq("poll_id", activePoll!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as PollResponse[];
    },
    enabled: !!activePoll,
  });

  // Realtime subscription for responses
  useEffect(() => {
    if (!activePoll) return;
    const channel = supabase
      .channel(`poll-${activePoll.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "live_poll_responses", filter: `poll_id=eq.${activePoll.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["poll-responses", activePoll.id] });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activePoll?.id]);

  // Create poll
  const createPoll = useMutation({
    mutationFn: async () => {
      const options = newType === "poll"
        ? newOptions.filter(o => o.trim()).map(label => ({ label }))
        : [];
      const { error } = await supabase.from("live_polls").insert({
        user_id: user!.id,
        title: newTitle || "Untitled Poll",
        poll_type: newType,
        options_json: options as unknown as any,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-polls"] });
      toast({ title: "Poll created!" });
      setCreateOpen(false);
      setNewTitle("");
      setNewOptions(["", "", ""]);
    },
  });

  // Toggle active
  const toggleActive = useMutation({
    mutationFn: async (poll: LivePoll) => {
      const { error } = await supabase
        .from("live_polls")
        .update({ is_active: !poll.is_active })
        .eq("id", poll.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-polls"] });
    },
  });

  // Delete poll
  const deletePoll = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("live_polls").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["live-polls"] });
      toast({ title: "Poll deleted" });
      setDeleteTarget(null);
      if (activePoll && deleteTarget && activePoll.id === deleteTarget.id) setActivePoll(null);
    },
  });

  // Submit vote
  const submitVote = useMutation({
    mutationFn: async (optionIndex: number) => {
      const { error } = await supabase.from("live_poll_responses").insert({
        poll_id: activePoll!.id,
        user_id: user!.id,
        option_index: optionIndex,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poll-responses", activePoll?.id] });
      toast({ title: "Vote submitted!" });
    },
  });

  // Submit Q&A question
  const submitQuestion = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("live_poll_responses").insert({
        poll_id: activePoll!.id,
        user_id: user!.id,
        question_text: questionText,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poll-responses", activePoll?.id] });
      setQuestionText("");
      toast({ title: "Question submitted!" });
    },
  });

  // Mark Q&A as answered
  const markAnswered = useMutation({
    mutationFn: async (responseId: string) => {
      const { error } = await supabase
        .from("live_poll_responses")
        .update({ is_answered: true })
        .eq("id", responseId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["poll-responses", activePoll?.id] }),
  });

  // Vote tallies for active poll
  const voteTallies = activePoll?.poll_type === "poll"
    ? (activePoll.options_json || []).map((_, i) =>
        responses.filter(r => r.option_index === i).length
      )
    : [];
  const totalVotes = voteTallies.reduce((a, b) => a + b, 0);

  const hasVoted = responses.some(r => r.user_id === user?.id && r.option_index !== null);

  const copyShareCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Share code copied!" });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activePoll ? "results" : "manage"}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="manage" className="gap-1.5 text-xs">
              <BarChart3 className="w-3.5 h-3.5" /> My Polls
            </TabsTrigger>
            {activePoll && (
              <TabsTrigger value="results" className="gap-1.5 text-xs">
                <Eye className="w-3.5 h-3.5" /> Live Results
              </TabsTrigger>
            )}
          </TabsList>
          <Button onClick={() => setCreateOpen(true)} className="gap-2 rounded-xl" size="sm">
            <Plus className="w-4 h-4" /> New Poll
          </Button>
        </div>

        {/* Manage tab */}
        <TabsContent value="manage" className="mt-4">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : polls.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No polls yet</p>
              <p className="text-sm text-muted-foreground mb-4">Create a poll or Q&A to engage your audience</p>
              <Button onClick={() => setCreateOpen(true)} className="rounded-xl gap-2" size="sm">
                <Plus className="w-4 h-4" /> Create Poll
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {polls.map(poll => {
                const isPoll = poll.poll_type === "poll";
                const Icon = isPoll ? Vote : MessageCircleQuestion;
                return (
                  <Card key={poll.id} className="group hover:shadow-md transition-all border-border/30">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge variant={poll.is_active ? "default" : "secondary"} className="text-[10px]">
                            {poll.is_active ? "Live" : "Draft"}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {isPoll ? `${(poll.options_json || []).length} options` : "Q&A"}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{poll.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Code: <span className="font-mono">{poll.share_code}</span>
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant={poll.is_active ? "destructive" : "default"}
                          className="flex-1 gap-1 text-xs rounded-lg"
                          onClick={() => toggleActive.mutate(poll)}
                        >
                          {poll.is_active ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          {poll.is_active ? "Stop" : "Go Live"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs"
                          onClick={() => { setActivePoll(poll); }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-xs"
                          onClick={() => copyShareCode(poll.share_code)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive text-xs"
                          onClick={() => setDeleteTarget(poll)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Live Results tab */}
        {activePoll && (
          <TabsContent value="results" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {activePoll.poll_type === "poll" ? (
                      <Vote className="w-5 h-5 text-cyan-500" />
                    ) : (
                      <MessageCircleQuestion className="w-5 h-5 text-cyan-500" />
                    )}
                    {activePoll.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={activePoll.is_active ? "default" : "secondary"}>
                      {activePoll.is_active ? "Live" : "Stopped"}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="w-3 h-3" /> {responses.length} responses
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activePoll.poll_type === "poll" ? (
                  <>
                    {/* Poll results */}
                    <div className="space-y-3">
                      {(activePoll.options_json || []).map((opt, i) => {
                        const count = voteTallies[i] || 0;
                        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{opt.label}</span>
                              <span className="text-muted-foreground text-xs">{count} votes ({pct}%)</span>
                            </div>
                            <Progress value={pct} className="h-3" />
                          </div>
                        );
                      })}
                    </div>
                    {/* Vote buttons for participants */}
                    {activePoll.is_active && !hasVoted && activePoll.user_id !== user?.id && (
                      <div className="border-t border-border/50 pt-4 space-y-2">
                        <p className="text-sm font-medium text-foreground">Cast your vote:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(activePoll.options_json || []).map((opt, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              className="text-xs"
                              onClick={() => submitVote.mutate(i)}
                              disabled={submitVote.isPending}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    {hasVoted && (
                      <p className="text-xs text-muted-foreground text-center">✓ You've voted</p>
                    )}
                  </>
                ) : (
                  <>
                    {/* Q&A list */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {responses.filter(r => r.question_text).length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground text-sm">No questions yet</p>
                      ) : (
                        responses
                          .filter(r => r.question_text)
                          .sort((a, b) => b.upvotes - a.upvotes)
                          .map(r => (
                            <div
                              key={r.id}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-lg border",
                                r.is_answered ? "bg-muted/30 border-border/30" : "border-border/50"
                              )}
                            >
                              <div className="flex flex-col items-center gap-0.5">
                                <Button variant="ghost" size="icon" className="w-6 h-6">
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <span className="text-[10px] text-muted-foreground">{r.upvotes}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground">{r.question_text}</p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  {new Date(r.created_at).toLocaleTimeString()}
                                </p>
                              </div>
                              {activePoll.user_id === user?.id && !r.is_answered && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs gap-1"
                                  onClick={() => markAnswered.mutate(r.id)}
                                >
                                  <Check className="w-3 h-3" /> Done
                                </Button>
                              )}
                              {r.is_answered && (
                                <Badge variant="secondary" className="text-[10px]">Answered</Badge>
                              )}
                            </div>
                          ))
                      )}
                    </div>
                    {/* Submit question */}
                    {activePoll.is_active && (
                      <div className="flex gap-2 border-t border-border/50 pt-4">
                        <Input
                          value={questionText}
                          onChange={e => setQuestionText(e.target.value)}
                          placeholder="Ask a question..."
                          className="text-sm h-9"
                          onKeyDown={e => e.key === "Enter" && questionText.trim() && submitQuestion.mutate()}
                        />
                        <Button
                          size="sm"
                          onClick={() => submitQuestion.mutate()}
                          disabled={!questionText.trim() || submitQuestion.isPending}
                        >
                          Ask
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Poll</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="What's your question?" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Type</label>
              <Select value={newType} onValueChange={v => setNewType(v as "poll" | "qa")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="poll">Multiple Choice Poll</SelectItem>
                  <SelectItem value="qa">Open Q&A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newType === "poll" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Options</label>
                {newOptions.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={opt}
                      onChange={e => {
                        const next = [...newOptions];
                        next[i] = e.target.value;
                        setNewOptions(next);
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="text-sm"
                    />
                    {newOptions.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 w-9 h-9"
                        onClick={() => setNewOptions(newOptions.filter((_, j) => j !== i))}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
                {newOptions.length < 6 && (
                  <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setNewOptions([...newOptions, ""])}>
                    <Plus className="w-3 h-3" /> Add Option
                  </Button>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => createPoll.mutate()} disabled={createPoll.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete poll?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteTarget?.title}" and all responses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deletePoll.mutate(deleteTarget.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
