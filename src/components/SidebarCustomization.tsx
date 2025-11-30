import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelRight, RotateCcw, Home, Users, Library } from 'lucide-react';
import { useSidebarPreferences } from '@/hooks/use-sidebar-preferences';
import { cn } from '@/lib/utils';

export function SidebarCustomization() {
  const { preferences, updatePreference, resetPreferences } = useSidebarPreferences();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PanelLeft className="h-5 w-5 text-sacred" />
          Sidebar Customization
        </CardTitle>
        <CardDescription>
          Customize your sidebar position and visible sections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Position Toggle */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sidebar Position</Label>
          <div className="flex gap-2">
            <Button
              variant={preferences.position === 'left' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updatePreference('position', 'left')}
              className={cn(
                preferences.position === 'left' && 'bg-sacred hover:bg-sacred/90'
              )}
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              Left
            </Button>
            <Button
              variant={preferences.position === 'right' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updatePreference('position', 'right')}
              className={cn(
                preferences.position === 'right' && 'bg-sacred hover:bg-sacred/90'
              )}
            >
              <PanelRight className="h-4 w-4 mr-2" />
              Right
            </Button>
          </div>
        </div>

        {/* Section Visibility */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Visible Sections</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Main Navigation</span>
              </div>
              <Switch
                checked={preferences.showMain}
                onCheckedChange={(checked) => updatePreference('showMain', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Community</span>
              </div>
              <Switch
                checked={preferences.showCommunity}
                onCheckedChange={(checked) => updatePreference('showCommunity', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Library className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Resources</span>
              </div>
              <Switch
                checked={preferences.showResources}
                onCheckedChange={(checked) => updatePreference('showResources', checked)}
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetPreferences}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}
