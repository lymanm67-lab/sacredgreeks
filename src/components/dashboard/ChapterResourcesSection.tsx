import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SuggestResourceDialog } from '@/components/resources/SuggestResourceDialog';
import { Users, Heart, BookOpen, ExternalLink, Search, ArrowUpDown } from 'lucide-react';

const chapterResources = [
  {
    title: "Sacred Conversations: Leading Greek Members to Christ",
    description: "Practical guidance for sharing your faith with brothers and sisters in your organization using the Romans Road",
    url: "https://gamma.app/docs/Sacred-Conversations-Leading-Greek-Members-to-Christ-Using-the-Ro-ekkmlx5d1615hlv",
    icon: Heart,
    category: "Faith"
  },
  {
    title: "How to Use Roberts Rules of Order in Chapter Meetings",
    description: "Parliamentary procedure guide for conducting effective and orderly chapter meetings",
    url: "https://gamma.app/docs/How-To-Use-Roberts-Rules-of-Order-in-Chapter-Meetings-viytfotsasvx46d",
    icon: Users,
    category: "Leadership"
  },
  {
    title: "Sacred Comfort: Prayer Guide for Greek Life",
    description: "How to pray for and walk with fraternity and sorority members during challenging times",
    url: "https://gamma.app/docs/Sacred-Comfort-How-To-Pray-For-And-Walk-With-Fraternity-And-Soror-ccgepyu7je8fpav",
    icon: BookOpen,
    category: "Prayer"
  }
];

export const ChapterResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('a-z');

  const categories = ['Faith', 'Leadership', 'Prayer', 'Service'];

  const filteredResources = chapterResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'z-a') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-warm-blue" />
            <CardTitle>Chapter Resources</CardTitle>
          </div>
          <SuggestResourceDialog defaultType="chapter" />
        </div>
        
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search chapter resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-warm-blue/20"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-warm-blue/20"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedResources.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No resources found matching your search.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
          {sortedResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-warm-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-warm-blue/10 text-warm-blue">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Resource
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </CardContent>
    </Card>
  );
};
