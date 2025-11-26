import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  duration?: number;
  onComplete?: () => void;
}

export const SuccessAnimation = ({
  show,
  message = 'Success!',
  duration = 2000,
  onComplete,
}: SuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-scale-in">
        <div className="bg-card border-2 border-sacred rounded-lg shadow-lg p-6 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-sacred/10 flex items-center justify-center animate-float">
            <CheckCircle2 className="w-10 h-10 text-sacred" />
          </div>
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
};
