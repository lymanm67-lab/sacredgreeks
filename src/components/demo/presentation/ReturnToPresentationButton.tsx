import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Presentation, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReturnToPresentationButtonProps {
  /**
   * Optional: If provided, the button will call this after navigating back to /dashboard.
   * If omitted, it will redirect to /dashboard?openPresentation=true&slide=... and let AppLayout open the slideshow.
   */
  onReturnToPresentation?: (slideIndex: number) => void;
}

export function ReturnToPresentationButton({ onReturnToPresentation }: ReturnToPresentationButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPresenter, setIsPresenter] = useState(false);
  
  // Check URL params whenever location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromPresentation = params.get('fromPresentation') === 'true';
    const slideRaw = parseInt(params.get('slide') || '0', 10);
    const slide = Number.isFinite(slideRaw) ? slideRaw : 0;
    const presenter = params.get('presenter') === 'true';
    
    setShowButton(fromPresentation);
    setSlideIndex(slide);
    setIsPresenter(presenter);
  }, [location.search]);

  const handleReturn = () => {
    // Capture slideIndex before navigating (navigation will clear URL params)
    const targetSlide = slideIndex;
    console.log('[ReturnToPresentationButton] Returning to slide:', targetSlide, { isPresenter, hasCallback: !!onReturnToPresentation });
    
    if (onReturnToPresentation) {
      // Navigate to dashboard without the query params
      // Preserve `presenter=true` so we don't lose presenter access.
      navigate(isPresenter ? '/dashboard?presenter=true' : '/dashboard');

      // Small delay to ensure navigation completes, then open presentation
      setTimeout(() => {
        console.log('[ReturnToPresentationButton] Calling onReturnToPresentation with slide:', targetSlide);
        onReturnToPresentation(targetSlide);
      }, 150);
      return;
    }

    // Global fallback: let AppLayout open the slideshow via URL params
    const qs = new URLSearchParams();
    qs.set('openPresentation', 'true');
    qs.set('slide', String(slideIndex));
    if (isPresenter) qs.set('presenter', 'true');
    navigate(`/dashboard?${qs.toString()}`);
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          key="return-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={handleReturn}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <Presentation className="w-4 h-4" />
            Return to Presentation
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
