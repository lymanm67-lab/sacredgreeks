import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  X, 
  Maximize2,
  Minimize2,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ListChecks
} from 'lucide-react';
import { PresentationSlide, salesPresentationSlides, getPresentationDuration } from './SalesPresentationSlides';
import { cn } from '@/lib/utils';

interface PresentationSlideViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PresentationSlideViewer({ isOpen, onClose }: PresentationSlideViewerProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = salesPresentationSlides;
  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLiveDemo = (route: string) => {
    onClose();
    navigate(route);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      autoFocus
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold">Sacred Greeks Sales Presentation</h2>
            <p className="text-xs text-muted-foreground">
              Slide {currentSlide + 1} of {slides.length} • {getPresentationDuration()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-32 h-2" />
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16 pb-20 h-full flex">
        {/* Slide Content - Left Side */}
        <div className="flex-1 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10">
                    {slide.icon}
                  </div>
                  <CardTitle className="text-3xl">{slide.title}</CardTitle>
                  {slide.subtitle && (
                    <p className="text-muted-foreground text-lg">{slide.subtitle}</p>
                  )}
                  {slide.duration && (
                    <Badge variant="outline" className="mx-auto mt-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {slide.duration}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Points */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Key Points
                    </h4>
                    <ul className="space-y-2">
                      {slide.keyPoints.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  {slide.stats && slide.stats.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      {slide.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-center"
                        >
                          <p className="text-2xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Live Demo Button */}
                  {slide.route && (
                    <Button
                      onClick={() => handleLiveDemo(slide.route!)}
                      className="w-full"
                      variant="outline"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Live Demo
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Presenter Notes - Right Side */}
        <div className="w-96 border-l border-border bg-muted/30 flex flex-col">
          <div className="p-4 border-b border-border bg-background/50">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Presenter Notes
            </h3>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {/* Speaking Notes */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  What to Say
                </h4>
                {slide.presenterNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2 text-sm"
                  >
                    <span className="text-primary font-bold">{i + 1}.</span>
                    <span>{note}</span>
                  </motion.div>
                ))}
              </div>

              {/* Talking Points */}
              {slide.talkingPoints && slide.talkingPoints.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Supporting Details
                  </h4>
                  {slide.talkingPoints.map((point, i) => (
                    <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span>→</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Items */}
              {slide.actionItems && slide.actionItems.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <ListChecks className="w-4 h-4" />
                    Call to Action
                  </h4>
                  {slide.actionItems.map((item, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 border-t border-border bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 px-4">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="min-w-32"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                i === currentSlide
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>

        <Button
          size="lg"
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="min-w-32"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
