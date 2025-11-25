import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Sparkles, Search as SearchIcon, Book } from 'lucide-react';
import { SavedSearch } from '@/hooks/use-saved-bible-searches';
import { format } from 'date-fns';

interface SavedSearchesListProps {
  searches: SavedSearch[];
  onDelete: (id: string) => void;
  onLoadSearch: (search: SavedSearch) => void;
}

export function SavedSearchesList({ searches, onDelete, onLoadSearch }: SavedSearchesListProps) {
  if (searches.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No saved searches yet</p>
        <p className="text-sm mt-2">Save your AI Bible searches for quick access later</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-3 pr-4">
        {searches.map((search) => (
          <Card key={search.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Badge className="bg-sacred/10 text-sacred border-sacred/20 flex-shrink-0">
                    {search.search_type === 'ai' ? (
                      <><Sparkles className="w-3 h-3 mr-1" /> AI</>
                    ) : search.search_type === 'phrase' ? (
                      <><SearchIcon className="w-3 h-3 mr-1" /> Keyword</>
                    ) : (
                      <><Book className="w-3 h-3 mr-1" /> Reference</>
                    )}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {format(new Date(search.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(search.id)}
                  className="flex-shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => onLoadSearch(search)}
                className="w-full text-left space-y-3 hover:opacity-80 transition-opacity"
              >
                <p className="text-sm font-medium">{search.search_query}</p>
                <div className="flex flex-wrap gap-1">
                  {search.results_json?.slice(0, 3).map((result: any, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {result.reference || result.ref}
                    </Badge>
                  ))}
                  {search.results_json?.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{search.results_json.length - 3} more
                    </Badge>
                  )}
                </div>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}