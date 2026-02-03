import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, Play, Loader2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Shorter intro text to reduce API costs and improve reliability
const INTRO_TEXT = `Welcome to Sacred Connections, your digital networking hub. In Greek life, relationships are everything. This tool makes exchanging contacts effortless. Use My Card to generate your QR code. Use Scan QR to capture others' codes. Use Scan Card to photograph business cards. The AI extracts contact details automatically. Every connection strengthens our community.`;

const EXAMPLE_SCENARIOS = [
  {
    title: "At a Conference",
    description: "You meet a soror from another chapter. Open your My Card, let her scan your QR code, then scan hers back. Both contacts saved in seconds!"
  },
  {
    title: "Networking Event",
    description: "A potential mentor hands you their business card. Use the Scan Card tab to photograph it—the AI extracts their info and saves it to your contacts."
  },
  {
    title: "Chapter Meeting",
    description: "New members can share their info with the whole chapter by displaying their QR code on screen while others scan simultaneously."
  }
];

// Browser-based TTS fallback
const speakWithBrowser = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser does not support text-to-speech'));
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95;
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    window.speechSynthesis.speak(utterance);
  });
};

export function SacredConnectionsIntro() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTTSClick = useCallback(async () => {
    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    setIsLoading(true);
    try {
      // Use browser TTS directly (ElevenLabs quota exhausted)
      toast.info('Playing audio introduction...');
      setIsPlaying(true);
      await speakWithBrowser(INTRO_TEXT);
    } catch (error) {
      console.error('TTS error:', error);
      toast.error('Voice playback unavailable on this device');
    } finally {
      setIsLoading(false);
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isPlaying, isPaused]);

  return (
    <Card className="mb-6 border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-sacred" />
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Why Sacred Connections?</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTTSClick}
                disabled={isLoading}
                className={`gap-2 ${
                  isPlaying 
                    ? "bg-sacred/20 border-sacred/50 text-sacred" 
                    : "border-sacred/30 hover:bg-sacred/10"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying && !isPaused ? (
                  <Pause className="w-4 h-4" />
                ) : isPlaying && isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                {isLoading ? "Loading..." : isPlaying && !isPaused ? "Pause" : isPlaying && isPaused ? "Resume" : "Listen"}
              </Button>
            </div>
            
            <p className="text-muted-foreground">
              In our Greek community, relationships are everything. Sacred Connections makes networking 
              effortless—generate your digital card, scan others' codes, or use AI to read business cards.
            </p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sacred hover:text-sacred/80 hover:bg-sacred/10 -ml-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide Examples
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  See How It Works
                </>
              )}
            </Button>
            
            {isExpanded && (
              <div className="space-y-3 pt-2 border-t border-sacred/20">
                <p className="text-sm font-medium text-sacred">Example Scenarios:</p>
                {EXAMPLE_SCENARIOS.map((scenario, index) => (
                  <div key={index} className="bg-background/50 rounded-lg p-3 border border-border/50">
                    <p className="font-medium text-sm">{scenario.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                  </div>
                ))}
                
                <div className="bg-sacred/10 rounded-lg p-3 mt-4">
                  <p className="text-sm">
                    <span className="font-semibold">Pro Tip:</span> Keep your profile updated! Your QR code 
                    pulls directly from your profile info, so make sure your name, email, and organization 
                    are current.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
