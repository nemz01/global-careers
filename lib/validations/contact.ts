import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0).optional(), // honeypot
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
