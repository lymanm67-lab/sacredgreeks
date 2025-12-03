import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to Start Your Journey?
        </h2>
        <p className="text-muted-foreground">
          Join Christians in Greek organizations growing spiritually while honoring their letters.
        </p>
        <Link to="/auth">
          <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground px-8 py-6 shadow-lg hover:shadow-xl transition-all group">
            Create Your Free Account
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
