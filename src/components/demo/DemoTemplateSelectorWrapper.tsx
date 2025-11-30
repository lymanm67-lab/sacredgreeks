import React, { useState, createContext, useContext } from 'react';
import { DemoTemplateSelector } from './DemoTemplateSelector';
import { OnboardingTemplate } from '@/data/demoOnboardingTemplates';

interface TemplateSelectorContextType {
  isOpen: boolean;
  openSelector: () => void;
  closeSelector: () => void;
  activeTemplate: OnboardingTemplate | null;
  setActiveTemplate: (template: OnboardingTemplate | null) => void;
}

const TemplateSelectorContext = createContext<TemplateSelectorContextType | undefined>(undefined);

export function useTemplateSelector() {
  const context = useContext(TemplateSelectorContext);
  if (!context) {
    throw new Error('useTemplateSelector must be used within DemoTemplateSelectorWrapper');
  }
  return context;
}

interface DemoTemplateSelectorWrapperProps {
  children: React.ReactNode;
}

export function DemoTemplateSelectorProvider({ children }: DemoTemplateSelectorWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<OnboardingTemplate | null>(null);

  const openSelector = () => setIsOpen(true);
  const closeSelector = () => setIsOpen(false);

  const handleSelectTemplate = (template: OnboardingTemplate) => {
    setActiveTemplate(template);
    closeSelector();
  };

  return (
    <TemplateSelectorContext.Provider 
      value={{ 
        isOpen, 
        openSelector, 
        closeSelector, 
        activeTemplate, 
        setActiveTemplate 
      }}
    >
      {children}
      {isOpen && (
        <DemoTemplateSelector 
          onClose={closeSelector}
          onSelectTemplate={handleSelectTemplate}
        />
      )}
    </TemplateSelectorContext.Provider>
  );
}
