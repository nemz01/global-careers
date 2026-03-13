import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculatorSchema } from '@/lib/validations/calculator';
import { checkRateLimit, rateLimitResponse, getClientIP, addSecurityHeaders } from '@/lib/api-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`calculator:${clientIP}`, {
      maxRequests: 20,
      windowMs: 3600000,
    });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const body = await request.json();
    const validated = calculatorSchema.parse(body);

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('calculator_submissions')
      .insert({
        email: validated.email || null,
        company: validated.company_name || null,
        role_title: validated.role_title,
        us_salary: validated.us_salary,
        offshore_salary: validated.offshore_salary,
        annual_savings: validated.annual_savings,
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

    console.error('Error in calculator API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
