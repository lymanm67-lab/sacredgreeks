import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowRight, CheckCircle, Users } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="py-12 w-full max-w-4xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-sacred/10 border-slate-700/50 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sacred/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <CardContent className="p-6 sm:p-8 relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-sacred/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-sacred" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-2">
                Free 90-Day Pilot
              </Badge>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Bring Sacred Greeks to Your Chapter
              </h3>
              <p className="text-slate-400 mb-4">
                Partner with us to provide faith-based training and spiritual resources for your entire organization.
              </p>
              
              {/* Benefits */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>E-Board Training</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Chaplain Toolkit</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Up to 50 Members</span>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <Link to="/partner">
              <Button className="bg-sacred hover:bg-sacred/90 text-white whitespace-nowrap">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
