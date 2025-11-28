import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const FeatureCardSkeleton = () => {
  return (
    <Card className="h-[260px] flex flex-col overflow-hidden">
      <div className="h-2 bg-muted animate-pulse" />
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-start justify-between">
          <Skeleton className="w-14 h-14 rounded-2xl" />
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
};

export const QuickActionSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </Card>
  );
};

export const StatsCardSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </Card>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="space-y-6 py-16 md:py-24">
      <div className="flex justify-center">
        <Skeleton className="h-6 w-48 rounded-full" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
      <div className="space-y-4 text-center">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="flex justify-center gap-4">
        <Skeleton className="h-12 w-40 rounded-lg" />
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  );
};

export const DashboardGridSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <FeatureCardSkeleton key={i} />
      ))}
    </div>
  );
};
