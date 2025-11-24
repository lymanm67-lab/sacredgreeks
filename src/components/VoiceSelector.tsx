import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type VoiceOption = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

interface VoiceSelectorProps {
  onVoiceChange: (voice: VoiceOption) => void;
  defaultVoice?: VoiceOption;
}

const voiceDescriptions: Record<VoiceOption, string> = {
  alloy: "Neutral and balanced",
  echo: "Warm and friendly",
  fable: "Expressive and dynamic",
  onyx: "Deep and authoritative",
  nova: "Energetic and bright",
  shimmer: "Soft and gentle",
};

export const VoiceSelector = ({ onVoiceChange, defaultVoice = "alloy" }: VoiceSelectorProps) => {
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(defaultVoice);

  useEffect(() => {
    // Load saved voice preference from localStorage
    const savedVoice = localStorage.getItem("tts-voice") as VoiceOption;
    if (savedVoice) {
      setSelectedVoice(savedVoice);
      onVoiceChange(savedVoice);
    }
  }, [onVoiceChange]);

  const handleVoiceChange = (voice: VoiceOption) => {
    setSelectedVoice(voice);
    localStorage.setItem("tts-voice", voice);
    onVoiceChange(voice);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Voice Settings</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Choose your preferred text-to-speech voice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedVoice} onValueChange={handleVoiceChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(voiceDescriptions) as VoiceOption[]).map((voice) => (
              <SelectItem key={voice} value={voice}>
                <div className="flex flex-col items-start">
                  <span className="font-medium capitalize">{voice}</span>
                  <span className="text-xs text-muted-foreground">
                    {voiceDescriptions[voice]}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
