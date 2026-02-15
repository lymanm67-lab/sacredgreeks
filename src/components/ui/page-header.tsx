import { Badge } from "@/components/ui/badge";
import { DemoPageBadge } from "@/components/demo/DemoPageBadge";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  children?: React.ReactNode;
  demoPageKey?: string;
}

export function PageHeader({ title, description, badge, children, demoPageKey }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          {badge && (
            <Badge variant={badge.variant || "default"} className="mb-2 bg-sacred/20 text-sacred border-sacred/30">
              {badge.text}
            </Badge>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          {demoPageKey && <DemoPageBadge pageKey={demoPageKey} className="mt-2" />}
        </div>
        {children}
      </div>
      {description && (
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      )}
    </div>
  );
}
