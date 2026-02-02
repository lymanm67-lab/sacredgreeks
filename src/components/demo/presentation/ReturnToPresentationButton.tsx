import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Presentation, ArrowLeft } from 'lucide-react';

interface ReturnToPresentationButtonProps {
  onReturnToPresentation: (slideIndex: number) => void;
}

export function ReturnToPresentationButton({ onReturnToPresentation }: ReturnToPresentationButtonProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const fromPresentation = searchParams.get('fromPresentation') === 'true';
  const slideIndex = parseInt(searchParams.get('slide') || '0', 10);

  const handleReturn = () => {
    // Remove the query params
    searchParams.delete('fromPresentation');
    searchParams.delete('slide');
    setSearchParams(searchParams);
    
    // Navigate to dashboard and trigger presentation
    navigate('/dashboard');
    
    // Small delay to ensure navigation completes, then open presentation
    setTimeout(() => {
      onReturnToPresentation(slideIndex);
    }, 100);
  };

  if (!fromPresentation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
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
    </AnimatePresence>
  );
}
