import { useState, useCallback } from 'react';

// Check password against HaveIBeenPwned API using k-anonymity
// The API never receives the full password - only first 5 chars of SHA-1 hash
export const usePasswordBreachCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkPassword = useCallback(async (password: string): Promise<{ isBreached: boolean; count: number }> => {
    if (!password || password.length < 1) {
      return { isBreached: false, count: 0 };
    }

    setIsChecking(true);
    setError(null);

    try {
      // Create SHA-1 hash of the password
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      // Split hash for k-anonymity: first 5 chars sent to API, rest checked locally
      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      // Query HaveIBeenPwned API with the prefix
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: {
          'Add-Padding': 'true' // Adds padding to prevent timing attacks
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check password');
      }

      const text = await response.text();
      const lines = text.split('\r\n');

      // Check if our suffix appears in the response
      for (const line of lines) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix === suffix) {
          const breachCount = parseInt(count, 10);
          setBreachCount(breachCount);
          setIsChecking(false);
          return { isBreached: true, count: breachCount };
        }
      }

      setBreachCount(0);
      setIsChecking(false);
      return { isBreached: false, count: 0 };
    } catch (err) {
      console.error('Password breach check error:', err);
      setError('Unable to verify password security');
      setIsChecking(false);
      // Fail open - don't block signup if API is unavailable
      return { isBreached: false, count: 0 };
    }
  }, []);

  const reset = useCallback(() => {
    setBreachCount(null);
    setError(null);
    setIsChecking(false);
  }, []);

  return {
    checkPassword,
    isChecking,
    breachCount,
    error,
    reset
  };
};
