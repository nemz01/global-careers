import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, rateLimitResponse, getClientIP, addSecurityHeaders } from '@/lib/api-auth';
import { checkAntiSpam } from '@/lib/anti-spam';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const candidateApplicationSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2).max(50),
  role_interest: z.string().min(2).max(100),
  experience_years: z.number().min(0).max(50),
  skills: z.array(z.string()).min(1).max(20),
  english_level: z.enum(['basic', 'intermediate', 'advanced', 'native']),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  resume_url: z.string().url().optional().or(z.literal('')),
  notes: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`candidate-apply:${clientIP}`, {
      maxRequests: 3,
      windowMs: 3600000,
    });
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetIn);
    }

    const body = await request.json();
    const validated = candidateApplicationSchema.parse(body);

    // Anti-spam
    const spamCheck = await checkAntiSpam(body, {
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
      .from('candidates')
      .insert({
        full_name: validated.full_name,
        email: validated.email,
        phone: validated.phone || null,
        country: validated.country,
        role_interest: validated.role_interest,
        experience_years: validated.experience_years,
        skills: validated.skills,
        english_level: validated.english_level,
        linkedin_url: validated.linkedin_url || null,
        portfolio_url: validated.portfolio_url || null,
        resume_url: validated.resume_url || null,
        notes: validated.notes || null,
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

    console.error('Error in candidate application API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
