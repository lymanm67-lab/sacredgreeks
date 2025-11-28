import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart, Send, Loader2 } from "lucide-react";
import { z } from "zod";

const healingStorySchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  organization: z.string().max(100, "Organization must be less than 100 characters").optional(),
  story_title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  story_content: z.string().trim().min(50, "Please share at least 50 characters of your story").max(5000, "Story must be less than 5000 characters"),
  healing_type: z.string().min(1, "Please select a healing type"),
  email: z.string().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  consent_to_publish: z.boolean()
});

type HealingStoryFormData = z.infer<typeof healingStorySchema>;

interface ShareHealingStoryDialogProps {
  children: React.ReactNode;
}

export function ShareHealingStoryDialog({ children }: ShareHealingStoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<HealingStoryFormData>({
    name: "",
    organization: "",
    story_title: "",
    story_content: "",
    healing_type: "",
    email: "",
    consent_to_publish: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof HealingStoryFormData, string>>>({});

  const healingTypes = [
    { value: "church_hurt", label: "Church Hurt" },
    { value: "ministry_fallout", label: "Family/Ministry Fallout" },
    { value: "spiritual_trauma", label: "Spiritual Trauma" },
    { value: "faith_reconciliation", label: "Faith Reconciliation" },
    { value: "identity_journey", label: "Identity & Faith Journey" },
    { value: "community_healing", label: "Community Healing" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = healingStorySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof HealingStoryFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof HealingStoryFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!formData.consent_to_publish) {
      toast.error("Please consent to potential publication to submit your story");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("healing_stories")
        .insert({
          name: formData.name || null,
          organization: formData.organization || null,
          story_title: formData.story_title.trim(),
          story_content: formData.story_content.trim(),
          healing_type: formData.healing_type,
          email: formData.email || null,
          consent_to_publish: formData.consent_to_publish
        });

      if (error) throw error;

      // Send notification emails (non-blocking)
      supabase.functions.invoke("notify-healing-story", {
        body: {
          storyTitle: formData.story_title.trim(),
          healingType: formData.healing_type,
          authorName: formData.name || undefined,
          authorEmail: formData.email || undefined
        }
      }).catch(err => console.error("Notification error:", err));

      toast.success("Thank you for sharing your story! It will be reviewed before being published.");
      setOpen(false);
      setFormData({
        name: "",
        organization: "",
        story_title: "",
        story_content: "",
        healing_type: "",
        email: "",
        consent_to_publish: false
      });
    } catch (error) {
      console.error("Error submitting story:", error);
      toast.error("Failed to submit your story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="w-5 h-5 text-rose-500" />
            Share Your Healing Story
          </DialogTitle>
          <DialogDescription>
            Your story could help others on their healing journey. All submissions are anonymous and reviewed before publication.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                placeholder="Anonymous"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Leave blank to remain anonymous</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization (Optional)</Label>
              <Input
                id="organization"
                placeholder="e.g., Alpha Phi Alpha"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="healing_type">Type of Healing Journey *</Label>
            <Select
              value={formData.healing_type}
              onValueChange={(value) => setFormData({ ...formData, healing_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your journey type" />
              </SelectTrigger>
              <SelectContent>
                {healingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.healing_type && <p className="text-xs text-destructive">{errors.healing_type}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="story_title">Story Title *</Label>
            <Input
              id="story_title"
              placeholder="e.g., Finding Peace After Years of Doubt"
              value={formData.story_title}
              onChange={(e) => setFormData({ ...formData, story_title: e.target.value })}
            />
            {errors.story_title && <p className="text-xs text-destructive">{errors.story_title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="story_content">Your Story *</Label>
            <Textarea
              id="story_content"
              placeholder="Share your healing journey... What happened? How did you begin to heal? What gave you hope?"
              className="min-h-[150px]"
              value={formData.story_content}
              onChange={(e) => setFormData({ ...formData, story_content: e.target.value })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{errors.story_content || "Minimum 50 characters"}</span>
              <span>{formData.story_content.length}/5000</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Only used if we need to follow up. Never shared publicly.
            </p>
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
            <Checkbox
              id="consent"
              checked={formData.consent_to_publish}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, consent_to_publish: checked as boolean })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Consent to Publication *
              </Label>
              <p className="text-xs text-muted-foreground">
                I understand my story may be published (anonymously if I chose) to help others on their healing journey.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Share Story
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
