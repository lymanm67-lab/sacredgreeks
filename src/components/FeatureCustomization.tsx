import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings2, 
  Eye, 
  EyeOff, 
  Crown, 
  Lock, 
  RefreshCw,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Bot,
  Building2
} from 'lucide-react';
import { useFeaturePreferences } from '@/hooks/use-feature-preferences';
import { FEATURES, getFeaturesByCategory, isFeatureAvailable, TierLevel } from '@/data/featureTiers';
import { cn } from '@/lib/utils';

const categoryIcons = {
  core: Sparkles,
  study: BookOpen,
  prayer: Heart,
  community: Users,
  ai: Bot,
  chapter: Building2,
};

const categoryLabels = {
  core: 'Core',
  study: 'Study',
  prayer: 'Prayer',
  community: 'Community',
  ai: 'AI Tools',
  chapter: 'Chapter',
};

export function FeatureCustomization() {
  const {
    tier,
    tierInfo,
    hiddenCount,
    maxHidden,
    canHideMore,
    isFeatureVisible,
    isFeatureAvailable: checkFeatureAvailable,
    toggleFeature,
    resetPreferences,
  } = useFeaturePreferences();

  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    await resetPreferences();
    setIsResetting(false);
  };

  const featuresByCategory = getFeaturesByCategory('ministry'); // Show all features

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-sacred" />
              Feature Customization
            </CardTitle>
            <CardDescription>
              Show or hide features on your dashboard
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Crown className="w-3 h-3" />
              {tierInfo.name}
            </Badge>
            {maxHidden !== null && (
              <Badge variant="secondary" className="text-xs">
                {hiddenCount}/{maxHidden} hidden
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {maxHidden !== null && hiddenCount >= maxHidden && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
            <p className="text-amber-600 dark:text-amber-400">
              You've reached the limit of {maxHidden} hidden features.{' '}
              <Link to="/subscription" className="underline font-medium">
                Upgrade to Pro
              </Link>{' '}
              for unlimited customization.
            </p>
          </div>
        )}

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto gap-1">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const Icon = categoryIcons[key as keyof typeof categoryIcons];
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-1 text-xs py-2"
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(featuresByCategory).map(([category, features]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="space-y-2">
                {features.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No features in this category
                  </p>
                ) : (
                  features.map((feature) => {
                    const isAvailable = checkFeatureAvailable(feature.id);
                    const isVisible = isFeatureVisible(feature.id);
                    const needsUpgrade = !isAvailable;

                    return (
                      <div
                        key={feature.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border transition-colors",
                          needsUpgrade 
                            ? "bg-muted/30 border-dashed opacity-60" 
                            : isVisible 
                              ? "bg-card border-border" 
                              : "bg-muted/50 border-muted"
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={cn(
                            "p-1.5 rounded-md",
                            needsUpgrade ? "bg-muted" : isVisible ? "bg-sacred/10" : "bg-muted"
                          )}>
                            {needsUpgrade ? (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            ) : isVisible ? (
                              <Eye className="w-4 h-4 text-sacred" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-medium text-sm truncate",
                                needsUpgrade && "text-muted-foreground"
                              )}>
                                {feature.name}
                              </span>
                              {needsUpgrade && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                                  {feature.minTier === 'pro' ? 'Pro' : 'Ministry'}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="ml-3 shrink-0">
                          {needsUpgrade ? (
                            <Link to="/subscription">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Crown className="w-3 h-3 mr-1" />
                                Upgrade
                              </Button>
                            </Link>
                          ) : (
                            <Switch
                              checked={isVisible}
                              onCheckedChange={(checked) => toggleFeature(feature.id, checked)}
                              disabled={!isVisible && !canHideMore()}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            disabled={isResetting || hiddenCount === 0}
            className="gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", isResetting && "animate-spin")} />
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
