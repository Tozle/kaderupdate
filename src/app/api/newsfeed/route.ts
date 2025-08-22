export const dynamic = 'force-dynamic';

import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number, last: number }>();
const RATE_LIMIT = 30; // max requests
const RATE_WINDOW = 60 * 1000; // 1 minute

// Holt News aus Supabase und filtert nach club, badge, q
export async function GET(req: NextRequest) {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, last: now };
    if (now - entry.last > RATE_WINDOW) {
        entry.count = 0;
        entry.last = now;
    }
    entry.count++;
    rateLimitMap.set(ip, entry);
    if (entry.count > RATE_LIMIT) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), { status: 429 });
    }
    let club: string | null = null, badge: string | null = null, q: string | null = null;
    try {
        const searchParams = req.nextUrl?.searchParams;
        club = searchParams?.get('club') || null;
        badge = searchParams?.get('badge') || null;
        q = searchParams?.get('q') || null;
    } catch {
        return Response.json([]);
    }

    if (!supabaseAdmin) {
        return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 500 });
    }

    let query = supabaseAdmin
        .from('news')
        .select(`
      id, title, summary, content, category, trust_score, badge, club_id, timestamp, sources, social_embed, status,
      club:club_id (id, name, logo_url)
    `)
        .order('timestamp', { ascending: false })
        .limit(20);

    if (club) query = query.eq('club_id', club);
    if (badge) query = query.eq('badge', badge);
    if (q) query = query.ilike('title', `%${q}%`);

    const { data, error } = await query;
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return Response.json(data || []);
}
