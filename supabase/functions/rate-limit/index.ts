import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const requestSchema = z.object({
  endpoint: z.string().min(1).max(100),
  userId: z.string().uuid()
})

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  'assessment': { maxRequests: 10, windowMs: 60000 }, // 10 per minute
  'prayer': { maxRequests: 20, windowMs: 60000 }, // 20 per minute
  'default': { maxRequests: 100, windowMs: 60000 }, // 100 per minute
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse and validate input
    const body = await req.json()
    const validation = requestSchema.safeParse(body)
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { endpoint, userId } = validation.data

    // Verify the authenticated user can only check their own rate limits
    if (user.id !== userId) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Check rate limit in a hypothetical rate_limits table
    const { data: rateLimitData, error: fetchError } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('user_id', userId)
      .eq('endpoint', endpoint)
      .gte('created_at', new Date(windowStart).toISOString())

    if (fetchError) throw fetchError

    const requestCount = rateLimitData?.length || 0

    if (requestCount >= config.maxRequests) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          retryAfter: config.windowMs / 1000 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(config.windowMs / 1000)
          } 
        }
      )
    }

    // Log this request
    const { error: insertError } = await supabase
      .from('rate_limits')
      .insert({
        user_id: userId,
        endpoint,
        created_at: new Date().toISOString()
      })

    if (insertError) throw insertError

    return new Response(
      JSON.stringify({ 
        allowed: true,
        remaining: config.maxRequests - requestCount - 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Rate limit error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process rate limit request. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
