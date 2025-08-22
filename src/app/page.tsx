
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
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <select value={club} onChange={e => setClub(e.target.value)} className="border rounded p-2">
          <option value="">Alle Vereine</option>
          {CLUBS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={badge} onChange={e => setBadge(e.target.value)} className="border rounded p-2">
          <option value="">Alle Badges</option>
          {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Suche..." className="border rounded p-2 flex-1" />
      </header>
      <section className="p-4 grid gap-4">
        {news.length === 0 && <div className="text-center text-gray-400">Keine News gefunden.</div>}
        {news.map(n => (
          <article key={n.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={n.club.logoUrl} alt={n.club.name} className="w-8 h-8 object-contain" />
              <span className="font-bold">{n.club.name}</span>
              <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${n.badge === 'Bestätigt' ? 'bg-green-200 text-green-800' : n.badge === 'Gut belegt' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{n.badge}</span>
            </div>
            <h2 className="text-lg font-semibold">{n.title}</h2>
            <p className="text-gray-700">{n.summary}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{new Date(n.timestamp).toLocaleString()}</span>
              <span>
                Quellen: {n.sources.map((s, i) => (
                  <>
                    {i > 0 && ', '}
                    <a key={s.id} href={s.url} className="underline" target="_blank" rel="noopener noreferrer">{s.name}</a>
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
