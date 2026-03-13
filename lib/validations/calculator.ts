import { z } from 'zod';

export const calculatorSchema = z.object({
  email: z.string().email().optional(),
  company_name: z.string().max(100).optional(),
  role_id: z.string().uuid().optional(),
  role_title: z.string().max(100),
  us_salary: z.number().int().positive().max(500000),
  offshore_salary: z.number().int().positive().max(200000),
  annual_savings: z.number().int(),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;
