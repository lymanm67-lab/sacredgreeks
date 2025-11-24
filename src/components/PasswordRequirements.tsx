import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    label: 'Contains uppercase letter (A-Z)',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: 'Contains lowercase letter (a-z)',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: 'Contains number (0-9)',
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    label: 'Contains special character (!@#$%...)',
    test: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
  },
];

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ 
  password, 
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!password) return null;

  const metRequirements = requirements.filter(req => req.test(password));
  const allMet = metRequirements.length === requirements.length;

  return (
    <div className={cn('mt-2', className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-2 h-auto text-xs hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            Password Requirements ({metRequirements.length}/{requirements.length} met)
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-2 p-3 border rounded-md bg-muted/30 space-y-2">
          {requirements.map((req, index) => {
            const isMet = req.test(password);
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-xs"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
                    isMet ? 'bg-sacred text-sacred-foreground' : 'bg-muted border border-border'
                  )}
                >
                  {isMet ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    'transition-colors',
                    isMet ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {req.label}
                </span>
              </div>
            );
          })}

          {allMet && (
            <div className="pt-2 mt-2 border-t border-border">
              <p className="text-xs text-sacred font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                All requirements met!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};