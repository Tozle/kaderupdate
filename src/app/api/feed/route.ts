import { News, Badge, Club, Source } from '@/types/news';
import { supabase } from '@/lib/supabaseClient';
import type { NextRequest } from 'next/server';

// Beispiel: Filterbare News-API (Mocked, später DB-Anbindung)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const club = searchParams.get('club');
  const badge = searchParams.get('badge') as Badge | null;
  const q = searchParams.get('q');

  // TODO: Hole Daten aus Supabase
  // Hier: Mocked News
  const news: News[] = [
    {
      id: '1',
      title: 'Beispielmeldung: Neuer verletzt',
      summary: 'Manuel Neuer fällt mit Muskelverletzung aus.',
      content: 'Torwart Manuel Neuer hat sich im Training verletzt...',
      category: 'Verletzung',
      trustScore: 5,
      badge: 'Bestätigt',
      club: { id: 'fcb', name: 'FC Bayern', logoUrl: '/logos/fcb.png' },
      timestamp: new Date().toISOString(),
      sources: [
        { id: 'fcb', name: 'FC Bayern', type: 'offiziell', url: 'https://fcb.de', trustLevel: 5 }
      ],
      status: 'Bestätigt',
    },
  ];

  // Filter (vereinfachtes Beispiel)
  let filtered = news;
  if (club) filtered = filtered.filter(n => n.club.id === club);
  if (badge) filtered = filtered.filter(n => n.badge === badge);
  if (q) filtered = filtered.filter(n => n.title.includes(q) || n.summary.includes(q));

  return Response.json(filtered);
}
