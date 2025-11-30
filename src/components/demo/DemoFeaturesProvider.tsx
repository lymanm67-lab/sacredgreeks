import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoCompletionCertificate } from './DemoCompletionCertificate';
import { DemoPersonaSelector } from './DemoPersonaSelector';
import { DemoTemplateEditor } from './DemoTemplateEditor';
import { DemoPersona } from '@/data/demoUserPersonas';
import { OnboardingTemplate } from '@/data/demoOnboardingTemplates';
import { useTemplateSelector } from './DemoTemplateSelectorWrapper';

interface DemoFeaturesContextType {
  openPersonaSelector: () => void;
  openTemplateEditor: (template?: OnboardingTemplate | null) => void;
}

const DemoFeaturesContext = createContext<DemoFeaturesContextType | undefined>(undefined);

export function useDemoFeatures() {
  const context = useContext(DemoFeaturesContext);
  if (!context) {
    throw new Error('useDemoFeatures must be used within DemoFeaturesProvider');
  }
  return context;
}

interface DemoFeaturesProviderProps {
  children: ReactNode;
}

export function DemoFeaturesProvider({ children }: DemoFeaturesProviderProps) {
  const { 
    isDemoMode,
    completedTemplate, 
    completionDate, 
    showCertificate, 
    setShowCertificate,
    activePersona,
    setActivePersona,
    setHasSeenTour,
  } = useDemoMode();
  
  const { setActiveTemplate } = useTemplateSelector();
  
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<OnboardingTemplate | null>(null);

  const openPersonaSelector = () => setShowPersonaSelector(true);
  
  const openTemplateEditor = (template?: OnboardingTemplate | null) => {
    setEditingTemplate(template || null);
    setShowTemplateEditor(true);
  };

  const handleSelectPersona = (persona: DemoPersona) => {
    setActivePersona(persona);
    setShowPersonaSelector(false);
  };

  const handleSaveTemplate = (template: OnboardingTemplate) => {
    setActiveTemplate(template);
    setShowTemplateEditor(false);
  };

  const handlePreviewTemplate = (template: OnboardingTemplate) => {
    setActiveTemplate(template);
    setHasSeenTour(false);
    setShowTemplateEditor(false);
  };

  return (
    <DemoFeaturesContext.Provider value={{ openPersonaSelector, openTemplateEditor }}>
      {children}
      
      {isDemoMode && (
        <>
          {/* Completion Certificate */}
          {showCertificate && completedTemplate && completionDate && (
            <DemoCompletionCertificate
              template={completedTemplate}
              persona={activePersona}
              completedAt={completionDate}
              onClose={() => setShowCertificate(false)}
            />
          )}

          {/* Persona Selector */}
          {showPersonaSelector && (
            <DemoPersonaSelector
              onClose={() => setShowPersonaSelector(false)}
              onSelectPersona={handleSelectPersona}
              selectedPersonaId={activePersona?.id}
            />
          )}

          {/* Template Editor */}
          {showTemplateEditor && (
            <DemoTemplateEditor
              initialTemplate={editingTemplate}
              onClose={() => setShowTemplateEditor(false)}
              onSave={handleSaveTemplate}
              onPreview={handlePreviewTemplate}
            />
          )}
        </>
      )}
    </DemoFeaturesContext.Provider>
  );
}
