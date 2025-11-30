import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormErrorAlertProps {
  error?: string | null;
  errors?: string[];
  title?: string;
  onDismiss?: () => void;
  className?: string;
}

export function FormErrorAlert({
  error,
  errors = [],
  title = 'Error',
  onDismiss,
  className,
}: FormErrorAlertProps) {
  const allErrors = error ? [error, ...errors] : errors;
  
  if (allErrors.length === 0) return null;

  return (
    <Alert variant="destructive" className={cn('relative', className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {allErrors.length === 1 ? (
          allErrors[0]
        ) : (
          <ul className="list-disc list-inside space-y-1 mt-1">
            {allErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}

// Field-level error display
interface FieldErrorProps {
  error?: string | null;
  className?: string;
}

export function FieldError({ error, className }: FieldErrorProps) {
  if (!error) return null;
  
  return (
    <p className={cn('text-sm text-destructive mt-1 flex items-center gap-1', className)}>
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      {error}
    </p>
  );
}

// Success message component
interface FormSuccessProps {
  message?: string | null;
  className?: string;
}

export function FormSuccess({ message, className }: FormSuccessProps) {
  if (!message) return null;
  
  return (
    <Alert className={cn('border-green-500/50 bg-green-500/10', className)}>
      <AlertDescription className="text-green-700 dark:text-green-400">
        {message}
      </AlertDescription>
    </Alert>
  );
}