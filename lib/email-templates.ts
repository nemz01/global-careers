/**
 * Email templates for the follow-up sequence.
 * Placeholders: {{name}}, {{company}}, {{role}}, {{savings}}
 */

export const emailTemplates = {
  internal_followup: {
    subject: '[Internal] Follow up with {{name}}',
    html: `
      <h2>Follow-Up Reminder</h2>
      <p>Lead <strong>{{name}}</strong> from <strong>{{company}}</strong> submitted a contact form 2 days ago.</p>
      <p>Please follow up to discuss their hiring needs.</p>
      <p>— Global Careers System</p>
    `,
  },

  client_checkin: {
    subject: '{{name}}, here\'s what we found for you',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00A3E0;">Hi {{name}},</h1>
        <p>Thanks for reaching out to Global Careers. We've been reviewing your requirements and have some exciting candidates to share.</p>
        <p>Our team has identified several pre-vetted professionals who match your needs. Here's what you can expect:</p>
        <ul>
          <li>Curated shortlist of top candidates</li>
          <li>Technical assessment scores</li>
          <li>English proficiency verification</li>
          <li>Video interview recordings</li>
        </ul>
        <p>Would you like to schedule a quick call to review these candidates?</p>
        <p><a href="https://globalcareers.com/book" style="display: inline-block; padding: 12px 24px; background: #00A3E0; color: white; text-decoration: none; border-radius: 6px;">Book a Call</a></p>
        <p>Best regards,<br>The Global Careers Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">Global Careers, a division of Arobas Personnel | Orlando, FL</p>
      </div>
    `,
  },

  final_followup: {
    subject: 'Your offshore talent shortlist is ready',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00A3E0;">Hi {{name}},</h1>
        <p>We wanted to follow up one last time. Your personalized talent shortlist is ready and waiting.</p>
        <p>Companies like yours typically save <strong>60-80%</strong> on talent costs through our offshore staffing solutions — with zero compromise on quality.</p>
        <p>If now isn't the right time, no worries at all. We'll be here when you're ready.</p>
        <p><a href="https://globalcareers.com/book" style="display: inline-block; padding: 12px 24px; background: #00A3E0; color: white; text-decoration: none; border-radius: 6px;">Schedule Your Free Consultation</a></p>
        <p>Best,<br>The Global Careers Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">Global Careers, a division of Arobas Personnel | Orlando, FL</p>
      </div>
    `,
  },

  booking_confirmation: {
    subject: 'Your call is confirmed — Global Careers',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00A3E0;">Call Confirmed!</h1>
        <p>Hi {{name}},</p>
        <p>Your {{type}} has been booked for <strong>{{date}}</strong> at <strong>{{time}}</strong> ({{timezone}}).</p>
        <p>A calendar invite has been sent to your email. If you need to reschedule, simply reply to this email.</p>
        <p>Looking forward to speaking with you!</p>
        <p>Best,<br>The Global Careers Team</p>
      </div>
    `,
  },
};

/**
 * Replace template placeholders with actual values.
 */
export function renderTemplate(
  template: keyof typeof emailTemplates,
  variables: Record<string, string>
): { subject: string; html: string } {
  const tmpl = emailTemplates[template];
  let subject = tmpl.subject;
  let html = tmpl.html;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    subject = subject.replaceAll(placeholder, value);
    html = html.replaceAll(placeholder, value);
  }

  return { subject, html };
}
