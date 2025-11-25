import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isExternal?: boolean;
  useModal?: boolean;
}

interface CategorySectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actions: CategoryAction[];
  gradient: string;
  categoryId: 'daily-spiritual' | 'community' | 'personal-growth';
}

export function CategorySection({ 
  title, 
  description, 
  icon: Icon, 
  actions, 
  gradient,
  categoryId 
}: CategorySectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn('bg-gradient-to-r', gradient, 'text-white')}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-white/80">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-3">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-foreground/20 hover:bg-muted/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <action.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
