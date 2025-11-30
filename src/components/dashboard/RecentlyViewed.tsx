import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Trash2, BookOpen } from "lucide-react";
import { useResourceHistory } from "@/hooks/use-resource-history";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { formatDistanceToNow, subHours } from "date-fns";

// Demo items to show when history is empty
const DEMO_RECENTLY_VIEWED = [
  {
    url: 'https://gamma.app/embed/12fobc2w0gro04i',
    title: 'Repentance, Repair & Renewal Checklist',
    category: 'Spiritual Growth',
    viewedAt: subHours(new Date(), 2).toISOString(),
  },
  {
    url: '/myth-buster',
    title: 'Myth Buster Library',
    category: 'Biblical Responses',
    viewedAt: subHours(new Date(), 5).toISOString(),
  },
  {
    url: '/symbol-guide',
    title: 'Symbol & Ritual Guide',
    category: 'Greek Symbolism',
    viewedAt: subHours(new Date(), 12).toISOString(),
  },
];

export const RecentlyViewed = () => {
  const { history, clearHistory } = useResourceHistory();
  
  // Use demo data when history is empty
  const displayHistory = history.length > 0 ? history : DEMO_RECENTLY_VIEWED;
  const isDemo = history.length === 0;

  if (displayHistory.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sacred" />
            <CardTitle className="text-lg">
              {isDemo ? 'Popular Resources' : 'Recently Viewed'}
            </CardTitle>
          </div>
          {!isDemo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <CardDescription>
          {isDemo ? 'Explore these frequently accessed resources' : 'Continue where you left off'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayHistory.slice(0, 5).map((item, index) => (
            <ExternalContentModal
              key={`${item.url}-${index}`}
              url={item.url}
              title={item.title}
              description={item.category}
              category={item.category}
              trigger={
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-sacred/50 hover:bg-muted/50 cursor-pointer transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0 group-hover:bg-sacred/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-sacred" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-sacred transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(item.viewedAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-sacred transition-colors flex-shrink-0" />
                </div>
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
