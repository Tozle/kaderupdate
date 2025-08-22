
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Standard-Client für Client-seitige Anfragen
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service-Client für serverseitige Admin-Operationen (nur auf dem Server verwenden!)
const serviceRoleKey = process.env.NEXT_SERVICE_ROLE_KEY;
export const supabaseAdmin = serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey)
    : null;
