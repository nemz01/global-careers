import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Cron endpoint to process scheduled follow-up emails
// Protected by CRON_SECRET header
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();

    // Fetch pending emails that are due
    const { data: pendingEmails, error: fetchError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_at', now)
      .limit(50);

    if (fetchError) throw fetchError;

    if (!pendingEmails || pendingEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No emails to process',
        processed: 0,
      });
    }

    let processed = 0;
    let failed = 0;

    for (const email of pendingEmails) {
      try {
        // TODO: Integrate with email provider (Resend, SendGrid, etc.)
        // For now, mark as sent
        await supabase
          .from('email_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
          })
          .eq('id', email.id);

        processed++;
      } catch (emailError) {
        console.error(`Failed to send email ${email.id}:`, emailError);
        await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            error: String(emailError),
          })
          .eq('id', email.id);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      failed,
      total: pendingEmails.length,
    });
  } catch (error) {
    console.error('Error processing emails:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process emails' },
      { status: 500 }
    );
  }
}
