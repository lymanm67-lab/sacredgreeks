import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  GripVertical, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Plus 
} from 'lucide-react';
import { TourStep } from '@/data/demoOnboardingTemplates';
import { toast } from '@/hooks/use-toast';

interface DragDropStepListProps {
  steps: TourStep[];
  onStepsChange: (steps: TourStep[]) => void;
  availableRoutes: string[];
}

const POSITION_OPTIONS = ['center', 'top', 'bottom', 'left', 'right'] as const;

export function DragDropStepList({ steps, onStepsChange, availableRoutes }: DragDropStepListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
    if (dragNodeRef.current) {
      dragNodeRef.current.style.opacity = '0.5';
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newSteps = [...steps];
    const [draggedStep] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(dropIndex, 0, draggedStep);
    onStepsChange(newSteps);
    
    setDraggedIndex(null);
    setDragOverIndex(null);
    toast({ title: 'Step moved', description: `Moved to position ${dropIndex + 1}` });
  };

  const updateStep = (index: number, updates: Partial<TourStep>) => {
    const newSteps = steps.map((step, i) => 
      i === index ? { ...step, ...updates } : step
    );
    onStepsChange(newSteps);
  };

  const removeStep = (index: number) => {
    if (steps.length <= 1) {
      toast({
        title: 'Cannot Remove',
        description: 'Template must have at least one step.',
        variant: 'destructive',
      });
      return;
    }
    onStepsChange(steps.filter((_, i) => i !== index));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    
    const newSteps = [...steps];
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onStepsChange(newSteps);
  };

  const addStep = () => {
    const newStep: TourStep = {
      id: `step-${Date.now()}`,
      title: 'New Step',
      description: 'Describe what users will see here.',
      route: '/dashboard',
      position: 'center',
    };
    onStepsChange([...steps, newStep]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm font-medium">Tour Steps ({steps.length})</Label>
        <Button size="sm" onClick={addStep} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
      </div>

      {steps.map((step, index) => (
        <Card 
          key={step.id} 
          className={`p-3 transition-all duration-200 ${
            dragOverIndex === index ? 'border-primary border-2 scale-[1.02]' : ''
          } ${draggedIndex === index ? 'opacity-50' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          ref={draggedIndex === index ? dragNodeRef : null}
        >
          <div className="flex items-start gap-2">
            {/* Drag Handle */}
            <div 
              className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing"
              title="Drag to reorder"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === steps.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Step {index + 1}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {step.route}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto text-destructive hover:text-destructive"
                  onClick={() => removeStep(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <Input
                value={step.title}
                onChange={(e) => updateStep(index, { title: e.target.value })}
                placeholder="Step title"
                className="text-sm"
              />

              <Textarea
                value={step.description}
                onChange={(e) => updateStep(index, { description: e.target.value })}
                placeholder="Step description"
                rows={2}
                className="text-sm"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Route</Label>
                  <Select
                    value={step.route}
                    onValueChange={(value) => updateStep(index, { route: value })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoutes.map(route => (
                        <SelectItem key={route} value={route}>
                          {route}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Position</Label>
                  <Select
                    value={step.position}
                    onValueChange={(value: TourStep['position']) => 
                      updateStep(index, { position: value })
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITION_OPTIONS.map(pos => (
                        <SelectItem key={pos} value={pos}>
                          {pos.charAt(0).toUpperCase() + pos.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
