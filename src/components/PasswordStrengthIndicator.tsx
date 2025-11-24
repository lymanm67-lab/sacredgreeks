import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PasswordRequirements } from '@/components/PasswordRequirements';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (password.length < 8) return 'weak';
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength++; // lowercase
  if (/[A-Z]/.test(password)) strength++; // uppercase
  if (/[0-9]/.test(password)) strength++; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) strength++; // special characters
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
};

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  if (!password) return null;
  
  const strength = calculatePasswordStrength(password);
  
  const config = {
    weak: {
      label: 'Weak',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      icon: ShieldAlert,
      bars: 1,
    },
    medium: {
      label: 'Medium',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      icon: Shield,
      bars: 2,
    },
    strong: {
      label: 'Strong',
      color: 'text-sacred',
      bgColor: 'bg-sacred/10',
      borderColor: 'border-sacred/20',
      icon: ShieldCheck,
      bars: 3,
    },
  };
  
  const { label, color, bgColor, borderColor, icon: Icon, bars } = config[strength];
  
  return (
    <div className={cn('mt-2 p-2 rounded-md border', bgColor, borderColor)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('w-4 h-4', color)} />
        <span className={cn('text-xs font-medium', color)}>
          Password Strength: {label}
        </span>
      </div>
      
      <div className="flex gap-1">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              bar <= bars ? color.replace('text-', 'bg-') : 'bg-muted'
            )}
          />
        ))}
      </div>
      
      {strength === 'weak' && (
        <p className="text-xs text-muted-foreground mt-2">
          Try adding uppercase letters, numbers, and special characters
        </p>
      )}
      
      {strength === 'medium' && (
        <p className="text-xs text-muted-foreground mt-2">
          Good! Consider making it longer or adding more variety
        </p>
      )}
      
      {strength === 'strong' && (
        <p className="text-xs text-muted-foreground mt-2">
          Excellent! Your password is strong
        </p>
      )}
      
      <PasswordRequirements password={password} />
    </div>
  );
};