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
  
  // Check URL params whenever location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromPresentation = params.get('fromPresentation') === 'true';
    const slide = parseInt(params.get('slide') || '0', 10);
    
    setShowButton(fromPresentation);
    setSlideIndex(slide);
  }, [location.search]);

  const handleReturn = () => {
    if (onReturnToPresentation) {
      // Navigate to dashboard without the query params
      navigate('/dashboard');

      // Small delay to ensure navigation completes, then open presentation
      setTimeout(() => {
        onReturnToPresentation(slideIndex);
      }, 150);
      return;
    }

    // Global fallback: let AppLayout open the slideshow via URL params
    navigate(`/dashboard?openPresentation=true&slide=${slideIndex}`);
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
