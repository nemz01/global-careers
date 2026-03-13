import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { bookingSchema } from '@/lib/validations/booking';
import { checkRateLimit, rateLimitResponse, getClientIP, addSecurityHeaders } from '@/lib/api-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`booking:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000,
    });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const body = await request.json();
    const validated = bookingSchema.parse(body);

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_name: validated.client_name,
        email: validated.client_email,
        company: validated.client_company || null,
        phone: validated.client_phone || null,
        booking_type: validated.booking_type,
        date: validated.date,
        time_slot: validated.time_slot,
        timezone: validated.timezone || 'America/New_York',
        notes: validated.notes || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    const response = NextResponse.json(
      { success: true, data: { id: data.id } },
      { status: 201 }
    );
    return addSecurityHeaders(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error in booking API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
