import { z } from 'zod';

export const bookingSchema = z.object({
  client_name: z.string().min(2).max(100),
  client_email: z.string().email(),
  client_company: z.string().max(100).optional(),
  client_phone: z.string().max(20).optional(),
  booking_type: z.enum(['intro_call', 'talent_review', 'follow_up']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time_slot: z.string().min(1),
  timezone: z.string().default('America/New_York'),
  notes: z.string().max(1000).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
