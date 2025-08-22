"use client";

import { useEffect, useState } from 'react';

import { TopbarFilter } from '@/components/TopbarFilter';
import { NewsCard } from '@/components/NewsCard';
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
};

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [club, setClub] = useState('');
  const [badge, setBadge] = useState<BadgeType>('');
  const [q, setQ] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (club) params.append('club', club);
    if (badge) params.append('badge', badge);
    if (q) params.append('q', q);
    fetch(`/api/feed?${params.toString()}`)
      .then(res => res.json())
      .then(setNews);
  }, [club, badge, q]);

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
        {news.length === 0 && <div className="text-center text-gray-400 col-span-full">Keine News gefunden.</div>}
        {news.map(n => (
          <NewsCard
            key={n.id}
            title={n.title}
            summary={n.summary}
            badge={n.badge as any}
            club={n.club}
            timestamp={n.timestamp}
            sources={n.sources}
          />
        ))}
      </section>
    </main>
  );
}
