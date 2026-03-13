import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// =============================================================================
// RATE LIMITING (Upstash Redis with in-memory fallback)
// =============================================================================

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const rateLimiters = new Map<string, Ratelimit>();

function getUpstashLimiter(options: RateLimitOptions): Ratelimit {
  const key = `${options.maxRequests}:${options.windowMs}`;
  let limiter = rateLimiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(
        options.maxRequests,
        `${Math.ceil(options.windowMs / 1000)} s`
      ),
      analytics: false,
    });
    rateLimiters.set(key, limiter);
  }
  return limiter;
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimitInMemory(
  identifier: string,
  options: RateLimitOptions
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + options.windowMs });
    return { allowed: true, remaining: options.maxRequests - 1, resetIn: options.windowMs };
  }

  if (record.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetIn: record.resetTime - now,
  };
}

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 60000 }
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  if (!redis) {
    return checkRateLimitInMemory(identifier, options);
  }

  const limiter = getUpstashLimiter(options);
  const result = await limiter.limit(identifier);

  return {
    allowed: result.success,
    remaining: result.remaining,
    resetIn: Math.max(0, result.reset - Date.now()),
  };
}

export function rateLimitResponse(resetIn: number): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please try again later.',
      retry_after: Math.ceil(resetIn / 1000),
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil(resetIn / 1000)),
        'X-RateLimit-Remaining': '0',
      },
    }
  );
}

// =============================================================================
// AUTHENTICATION
// =============================================================================

interface AuthResult {
  authenticated: boolean;
  user?: { id: string; email?: string; role?: string };
  error?: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authenticated: false, error: 'Supabase not configured' };
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { authenticated: false, error: 'Invalid token' };
    }

    return {
      authenticated: true,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  const accessToken = request.cookies.get('sb-access-token')?.value;
  if (accessToken) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (!error && user) {
      return {
        authenticated: true,
        user: { id: user.id, email: user.email, role: user.role },
      };
    }
  }

  return { authenticated: false, error: 'No valid authentication found' };
}

export function unauthorizedResponse(message = 'Unauthorized'): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

export function forbiddenResponse(message = 'Forbidden'): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

// =============================================================================
// ADMIN AUTHENTICATION
// =============================================================================

export async function verifyAdminAuth(request: NextRequest): Promise<AuthResult> {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey && adminKey === process.env.ADMIN_API_KEY) {
    return { authenticated: true, user: { id: 'admin-api', role: 'admin' } };
  }

  const authResult = await verifyAuth(request);
  if (!authResult.authenticated) return authResult;

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase());

  if (
    authResult.user?.email &&
    adminEmails.includes(authResult.user.email.toLowerCase())
  ) {
    return { ...authResult, user: { ...authResult.user, role: 'admin' } };
  }

  return { authenticated: false, error: 'Admin access required' };
}

// =============================================================================
// HELPERS
// =============================================================================

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

export function validateContentType(request: NextRequest): boolean {
  const contentType = request.headers.get('content-type');
  return contentType?.includes('application/json') ?? false;
}

export function invalidContentTypeResponse(): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Content-Type must be application/json' },
    { status: 415 }
  );
}
