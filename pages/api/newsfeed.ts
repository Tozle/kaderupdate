import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { club, badge, q, distinct } = req.query;

  if (!supabaseAdmin) {
    res.status(500).json({ error: 'Supabase not configured' });
    return;
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
    res.status(500).json({ error: error.message });
    return;
  }
  if (distinct === 'club') {
    // Extrahiere nur Clubs (club kann auch ein Array sein)
    type Club = { id: string; name: string; logo_url?: string };
    const clubs: Club[] = [];
    (data || []).forEach((n: any) => {
      if (Array.isArray(n.club)) {
        n.club.forEach((c: any) => c && clubs.push(c));
      } else if (n.club) {
        clubs.push(n.club);
      }
    });
    res.status(200).json(clubs);
    return;
  }
  res.status(200).json(data || []);
}
