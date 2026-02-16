import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, FileText, Megaphone, Share2, CheckCircle, XCircle, Edit, Eye, Globe, Lightbulb, TrendingUp, Target, Twitter, Instagram, Facebook, Hash, Link2, Copy, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Progress } from "@/components/ui/progress";

type ContentDraft = {
  id: string;
  content_type: string;
  title: string;
  slug: string | null;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  seo_title: string | null;
  keywords: string[] | null;
  status: string;
  editor_notes: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  twitter_caption: string | null;
  instagram_caption: string | null;
  hashtags: string[] | null;
  internal_links: string[] | null;
};

type TopicSuggestion = {
  title: string;
  keywords: string[];
  audience_reach_score: number;
  virality_score: number;
  trend_category: "rising_trend" | "peak_trend" | "evergreen" | "seasonal";
  rationale: string;
};

const CONTENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  blog_post: <FileText className="w-4 h-4" />,
  pr_release: <Megaphone className="w-4 h-4" />,
  social_media: <Share2 className="w-4 h-4" />,
};

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  approved: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  published: "bg-green-500/20 text-green-700 dark:text-green-400",
  rejected: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-orange-600 dark:text-orange-400";
};

const getScoreBarColor = (score: number) => {
  if (score >= 80) return "[&>div]:bg-green-500";
  if (score >= 60) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-orange-500";
};

export default function ContentAgent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [contentType, setContentType] = useState("blog_post");
  const [selectedDraft, setSelectedDraft] = useState<ContentDraft | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editorNotes, setEditorNotes] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: drafts, isLoading } = useQuery({
    queryKey: ["content-drafts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_drafts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ContentDraft[];
    },
  });

  const suggestMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("suggest-topics", {
        body: { content_type: contentType },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data.suggestions as TopicSuggestion[];
    },
    onSuccess: (data) => {
      setSuggestions(data);
      setShowSuggestions(true);
      toast({ title: "Topics suggested!", description: `${data.length} topic ideas with SEO analysis ready.` });
    },
    onError: (err: Error) => {
      toast({ title: "Suggestion failed", description: err.message, variant: "destructive" });
    },
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: {
          content_type: contentType,
          topic,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast({ title: "Content generated!", description: "Your AI draft is ready for review." });
      queryClient.invalidateQueries({ queryKey: ["content-drafts"] });
      setTopic("");
      setKeywords("");
    },
    onError: (err: Error) => {
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, unknown> }) => {
      const { error } = await supabase.from("content_drafts").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-drafts"] });
      toast({ title: "Content updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    },
  });

  const useSuggestion = (suggestion: TopicSuggestion) => {
    setTopic(suggestion.title);
    setKeywords(suggestion.keywords.join(", "));
    setShowSuggestions(false);
    toast({ title: "Topic loaded", description: "Edit if needed, then hit Generate Draft." });
  };

  const openEditor = (draft: ContentDraft) => {
    setSelectedDraft(draft);
    setEditTitle(draft.title);
    setEditContent(draft.content);
    setEditorNotes(draft.editor_notes || "");
    setPreviewMode(false);
  };

  const saveDraft = () => {
    if (!selectedDraft) return;
    updateMutation.mutate({
      id: selectedDraft.id,
      updates: { title: editTitle, content: editContent, editor_notes: editorNotes },
    });
    setSelectedDraft(null);
  };

  const changeStatus = (id: string, status: string) => {
    const updates: Record<string, unknown> = { status };
    if (status === "published") updates.published_at = new Date().toISOString();
    updateMutation.mutate({ id, updates });
  };

  const filterByStatus = (status: string) =>
    drafts?.filter((d) => d.status === status) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Content Agent</h1>
        <p className="text-muted-foreground mt-1">
          Auto-draft blog posts, PR releases, and social media content. Review and approve before publishing.
        </p>
      </div>

      {/* Topic Suggestions */}
      <Card className="border-dashed border-2 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            AI Topic Suggestions
          </CardTitle>
          <CardDescription>
            Get AI-recommended topics with SEO keywords and audience reach scores.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog_post">📝 Blog Post</SelectItem>
                <SelectItem value="pr_release">📢 PR Release</SelectItem>
                <SelectItem value="social_media">📱 Social Media</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => suggestMutation.mutate()}
              disabled={suggestMutation.isPending}
            >
              {suggestMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Suggest Topics
                </>
              )}
            </Button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <Card key={i} className="bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer" onClick={() => useSuggestion(s)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>
                          <h4 className="font-semibold text-sm leading-tight">{s.title}</h4>
                          <Badge variant={s.trend_category === "peak_trend" ? "destructive" : s.trend_category === "rising_trend" ? "default" : "secondary"} className="text-[9px] px-1.5 py-0">
                            {s.trend_category === "rising_trend" ? "🔥 Rising" : s.trend_category === "peak_trend" ? "🚀 Peak" : s.trend_category === "evergreen" ? "🌿 Evergreen" : "📅 Seasonal"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {s.keywords.map((kw) => (
                            <Badge key={kw} variant="secondary" className="text-[10px] px-1.5 py-0">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{s.rationale}</p>
                      </div>
                      <div className="flex-shrink-0 flex gap-3">
                        <div className="text-center w-16">
                          <div className={`text-xl font-bold ${getScoreColor(s.audience_reach_score)}`}>
                            {s.audience_reach_score}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Reach</div>
                          <Progress value={s.audience_reach_score} className={`h-1.5 mt-1 ${getScoreBarColor(s.audience_reach_score)}`} />
                        </div>
                        <div className="text-center w-16">
                          <div className={`text-xl font-bold ${getScoreColor(s.virality_score)}`}>
                            {s.virality_score}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Viral</div>
                          <Progress value={s.virality_score} className={`h-1.5 mt-1 ${getScoreBarColor(s.virality_score)}`} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-primary font-medium">
                      <TrendingUp className="w-3 h-3" />
                      Click to use this topic
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generator Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sacred" />
            Generate Content
          </CardTitle>
          <CardDescription>
            AI will draft SEO-optimized content based on your topic and keywords.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog_post">📝 Blog Post</SelectItem>
                <SelectItem value="pr_release">📢 PR Release</SelectItem>
                <SelectItem value="social_media">📱 Social Media Pack</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Topic (e.g., Faith and Greek Life Balance)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Input
              placeholder="Keywords (comma-separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <Button
            onClick={() => generateMutation.mutate()}
            disabled={!topic || generateMutation.isPending}
            className="w-full md:w-auto"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Draft
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="draft">
        <TabsList>
          <TabsTrigger value="draft">
            Drafts ({filterByStatus("draft").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({filterByStatus("approved").length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Published ({filterByStatus("published").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({filterByStatus("rejected").length})
          </TabsTrigger>
        </TabsList>

        {["draft", "approved", "published", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filterByStatus(status).length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No {status} content yet.</p>
            ) : (
              filterByStatus(status).map((draft) => (
                <Card key={draft.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {CONTENT_TYPE_ICONS[draft.content_type]}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{draft.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {draft.content_type.replace("_", " ")} · {new Date(draft.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Badge className={STATUS_COLORS[draft.status]}>{draft.status}</Badge>
                      {/* Social Share Buttons */}
                      {draft.twitter_caption && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          title="Post to X"
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = encodeURIComponent(
                              draft.twitter_caption + (draft.hashtags?.length ? "\n\n" + draft.hashtags.map(h => `#${h}`).join(" ") : "")
                            );
                            window.open(`https://x.com/intent/tweet?text=${text}`, "_blank", "width=550,height=420");
                          }}
                        >
                          <Twitter className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      {draft.twitter_caption && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          title="Share to Facebook"
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = encodeURIComponent(
                              draft.twitter_caption + (draft.hashtags?.length ? "\n\n" + draft.hashtags.map(h => `#${h}`).join(" ") : "")
                            );
                            window.open(`https://www.facebook.com/sharer/sharer.php?quote=${text}`, "_blank", "width=550,height=420");
                          }}
                        >
                          <Facebook className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      {draft.instagram_caption && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          title="Copy for Instagram"
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = draft.instagram_caption + (draft.hashtags?.length ? "\n\n" + draft.hashtags.map(h => `#${h}`).join(" ") : "");
                            navigator.clipboard.writeText(text);
                            toast({ title: "📋 Copied for Instagram!", description: "Paste into Instagram app." });
                          }}
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEditor(draft)}>
                            <Edit className="w-3 h-3 mr-1" /> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Content</DialogTitle>
                          </DialogHeader>
                          {selectedDraft?.id === draft.id && (
                            <div className="space-y-4">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                              />
                              <div className="flex gap-2">
                                <Button
                                  variant={previewMode ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => setPreviewMode(false)}
                                >
                                  <Edit className="w-3 h-3 mr-1" /> Edit
                                </Button>
                                <Button
                                  variant={previewMode ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setPreviewMode(true)}
                                >
                                  <Eye className="w-3 h-3 mr-1" /> Preview
                                </Button>
                              </div>
                              {previewMode ? (
                                <div className="prose dark:prose-invert max-w-none border rounded-md p-4 min-h-[300px]">
                                  <ReactMarkdown>{editContent}</ReactMarkdown>
                                </div>
                              ) : (
                                <Textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  rows={15}
                                  className="font-mono text-sm"
                                />
                              )}
                              <Textarea
                                value={editorNotes}
                                onChange={(e) => setEditorNotes(e.target.value)}
                                placeholder="Editor notes (internal only)"
                                rows={2}
                              />
                              {/* Social Snippets */}
                              {(draft.twitter_caption || draft.instagram_caption || (draft.hashtags && draft.hashtags.length > 0)) && (
                                <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                                  <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <Share2 className="w-4 h-4" /> Social Media Snippets
                                  </h4>
                                  {draft.twitter_caption && (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                        <Twitter className="w-3 h-3" /> Twitter/X
                                        <Button variant="ghost" size="sm" className="h-5 px-1 ml-auto" onClick={() => { navigator.clipboard.writeText(draft.twitter_caption); toast({ title: "Copied!" }); }}>
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                      </div>
                                      <p className="text-xs bg-background rounded p-2">{draft.twitter_caption}</p>
                                    </div>
                                  )}
                                  {draft.instagram_caption && (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                        <Instagram className="w-3 h-3" /> Instagram
                                        <Button variant="ghost" size="sm" className="h-5 px-1 ml-auto" onClick={() => { navigator.clipboard.writeText(draft.instagram_caption); toast({ title: "Copied!" }); }}>
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                      </div>
                                      <p className="text-xs bg-background rounded p-2 whitespace-pre-wrap">{draft.instagram_caption}</p>
                                    </div>
                                  )}
                                  {draft.hashtags && draft.hashtags.length > 0 && (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                        <Hash className="w-3 h-3" /> Hashtags
                                        <Button variant="ghost" size="sm" className="h-5 px-1 ml-auto" onClick={() => { navigator.clipboard.writeText(draft.hashtags.map((h: string) => `#${h}`).join(" ")); toast({ title: "Copied!" }); }}>
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {draft.hashtags.map((h: string) => (
                                          <Badge key={h} variant="secondary" className="text-[10px]">#{h}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {draft.internal_links && draft.internal_links.length > 0 && (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                        <Link2 className="w-3 h-3" /> Internal Links
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {draft.internal_links.map((link: string) => (
                                          <Badge key={link} variant="outline" className="text-[10px]">{link}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex gap-2 flex-wrap">
                                <Button onClick={saveDraft}>Save Changes</Button>
                                {draft.status === "draft" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      className="text-green-600"
                                      onClick={() => {
                                        saveDraft();
                                        changeStatus(draft.id, "approved");
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="text-red-600"
                                      onClick={() => changeStatus(draft.id, "rejected")}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                  </>
                                )}
                                {draft.status === "approved" && (
                                  <Button
                                    variant="outline"
                                    className="text-green-600"
                                    onClick={() => changeStatus(draft.id, "published")}
                                  >
                                    <Globe className="w-4 h-4 mr-1" /> Publish
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {status === "draft" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => changeStatus(draft.id, "approved")}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      {status === "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => changeStatus(draft.id, "published")}
                        >
                          <Globe className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
