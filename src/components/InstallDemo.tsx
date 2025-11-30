import React, { useState, useEffect } from 'react';
import { Share2, Plus, MoreVertical, Download, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InstallDemoProps {
  platform: 'iphone' | 'android';
}

const iphoneSteps = [
  { 
    id: 1, 
    title: 'Open Safari', 
    description: 'Go to sacredgreekslife.com',
    highlight: 'url-bar'
  },
  { 
    id: 2, 
    title: 'Tap Share', 
    description: 'Bottom of screen',
    highlight: 'share-button'
  },
  { 
    id: 3, 
    title: 'Add to Home Screen', 
    description: 'Scroll down and tap',
    highlight: 'add-home'
  },
  { 
    id: 4, 
    title: 'Tap Add', 
    description: 'Confirm installation',
    highlight: 'confirm'
  },
  { 
    id: 5, 
    title: 'Done!', 
    description: 'App is on your home screen',
    highlight: 'complete'
  },
];

const androidSteps = [
  { 
    id: 1, 
    title: 'Open Chrome', 
    description: 'Go to sacredgreekslife.com',
    highlight: 'url-bar'
  },
  { 
    id: 2, 
    title: 'Tap Menu', 
    description: '3 dots in top right',
    highlight: 'menu-button'
  },
  { 
    id: 3, 
    title: 'Add to Home Screen', 
    description: 'Or "Install app"',
    highlight: 'add-home'
  },
  { 
    id: 4, 
    title: 'Tap Install', 
    description: 'Confirm installation',
    highlight: 'confirm'
  },
  { 
    id: 5, 
    title: 'Done!', 
    description: 'App is on your home screen',
    highlight: 'complete'
  },
];

export function InstallDemo({ platform }: InstallDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = platform === 'iphone' ? iphoneSteps : androidSteps;

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const step = steps[currentStep];

  return (
    <div className="bg-gray-100 rounded-2xl p-4">
      {/* Phone Mockup */}
      <div className="relative mx-auto" style={{ maxWidth: '200px' }}>
        {/* Phone Frame */}
        <div className="bg-gray-900 rounded-[2rem] p-2 shadow-xl">
          {/* Screen */}
          <div className="bg-white rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: '9/19' }}>
            {/* Status Bar */}
            <div className="bg-gray-100 px-4 py-1 flex justify-between items-center text-[8px] text-gray-600">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="w-3 h-1.5 bg-gray-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Browser Chrome */}
            <div className="bg-gray-50 border-b border-gray-200">
              {/* URL Bar */}
              <div 
                className={cn(
                  "mx-2 my-1.5 px-2 py-1 bg-gray-200 rounded-full text-[7px] text-center transition-all duration-300",
                  step?.highlight === 'url-bar' && "ring-2 ring-[#8B5CF6] ring-offset-1 bg-purple-100"
                )}
              >
                sacredgreekslife.com
              </div>
              
              {/* Android Menu Button */}
              {platform === 'android' && (
                <div className="flex justify-end px-2 pb-1">
                  <div 
                    className={cn(
                      "p-1 rounded transition-all duration-300",
                      step?.highlight === 'menu-button' && "bg-purple-200 ring-2 ring-[#8B5CF6]"
                    )}
                  >
                    <MoreVertical className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-3 flex-1 relative">
              {/* App Preview */}
              <div className="text-center mb-2">
                <div className="w-8 h-8 bg-[#8B5CF6]/20 rounded-lg mx-auto mb-1 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#8B5CF6]">SG</span>
                </div>
                <p className="text-[7px] font-medium text-gray-700">Sacred Greeks</p>
              </div>

              {/* Share Menu Overlay (iPhone) */}
              {platform === 'iphone' && (step?.highlight === 'add-home' || step?.highlight === 'confirm') && (
                <div className="absolute inset-x-2 bottom-12 bg-white rounded-lg shadow-lg border border-gray-200 p-2 animate-slide-up">
                  <div 
                    className={cn(
                      "flex items-center gap-2 p-1.5 rounded transition-all",
                      step?.highlight === 'add-home' && "bg-purple-100 ring-1 ring-[#8B5CF6]"
                    )}
                  >
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                      <Plus className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-[7px]">Add to Home Screen</span>
                  </div>
                </div>
              )}

              {/* Android Menu Overlay */}
              {platform === 'android' && (step?.highlight === 'add-home' || step?.highlight === 'confirm') && (
                <div className="absolute right-2 top-0 bg-white rounded-lg shadow-lg border border-gray-200 p-1.5 animate-slide-up">
                  <div 
                    className={cn(
                      "flex items-center gap-2 p-1.5 rounded transition-all",
                      step?.highlight === 'add-home' && "bg-purple-100 ring-1 ring-[#8B5CF6]"
                    )}
                  >
                    <Download className="w-3 h-3 text-gray-600" />
                    <span className="text-[7px]">Install app</span>
                  </div>
                </div>
              )}

              {/* Confirm Dialog */}
              {step?.highlight === 'confirm' && (
                <div className="absolute inset-x-4 top-1/3 bg-white rounded-lg shadow-xl border border-gray-200 p-2 animate-fade-in">
                  <p className="text-[7px] text-center mb-2">Add to Home Screen?</p>
                  <div className="flex justify-center gap-2">
                    <button className="px-2 py-0.5 text-[6px] text-gray-500">Cancel</button>
                    <button className="px-2 py-0.5 text-[6px] bg-[#8B5CF6] text-white rounded animate-pulse">
                      {platform === 'iphone' ? 'Add' : 'Install'}
                    </button>
                  </div>
                </div>
              )}

              {/* Success State */}
              {step?.highlight === 'complete' && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-lg">✅</span>
                  </div>
                  <p className="text-[8px] font-medium text-green-700">Installed!</p>
                </div>
              )}
            </div>

            {/* Bottom Bar (iPhone) */}
            {platform === 'iphone' && (
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex justify-around">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div 
                  className={cn(
                    "p-1 rounded transition-all duration-300",
                    step?.highlight === 'share-button' && "bg-purple-200 ring-2 ring-[#8B5CF6] scale-125"
                  )}
                >
                  <Share2 className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {/* Pointer Finger Animation */}
        {(step?.highlight === 'share-button' || step?.highlight === 'menu-button' || step?.highlight === 'add-home' || step?.highlight === 'confirm') && (
          <div className="absolute pointer-events-none animate-bounce" style={{
            bottom: step?.highlight === 'share-button' ? '20px' : 'auto',
            top: step?.highlight !== 'share-button' ? '40%' : 'auto',
            right: '10px',
          }}>
            <span className="text-2xl">👆</span>
          </div>
        )}
      </div>

      {/* Step Indicator */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-gray-900">{step?.title}</p>
        <p className="text-xs text-gray-500">{step?.description}</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentStep(index); setIsPlaying(false); }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentStep ? "bg-[#8B5CF6] scale-125" : "bg-gray-300"
            )}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mt-4">
        {isPlaying ? (
          <Button size="sm" variant="outline" onClick={handlePause}>
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
        ) : (
          <Button size="sm" variant="default" onClick={handlePlay} className="bg-[#8B5CF6] hover:bg-[#7C4DEF]">
            <Play className="w-4 h-4 mr-1" />
            {currentStep >= steps.length - 1 ? 'Replay' : 'Play Demo'}
          </Button>
        )}
        {currentStep > 0 && (
          <Button size="sm" variant="ghost" onClick={handleRestart}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
