import { getSupabaseAdmin } from './supabase';

interface EmailData {
  leadId: string;
  toEmail: string;
  template: string;
  subject: string;
  body?: string;
  scheduledAt: Date;
}

/**
 * Queue an email for scheduled sending.
 */
export async function queueEmail(data: EmailData) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('email_queue').insert({
    lead_id: data.leadId,
    to_email: data.toEmail,
    template: data.template,
    subject: data.subject,
    body: data.body || null,
    scheduled_at: data.scheduledAt.toISOString(),
    status: 'pending',
  });

  if (error) {
    console.error('Failed to queue email:', error);
    throw error;
  }
}

/**
 * Schedule the follow-up email sequence for a new lead.
 * J+2: Internal follow-up reminder
 * J+5: Client check-in email
 * J+14: Final follow-up
 */
export async function scheduleFollowUpSequence(leadId: string, email: string, name: string) {
  const now = new Date();

  const sequence = [
    {
      template: 'internal_followup',
      subject: `[Internal] Follow up with ${name}`,
      scheduledAt: addDays(now, 2),
    },
    {
      template: 'client_checkin',
      subject: `${name}, here's what we found for you — Global Careers`,
      scheduledAt: addDays(now, 5),
    },
    {
      template: 'final_followup',
      subject: `Last chance: Your offshore talent shortlist is ready — Global Careers`,
      scheduledAt: addDays(now, 14),
    },
  ];

  for (const email_data of sequence) {
    await queueEmail({
      leadId,
      toEmail: email,
      ...email_data,
    });
  }
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
