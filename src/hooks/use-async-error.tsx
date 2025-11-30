import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseAsyncOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
  errorMessage?: string;
  retryCount?: number;
  retryDelay?: number;
}

export function useAsync<T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const {
    onSuccess,
    onError,
    showErrorToast = true,
    errorMessage = 'An error occurred. Please try again.',
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      let lastError: Error | null = null;
      
      for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
          const data = await asyncFunction(...args);
          setState({
            data,
            error: null,
            isLoading: false,
            isSuccess: true,
            isError: false,
          });
          onSuccess?.(data);
          return data;
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          
          if (attempt < retryCount) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
          }
        }
      }

      // All retries failed
      setState({
        data: null,
        error: lastError,
        isLoading: false,
        isSuccess: false,
        isError: true,
      });

      if (showErrorToast && lastError) {
        toast.error(errorMessage, {
          description: lastError.message,
          action: {
            label: 'Retry',
            onClick: () => execute(...args),
          },
        });
      }

      onError?.(lastError!);
      throw lastError;
    },
    [asyncFunction, onSuccess, onError, showErrorToast, errorMessage, retryCount, retryDelay]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Network error detection utility
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      error.name === 'TypeError' && message.includes('failed')
    );
  }
  return false;
}

// Format error message for display
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (isNetworkError(error)) {
      return 'Unable to connect. Please check your internet connection.';
    }
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Hook for handling form submission errors
export function useFormError() {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      // Check for validation errors (commonly returned from APIs)
      if ('fieldErrors' in err && typeof (err as { fieldErrors: unknown }).fieldErrors === 'object') {
        setFieldErrors((err as { fieldErrors: Record<string, string> }).fieldErrors);
      } else {
        setError(formatErrorMessage(err));
      }
    } else if (typeof err === 'string') {
      setError(err);
    } else {
      setError('An unexpected error occurred');
    }
  }, []);

  const clearErrors = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    error,
    fieldErrors,
    handleError,
    clearErrors,
    clearFieldError,
    hasErrors: !!error || Object.keys(fieldErrors).length > 0,
  };
}