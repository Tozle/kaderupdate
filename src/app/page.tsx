"use client";
import { useEffect, useState } from 'react';
import { News, Badge } from '@/types/news';
const BADGES: Badge[] = ['Bestätigt', 'Gut belegt', 'Gerücht'];
const CLUBS = [
  { id: 'fcb', name: 'FC Bayern' },
  // TODO: Weitere Clubs ergänzen
];

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [club, setClub] = useState('');
  const [badge, setBadge] = useState('');
  const [q, setQ] = useState('');

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
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur shadow-lg p-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-6 border-b border-gray-800">
        <div className="flex gap-4 w-full md:w-auto">
          <select value={club} onChange={e => setClub(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="">Alle Vereine</option>
            {CLUBS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={badge} onChange={e => setBadge(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="">Alle Badges</option>
            {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Suche..." className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white flex-1 focus:ring-2 focus:ring-blue-500 transition-all" />
      </header>
      <section className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.length === 0 && <div className="text-center text-gray-400 col-span-full">Keine News gefunden.</div>}
        {news.map(n => (
          <article key={n.id} className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-800 hover:border-blue-500 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <img src={n.club.logoUrl} alt={n.club.name} className="w-10 h-10 object-contain rounded-full border-2 border-gray-700 shadow" />
              <span className="font-bold text-lg tracking-wide drop-shadow">{n.club.name}</span>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold shadow ${n.badge === 'Bestätigt' ? 'bg-green-600/80 text-green-100' : n.badge === 'Gut belegt' ? 'bg-yellow-600/80 text-yellow-100' : 'bg-red-700/80 text-red-100'}`}>{n.badge}</span>
            </div>
            <h2 className="text-xl font-extrabold leading-tight drop-shadow mb-1">{n.title}</h2>
            <p className="text-gray-300 text-base mb-2">{n.summary}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="bg-gray-800/70 px-2 py-1 rounded shadow">{new Date(n.timestamp).toLocaleString()}</span>
              <span>
                Quellen: {n.sources.map((s, i) => (
                  <>
                    {i > 0 && ', '}
                    <a key={s.id} href={s.url} className="underline text-blue-400 hover:text-blue-300 transition-all" target="_blank" rel="noopener noreferrer">{s.name}</a>
                  </>
                ))}
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
