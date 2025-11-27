import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface PrayerLine {
  text: string;
  duration: number; // Duration in milliseconds
}

interface Prayer {
  id: string;
  title: string;
  category: string;
  lines: PrayerLine[];
}

const prayers: Prayer[] = [
  {
    id: "lords-prayer",
    title: "The Lord's Prayer",
    category: "Classic",
    lines: [
      { text: "Our Father, who art in heaven,", duration: 3000 },
      { text: "hallowed be thy name.", duration: 2500 },
      { text: "Thy kingdom come,", duration: 2000 },
      { text: "thy will be done,", duration: 2000 },
      { text: "on earth as it is in heaven.", duration: 3000 },
      { text: "Give us this day our daily bread,", duration: 3000 },
      { text: "and forgive us our trespasses,", duration: 3000 },
      { text: "as we forgive those who trespass against us.", duration: 4000 },
      { text: "And lead us not into temptation,", duration: 3000 },
      { text: "but deliver us from evil.", duration: 2500 },
      { text: "For thine is the kingdom,", duration: 2500 },
      { text: "and the power, and the glory,", duration: 3000 },
      { text: "forever and ever.", duration: 2500 },
      { text: "Amen.", duration: 2000 },
    ],
  },
  {
    id: "serenity-prayer",
    title: "Serenity Prayer",
    category: "Wisdom",
    lines: [
      { text: "God, grant me the serenity", duration: 3000 },
      { text: "to accept the things I cannot change,", duration: 4000 },
      { text: "the courage to change the things I can,", duration: 4000 },
      { text: "and the wisdom to know the difference.", duration: 4000 },
      { text: "Living one day at a time,", duration: 3000 },
      { text: "enjoying one moment at a time,", duration: 3000 },
      { text: "accepting hardship as a pathway to peace.", duration: 4000 },
      { text: "Amen.", duration: 2000 },
    ],
  },
  {
    id: "morning-prayer",
    title: "Morning Prayer",
    category: "Daily",
    lines: [
      { text: "Lord, thank you for this new day.", duration: 3000 },
      { text: "As I rise to meet the morning light,", duration: 3500 },
      { text: "fill my heart with your peace and joy.", duration: 3500 },
      { text: "Guide my steps throughout this day,", duration: 3000 },
      { text: "help me to see your presence in all I do.", duration: 4000 },
      { text: "Give me strength to face any challenges,", duration: 3500 },
      { text: "and wisdom to make good decisions.", duration: 3500 },
      { text: "May my words and actions honor you.", duration: 3500 },
      { text: "In Jesus' name, Amen.", duration: 2500 },
    ],
  },
  {
    id: "psalm-23",
    title: "Psalm 23",
    category: "Scripture",
    lines: [
      { text: "The Lord is my shepherd;", duration: 3000 },
      { text: "I shall not want.", duration: 2500 },
      { text: "He makes me lie down in green pastures.", duration: 4000 },
      { text: "He leads me beside still waters.", duration: 3500 },
      { text: "He restores my soul.", duration: 2500 },
      { text: "He leads me in paths of righteousness", duration: 3500 },
      { text: "for his name's sake.", duration: 2500 },
      { text: "Even though I walk through the valley", duration: 3500 },
      { text: "of the shadow of death,", duration: 2500 },
      { text: "I will fear no evil,", duration: 2500 },
      { text: "for you are with me;", duration: 2500 },
      { text: "your rod and your staff, they comfort me.", duration: 4000 },
      { text: "Surely goodness and mercy shall follow me", duration: 4000 },
      { text: "all the days of my life,", duration: 3000 },
      { text: "and I shall dwell in the house of the Lord", duration: 4000 },
      { text: "forever.", duration: 2000 },
    ],
  },
];

interface PrayAlongKaraokeProps {
  className?: string;
}

export function PrayAlongKaraoke({ className }: PrayAlongKaraokeProps) {
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer>(prayers[0]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = selectedPrayer.lines.reduce((sum, line) => sum + line.duration, 0);
  const currentLineDuration = selectedPrayer.lines[currentLineIndex]?.duration || 0;

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  const advanceLine = useCallback(() => {
    setCurrentLineIndex((prev) => {
      if (prev >= selectedPrayer.lines.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
    setProgress(0);
  }, [selectedPrayer.lines.length]);

  useEffect(() => {
    if (!isPlaying) {
      clearTimers();
      return;
    }

    const adjustedDuration = currentLineDuration / speed;
    
    // Progress animation
    const progressInterval = 50;
    const progressIncrement = (progressInterval / adjustedDuration) * 100;
    
    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressIncrement, 100));
    }, progressInterval);

    // Line advancement timer
    timerRef.current = setTimeout(() => {
      advanceLine();
    }, adjustedDuration);

    return clearTimers;
  }, [isPlaying, currentLineIndex, currentLineDuration, speed, advanceLine, clearTimers]);

  const handlePlayPause = () => {
    if (currentLineIndex >= selectedPrayer.lines.length - 1 && !isPlaying) {
      // Reset if at end
      setCurrentLineIndex(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    clearTimers();
    setIsPlaying(false);
    setCurrentLineIndex(0);
    setProgress(0);
  };

  const handlePrayerSelect = (prayer: Prayer) => {
    clearTimers();
    setSelectedPrayer(prayer);
    setIsPlaying(false);
    setCurrentLineIndex(0);
    setProgress(0);
  };

  const handlePrevLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
      setProgress(0);
    }
  };

  const handleNextLine = () => {
    if (currentLineIndex < selectedPrayer.lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      setProgress(0);
    }
  };

  // Calculate overall progress
  const completedDuration = selectedPrayer.lines
    .slice(0, currentLineIndex)
    .reduce((sum, line) => sum + line.duration, 0);
  const currentProgress = (progress / 100) * currentLineDuration;
  const overallProgress = ((completedDuration + currentProgress) / totalDuration) * 100;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Pray Along Mode
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Prayer Selection */}
        <div className="flex flex-wrap gap-2">
          {prayers.map((prayer) => (
            <Button
              key={prayer.id}
              variant={selectedPrayer.id === prayer.id ? "default" : "outline"}
              size="sm"
              onClick={() => handlePrayerSelect(prayer)}
            >
              {prayer.title}
            </Button>
          ))}
        </div>

        {/* Prayer Display */}
        <div className="relative min-h-[300px] bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-6 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-primary rounded-full" />
            <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-primary rounded-full" />
          </div>

          {/* Prayer lines */}
          <div className="relative space-y-3 text-center">
            {selectedPrayer.lines.map((line, index) => {
              const isPast = index < currentLineIndex;
              const isCurrent = index === currentLineIndex;
              const isFuture = index > currentLineIndex;

              return (
                <p
                  key={index}
                  className={cn(
                    "text-lg md:text-xl transition-all duration-500 leading-relaxed",
                    isPast && "text-muted-foreground/50 scale-95",
                    isCurrent && "text-foreground font-semibold scale-105 text-primary",
                    isFuture && "text-muted-foreground/30"
                  )}
                >
                  {isCurrent ? (
                    <span className="relative inline-block">
                      {line.text}
                      {/* Highlight underline */}
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  ) : (
                    line.text
                  )}
                </p>
              );
            })}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevLine}
            disabled={currentLineIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            onClick={handlePlayPause}
            className={cn(
              "w-16 h-16 rounded-full",
              isPlaying && "bg-destructive hover:bg-destructive/90"
            )}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextLine}
            disabled={currentLineIndex >= selectedPrayer.lines.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-3 justify-center">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <div className="flex gap-1">
            {[0.5, 0.75, 1, 1.25, 1.5].map((s) => (
              <Button
                key={s}
                variant={speed === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSpeed(s)}
                className="w-12"
              >
                {s}x
              </Button>
            ))}
          </div>
        </div>

        {/* Line counter */}
        <p className="text-center text-sm text-muted-foreground">
          Line {currentLineIndex + 1} of {selectedPrayer.lines.length}
        </p>
      </CardContent>
    </Card>
  );
}
