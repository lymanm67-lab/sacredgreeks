import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Layers, Plus, Trash2, Edit2, Copy, Presentation, BookOpen, Users, Cross, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface SlideData {
  title: string;
  content: string;
  notes?: string;
  layout?: string;
}

interface SlideDeck {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_template: boolean;
  template_category: string | null;
  slides_json: SlideData[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// Pre-built PROOF templates
const PROOF_TEMPLATES: Omit<SlideDeck, "id" | "user_id" | "created_at" | "updated_at">[] = [
  {
    title: "PROOF Framework Overview",
    description: "5-slide introduction to the PROOF apologetics framework",
    is_template: true,
    template_category: "proof",
    is_public: true,
    slides_json: [
      { title: "PROOF Framework", content: "Providential history, Religious consistency, Organizational integrity, Operational fruit, Faith-based transformation", layout: "title" },
      { title: "P — Providential History", content: "Tracing God's hand through the founding and growth of Greek-letter organizations, connecting historical milestones to divine purpose.", notes: "Emphasize founding dates and spiritual motivations of founders" },
      { title: "R — Religious Consistency", content: "Examining how organizational rituals, symbols, and values align with Christian scripture and doctrine.", notes: "Reference specific hymns, prayers, and motto alignments" },
      { title: "O — Organizational Integrity", content: "Evaluating the ethical standards, accountability structures, and moral framework within Greek life.", notes: "Discuss chapter bylaws and national policies" },
      { title: "O — Operational Fruit", content: "Measuring the tangible community impact: service hours, scholarships, mentorship programs.", notes: "Use real statistics from D9 organizations" },
      { title: "F — Faith-Based Transformation", content: "Personal testimonies of spiritual growth and transformation through Greek membership.", notes: "Share 2-3 brief testimonials" },
    ],
  },
  {
    title: "Chapter Devotional",
    description: "Template for weekly chapter devotional presentations",
    is_template: true,
    template_category: "devotional",
    is_public: true,
    slides_json: [
      { title: "Weekly Devotional", content: "Theme: [Your Theme]\nDate: [Date]", layout: "title" },
      { title: "Opening Scripture", content: "[Scripture Reference]\n\n\"[Scripture Text]\"", notes: "Read aloud slowly, allow a moment of silence" },
      { title: "Reflection", content: "[Key reflection points connecting scripture to Greek life]", notes: "Ask 2-3 discussion questions" },
      { title: "Application", content: "How can we apply this to our chapter this week?", notes: "Encourage personal commitments" },
      { title: "Closing Prayer", content: "[Prayer text or prayer prompts]", notes: "Invite members to share prayer requests" },
    ],
  },
  {
    title: "Chapter Meeting Agenda",
    description: "Structured agenda template for chapter meetings",
    is_template: true,
    template_category: "chapter",
    is_public: true,
    slides_json: [
      { title: "Chapter Meeting", content: "[Chapter Name]\n[Date] • [Time]", layout: "title" },
      { title: "Call to Order", content: "• Roll Call\n• Approval of Minutes\n• Opening Prayer/Hymn" },
      { title: "Officer Reports", content: "• President's Report\n• Treasurer's Report\n• Secretary's Report\n• Committee Reports" },
      { title: "Old Business", content: "• [Pending items from previous meeting]\n• [Follow-up actions]" },
      { title: "New Business", content: "• [New proposals]\n• [Upcoming events]\n• [Announcements]" },
      { title: "Adjournment", content: "• Closing remarks\n• Next meeting date\n• Closing prayer" },
    ],
  },
];

const categoryIcons: Record<string, typeof Presentation> = {
  proof: Sparkles,
  devotional: BookOpen,
  chapter: Users,
  custom: Presentation,
};

const categoryColors: Record<string, string> = {
  proof: "text-amber-500",
  devotional: "text-purple-500",
  chapter: "text-blue-500",
  custom: "text-primary",
};

export function SlideLibrary() {
  const [, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SlideDeck | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("custom");

  // Fetch user's slide decks
  const { data: decks = [], isLoading } = useQuery({
    queryKey: ["slide-decks", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slide_decks")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as SlideDeck[];
    },
    enabled: !!user,
  });

  // Create deck mutation
  const createDeck = useMutation({
    mutationFn: async (deck: { title: string; description: string; template_category: string; slides_json: SlideData[] }) => {
      const { error } = await supabase.from("slide_decks").insert({
        user_id: user!.id,
        title: deck.title,
        description: deck.description,
        template_category: deck.template_category,
        slides_json: deck.slides_json as unknown as any,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Deck created!" });
      setCreateOpen(false);
      setNewTitle("");
      setNewDescription("");
    },
  });

  // Duplicate from template
  const duplicateTemplate = useMutation({
    mutationFn: async (template: typeof PROOF_TEMPLATES[0]) => {
      const { error } = await supabase.from("slide_decks").insert({
        user_id: user!.id,
        title: template.title,
        description: template.description,
        template_category: template.template_category,
        slides_json: template.slides_json as unknown as any,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Template added to your library!" });
    },
  });

  // Delete deck
  const deleteDeck = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("slide_decks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slide-decks"] });
      toast({ title: "Deck deleted" });
      setDeleteTarget(null);
    },
  });

  const handleCreateBlank = () => {
    createDeck.mutate({
      title: newTitle || "Untitled Deck",
      description: newDescription,
      template_category: newCategory,
      slides_json: [{ title: "Title Slide", content: "Your content here", layout: "title" }],
    });
  };

  const userDecks = decks.filter(d => d.user_id === user?.id && !d.is_template);

  return (
    <div className="space-y-8">
      {/* Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">PROOF Templates</h3>
            <p className="text-sm text-muted-foreground">Pre-built slide decks ready to customize</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROOF_TEMPLATES.map((template, i) => {
            const Icon = categoryIcons[template.template_category || "custom"];
            const color = categoryColors[template.template_category || "custom"];
            return (
              <Card key={i} className="group hover:shadow-md transition-all border-border/30">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {template.slides_json.length} slides
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{template.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-1.5 text-xs"
                    onClick={() => duplicateTemplate.mutate(template)}
                    disabled={duplicateTemplate.isPending}
                  >
                    <Copy className="w-3.5 h-3.5" /> Use Template
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* My Decks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">My Slide Decks</h3>
            <p className="text-sm text-muted-foreground">Your saved presentations</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2 rounded-xl" size="sm">
            <Plus className="w-4 h-4" /> New Deck
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : userDecks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No decks yet</p>
            <p className="text-sm text-muted-foreground mb-4">Start from a template above or create a blank deck</p>
            <Button onClick={() => setCreateOpen(true)} className="rounded-xl gap-2" size="sm">
              <Plus className="w-4 h-4" /> Create Deck
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDecks.map(deck => {
              const Icon = categoryIcons[deck.template_category || "custom"];
              const color = categoryColors[deck.template_category || "custom"];
              const slides = Array.isArray(deck.slides_json) ? deck.slides_json : [];
              return (
                <Card key={deck.id} className="group hover:shadow-md transition-all border-border/30">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {slides.length} slides
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{deck.title}</h4>
                      {deck.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{deck.description}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Updated {new Date(deck.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1 text-xs rounded-lg"
                        onClick={() => setSearchParams({ tab: "deck", deckId: deck.id })}
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive gap-1 text-xs"
                        onClick={() => setDeleteTarget(deck)}
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
      </div>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Slide Deck</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="My Presentation" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="What is this deck about?" rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="proof">PROOF</SelectItem>
                  <SelectItem value="devotional">Devotional</SelectItem>
                  <SelectItem value="chapter">Chapter</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateBlank} disabled={createDeck.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete deck?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteTarget?.title}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteDeck.mutate(deleteTarget.id)}
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
