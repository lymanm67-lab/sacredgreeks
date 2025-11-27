import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Quote } from "lucide-react";

const awards = [
  {
    festival: "Hollywood Gold Awards",
    achievement: "Honorable Mention",
    year: "2023"
  },
  {
    festival: "Austin International Art Festival",
    achievement: "Semi Finalist",
    year: "2023"
  },
  {
    festival: "Santa Cruz Independent Film Fest",
    achievement: "Semi Finalist",
    year: "2023"
  },
  {
    festival: "Paris Film Awards",
    achievement: "Silver Award",
    year: "2023"
  },
  {
    festival: "Santa Fe Independent Film Festival",
    achievement: "Semi Finalist",
    year: "2023"
  },
  {
    festival: "Ojai Film Festival",
    achievement: "Official Selection",
    year: "2023"
  }
];

const reviews = [
  {
    quote: "When life throws its worst at you, your life changes drastically...in all the wrong ways, but you are not alone, and there is hope. This is the overarching message behind Eric Christiansen's motivational documentary Unmasking Hope.",
    source: "Film Review"
  },
  {
    quote: "A powerful exploration of trauma, healing, and the transformative power of hope. Unmasking Hope delivers authentic stories that resonate deeply with anyone facing life's challenges.",
    source: "Festival Jury"
  },
  {
    quote: "Compelling and emotionally resonant. This documentary doesn't shy away from difficult topics while maintaining a message of redemption and resilience.",
    source: "Independent Film Critic"
  }
];

export const DocumentaryAwardsSection = () => {
  return (
    <div className="space-y-12">
      {/* Awards Section - Hidden on mobile */}
      <div className="hidden md:block space-y-6">
        <div className="text-center">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20 mb-4">
            <Award className="w-3 h-3 mr-1" />
            Film Festival Recognition
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Awards & Selections</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Honored at film festivals worldwide for its powerful storytelling and impact
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award, index) => (
            <Card 
              key={index}
              className="bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20 hover:border-sacred/40 transition-all hover:shadow-md"
            >
              <CardContent className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-sacred/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-sacred" />
                </div>
                <p className="font-bold text-lg text-foreground">{award.achievement}</p>
                <p className="text-sm text-muted-foreground font-medium">{award.festival}</p>
                <Badge variant="outline" className="text-xs">{award.year}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="bg-warm-blue/10 text-warm-blue border-warm-blue/20 mb-4">
            <Quote className="w-3 h-3 mr-1" />
            Reviews Are In
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">What Critics Say</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful testimonials from viewers and critics worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="bg-card hover:shadow-lg transition-all border-l-4 border-l-sacred"
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-sacred/30" />
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  "{review.quote}"
                </p>
                <p className="text-xs font-semibold text-foreground">
                  — {review.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
