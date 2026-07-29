-- ==============================================================================
-- SHIELD PROTOCOL 2026 - SUPABASE DATABASE SCHEMA MIGRATION
-- Project ID: dayhrigdfggmspksyuya
-- Supabase URL: https://dayhrigdfggmspksyuya.supabase.co
-- ==============================================================================

-- 1. Create Sequence for Registration IDs (SP2026-000001, SP2026-000002...)
CREATE SEQUENCE IF NOT EXISTS registration_seq START WITH 1;

-- 2. Create 'registrations' Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    team_name TEXT DEFAULT '',
    team_size INT DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'PARTIAL',
    payment_status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Trigger Function for Automatic Registration ID Format (SP2026-XXXXXX)
CREATE OR REPLACE FUNCTION generate_registration_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.registration_id IS NULL OR NEW.registration_id = '' THEN
    NEW.registration_id := 'SP2026-' || LPAD(nextval('registration_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_registration_id ON public.registrations;
CREATE TRIGGER trigger_set_registration_id
BEFORE INSERT ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION generate_registration_id();

-- 4. Create 'payments' Table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id TEXT NOT NULL,
    participant_email TEXT NOT NULL,
    participant_phone TEXT NOT NULL,
    utr_number TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 499,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_screenshot TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'PENDING',
    verified_by TEXT,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Indexes for fast lookup & high performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_phone ON public.registrations(phone);
CREATE INDEX IF NOT EXISTS idx_registrations_reg_id ON public.registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_reg_id ON public.payments(registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_utr ON public.payments(utr_number);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for 'registrations' Table
CREATE POLICY "Allow public insert to registrations" 
ON public.registrations FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow public read own registration" 
ON public.registrations FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Allow update to registrations" 
ON public.registrations FOR UPDATE 
TO public 
USING (true);

CREATE POLICY "Allow delete to registrations" 
ON public.registrations FOR DELETE 
TO public 
USING (true);

-- 8. RLS Policies for 'payments' Table
CREATE POLICY "Allow public insert to payments" 
ON public.payments FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow public read payments" 
ON public.payments FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Allow update to payments" 
ON public.payments FOR UPDATE 
TO public 
USING (true);

CREATE POLICY "Allow delete to payments" 
ON public.payments FOR DELETE 
TO public 
USING (true);

-- 9. Storage Bucket setup for 'payment-proofs'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Upload Payment Proofs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Public View Payment Proofs"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');

CREATE POLICY "Public Update Payment Proofs"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'payment-proofs');
