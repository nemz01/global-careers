export interface BusinessLead {
  id: string;
  company_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  city?: string;
  state?: string;
  country: string;
  industry?: string;
  employee_count?: string;
  revenue?: string;
  pricing_tier?: 'direct_hire' | 'talent_on_demand' | 'enterprise';
  hiring_roles: string[];
  estimated_savings?: number;
  source: 'website' | 'calculator' | 'referral' | 'ads';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CalculatorSubmission {
  id: string;
  email?: string;
  company_name?: string;
  role_id?: string;
  role_title?: string;
  us_salary: number;
  offshore_salary: number;
  annual_savings: number;
  ip_address?: string;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  client_name: string;
  client_email: string;
  client_company?: string;
  client_phone?: string;
  booking_type: 'intro_call' | 'talent_review' | 'follow_up';
  date: string;
  time_slot: string;
  timezone: string;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  created_at: string;
}
