import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandHeart, Quote, PenLine, Phone, MessageCircle } from "lucide-react";
import { ShareHealingStoryDialog } from "@/components/ShareHealingStoryDialog";
import { ApprovedHealingStories } from "@/components/ApprovedHealingStories";

export function HealingResourcesSection() {
  return (
    <div id="healing-resources" className="mt-10 max-w-4xl mx-auto scroll-mt-20">
      {/* Family & Ministry Healing Card */}
      <Link to="/family-ministry-fallout">
        <Card className="mb-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] cursor-pointer group">
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <HandHeart className="w-7 h-7 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Family, Ministry & Church Hurt Healing
              </h3>
              <p className="text-sm text-muted-foreground">
                Navigate damaged relationships and process spiritual trauma with guided prayers and real testimonies
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              Support
            </Badge>
          </CardContent>
        </Card>
      </Link>
      
      {/* Testimonial Quote */}
      <div className="mt-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl p-6 md:p-8 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-lg md:text-xl italic text-foreground/90 mb-3">
              "After years of spiritual trauma from my church experience, I thought I'd never find healing. These resources helped me understand that my pain was valid and gave me a path forward. I'm finally reconnecting with my faith on my own terms."
            </p>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              — Anonymous Member, Healing Journey Participant
            </p>
          </div>
        </div>
        
        {/* Share Your Story CTA */}
        <div className="mt-6 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Your story could inspire someone else's healing journey.
          </p>
          <ShareHealingStoryDialog>
            <Button 
              variant="outline" 
              className="border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500"
            >
              <PenLine className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </ShareHealingStoryDialog>
        </div>
      </div>

      {/* Crisis Support Section */}
      <div className="mt-8 bg-gradient-to-br from-rose-500/10 to-red-500/10 dark:from-rose-950/30 dark:to-red-950/30 rounded-2xl p-6 md:p-8 border-2 border-rose-500/30">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center mb-4 animate-pulse">
            <Phone className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
            Need Immediate Support?
          </h4>
          <p className="text-muted-foreground mb-4 max-w-xl">
            If you're in crisis or experiencing a spiritual emergency, please reach out. You don't have to face this alone.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 w-full max-w-lg">
            <a 
              href="tel:988" 
              className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              988 Suicide & Crisis Lifeline
            </a>
            <a 
              href="https://www.crisistextline.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Text HOME to 741741
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Available 24/7 • Free • Confidential
          </p>
        </div>
      </div>

      {/* Approved Healing Stories from Community */}
      <div className="mt-8">
        <ApprovedHealingStories />
      </div>
    </div>
  );
}
