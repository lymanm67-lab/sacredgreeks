import React from 'react';
import { DemoWalkthroughOverlay } from '@/components/DemoWalkthroughOverlay';
import { useTemplateSelector } from './DemoTemplateSelectorWrapper';

export function DemoOverlayWithTemplate() {
  // Safe hook call with error boundary fallback
  const templateContext = useTemplateSelector();
  
  if (!templateContext) {
    return null;
  }
  
  return <DemoWalkthroughOverlay customTemplate={templateContext.activeTemplate} />;
}
