import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoCompletionCertificate } from './DemoCompletionCertificate';
import { DemoPersonaSelector } from './DemoPersonaSelector';
import { TourBuilderEditor } from './tour-builder/TourBuilderEditor';
import { DemoSessionRecorder } from './DemoSessionRecorder';
import { DemoPersona } from '@/data/demoUserPersonas';
import { OnboardingTemplate } from '@/data/demoOnboardingTemplates';
import { useTemplateSelector } from './DemoTemplateSelectorWrapper';
import { generatePersonaDemoData } from '@/data/personaDemoData';

interface DemoFeaturesContextType {
  openPersonaSelector: () => void;
  openTemplateEditor: (template?: OnboardingTemplate | null) => void;
  openSessionRecorder: () => void;
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
    demoSettings,
    setDemoSetting,
    completedTemplate, 
    completionDate, 
    showCertificate, 
    setShowCertificate,
    activePersona,
    setActivePersona,
    setHasSeenTour,
    savePersistentData,
  } = useDemoMode();
  
  const { setActiveTemplate } = useTemplateSelector();
  
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showSessionRecorder, setShowSessionRecorder] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<OnboardingTemplate | null>(null);

  const openPersonaSelector = () => setShowPersonaSelector(true);
  
  const openTemplateEditor = (template?: OnboardingTemplate | null) => {
    setEditingTemplate(template || null);
    setShowTemplateEditor(true);
  };

  const openSessionRecorder = () => setShowSessionRecorder(true);

  const handleSelectPersona = (persona: DemoPersona) => {
    setActivePersona(persona);
    setShowPersonaSelector(false);
    
    // Load persona-specific demo data
    const personaData = generatePersonaDemoData(persona.id);
    savePersistentData({
      prayers: personaData.prayers,
      achievements: personaData.achievements,
      journeyProgress: personaData.journeyProgress,
      serviceItems: personaData.serviceItems,
      stats: personaData.stats,
    });
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

  // Watch for session recorder setting
  const showRecorderFromSettings = demoSettings.showSessionRecorder;

  return (
    <DemoFeaturesContext.Provider value={{ openPersonaSelector, openTemplateEditor, openSessionRecorder }}>
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

          {/* Template Editor / Tour Builder */}
          {showTemplateEditor && (
            <TourBuilderEditor
              initialTemplate={editingTemplate}
              onClose={() => setShowTemplateEditor(false)}
              onSave={handleSaveTemplate}
              onPreview={handlePreviewTemplate}
            />
          )}

          {/* Session Recorder Dialog */}
          {(showSessionRecorder || showRecorderFromSettings) && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-background border rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Session Recording</h2>
                  <button 
                    onClick={() => {
                      setShowSessionRecorder(false);
                      setDemoSetting('showSessionRecorder', false);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <DemoSessionRecorder 
                  onClose={() => {
                    setShowSessionRecorder(false);
                    setDemoSetting('showSessionRecorder', false);
                  }} 
                />
              </div>
            </div>
          )}
        </>
      )}
    </DemoFeaturesContext.Provider>
  );
}
