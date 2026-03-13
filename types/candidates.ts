export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  country: string;
  city?: string;
  roles: string[];
  skills: string[];
  experience_years?: number;
  english_level?: 'basic' | 'intermediate' | 'advanced' | 'native';
  spanish_level?: 'basic' | 'intermediate' | 'advanced' | 'native' | 'none';
  vetting_score?: number;
  screening_status: 'pending' | 'screening' | 'passed' | 'failed' | 'hired';
  resume_url?: string;
  linkedin_url?: string;
  availability: 'immediately' | '2_weeks' | '1_month' | 'flexible';
  salary_expectation?: number;
  created_at: string;
  updated_at: string;
}
