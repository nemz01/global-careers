import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/dashboard'];
const bypassI18nPrefixes = ['/dashboard', '/api', '/auth', '/_next'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldBypassI18n =
    bypassI18nPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.includes('.');

  if (shouldBypassI18n) {
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      });

      const accessTokenCookie = request.cookies.get('sb-access-token');
      const accessToken = accessTokenCookie?.value;

      if (!accessToken) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const { data: { user }, error } = await supabase.auth.getUser(accessToken);

      if (error || !user) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$).*)',
  ],
};
