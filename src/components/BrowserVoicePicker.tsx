import { useState, useEffect } from "react";
import { Volume2, Play } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const VOICE_QUALITY_KEYWORDS = [
  "Google", "Microsoft", "Samantha", "Natural", "Neural",
  "Enhanced", "Premium", "Siri", "Aria", "Guy", "Jenny",
];

function scoreVoice(voice: SpeechSynthesisVoice): number {
  let score = 0;
  if (voice.lang.startsWith("en")) score += 10;
  if (voice.localService) score += 2;
  for (const kw of VOICE_QUALITY_KEYWORDS) {
    if (voice.name.includes(kw)) { score += 5; break; }
  }
  return score;
}

export function getBestBrowserVoice(): SpeechSynthesisVoice | null {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const saved = localStorage.getItem("browser-tts-voice");
  if (saved) {
    const match = voices.find((v) => v.name === saved);
    if (match) return match;
  }
  const english = voices.filter((v) => v.lang.startsWith("en"));
  if (english.length === 0) return voices[0] || null;
  english.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return english[0];
}

interface BrowserVoicePickerProps {
  className?: string;
}

export function BrowserVoicePicker({ className = "" }: BrowserVoicePickerProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const load = () => {
      const all = window.speechSynthesis.getVoices();
      const english = all.filter((v) => v.lang.startsWith("en"));
      english.sort((a, b) => scoreVoice(b) - scoreVoice(a));
      setVoices(english.length > 0 ? english : all);

      const saved = localStorage.getItem("browser-tts-voice");
      if (saved && all.find((v) => v.name === saved)) {
        setSelected(saved);
      } else if (english.length > 0) {
        setSelected(english[0].name);
      }
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const handleChange = (name: string) => {
    setSelected(name);
    localStorage.setItem("browser-tts-voice", name);
  };

  const handlePreview = () => {
    if (!selected) return;
    window.speechSynthesis.cancel();
    const voice = voices.find((v) => v.name === selected);
    if (!voice) return;
    const utt = new SpeechSynthesisUtterance("Welcome to Sacred Greeks!");
    utt.voice = voice;
    utt.rate = 0.95;
    window.speechSynthesis.speak(utt);
  };

  if (voices.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger className="h-8 text-xs w-[200px]">
          <SelectValue placeholder="Choose voice" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {voices.map((v) => (
            <SelectItem key={v.name} value={v.name} className="text-xs">
              {v.name.replace(/^(Microsoft |Google |Apple )/, "")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={handlePreview}
      >
        <Play className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
