
import { supabaseAdmin } from '@/lib/supabaseClient';
import type { NextRequest } from 'next/server';

// Holt News aus Supabase und filtert nach club, badge, q
export async function GET(req: NextRequest) {
  let club = null, badge = null, q = null;
  try {
    const searchParams = req.nextUrl?.searchParams;
    club = searchParams?.get('club') ?? null;
    badge = searchParams?.get('badge') ?? null;
    q = searchParams?.get('q') ?? null;
  } catch (e) {
    // Fallback für ungültige URLs (z.B. Prerendering)
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
