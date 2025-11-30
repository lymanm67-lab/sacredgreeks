import React from 'react';
import { Check, User, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type VoiceOption = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

interface VoiceSelectorProps {
  selectedVoice: VoiceOption;
  onVoiceChange: (voice: VoiceOption) => void;
}

const VOICE_OPTIONS: { id: VoiceOption; name: string; description: string; gender: 'neutral' | 'male' | 'female' }[] = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral, balanced', gender: 'neutral' },
  { id: 'echo', name: 'Echo', description: 'Male, warm', gender: 'male' },
  { id: 'fable', name: 'Fable', description: 'Male, British', gender: 'male' },
  { id: 'onyx', name: 'Onyx', description: 'Male, deep', gender: 'male' },
  { id: 'nova', name: 'Nova', description: 'Female, friendly', gender: 'female' },
  { id: 'shimmer', name: 'Shimmer', description: 'Female, expressive', gender: 'female' },
];

export function VoiceSelector({ selectedVoice, onVoiceChange }: VoiceSelectorProps) {
  const currentVoice = VOICE_OPTIONS.find(v => v.id === selectedVoice) || VOICE_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <Mic className="h-3 w-3" />
          <span className="text-xs">{currentVoice.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {VOICE_OPTIONS.map((voice) => (
          <DropdownMenuItem
            key={voice.id}
            onClick={() => onVoiceChange(voice.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <User className={`h-3 w-3 ${
                voice.gender === 'female' ? 'text-pink-500' : 
                voice.gender === 'male' ? 'text-blue-500' : 
                'text-purple-500'
              }`} />
              <div>
                <p className="text-sm font-medium">{voice.name}</p>
                <p className="text-[10px] text-muted-foreground">{voice.description}</p>
              </div>
            </div>
            {selectedVoice === voice.id && (
              <Check className="h-4 w-4 text-emerald-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
