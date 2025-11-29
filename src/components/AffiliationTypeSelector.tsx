import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AFFILIATION_TYPES } from '@/data/affiliationTypes';
import { Users } from 'lucide-react';

interface AffiliationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}

export function AffiliationTypeSelector({ value, onChange, compact = false }: AffiliationTypeSelectorProps) {
  if (compact) {
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium">Your Connection to Greek Life</Label>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
          {AFFILIATION_TYPES.map((type) => (
            <div
              key={type.value}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:border-sacred/50 ${
                value === type.value ? 'border-sacred bg-sacred/5' : 'border-border'
              }`}
              onClick={() => onChange(type.value)}
            >
              <RadioGroupItem value={type.value} id={`affiliation-${type.value}`} />
              <div className="flex-1">
                <Label htmlFor={`affiliation-${type.value}`} className="cursor-pointer flex items-center gap-2">
                  <span>{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-sacred" />
          Your Connection to Greek Life
        </CardTitle>
        <CardDescription>
          Select the option that best describes your relationship with Greek life
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {AFFILIATION_TYPES.map((type) => (
            <div
              key={type.value}
              className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-sacred/50 ${
                value === type.value ? 'border-sacred bg-sacred/5' : 'border-border'
              }`}
              onClick={() => onChange(type.value)}
            >
              <RadioGroupItem value={type.value} id={`affiliation-full-${type.value}`} />
              <div className="flex-1">
                <Label htmlFor={`affiliation-full-${type.value}`} className="cursor-pointer flex items-center gap-2 text-base">
                  <span className="text-xl">{type.icon}</span>
                  <span className="font-semibold">{type.label}</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
