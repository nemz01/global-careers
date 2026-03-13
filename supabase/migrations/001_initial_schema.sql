-- Global Careers - Initial Schema
-- ================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ================================
-- BUSINESS LEADS (contact form + inbound)
-- ================================
CREATE TABLE IF NOT EXISTS business_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  notes TEXT,
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_business_leads_email ON business_leads(email);
CREATE INDEX idx_business_leads_status ON business_leads(status);
CREATE INDEX idx_business_leads_created ON business_leads(created_at DESC);

-- ================================
-- CALCULATOR SUBMISSIONS
-- ================================
CREATE TABLE IF NOT EXISTS calculator_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  company TEXT,
  role_title TEXT NOT NULL,
  us_salary INTEGER NOT NULL,
  offshore_salary INTEGER NOT NULL,
  annual_savings INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calculator_email ON calculator_submissions(email);
CREATE INDEX idx_calculator_created ON calculator_submissions(created_at DESC);

-- ================================
-- BOOKINGS
-- ================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('intro_call', 'talent_review', 'follow_up')),
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  timezone TEXT DEFAULT 'America/New_York',
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(email);

-- ================================
-- CANDIDATES
-- ================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country TEXT NOT NULL,
  role_interest TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  skills TEXT[] DEFAULT '{}',
  english_level TEXT DEFAULT 'intermediate' CHECK (english_level IN ('basic', 'intermediate', 'advanced', 'native')),
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'screening', 'tested', 'interviewed', 'approved', 'placed', 'rejected', 'inactive')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidates_email ON candidates(email);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_country ON candidates(country);
CREATE INDEX idx_candidates_skills ON candidates USING GIN(skills);

-- ================================
-- PLACEMENTS
-- ================================
CREATE TABLE IF NOT EXISTS placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidates(id),
  lead_id UUID REFERENCES business_leads(id),
  role_title TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  salary_agreed INTEGER,
  placement_type TEXT CHECK (placement_type IN ('direct_hire', 'talent_on_demand')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'terminated', 'guarantee_replacement')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_placements_candidate ON placements(candidate_id);
CREATE INDEX idx_placements_lead ON placements(lead_id);
CREATE INDEX idx_placements_status ON placements(status);

-- ================================
-- EMAIL QUEUE
-- ================================
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES business_leads(id),
  template TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_queue_status ON email_queue(status);
CREATE INDEX idx_email_queue_scheduled ON email_queue(scheduled_at);

-- ================================
-- ROLES (for dynamic role management)
-- ================================
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_es TEXT NOT NULL,
  description_en TEXT,
  description_es TEXT,
  category TEXT NOT NULL,
  us_salary_min INTEGER NOT NULL,
  us_salary_max INTEGER NOT NULL,
  us_salary_avg INTEGER NOT NULL,
  offshore_salary_min INTEGER NOT NULL,
  offshore_salary_max INTEGER NOT NULL,
  offshore_salary_avg INTEGER NOT NULL,
  skills_required TEXT[] DEFAULT '{}',
  countries_available TEXT[] DEFAULT '{}',
  demand_level TEXT DEFAULT 'normal' CHECK (demand_level IN ('low', 'normal', 'high', 'critical')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_roles_slug ON roles(slug);
CREATE INDEX idx_roles_category ON roles(category);
CREATE INDEX idx_roles_featured ON roles(is_featured) WHERE is_featured = TRUE;

-- ================================
-- SITE ANALYTICS (lightweight)
-- ================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);

-- ================================
-- TESTIMONIALS
-- ================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  quote_es TEXT,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- ROW LEVEL SECURITY
-- ================================
ALTER TABLE business_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read for roles and testimonials
CREATE POLICY "Public read roles" ON roles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = TRUE);

-- Service role full access (for API routes)
CREATE POLICY "Service role full access business_leads" ON business_leads FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access calculator_submissions" ON calculator_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access bookings" ON bookings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access candidates" ON candidates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access placements" ON placements FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access email_queue" ON email_queue FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access roles" ON roles FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access page_views" ON page_views FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role');

-- Anon insert for public forms
CREATE POLICY "Anon insert business_leads" ON business_leads FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anon insert calculator_submissions" ON calculator_submissions FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anon insert bookings" ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anon insert candidates" ON candidates FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anon insert page_views" ON page_views FOR INSERT WITH CHECK (TRUE);

-- ================================
-- UPDATED_AT TRIGGER
-- ================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_business_leads_updated_at BEFORE UPDATE ON business_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_placements_updated_at BEFORE UPDATE ON placements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
