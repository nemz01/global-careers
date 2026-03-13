import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validations/contact';
import { checkRateLimit, rateLimitResponse, getClientIP, addSecurityHeaders } from '@/lib/api-auth';
import { checkAntiSpam } from '@/lib/anti-spam';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`contact:${clientIP}`, {
      maxRequests: 5,
      windowMs: 3600000,
    });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Anti-spam checks
    const spamCheck = await checkAntiSpam(body, {
      turnstileToken: validated.turnstileToken,
      checkEmail: validated.email,
    });

    if (spamCheck.blocked) {
      return NextResponse.json(
        { success: false, error: spamCheck.reason },
        { status: spamCheck.status || 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('business_leads')
      .insert({
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        phone: validated.phone || null,
        message: validated.message,
        source: 'contact_form',
        status: 'new',
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

    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
