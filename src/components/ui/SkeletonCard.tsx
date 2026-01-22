import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: 'default' | 'stat' | 'feature' | 'list-item';
  count?: number;
}

export function SkeletonCard({ className, variant = 'default', count = 1 }: SkeletonCardProps) {
  const cards = Array.from({ length: count }, (_, i) => i);

  if (variant === 'stat') {
    return (
      <>
        {cards.map((i) => (
          <Card key={i} className={cn("border border-border", className)}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (variant === 'feature') {
    return (
      <>
        {cards.map((i) => (
          <Card key={i} className={cn("border border-border", className)}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (variant === 'list-item') {
    return (
      <>
        {cards.map((i) => (
          <div key={i} className={cn("flex items-center gap-4 p-4 rounded-lg border border-border", className)}>
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        ))}
      </>
    );
  }

  // Default variant
  return (
    <>
      {cards.map((i) => (
        <Card key={i} className={cn(className)}>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <SkeletonCard variant="stat" count={3} />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero skeleton */}
      <div className="rounded-3xl bg-gradient-to-br from-muted to-muted/50 p-6 md:p-8 lg:p-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <div className="rounded-2xl bg-background/50 p-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="aspect-video rounded-xl" />
        </div>
      </div>

      {/* Stats skeleton */}
      <SkeletonStats />

      {/* Quick links skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard variant="feature" count={2} />
      </div>
    </div>
  );
}
