import { LucideIcon, FileQuestion, Inbox, Search, BookOpen, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  variant?: 'default' | 'minimal' | 'centered';
  className?: string;
}

const defaultIcons: Record<string, LucideIcon> = {
  search: Search,
  inbox: Inbox,
  file: FileQuestion,
  book: BookOpen,
  heart: Heart,
  message: MessageSquare,
};

export function EmptyState({
  icon: Icon = FileQuestion,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  variant = 'default',
  className,
}: EmptyStateProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn("text-center py-8 px-4", className)}>
        <Icon className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">{title}</p>
        {actionLabel && onAction && (
          <Button variant="link" size="sm" onClick={onAction} className="mt-2">
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      variant === 'centered' && "min-h-[400px]",
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
          <Icon className="w-10 h-10 text-primary/60" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {actionLabel && onAction && (
          <Button onClick={onAction} className="gap-2">
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="outline" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

// Pre-configured empty states for common use cases
export function EmptySearchResults({ query, onClear }: { query: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
      actionLabel="Clear search"
      onAction={onClear}
      variant="minimal"
    />
  );
}

export function EmptyBookmarks({ onExplore }: { onExplore?: () => void }) {
  return (
    <EmptyState
      icon={BookOpen}
      title="No bookmarks yet"
      description="Save articles, verses, and resources to access them quickly later."
      actionLabel="Explore content"
      onAction={onExplore}
    />
  );
}

export function EmptyPrayers({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={Heart}
      title="No prayer requests"
      description="Start your prayer journey by adding your first prayer request."
      actionLabel="Add prayer request"
      onAction={onAdd}
    />
  );
}

export function EmptyForumPosts({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No discussions yet"
      description="Be the first to start a conversation in this community."
      actionLabel="Start a discussion"
      onAction={onCreate}
    />
  );
}
