import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dayhrigdfggmspksyuya.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhYnNvbHV0ZWx5X2Fub25fa2V5X3BsYWNlaG9sZGVyIn0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const PROJECT_ID = 'dayhrigdfggmspksyuya';
