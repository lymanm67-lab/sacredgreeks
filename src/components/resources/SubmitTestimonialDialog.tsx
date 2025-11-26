import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const testimonialSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().trim().min(20, "Content must be at least 20 characters").max(2000, "Content must be less than 2000 characters"),
  organization: z.string().trim().max(100, "Organization name must be less than 100 characters").optional(),
  role: z.enum(["greek_member", "prospective", "parent", "church_leader", "other"], {
    errorMap: () => ({ message: "Please select a role" })
  })
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export const SubmitTestimonialDialog = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    title: "",
    content: "",
    organization: "",
    role: "greek_member"
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TestimonialFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit a testimonial");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = testimonialSchema.parse(formData);

      const { error } = await supabase
        .from("testimonials")
        .insert({
          user_id: user.id,
          title: validatedData.title,
          content: validatedData.content,
          organization: validatedData.organization || null,
          role: validatedData.role
        });

      if (error) throw error;

      toast.success("Testimonial submitted successfully! It will be reviewed before appearing publicly.");
      setFormData({
        title: "",
        content: "",
        organization: "",
        role: "greek_member"
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof TestimonialFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof TestimonialFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the form errors");
      } else {
        console.error("Error submitting testimonial:", error);
        toast.error("Failed to submit testimonial");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Share Your Story
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>Share Your Testimonial</DialogTitle>
          <DialogDescription>
            Tell us how Sacred Greeks has impacted your journey of faith and Greek life. Your story will inspire others!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Your Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value as TestimonialFormData["role"] })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="greek_member">Greek Member</SelectItem>
                <SelectItem value="prospective">Prospective Member</SelectItem>
                <SelectItem value="parent">Parent/Family</SelectItem>
                <SelectItem value="church_leader">Church Leader</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization (Optional)</Label>
            <Input
              id="organization"
              placeholder="e.g., Alpha Kappa Alpha, Delta Sigma Theta..."
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              maxLength={100}
              className="bg-background"
            />
            {errors.organization && <p className="text-sm text-destructive">{errors.organization}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Give your testimonial a title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              maxLength={100}
              required
              className="bg-background"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Story *</Label>
            <Textarea
              id="content"
              placeholder="Share how Sacred Greeks has impacted your life, faith journey, or Greek life experience..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              maxLength={2000}
              required
              className="bg-background resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.content.length}/2000 characters
            </p>
            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-sacred hover:bg-sacred/90">
              {isSubmitting ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};