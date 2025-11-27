import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingCTAProps {
  show?: boolean;
  scrollThreshold?: number;
}

export const FloatingCTA = ({ scrollThreshold = 600 }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2",
        "animate-fade-in-up"
      )}
    >
      <Link to="/auth">
        <Button
          size="lg"
          className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-2xl shadow-sacred/30 hover:shadow-sacred/50 transition-all hover:scale-105 group"
        >
          Start Free
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
        onClick={() => setIsDismissed(true)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
