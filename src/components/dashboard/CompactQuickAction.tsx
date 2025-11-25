import { LucideIcon, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface CompactQuickActionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconColor?: string;
  iconBg?: string;
  delay?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  isExternal?: boolean;
}

export const CompactQuickAction = ({ 
  id,
  title, 
  description, 
  icon: Icon, 
  href, 
  iconColor = "text-white",
  iconBg = "bg-primary",
  delay = "0s",
  isFavorite = false,
  onToggleFavorite,
  isExternal = false
}: CompactQuickActionProps) => {
  const content = (
    <div 
      className={`group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer border ${
        isFavorite 
          ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30' 
          : 'border-border/50 bg-card hover:border-border shadow-sm hover:shadow-md'
      } animate-scale-in`}
      style={{ animationDelay: delay }}
    >
      {/* Icon container with improved styling */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className="text-xs font-semibold text-center text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
        </span>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="relative">
            {/* Favorite button */}
            {onToggleFavorite && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-1 -right-1 z-20 h-6 w-6 p-0 rounded-full bg-background border border-border hover:bg-background hover:border-primary shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(id);
                }}
              >
                <Star 
                  className={`h-3 w-3 transition-colors ${
                    isFavorite 
                      ? 'fill-amber-500 text-amber-500' 
                      : 'text-muted-foreground hover:text-amber-500'
                  }`}
                />
              </Button>
            )}
            
            {isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <Link to={href}>
                {content}
              </Link>
            )}
          </div>
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