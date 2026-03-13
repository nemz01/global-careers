import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, unauthorizedResponse, checkRateLimit, rateLimitResponse, getClientIP, addSecurityHeaders } from '@/lib/api-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return unauthorizedResponse(auth.error);
    }

    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`dashboard-candidates:${clientIP}`, { maxRequests: 100, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);

    let query = supabase
      .from('candidates')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const response = NextResponse.json({
      success: true,
      candidates: data,
      total: count,
    });
    return addSecurityHeaders(response);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}
