import { useState, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  priority?: boolean;
}

export const CollapsibleSection = ({
  title,
  icon,
  badge,
  badgeVariant = "secondary",
  defaultOpen = false,
  children,
  className,
  priority = false,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn(
      "border transition-all",
      priority && "border-sacred/30 bg-gradient-to-br from-sacred/5 to-background",
      className
    )}>
      <CardHeader 
        className="cursor-pointer select-none hover:bg-muted/50 transition-colors rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              priority ? "bg-sacred/10" : "bg-muted"
            )}>
              {icon}
            </div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              {badge && (
                <Badge variant={badgeVariant} className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};
