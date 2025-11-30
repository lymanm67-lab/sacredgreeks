import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  Check,
  User,
  Building,
  Trophy,
  Flame,
  Clock
} from 'lucide-react';
import { DEMO_PERSONAS, DemoPersona } from '@/data/demoUserPersonas';
import { toast } from '@/hooks/use-toast';

interface DemoPersonaSelectorProps {
  onClose: () => void;
  onSelectPersona: (persona: DemoPersona) => void;
  selectedPersonaId?: string | null;
}

export function DemoPersonaSelector({ 
  onClose, 
  onSelectPersona,
  selectedPersonaId 
}: DemoPersonaSelectorProps) {
  const [selected, setSelected] = useState<string | null>(selectedPersonaId || null);

  const handleSelect = (persona: DemoPersona) => {
    setSelected(persona.id);
  };

  const handleConfirm = () => {
    const persona = DEMO_PERSONAS.find(p => p.id === selected);
    if (persona) {
      onSelectPersona(persona);
      onClose();
      toast({
        title: 'Persona Applied',
        description: `Now viewing as ${persona.displayName}`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              Demo Personas
            </h2>
            <p className="text-muted-foreground">
              Choose a persona to see the app from different perspectives
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Persona Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {DEMO_PERSONAS.map((persona) => (
            <Card 
              key={persona.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selected === persona.id 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleSelect(persona)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{persona.avatar}</span>
                  {selected === persona.id && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{persona.displayName}</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {persona.role}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{persona.organization}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {persona.bio}
                  </p>
                  
                  {/* Stats Preview */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
                        <Trophy className="h-3 w-3" />
                        <span className="text-sm font-bold">Lv.{persona.stats.level}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Level</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400">
                        <Flame className="h-3 w-3" />
                        <span className="text-sm font-bold">{persona.stats.currentStreak}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Streak</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm font-bold">{persona.stats.serviceHours}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Persona Details */}
        {selected && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Persona Details</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const persona = DEMO_PERSONAS.find(p => p.id === selected);
                if (!persona) return null;
                
                return (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Profile</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {persona.displayName}</p>
                        <p><span className="text-muted-foreground">Role:</span> {persona.role}</p>
                        <p><span className="text-muted-foreground">Organization:</span> {persona.organization}</p>
                        <p><span className="text-muted-foreground">Chapter:</span> {persona.chapter}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Days Active:</span> {persona.stats.daysActive}</p>
                        <p><span className="text-muted-foreground">Prayers Answered:</span> {persona.stats.prayersAnswered}</p>
                        <p><span className="text-muted-foreground">Service Hours:</span> {persona.stats.serviceHours}</p>
                        <p><span className="text-muted-foreground">Current Streak:</span> {persona.stats.currentStreak} days</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selected}
          >
            Apply Persona
          </Button>
        </div>
      </div>
    </div>
  );
}
