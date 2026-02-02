import { useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface QuickJumpSection {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface QuickJumpProps {
  sections: QuickJumpSection[];
  title?: string;
  className?: string;
  defaultOpen?: boolean;
}

export function QuickJump({ 
  sections, 
  title = "Quick Jump", 
  className,
  defaultOpen = true 
}: QuickJumpProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className={cn(
      "bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 mb-6",
      className
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">{title}</span>
          <span className="text-xs text-muted-foreground">
            ({sections.length} sections)
          </span>
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="outline"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className="text-xs h-8 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
              >
                {section.icon && (
                  <span className="mr-1.5">{section.icon}</span>
                )}
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
