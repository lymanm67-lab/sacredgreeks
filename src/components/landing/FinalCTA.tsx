import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
        <CardHeader className="text-center space-y-4 pb-8">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Ready to Navigate Faith and Greek Life with Confidence?
          </CardTitle>
          <CardDescription className="text-lg">
            Join Christians in Greek organizations who are growing spiritually while honoring their letters.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <Link to="/auth">
            <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all btn-bounce hover:scale-105 group">
              Create Your Free Account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
