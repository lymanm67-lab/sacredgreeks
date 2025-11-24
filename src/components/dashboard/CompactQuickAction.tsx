import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CompactQuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
  delay?: string;
}

export const CompactQuickAction = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  gradient = "from-sacred to-warm-blue", 
  delay = "0s" 
}: CompactQuickActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Link to={href}>
            <div 
              className="group relative overflow-hidden rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-border/50 hover:border-sacred/50 bg-card animate-scale-in"
              style={{ animationDelay: delay }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon container */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-center text-foreground group-hover:text-sacred transition-colors">
                  {title}
                </span>
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="max-w-[200px] text-center bg-popover/95 backdrop-blur-sm"
        >
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
