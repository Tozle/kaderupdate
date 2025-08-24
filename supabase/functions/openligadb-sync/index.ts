// pages/api/healthz.ts (oder beliebige Next.js API Route)
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Beispiel: Health-Check
    res.status(200).json({ status: 'ok' });
}
