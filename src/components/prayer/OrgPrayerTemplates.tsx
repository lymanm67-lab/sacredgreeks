import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Copy, Check, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getOrgPrayerTemplates, orgPrayerCategories, type OrgPrayerTemplate } from "@/data/orgPrayerTemplates";
import { getCouncilContent } from "@/data/orgSpecificContent";
import { ListenButton } from "@/components/ListenButton";

interface OrgPrayerTemplatesProps {
  onSelectPrayer?: (prayer: string, title: string) => void;
}

export function OrgPrayerTemplates({ onSelectPrayer }: OrgPrayerTemplatesProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [councilId, setCouncilId] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('greek_council, greek_organization')
          .eq('id', user.id)
          .single();

        if (profile) {
          setCouncilId(profile.greek_council);
          setOrganizationName(profile.greek_organization);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!councilId) {
    return null;
  }

  const prayers = getOrgPrayerTemplates(councilId);
  const councilContent = getCouncilContent(councilId);
  
  const categories = ["all", ...new Set(prayers.map(p => p.category))];
  const filteredPrayers = selectedCategory === "all" 
    ? prayers 
    : prayers.filter(p => p.category === selectedCategory);

  const handleCopy = async (prayer: OrgPrayerTemplate) => {
    await navigator.clipboard.writeText(prayer.prayer);
    setCopiedId(prayer.id);
    toast({
      title: "Prayer Copied",
      description: "The prayer has been copied to your clipboard."
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectPrayer = (prayer: OrgPrayerTemplate) => {
    if (onSelectPrayer) {
      onSelectPrayer(prayer.prayer, prayer.title);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return orgPrayerCategories.find(c => c.id === categoryId) || {
      id: categoryId,
      name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
      icon: '📿',
      color: 'from-gray-500 to-gray-600'
    };
  };

  return (
    <Card className="border-2 border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sacred" />
            Prayers for {organizationName || councilContent.name}
          </CardTitle>
          <Badge variant="secondary">Personalized</Badge>
        </div>
        <CardDescription>
          Prayer templates crafted for your Greek experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <ScrollArea className="w-full pb-2 mb-4">
          <div className="flex gap-2">
            {categories.map(category => {
              const categoryInfo = getCategoryInfo(category);
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-sacred hover:bg-sacred/90" : ""}
                >
                  {category === "all" ? "All" : `${categoryInfo.icon} ${categoryInfo.name}`}
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Prayer List */}
        <div className="space-y-4">
          {filteredPrayers.map(prayer => {
            const isExpanded = expandedPrayer === prayer.id;
            const categoryInfo = getCategoryInfo(prayer.category);
            
            return (
              <Card 
                key={prayer.id} 
                className={`transition-all ${isExpanded ? 'ring-2 ring-sacred/30' : ''}`}
              >
                <CardHeader 
                  className="cursor-pointer py-3"
                  onClick={() => setExpandedPrayer(isExpanded ? null : prayer.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{categoryInfo.icon}</span>
                        <CardTitle className="text-base">{prayer.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {prayer.scripture}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {categoryInfo.name}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                        {prayer.prayer}
                      </pre>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prayer.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(prayer)}
                      >
                        {copiedId === prayer.id ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <ListenButton
                        text={prayer.prayer}
                        itemId={prayer.id}
                        title={prayer.title}
                        size="sm"
                      />
                      {onSelectPrayer && (
                        <Button
                          size="sm"
                          className="bg-sacred hover:bg-sacred/90"
                          onClick={() => handleSelectPrayer(prayer)}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Use This Prayer
                        </Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
