import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hand, ChevronLeft, ChevronRight, Play, RotateCcw, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListenButton } from '@/components/ListenButton';

interface Step {
  id: number;
  title: string;
  description: string;
  visual: 'initial' | 'arc1' | 'arc2' | 'complete' | 'confirmed';
  instruction: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'The Approach',
    description: 'Two strangers meet and extend hands for a normal greeting.',
    visual: 'initial',
    instruction: 'Christian A approaches someone they suspect may be a fellow believer. They extend their hand for what appears to be an ordinary handshake.'
  },
  {
    id: 2,
    title: 'First Arc Traced',
    description: 'Person A subtly traces the first curved line (half of the fish) in Person B\'s palm.',
    visual: 'arc1',
    instruction: 'During the handshake, Christian A uses their finger to trace a single curved arc in the other person\'s palm—this represents one half of the ichthys (fish) symbol.'
  },
  {
    id: 3,
    title: 'Recognition Test',
    description: 'Person B must recognize the signal and respond correctly.',
    visual: 'arc2',
    instruction: 'If Person B is a fellow Christian, they recognize the arc as half of the ichthys. They respond by tracing the second curved arc, completing the fish shape in Person A\'s palm.'
  },
  {
    id: 4,
    title: 'The Complete Ichthys',
    description: 'Both arcs together form the complete fish symbol—the secret sign of the early church.',
    visual: 'complete',
    instruction: 'The two arcs together form the complete ichthys fish, an acrostic for "Iesous Christos Theou Yios Soter" (Jesus Christ, Son of God, Savior).'
  },
  {
    id: 5,
    title: 'Brotherhood Confirmed',
    description: 'Both parties now know they share the faith. Safe information can be exchanged.',
    visual: 'confirmed',
    instruction: 'Having confirmed each other as believers, they could safely share the location of hidden gatherings, the names of church leaders, or the hiding places of sacred texts—information that could mean death if revealed to Roman authorities.'
  }
];

const ttsText = `The Ichthys Fish Trace: A Step-by-Step Guide to Early Christian Recognition.

During the Roman persecution of Christians in the first through third centuries, believers developed covert methods to identify one another without verbal disclosure that could endanger both parties. One such method was the ichthys trace—a secret handshake using the fish symbol.

Step One: The Approach. Two strangers meet and extend hands for what appears to be a normal greeting. Christian A approaches someone they suspect may be a fellow believer.

Step Two: First Arc Traced. During the handshake, Christian A uses their finger to subtly trace a single curved arc in the other person's palm. This arc represents one half of the ichthys, the fish symbol.

Step Three: Recognition Test. If the other person is a fellow Christian, they recognize the arc as half of the ichthys fish. They respond by tracing the second curved arc, completing the fish shape.

Step Four: The Complete Ichthys. The two arcs together form the complete fish symbol. Ichthys is a Greek acrostic meaning "Iesous Christos Theou Yios Soter"—Jesus Christ, Son of God, Savior.

Step Five: Brotherhood Confirmed. Having confirmed each other as believers through this silent exchange, they could safely share dangerous information: the location of hidden gatherings, the names of church leaders, or the hiding places of sacred texts.

This practice demonstrates how early Christians used physical gestures with embedded symbolic meaning for covert recognition—the same structural pattern found in fraternal organizations today.

Scripture reference: Galatians 2:9—"They gave the right hand of fellowship to Barnabas and me."`;

// SVG component for the hand with palm trace
const HandWithTrace = ({ visual }: { visual: Step['visual'] }) => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-full h-full max-w-[280px]">
        {/* Palm background */}
        <ellipse cx="100" cy="85" rx="55" ry="65" className="fill-amber-100 dark:fill-amber-900/30 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
        
        {/* Palm lines for realism */}
        <path d="M 60 70 Q 100 85 140 70" className="stroke-amber-300 dark:stroke-amber-700" strokeWidth="1" fill="none" />
        <path d="M 65 95 Q 100 105 135 95" className="stroke-amber-300 dark:stroke-amber-700" strokeWidth="1" fill="none" />
        
        {/* First arc of ichthys */}
        <AnimatePresence>
          {(visual === 'arc1' || visual === 'arc2' || visual === 'complete' || visual === 'confirmed') && (
            <motion.path
              d="M 70 85 Q 100 50 130 85"
              className="stroke-green-600 dark:stroke-green-400"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        
        {/* Second arc of ichthys */}
        <AnimatePresence>
          {(visual === 'arc2' || visual === 'complete' || visual === 'confirmed') && (
            <motion.path
              d="M 70 85 Q 100 120 130 85"
              className="stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
            />
          )}
        </AnimatePresence>
        
        {/* Highlight complete fish */}
        <AnimatePresence>
          {(visual === 'complete' || visual === 'confirmed') && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* Glow effect */}
              <ellipse cx="100" cy="85" rx="35" ry="20" className="fill-sacred/10 dark:fill-sacred/20" />
              {/* Fish eye */}
              <circle cx="78" cy="85" r="3" className="fill-sacred" />
            </motion.g>
          )}
        </AnimatePresence>
        
        {/* Confirmation checkmark */}
        <AnimatePresence>
          {visual === 'confirmed' && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <circle cx="160" cy="30" r="18" className="fill-green-500" />
              <path d="M 150 30 L 157 37 L 172 22" className="stroke-white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          )}
        </AnimatePresence>
        
        {/* Labels */}
        {(visual === 'arc1' || visual === 'arc2' || visual === 'complete' || visual === 'confirmed') && (
          <text x="100" y="155" textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">
            {visual === 'arc1' && 'First arc traced by Person A'}
            {visual === 'arc2' && 'Second arc traced by Person B'}
            {visual === 'complete' && 'Complete Ichthys (ΙΧΘΥΣ)'}
            {visual === 'confirmed' && 'Brotherhood Confirmed ✓'}
          </text>
        )}
        {visual === 'initial' && (
          <text x="100" y="155" textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">
            Open palm ready for handshake
          </text>
        )}
      </svg>
    </div>
  );
};

export function IchthysTraceDiagram({ className, defaultOpen = false }: { className?: string; defaultOpen?: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Auto-advance through steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStep(step);
      }
    }, 2500);
  };

  const step = steps[currentStep];

  return (
    <Card className={`border-sacred/30 overflow-hidden ${className}`}>
      <CardHeader 
        className="bg-gradient-to-r from-sacred/10 to-amber-500/10 pb-4 cursor-pointer hover:from-sacred/15 hover:to-amber-500/15 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-amber-600 flex items-center justify-center shadow-lg">
                <Hand className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  The Ichthys Fish Trace
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Step-by-step guide to early Christian covert recognition
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30">
                Visual Guide
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* TTS Button - always visible */}
          <div className="flex items-center gap-2 pt-2 border-t border-sacred/20" onClick={(e) => e.stopPropagation()}>
            <Volume2 className="w-4 h-4 text-sacred" />
            <span className="text-sm text-muted-foreground">Listen to explanation:</span>
            <ListenButton
              text={ttsText}
              itemId="ichthys-trace-diagram"
              title="Ichthys Trace Guide"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-0">
              {/* Visual Display */}
              <div className="p-6 bg-gradient-to-b from-background to-muted/20 border-b">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HandWithTrace visual={step.visual} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step Info */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-sacred text-white">
                    Step {step.id} of {steps.length}
                  </Badge>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <div className="p-3 bg-muted/30 rounded-lg border border-muted">
                  <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="p-4 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentStep === 0 || isPlaying}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1 || isPlaying}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={isPlaying}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handlePlay}
                    disabled={isPlaying}
                    className="bg-sacred hover:bg-sacred/90"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Auto-Play
                  </Button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-center gap-2">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => !isPlaying && setCurrentStep(idx)}
                      disabled={isPlaying}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentStep 
                          ? 'bg-sacred w-6' 
                          : idx < currentStep 
                            ? 'bg-green-500' 
                            : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Scripture Reference */}
              <div className="p-4 bg-gradient-to-r from-sacred/5 to-amber-500/5 border-t">
                <p className="text-xs text-muted-foreground text-center italic">
                  "They gave the right hand of fellowship to Barnabas and me." — Galatians 2:9
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
