import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  TreePine,
  Waves,
  Wind,
  CloudRain,
  Bird,
  Flame,
  Music,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AmbientSound {
  id: string;
  name: string;
  icon: React.ReactNode;
  // Using free ambient sound URLs from various sources
  url: string;
  color: string;
}

const ambientSounds: AmbientSound[] = [
  {
    id: "rain",
    name: "Gentle Rain",
    icon: <CloudRain className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3",
    color: "bg-blue-500",
  },
  {
    id: "forest",
    name: "Forest",
    icon: <TreePine className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3",
    color: "bg-green-500",
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    icon: <Waves className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3",
    color: "bg-cyan-500",
  },
  {
    id: "wind",
    name: "Soft Wind",
    icon: <Wind className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3",
    color: "bg-slate-400",
  },
  {
    id: "birds",
    name: "Morning Birds",
    icon: <Bird className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3",
    color: "bg-yellow-500",
  },
  {
    id: "fire",
    name: "Crackling Fire",
    icon: <Flame className="w-5 h-5" />,
    url: "https://assets.mixkit.co/active_storage/sfx/2502/2502-preview.mp3",
    color: "bg-orange-500",
  },
];

interface AmbientSoundPlayerProps {
  className?: string;
  compact?: boolean;
}

export function AmbientSoundPlayer({ className, compact = false }: AmbientSoundPlayerProps) {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSoundSelect = (sound: AmbientSound) => {
    if (activeSound === sound.id) {
      // Toggle pause/play for same sound
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
      return;
    }

    // Stop current sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Play new sound
    const audio = new Audio(sound.url);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    
    audio.play().then(() => {
      setActiveSound(sound.id);
      setIsPlaying(true);
    }).catch(err => {
      console.error("Failed to play audio:", err);
    });
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setActiveSound(null);
    setIsPlaying(false);
  };

  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-2",
              isPlaying && "bg-primary animate-pulse",
              className
            )}
          >
            <Music className="w-4 h-4" />
            {isPlaying ? "Playing" : "Ambient"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <AmbientSoundPlayerContent
            sounds={ambientSounds}
            activeSound={activeSound}
            isPlaying={isPlaying}
            volume={volume}
            onSoundSelect={handleSoundSelect}
            onVolumeChange={handleVolumeChange}
            onStop={stopSound}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className={cn("p-4 rounded-lg border bg-card", className)}>
      <AmbientSoundPlayerContent
        sounds={ambientSounds}
        activeSound={activeSound}
        isPlaying={isPlaying}
        volume={volume}
        onSoundSelect={handleSoundSelect}
        onVolumeChange={handleVolumeChange}
        onStop={stopSound}
      />
    </div>
  );
}

interface AmbientSoundPlayerContentProps {
  sounds: AmbientSound[];
  activeSound: string | null;
  isPlaying: boolean;
  volume: number;
  onSoundSelect: (sound: AmbientSound) => void;
  onVolumeChange: (value: number[]) => void;
  onStop: () => void;
}

function AmbientSoundPlayerContent({
  sounds,
  activeSound,
  isPlaying,
  volume,
  onSoundSelect,
  onVolumeChange,
  onStop,
}: AmbientSoundPlayerContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold flex items-center gap-2">
          <Music className="w-4 h-4 text-primary" />
          Ambient Sounds
        </h4>
        {isPlaying && (
          <Button variant="ghost" size="sm" onClick={onStop}>
            <VolumeX className="w-4 h-4 mr-1" />
            Stop
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => onSoundSelect(sound)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
              activeSound === sound.id
                ? "border-primary bg-primary/10"
                : "border-transparent bg-muted/50 hover:bg-muted"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              activeSound === sound.id ? sound.color : "bg-muted-foreground/30"
            )}>
              {sound.icon}
            </div>
            <span className="text-xs font-medium text-center">{sound.name}</span>
            {activeSound === sound.id && isPlaying && (
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${8 + Math.random() * 8}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 pt-2">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          onValueChange={onVolumeChange}
          max={1}
          step={0.1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
