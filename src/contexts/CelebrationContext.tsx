import { createContext, useContext, useState, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { CelebrationAnimation } from '@/components/CelebrationAnimation';

interface CelebrationData {
  points: number;
  title: string;
}

interface CelebrationContextType {
  celebrate: (data: CelebrationData) => void;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

export const CelebrationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [celebrationData, setCelebrationData] = useState<CelebrationData>({
    points: 10,
    title: 'Challenge Complete!',
  });

  const celebrate = useCallback((data: CelebrationData) => {
    setCelebrationData(data);
    setShow(true);
  }, []);

  const handleComplete = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <CelebrationContext.Provider value={{ celebrate }}>
      {children}
      <CelebrationAnimation
        show={show}
        onComplete={handleComplete}
        points={celebrationData.points}
        title={celebrationData.title}
      />
    </CelebrationContext.Provider>
  );
};

export const useCelebration = () => {
  const context = useContext(CelebrationContext);
  if (!context) {
    throw new Error('useCelebration must be used within a CelebrationProvider');
  }
  return context;
};
