export interface Role {
  id: string;
  slug: string;
  title_en: string;
  title_es: string;
  description_en?: string;
  description_es?: string;
  category: RoleCategory;
  us_salary_min: number;
  us_salary_max: number;
  us_salary_avg: number;
  offshore_salary_min: number;
  offshore_salary_max: number;
  offshore_salary_avg: number;
  savings_percentage: number;
  demand_level: 'low' | 'medium' | 'high' | 'critical';
  skills_required: string[];
  vetting_criteria: Record<string, unknown>;
  countries_available: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type RoleCategory =
  | 'technology'
  | 'operations'
  | 'finance'
  | 'marketing'
  | 'sales'
  | 'hr'
  | 'customer_service'
  | 'creative'
  | 'executive'
  | 'construction'
  | 'data'
  | 'support';

export interface RoleCategoryInfo {
  key: RoleCategory;
  label_en: string;
  label_es: string;
  icon: string;
  description_en: string;
  description_es: string;
}

export interface SalaryComparison {
  role: string;
  us_salary: number;
  offshore_salary: number;
  savings: number;
  savings_percentage: number;
}
