import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, Play, Loader2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';

const INTRO_TEXT = `Welcome to Sacred Connections, your digital networking hub for the Greek community. 

In our Divine 9 and faith-focused Greek organizations, relationships are everything. Whether you're at a conference, step show, community service event, or alumni mixer, Sacred Connections makes it effortless to exchange contact information and build lasting bonds.

Here's how it works:

First, the My Card tab. This generates a professional QR code from your profile. When someone scans it, they instantly receive your contact information as a digital vCard. No more fumbling for business cards or manually typing phone numbers.

Second, the Scan QR tab. Use your camera to scan another member's QR code. Their contact info is automatically saved, and you'll be prompted to share your card back. This reciprocal exchange strengthens our network.

Third, the Scan Card tab. Got a traditional business card? Our AI-powered scanner reads the card image and extracts the contact details automatically. Just snap a photo and let technology do the work.

Sacred Connections embodies our Greek values of brotherhood, sisterhood, and community. Every connection you make strengthens our network and honors our legacy of service and uplift. Start connecting today!`;

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

export function SacredConnectionsIntro() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading } = useTextToSpeech();
  
  const itemId = 'sacred-connections-intro';
  const isActive = isPlaying === itemId;
  const loading = isLoading === itemId;

  const handleTTSClick = () => {
    if (isActive) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(INTRO_TEXT, itemId, "onwK4e9ZLuTAKqWW03F9", "Sacred Connections Introduction");
    }
  };

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
                disabled={loading}
                className={`gap-2 ${
                  isActive 
                    ? "bg-sacred/20 border-sacred/50 text-sacred" 
                    : "border-sacred/30 hover:bg-sacred/10"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isActive && !isPaused ? (
                  <Pause className="w-4 h-4" />
                ) : isActive && isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                {loading ? "Loading..." : isActive && !isPaused ? "Pause" : isActive && isPaused ? "Resume" : "Listen"}
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
