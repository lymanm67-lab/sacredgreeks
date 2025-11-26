import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Testimonial {
  id: string;
  title: string;
  content: string;
  organization: string | null;
  role: string;
  featured: boolean;
  created_at: string;
}

const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    greek_member: "Greek Member",
    prospective: "Prospective Member",
    parent: "Parent/Family",
    church_leader: "Church Leader",
    other: "Community Member"
  };
  return labels[role] || role;
};

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-sacred" />
          <h3 className="text-2xl font-bold">Community Testimonials</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <Heart className="w-12 h-12 text-sacred mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Testimonials Yet</h3>
        <p className="text-muted-foreground">
          Be the first to share your story and inspire others!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-sacred" />
        <h3 className="text-2xl font-bold">Community Testimonials</h3>
      </div>
      
      <p className="text-muted-foreground">
        Real stories from real people about how Sacred Greeks has impacted their journey
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id} 
            className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              testimonial.featured ? "border-sacred/50 border-2" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-sacred/10 text-sacred border-sacred/20">
                  {getRoleLabel(testimonial.role)}
                </Badge>
                {testimonial.featured && (
                  <Star className="w-5 h-5 text-sacred fill-sacred" />
                )}
              </div>
              <CardTitle className="text-lg group-hover:text-sacred transition-colors">
                {testimonial.title}
              </CardTitle>
              {testimonial.organization && (
                <CardDescription className="text-sm font-medium">
                  {testimonial.organization}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {testimonial.content}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {formatDistanceToNow(new Date(testimonial.created_at), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};