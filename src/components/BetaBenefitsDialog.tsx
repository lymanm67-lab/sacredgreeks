import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircle2, ArrowRight, Sparkles, Users, Calendar, Trophy, BookOpen } from 'lucide-react';
import { BetaUrgencyIndicator } from './BetaUrgencyIndicator';

const betaBenefits = [
  {
    icon: Sparkles,
    title: "Early Access",
    description: "Be the first to experience new features before public release"
  },
  {
    icon: Calendar,
    title: "Daily Devotionals",
    description: "Org-specific devotionals tailored to your Greek council"
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Prayer Wall, discussion forums & service tracking with your org"
  },
  {
    icon: Trophy,
    title: "Org Achievements",
    description: "Earn council-specific badges for prayer, study & service"
  },
  {
    icon: BookOpen,
    title: "P.R.O.O.F. Framework",
    description: "Navigate Greek life challenges with biblical guidance"
  }
];

interface BetaBenefitsDialogProps {
  children: React.ReactNode;
}

export const BetaBenefitsDialog = ({ children }: BetaBenefitsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Become a Beta Tester
          </DialogTitle>
          <DialogDescription className="text-center">
            Join our exclusive beta program and help shape the future of Sacred Greeks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {betaBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-full bg-sacred/10">
                <benefit.icon className="w-4 h-4 text-sacred" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency Indicator */}
        <BetaUrgencyIndicator />

        <div className="flex flex-col gap-3 pt-2">
          <Link to="/beta-signup" onClick={() => setOpen(false)}>
            <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg hover:shadow-xl transition-all group">
              <span>Sign Up for Free</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 inline mr-1" />
            100% free • No credit card required
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
