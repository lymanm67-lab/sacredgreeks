import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SuggestResourceDialog } from '@/components/resources/SuggestResourceDialog';
import { BookOpen, ExternalLink, Download, Search, ArrowUpDown, Heart, Users, HandHeart, Book } from 'lucide-react';

const resources = [
  {
    title: "Bible Gateway",
    description: "Read the Bible online in multiple translations with powerful search and study tools",
    url: "https://www.biblegateway.com/",
    icon: Book,
    category: "Prayer"
  },
  {
    title: "YouVersion Bible App",
    description: "Free Bible app with reading plans, audio Bibles, and devotionals for daily spiritual growth",
    url: "https://www.bible.com/",
    icon: Book,
    category: "Prayer"
  },
  {
    title: "Blue Letter Bible",
    description: "In-depth Bible study tools with commentaries, concordances, and original language resources",
    url: "https://www.blueletterbible.org/",
    icon: Book,
    category: "Prayer"
  },
  {
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive biblical framework for navigating faith and fraternity by Dr. Lyman Montgomery",
    url: "https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t",
    icon: BookOpen,
    category: "Faith"
  },
  {
    title: "Sacred Greeks Biblical Guide",
    description: "FREE guide with insights to thrive as a Christian in your Divine Nine journey",
    url: "https://sacredgreeks.com/#card-r83oyur3vnn26i6",
    icon: Download,
    category: "Faith"
  }
];

export const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('a-z');

  const categoryIcons: Record<string, any> = {
    'Faith': Heart,
    'Leadership': Users,
    'Prayer': BookOpen,
    'Service': HandHeart,
  };

  const categories = ['Faith', 'Leadership', 'Prayer', 'Service'];

  const filteredResources = resources.filter(resource => {
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
            <BookOpen className="w-5 h-5 text-sacred" />
            <CardTitle>Essential Resources</CardTitle>
          </div>
          <SuggestResourceDialog defaultType="essential" />
        </div>
        
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
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
              className="cursor-pointer hover:bg-sacred/20"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => {
              const CategoryIcon = categoryIcons[category];
              return (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-sacred/20 flex items-center gap-1.5"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CategoryIcon className="w-3 h-3" />
                  {category}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedResources.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No resources found matching your search.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
          {sortedResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-sacred" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-sacred/10 text-sacred">
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
                        Access Resource
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