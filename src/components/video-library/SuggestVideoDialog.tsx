import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "Educational",
  "Documentary",
  "Apologetics",
  "Symbols & History",
  "BGLO",
  "Guidance",
  "Relationships",
  "Testimonies",
  "Service",
  "General"
];

const SUGGESTED_TAGS = [
  "Framework", "Tutorial", "Foundations", "Documentary", "Testimony", "Hope",
  "Apologetics", "Response", "Social Media", "Symbols", "Education", "Playlist",
  "History", "BGLO", "Traditions", "Initiation", "Faith", "Guidance", "New Members",
  "Church", "Conversations", "Leadership", "Family", "Rituals", "Bible", "Discernment",
  "Personal Stories", "Encouragement", "Service", "Scholarship", "Witness", "Community"
];

interface SuggestVideoDialogProps {
  trigger?: React.ReactNode;
}

const SuggestVideoDialog = ({ trigger }: SuggestVideoDialogProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    videoUrl: "",
    title: "",
    description: "",
    category: "",
    reason: "",
    selectedTags: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to suggest a video");
      return;
    }

    if (!formData.videoUrl || !formData.title || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(formData.videoUrl)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("video_suggestions").insert({
        user_id: user.id,
        video_url: formData.videoUrl.trim(),
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        category: formData.category,
        suggested_tags: formData.selectedTags,
        reason: formData.reason.trim() || null,
        status: "pending"
      });

      if (error) throw error;

      toast.success("Video suggestion submitted! It will be reviewed by our team.");
      setFormData({
        videoUrl: "",
        title: "",
        description: "",
        category: "",
        reason: "",
        selectedTags: []
      });
      setOpen(false);
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error("Failed to submit suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag].slice(0, 5) // Max 5 tags
    }));
  };

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Suggest Video
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-sacred" />
              Suggest a Video
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Please sign in to suggest videos for the library.
            </p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Suggest Video
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-sacred" />
            Suggest a Video
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">YouTube URL *</Label>
            <Input
              id="videoUrl"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Video Title *</Label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              maxLength={200}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the video content"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              maxLength={500}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags (select up to 5)</Label>
            <div className="flex flex-wrap gap-1.5 p-2 border rounded-md bg-muted/30 max-h-[100px] overflow-y-auto">
              {SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
                    formData.selectedTags.includes(tag)
                      ? "bg-sacred text-white"
                      : "bg-muted hover:bg-muted-foreground/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {formData.selectedTags.length}/5
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Why should we add this? (optional)</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this video would be valuable for the community..."
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              maxLength={500}
              className="min-h-[60px]"
            />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Submit Suggestion
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestVideoDialog;
