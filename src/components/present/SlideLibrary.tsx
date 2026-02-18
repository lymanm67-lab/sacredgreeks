import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Layers, Plus, Trash2, Edit2, Copy, Presentation, BookOpen, Users, Cross, Sparkles,
  Heart, GraduationCap, Shield, Target, Calendar, MessageCircle, Award,
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

import type { SlideData } from "./slideTypes";
import { templateImages } from "./templateImages";

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
      { title: "The PROOF Framework", content: "Providential · Religious · Organizational · Operational · Faith-Based\nA Biblical Defense of Greek Life", layout: "title", image_url: templateImages.proofFramework },
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
      { title: "Weekly Devotional", content: "Theme: [Your Theme]\nDate: [Date]", layout: "title", image_url: templateImages.chapterDevotional },
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
      { title: "Chapter Meeting", content: "[Chapter Name]\n[Date] • [Time]", layout: "title", image_url: templateImages.chapterMeeting },
      { title: "Call to Order", content: "• Roll Call\n• Approval of Minutes\n• Opening Prayer/Hymn" },
      { title: "Officer Reports", content: "• President's Report\n• Treasurer's Report\n• Secretary's Report\n• Committee Reports" },
      { title: "Old Business", content: "• [Pending items from previous meeting]\n• [Follow-up actions]" },
      { title: "New Business", content: "• [New proposals]\n• [Upcoming events]\n• [Announcements]" },
      { title: "Adjournment", content: "• Closing remarks\n• Next meeting date\n• Closing prayer" },
    ],
  },
  {
    title: "New Member Orientation",
    description: "Introduce new members to chapter history, values, and expectations",
    is_template: true,
    template_category: "onboarding",
    is_public: true,
    slides_json: [
      { title: "Welcome, New Members!", content: "[Chapter Name]\nOrientation [Semester/Year]", layout: "title", image_url: templateImages.newMemberOrientation },
      { title: "Our History", content: "• Founded: [Date]\n• National founding: [Date]\n• Key milestones in our chapter's journey", notes: "Share founding story with energy and pride" },
      { title: "Our Values & Motto", content: "• Motto: [Motto]\n• Core values we live by\n• How faith guides our brotherhood/sisterhood", notes: "Connect each value to a real chapter example" },
      { title: "Member Expectations", content: "• Academic standards (minimum GPA)\n• Meeting attendance policy\n• Community service requirements\n• Financial obligations", notes: "Be clear but welcoming — set expectations with grace" },
      { title: "Getting Involved", content: "• Committees you can join\n• Upcoming events\n• Mentorship pairings\n• Communication channels (GroupMe, email, etc.)", notes: "Encourage questions" },
      { title: "Next Steps", content: "• Complete your profile\n• Attend your first committee meeting\n• Connect with your mentor\n• Save important dates", notes: "Hand out printed schedule if available" },
    ],
  },
  {
    title: "Community Service Report",
    description: "Showcase chapter service impact with data and stories",
    is_template: true,
    template_category: "service",
    is_public: true,
    slides_json: [
      { title: "Community Service Report", content: "[Chapter Name]\n[Semester/Year]", layout: "title", image_url: templateImages.communityService },
      { title: "Impact at a Glance", content: "• Total volunteer hours: [X]\n• Members participating: [X]\n• Organizations served: [X]\n• Lives impacted: [X]", notes: "Use big, bold numbers — this is your highlight slide" },
      { title: "Featured Project", content: "[Project Name]\n\n[Brief description of the project, who it served, and what was accomplished]", notes: "Include a photo if possible" },
      { title: "Member Spotlights", content: "• [Member Name] — [Contribution]\n• [Member Name] — [Contribution]\n• [Member Name] — [Contribution]", notes: "Recognize top volunteers by name" },
      { title: "Faith in Action", content: "\"Faith without works is dead.\" — James 2:26\n\nHow our service connects to our spiritual mission", notes: "Bridge service work back to chapter's faith foundation" },
      { title: "Looking Ahead", content: "• Upcoming service events\n• Partnership opportunities\n• Goal for next semester: [X] hours", notes: "End with a call to action" },
    ],
  },
  {
    title: "Fundraising Pitch",
    description: "Present fundraising goals and rally donor support",
    is_template: true,
    template_category: "fundraising",
    is_public: true,
    slides_json: [
      { title: "Fundraising Campaign", content: "[Campaign Name]\n[Chapter Name]", layout: "title", image_url: templateImages.fundraisingPitch },
      { title: "Why We're Raising", content: "• The need: [Describe the cause]\n• Who benefits: [Target beneficiaries]\n• Our chapter's connection to this mission", notes: "Lead with emotion, then follow with facts" },
      { title: "Our Goal", content: "🎯 Target: $[Amount]\n\n• Scholarship fund: $[X]\n• Community programs: $[X]\n• Chapter operations: $[X]", notes: "Break down how every dollar is used" },
      { title: "How to Give", content: "• Online: [Link]\n• Cash/Check at events\n• Recurring monthly gifts\n• Corporate matching", notes: "Make giving as frictionless as possible" },
      { title: "Thank You", content: "Every gift — large or small — makes a difference.\n\nTogether, we build something greater than ourselves.", layout: "title", image_url: templateImages.fundraisingPitch },
    ],
  },
  {
    title: "Scripture Study Series",
    description: "Multi-week Bible study template for small groups",
    is_template: true,
    template_category: "devotional",
    is_public: true,
    slides_json: [
      { title: "Scripture Study", content: "[Book/Topic]\nWeek [X] of [Y]", layout: "title", image_url: templateImages.scriptureStudy },
      { title: "Last Week's Recap", content: "• Key takeaway from last session\n• Any reflections or follow-ups from the group?", notes: "Spend 3-5 minutes here to build continuity" },
      { title: "Today's Passage", content: "[Book Chapter:Verses]\n\n\"[Key verse text]\"", notes: "Read passage aloud together or assign readers" },
      { title: "Context & Background", content: "• Who wrote it and when\n• Historical/cultural context\n• How it fits in the larger narrative", notes: "Keep this brief — 2-3 minutes max" },
      { title: "Discussion Questions", content: "1. [Question about meaning]\n2. [Question about personal application]\n3. [Question connecting to Greek life/community]", notes: "Let the group drive discussion — facilitate, don't lecture" },
      { title: "Personal Challenge", content: "This week's challenge:\n\n[Specific, actionable spiritual practice]\n\nPray • Reflect • Act", notes: "Encourage accountability partners" },
    ],
  },
  {
    title: "Leadership Workshop",
    description: "Interactive workshop for developing servant leaders",
    is_template: true,
    template_category: "leadership",
    is_public: true,
    slides_json: [
      { title: "Servant Leadership Workshop", content: "Leading with Purpose, Serving with Heart", layout: "title", image_url: templateImages.leadershipWorkshop },
      { title: "What Is Servant Leadership?", content: "\"The greatest among you shall be your servant.\" — Matthew 23:11\n\n• Putting others first\n• Leading by example\n• Empowering those around you", notes: "Ask: Who is a leader you admire and why?" },
      { title: "The 5 Pillars", content: "1. Listening — Hear before you speak\n2. Empathy — Understand before you judge\n3. Stewardship — Care for what's entrusted\n4. Community — Build together\n5. Growth — Develop others", notes: "Spend 2 minutes on each pillar with examples" },
      { title: "Activity: Self-Assessment", content: "Rate yourself 1-5 on each pillar:\n\n• Where are you strongest?\n• Where do you have room to grow?\n• What's one step you can take this week?", notes: "Give 5 minutes for individual reflection, then share" },
      { title: "Leading in Your Chapter", content: "• Every member is a leader\n• Leadership isn't a title — it's action\n• Opportunities: committees, mentoring, events, prayer groups", notes: "Highlight specific upcoming leadership opportunities" },
      { title: "Commitment", content: "My leadership commitment this semester:\n\n\"I will _____________ because _____________.\"\n\nWrite it down. Share it. Live it.", layout: "title", image_url: templateImages.leadershipWorkshop },
    ],
  },
  {
    title: "Event Recap & Highlights",
    description: "Celebrate and document a chapter event with key moments",
    is_template: true,
    template_category: "chapter",
    is_public: true,
    slides_json: [
      { title: "[Event Name]", content: "Recap & Highlights\n[Date]", layout: "title", image_url: templateImages.eventRecap },
      { title: "By the Numbers", content: "• Attendees: [X]\n• Volunteers: [X]\n• Funds raised: $[X]\n• Hours invested: [X]", notes: "Visual impact — use large numbers" },
      { title: "Key Moments", content: "• [Highlight 1: What happened and why it mattered]\n• [Highlight 2]\n• [Highlight 3]", notes: "Include photos or member quotes if available" },
      { title: "What We Learned", content: "• What went well\n• What we'd improve next time\n• Unexpected wins", notes: "Be honest — growth comes from reflection" },
      { title: "Thank You", content: "Special thanks to:\n• [Organizers]\n• [Sponsors/Partners]\n• [Volunteers]\n• Every member who showed up and showed out!", notes: "Name people specifically — recognition matters" },
    ],
  },
  {
    title: "Myth vs. Truth: Greek Life & Faith",
    description: "Address common misconceptions about Greek organizations and Christianity",
    is_template: true,
    template_category: "proof",
    is_public: true,
    slides_json: [
      { title: "Myth vs. Truth", content: "Greek Life & Faith\nSeparating Fact from Fiction", layout: "title", image_url: templateImages.mythVsTruth },
      { title: "Myth #1", content: "\"Greek organizations are anti-Christian.\"\n\n✅ Truth: Many D9 organizations were founded on Christian principles, with prayers, hymns, and scripture woven into their traditions.", notes: "Reference specific founding documents" },
      { title: "Myth #2", content: "\"You can't be Greek and follow Christ.\"\n\n✅ Truth: Thousands of members live out their faith daily through service, mentorship, and spiritual leadership within their chapters.", notes: "Share 1-2 personal testimonies" },
      { title: "Myth #3", content: "\"Greek rituals conflict with the Bible.\"\n\n✅ Truth: Rituals emphasize values like brotherhood, scholarship, and service — values that align with Biblical teaching.", notes: "Use the PROOF 'R' category analysis" },
      { title: "Myth #4", content: "\"Greek life is only about parties and socializing.\"\n\n✅ Truth: D9 organizations collectively contribute millions of service hours and scholarship dollars annually.", notes: "Cite specific national statistics" },
      { title: "The Real Question", content: "It's not whether you CAN be Greek and Christian.\n\nIt's how you LIVE OUT your faith within your organization.\n\nBe the proof.", layout: "title", image_url: templateImages.mythVsTruth },
    ],
  },
];

const categoryIcons: Record<string, typeof Presentation> = {
  proof: Sparkles,
  devotional: BookOpen,
  chapter: Users,
  onboarding: GraduationCap,
  service: Heart,
  fundraising: Target,
  leadership: Shield,
  custom: Presentation,
};

const categoryColors: Record<string, string> = {
  proof: "text-amber-500",
  devotional: "text-purple-500",
  chapter: "text-blue-500",
  onboarding: "text-emerald-500",
  service: "text-rose-500",
  fundraising: "text-orange-500",
  leadership: "text-cyan-500",
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
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
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
