import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters');

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fieldErrors: Record<string, string>;
}

// Generic validation function
export function validateForm<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): ValidationResult {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
      fieldErrors: {},
    };
  }

  const fieldErrors: Record<string, string> = {};
  const errors: string[] = [];

  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (path) {
      fieldErrors[path] = issue.message;
    }
    errors.push(issue.message);
  });

  return {
    isValid: false,
    errors,
    fieldErrors,
  };
}

// Specific validators
export function validateEmail(email: string): string | null {
  const result = emailSchema.safeParse(email);
  if (result.success) return null;
  return result.error.issues[0]?.message || 'Invalid email';
}

export function validatePassword(password: string): string | null {
  const result = passwordSchema.safeParse(password);
  if (result.success) return null;
  return result.error.issues[0]?.message || 'Invalid password';
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateMinLength(value: string, minLength: number, fieldName: string): string | null {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): string | null {
  if (value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return null;
}

// URL validation
export function validateUrl(url: string): string | null {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
}

// Phone validation (basic)
export function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) {
    return 'Please enter a valid phone number';
  }
  return null;
}

// Composable validator
export function createValidator<T extends Record<string, unknown>>(
  validations: Record<keyof T, (value: unknown) => string | null>
) {
  return (data: T): ValidationResult => {
    const fieldErrors: Record<string, string> = {};
    const errors: string[] = [];

    for (const [field, validate] of Object.entries(validations)) {
      const error = validate(data[field]);
      if (error) {
        fieldErrors[field] = error;
        errors.push(error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      fieldErrors,
    };
  };
}