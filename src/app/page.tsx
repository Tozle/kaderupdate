"use client";

import { useEffect, useState, useRef } from 'react';

import { TopbarFilter } from '@/components/TopbarFilter';
import NewsCard from '@/components/NewsCard';
import type { BadgeType } from '@/components/Badge';

type Club = { id: string; name: string; logo_url?: string };
type Source = { id: string; name: string; type: string; url?: string; trust_level?: number };
type News = {
  id: string;
  title: string;
  summary: string;
  badge: 'Bestätigt' | 'Gut belegt' | 'Gerücht';
  club: Club;
  timestamp: string;
  sources: Source[];
  social_embed?: string;
};

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [club, setClub] = useState('');
  const [badge, setBadge] = useState<BadgeType>('');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clubs aus Supabase laden (optional: nur einmal beim Mount)
    fetch('/api/feed?distinct=club')
      .then(res => res.json())
      .then(data => {
        // Extrahiere Clubs aus News
        const uniqueClubs: Club[] = [];
        data.forEach((n: any) => {
          if (n.club && !uniqueClubs.some(c => c.id === n.club.id)) {
            uniqueClubs.push(n.club);
          }
        });
        setClubs(uniqueClubs);
      });
  }, []);

  // Debounce die Suche
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQ(q);
    }, 400);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [q]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (club) params.append('club', club);
    if (badge) params.append('badge', badge);
    if (debouncedQ) params.append('q', debouncedQ);
    setLoading(true);
    setError(null);
    fetch(`/api/feed?${params.toString()}`)
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Fehler beim Laden der News');
        }
        return res.json();
      })
      .then(setNews)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [club, badge, debouncedQ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      <TopbarFilter
        clubs={clubs}
        selectedClub={club}
        onClubChange={setClub}
        selectedBadge={badge}
        onBadgeChange={setBadge}
        showSearch={showSearch}
        onShowSearch={() => setShowSearch(v => !v)}
        searchValue={q}
        onSearchChange={setQ}
      />
      <section className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-gray-800 animate-pulse h-48 w-full col-span-1" aria-label="Lade News…"></div>
        ))}
        {error && <div className="text-center text-red-400 col-span-full" role="alert">{error}</div>}
        {!loading && !error && news.length === 0 && <div className="text-center text-gray-400 col-span-full">Keine News gefunden.</div>}
        {!loading && !error && news.map(n => (
          <NewsCard
            key={n.id}
            title={n.title}
            summary={n.summary}
            badge={n.badge as any}
            club={n.club}
            timestamp={n.timestamp}
            sources={n.sources}
            social_embed={n.social_embed}
          />
        ))}
      </section>
    </main>
  );
}
