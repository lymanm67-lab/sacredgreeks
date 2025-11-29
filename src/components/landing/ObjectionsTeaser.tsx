import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight, MessageCircle, Users, Smartphone, Church } from "lucide-react";

// Sample objections to showcase
const sampleObjections = [
  {
    icon: Users,
    source: "Family Member",
    objection: '"I saw a video saying BGLOs are demonic. How can you be a Christian and be in one?"',
    partialResponse: "I understand your concern, and I've done my own research. The Bible teaches us to test all things...",
    fullResponseHint: "Get biblical framework + communication tips",
  },
  {
    icon: Church,
    source: "Pastor",
    objection: '"We don\'t allow Greek members to serve in ministry leadership positions."',
    partialResponse: "I respect your position, Pastor. May I share some context about my organization's actual practices...",
    fullResponseHint: "Navigate church conversations gracefully",
  },
  {
    icon: Smartphone,
    source: "Social Media",
    objection: '"You were tagged: @user These organizations worship false gods. Wake up!"',
    partialResponse: "Thank you for caring enough to share your perspective. Rather than debate publicly...",
    fullResponseHint: "Handle online criticism wisely",
  },
];

export function ObjectionsTeaser() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 mb-4">
              Response Coach Preview
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Handle <span className="gradient-text">BGLO Objections</span> with Grace
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered coaching on how to respond to tough questions about your faith and Greek life membership.
            </p>
          </div>

          {/* Sample Objections Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {sampleObjections.map((item, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden border-border/50 hover:border-sacred/30 transition-all group"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Source Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.source}</span>
                  </div>

                  {/* Objection */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {item.objection}
                    </p>
                  </div>

                  {/* Partial Response (Blurred) */}
                  <div className="relative">
                    <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-3.5 h-3.5 text-sacred" />
                        <span className="text-xs font-medium text-sacred">Suggested Response</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.partialResponse}
                      </p>
                      {/* Blur overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/95 to-transparent flex items-end justify-center pb-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          <span>{item.fullResponseHint}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-sacred/10 via-purple-500/10 to-sacred/10 rounded-2xl p-6 md:p-8 border border-sacred/20">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Get Full Access to Response Coaching
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Sign up free to unlock AI-powered feedback on your responses, improved suggestions, and save your results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/beta-signup">
                  <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg hover:shadow-xl transition-all">
                    <span>Unlock Full Access</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline">
                    Already have an account? Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Free to sign up • No credit card required • Premium features available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
