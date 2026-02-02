import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  X, 
  Maximize2,
  Minimize2,
  Clock,
  PanelRightClose,
  PanelRight,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ListChecks,
  Smartphone,
  Download,
  Upload,
  FileDown,
  FileText,
  Loader2,
  Video,
  Monitor,
  Presentation
} from 'lucide-react';
import { PresentationSlide, salesPresentationSlides, getPresentationDuration } from './SalesPresentationSlides';
import { cn } from '@/lib/utils';
import { exportToPowerPoint, exportToPDF } from '@/lib/presentation-export';
import { toast } from 'sonner';

interface PresentationSlideViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export function PresentationSlideViewer({ isOpen, onClose, initialSlide = 0 }: PresentationSlideViewerProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true); // Presenter notes - hide for audience view
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track previous open state to detect when opening
  const wasOpenRef = React.useRef(false);
  
  // ALWAYS sync to initialSlide when opening (isOpen transitions from false to true)
  // This ensures returning from demo pages goes to the correct slide
  React.useEffect(() => {
    const justOpened = isOpen && !wasOpenRef.current;
    
    console.log('[PresentationSlideViewer] Effect:', { 
      isOpen, 
      wasOpen: wasOpenRef.current, 
      justOpened, 
      initialSlide,
      currentSlide 
    });
    
    if (justOpened) {
      console.log('[PresentationSlideViewer] Opening at slide:', initialSlide);
      setCurrentSlide(initialSlide);
    }
    
    // Update ref AFTER checking (important for next render comparison)
    wasOpenRef.current = isOpen;
  }, [isOpen, initialSlide]);

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
    // Pass slide index so we can return to the same slide.
    // Preserve `presenter=true` (fallback access) across routes.
    const currentParams = new URLSearchParams(window.location.search);
    const isPresenter = currentParams.get('presenter') === 'true';
    const qs = new URLSearchParams();
    qs.set('fromPresentation', 'true');
    qs.set('slide', String(currentSlide));
    if (isPresenter) qs.set('presenter', 'true');
    navigate(`${route}?${qs.toString()}`);
  };

  // Export handlers
  type ExportPlatform = 'generic' | 'webinarjam' | 'zoom' | 'teams';
  
  const handleExportPowerPoint = async (platform: ExportPlatform = 'generic') => {
    setIsExporting(true);
    const platformNames: Record<ExportPlatform, string> = {
      generic: 'PowerPoint',
      webinarjam: 'WebinarJam',
      zoom: 'Zoom',
      teams: 'MS Teams'
    };
    try {
      await exportToPowerPoint(slides, 'Sacred-Greeks-Presentation', platform);
      toast.success(`${platformNames[platform]} presentation exported!`, {
        description: platform !== 'generic' 
          ? `Optimized for ${platformNames[platform]} screen sharing` 
          : undefined
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PowerPoint');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async (platform: ExportPlatform = 'generic') => {
    setIsExporting(true);
    try {
      await exportToPDF(slides, 'Sacred-Greeks-Presentation', platform);
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pptx') && !file.name.endsWith('.ppt')) {
      toast.error('Please upload a PowerPoint file (.pptx or .ppt)');
      return;
    }

    toast.info('Upload feature coming soon! For now, you can download and edit the PowerPoint, then share it directly.');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          
          {/* Export/Import Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2" disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Standard Export</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExportPowerPoint('generic')}>
                <FileDown className="w-4 h-4 mr-2" />
                Download PowerPoint (.pptx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportPDF('generic')}>
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">Platform-Optimized</DropdownMenuLabel>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Presentation className="w-4 h-4 mr-2" />
                  WebinarJam
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleExportPowerPoint('webinarjam')}>
                    <FileDown className="w-4 h-4 mr-2" />
                    PowerPoint (16:9 HD)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportPDF('webinarjam')}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF with Notes
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Video className="w-4 h-4 mr-2" />
                  Zoom
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleExportPowerPoint('zoom')}>
                    <FileDown className="w-4 h-4 mr-2" />
                    PowerPoint (16:9 HD)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportPDF('zoom')}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF with Notes
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Monitor className="w-4 h-4 mr-2" />
                  MS Teams
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleExportPowerPoint('teams')}>
                    <FileDown className="w-4 h-4 mr-2" />
                    PowerPoint (16:9 HD)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportPDF('teams')}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF with Notes
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleUploadClick}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Custom Deck
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Hidden file input for upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pptx,.ppt"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Button 
            variant={showNotes ? "secondary" : "ghost"} 
            size="icon" 
            onClick={() => setShowNotes(!showNotes)}
            title={showNotes ? "Hide notes (presenter view)" : "Show notes"}
          >
            {showNotes ? <PanelRightClose className="w-5 h-5" /> : <PanelRight className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16 pb-24 h-full flex overflow-hidden">
        {/* Slide Content - Left Side */}
        <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mb-8"
            >
              <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur overflow-hidden">
                {/* Live App Preview or Fallback Image */}
                {slide.route ? (
                  <div className="relative w-full overflow-hidden bg-background border-b border-border" style={{ height: '280px' }}>
                    <div className="absolute inset-0" style={{ 
                      transform: 'scale(0.35)', 
                      transformOrigin: 'top left',
                      width: '285%',
                      height: '285%'
                    }}>
                      <iframe 
                        src={`${window.location.origin}${slide.route}`}
                        title={`${slide.title} Preview`}
                        className="w-full h-full pointer-events-none border-0"
                        style={{ minHeight: '800px' }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex justify-center pointer-events-none">
                      <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                        <Play className="w-3 h-3 mr-1" />
                        Live Preview
                      </Badge>
                    </div>
                  </div>
                ) : slide.image ? (
                  <div className="relative w-full overflow-hidden">
                    {slide.secondaryImage ? (
                      <div className="flex h-48 gap-2">
                        <div className="flex-1 relative overflow-hidden rounded-l-lg">
                          <img 
                            src={slide.image} 
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 relative overflow-hidden rounded-r-lg">
                          <img 
                            src={slide.secondaryImage} 
                            alt={`${slide.title} - Gift`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="h-48">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  </div>
                ) : null}
                
                <CardHeader className={cn("text-center pb-6", (slide.image || slide.route) && "-mt-12 relative z-10")}>
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20">
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

                  {/* Live Demo Button - More Prominent */}
                  {slide.route && (
                    <Button
                      onClick={() => handleLiveDemo(slide.route!)}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Open Full Demo
                    </Button>
                  )}

                  {/* QR Code for Mobile Download */}
                  {slide.showQRCode && (
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                        <Smartphone className="w-4 h-4" />
                        Scan to Install on Your Phone
                      </div>
                      <div className="flex justify-center">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <QRCode
                            value={window.location.origin}
                            size={120}
                            level="M"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Works on iPhone & Android
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Presenter Notes - Right Side (hidden in audience mode) */}
        {showNotes && (
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
        )}
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
