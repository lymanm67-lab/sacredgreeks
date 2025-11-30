import React, { useState } from 'react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoCompletionCertificate } from './DemoCompletionCertificate';
import { DemoPersonaSelector } from './DemoPersonaSelector';
import { DemoTemplateEditor } from './DemoTemplateEditor';
import { DemoPersona } from '@/data/demoUserPersonas';
import { OnboardingTemplate } from '@/data/demoOnboardingTemplates';
import { useTemplateSelector } from './DemoTemplateSelectorWrapper';

export function DemoFeaturesWrapper() {
  const { 
    isDemoMode,
    completedTemplate, 
    completionDate, 
    showCertificate, 
    setShowCertificate,
    activePersona,
    setActivePersona,
  } = useDemoMode();
  
  const { setActiveTemplate } = useTemplateSelector();
  
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<OnboardingTemplate | null>(null);

  if (!isDemoMode) return null;

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
    setShowTemplateEditor(false);
  };

  return (
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
  );
}

// Export control functions via context or hooks
export function useDemoFeatures() {
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  return {
    openPersonaSelector: () => setShowPersonaSelector(true),
    closePersonaSelector: () => setShowPersonaSelector(false),
    showPersonaSelector,
    openTemplateEditor: () => setShowTemplateEditor(true),
    closeTemplateEditor: () => setShowTemplateEditor(false),
    showTemplateEditor,
  };
}
