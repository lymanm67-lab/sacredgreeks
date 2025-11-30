import React from 'react';
import { DemoWalkthroughOverlay } from '@/components/DemoWalkthroughOverlay';
import { useTemplateSelector } from './DemoTemplateSelectorWrapper';

export function DemoOverlayWithTemplate() {
  const { activeTemplate } = useTemplateSelector();
  
  return <DemoWalkthroughOverlay customTemplate={activeTemplate} />;
}
