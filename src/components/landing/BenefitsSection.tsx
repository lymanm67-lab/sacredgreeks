import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Personalized Experience: Org-specific devotionals, study guides & prayer templates tailored to your Greek council",
  "Daily Spiritual Tools: Devotionals, Bible study, prayer guides & journals for consistent spiritual growth",
  "Community Features: Discussion forum, Prayer Wall with org filters & service tracking with brothers and sisters",
  "Org Achievements: Earn council-specific badges for prayer, study, service & community milestones",
  "P.R.O.O.F. Framework: Navigate Greek life challenges with biblical guidance customized for your organization"
];

export function BenefitsSection() {
  return (
    <div className="bg-gradient-to-b from-muted/30 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Everything You Need to <span className="gradient-text">Thrive</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
