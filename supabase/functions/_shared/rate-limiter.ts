// In-memory rate limiter with sliding window for edge functions
// This provides per-IP and per-user rate limiting for AI endpoints

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

// In-memory storage (per edge function instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configurations per endpoint type
export const RATE_LIMIT_CONFIGS = {
  // AI endpoints - stricter limits to prevent abuse
  ai_chat: { maxRequests: 20, windowMs: 60000 }, // 20 per minute
  ai_prayer: { maxRequests: 10, windowMs: 60000 }, // 10 per minute
  ai_coach: { maxRequests: 5, windowMs: 60000 }, // 5 per minute
  ai_search: { maxRequests: 15, windowMs: 60000 }, // 15 per minute
  ai_recommendations: { maxRequests: 10, windowMs: 60000 }, // 10 per minute
  
  // Default for other endpoints
  default: { maxRequests: 100, windowMs: 60000 }, // 100 per minute
} as const;

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIGS;

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // milliseconds until window reset
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, or combination)
 * @param limitType - Type of rate limit to apply
 * @returns Result indicating if request is allowed
 */
export function checkRateLimit(
  identifier: string,
  limitType: RateLimitType = 'default'
): RateLimitResult {
  const config = RATE_LIMIT_CONFIGS[limitType];
  const now = Date.now();
  const key = `${limitType}:${identifier}`;
  
  // Clean up old entries periodically
  if (rateLimitStore.size > 10000) {
    cleanupExpiredEntries(now);
  }
  
  const entry = rateLimitStore.get(key);
  
  // No existing entry - create new window
  if (!entry || now - entry.windowStart >= config.windowMs) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    const resetIn = config.windowMs - (now - entry.windowStart);
    return {
      allowed: false,
      remaining: 0,
      resetIn,
    };
  }
  
  // Increment counter
  entry.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: config.windowMs - (now - entry.windowStart),
  };
}

/**
 * Get client identifier from request (IP + optional user ID)
 */
export function getClientIdentifier(req: Request, userId?: string): string {
  // Try to get real IP from various headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0]?.trim() || 'unknown';
  
  // Combine IP with user ID if available for more precise limiting
  return userId ? `${ip}:${userId}` : ip;
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitResponse(
  corsHeaders: Record<string, string>,
  resetIn: number,
  message?: string
): Response {
  return new Response(
    JSON.stringify({
      error: message || 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil(resetIn / 1000),
    }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil(resetIn / 1000)),
        'X-RateLimit-Reset': String(Date.now() + resetIn),
      },
    }
  );
}

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries(now: number): void {
  const maxWindow = Math.max(...Object.values(RATE_LIMIT_CONFIGS).map(c => c.windowMs));
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart >= maxWindow) {
      rateLimitStore.delete(key);
    }
  }
}
