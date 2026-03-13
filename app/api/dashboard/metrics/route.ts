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

    const ip = getClientIP(request);
    const rateLimit = await checkRateLimit(`metrics:${ip}`, { maxRequests: 60, windowMs: 60000 });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type) {
      const tableMap: Record<string, string> = {
        leads: 'business_leads',
        candidates: 'candidates',
        bookings: 'bookings',
        calculator: 'calculator_submissions',
        placements: 'placements',
        emails: 'email_queue',
      };

      const table = tableMap[type];
      if (!table) {
        return NextResponse.json({ error: 'Invalid metric type' }, { status: 400 });
      }

      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      const response = NextResponse.json({ count: count || 0 });
      return addSecurityHeaders(response);
    }

    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();

    const [
      { count: totalLeads },
      { count: weekLeads },
      { count: totalCandidates },
      { count: totalBookings },
      { count: totalCalculator },
      { count: totalPlacements },
      { count: pendingEmails },
    ] = await Promise.all([
      supabase.from('business_leads').select('*', { count: 'exact', head: true }),
      supabase.from('business_leads').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
      supabase.from('candidates').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase.from('calculator_submissions').select('*', { count: 'exact', head: true }),
      supabase.from('placements').select('*', { count: 'exact', head: true }),
      supabase.from('email_queue').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);

    const metrics = {
      totalLeads: totalLeads ?? 0,
      weekLeads: weekLeads ?? 0,
      totalCandidates: totalCandidates ?? 0,
      totalBookings: totalBookings ?? 0,
      totalCalculator: totalCalculator ?? 0,
      totalPlacements: totalPlacements ?? 0,
      pendingEmails: pendingEmails ?? 0,
    };

    const response = NextResponse.json(metrics);
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('[API] Dashboard metrics error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
