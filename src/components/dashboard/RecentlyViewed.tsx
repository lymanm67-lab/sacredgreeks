import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Trash2, BookOpen } from "lucide-react";
import { useResourceHistory } from "@/hooks/use-resource-history";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { formatDistanceToNow } from "date-fns";

export const RecentlyViewed = () => {
  const { history, clearHistory } = useResourceHistory();

  if (history.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sacred" />
            <CardTitle className="text-lg">Recently Viewed</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
        <CardDescription>
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.slice(0, 5).map((item, index) => (
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
