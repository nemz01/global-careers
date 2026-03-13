import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, rateLimitResponse, getClientIP } from '@/lib/api-auth';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const TokenSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_in: z.number().positive(),
});

const CredentialsSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const rateLimit = await checkRateLimit(`auth-login:${clientIP}`, { maxRequests: 10, windowMs: 60000 });
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetIn);
  }

  try {
    const body = await request.json();

    const tokenResult = TokenSchema.safeParse(body);
    if (tokenResult.success) {
      const { access_token, refresh_token, expires_in } = tokenResult.data;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json(
          { success: false, error: 'Auth service not configured' },
          { status: 503 }
        );
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user }, error } = await supabase.auth.getUser(access_token);

      if (error || !user) {
        return NextResponse.json(
          { success: false, error: 'Invalid session token' },
          { status: 401 }
        );
      }

      const response = NextResponse.json({ success: true, user });

      response.cookies.set('sb-access-token', access_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: expires_in,
      });

      response.cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    const credResult = CredentialsSchema.safeParse(body);
    if (!credResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { email, password } = credResult.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Auth service not configured' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, user: data.user });

    if (data.session) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: data.session.expires_in,
      });

      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error('[Auth Login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
