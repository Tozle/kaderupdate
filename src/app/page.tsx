"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

import { TopbarFilter } from '@/components/TopbarFilter';
import NewsCard from '@/components/NewsCard';
// import type { BadgeType } from '@/components/Badge';

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
  // const [badge, setBadge] = useState<BadgeType>('');
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // Check Auth-Status beim Mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    // Clubs aus Supabase laden (optional: nur einmal beim Mount)
    fetch('/api/newsfeed?distinct=club')
      .then(res => res.json())
      .then(data => {
        // Extrahiere Clubs aus News
        const uniqueClubs: Club[] = [];
        (data as News[]).forEach((n) => {
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
  // if (badge) params.append('badge', badge);
    if (debouncedQ) params.append('q', debouncedQ);
    setLoading(true);
    setError(null);
    fetch(`/api/newsfeed?${params.toString()}`)
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
  }, [club, debouncedQ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      <TopbarFilter
        clubs={clubs}
        selectedClub={club}
        onClubChange={setClub}
        showSearch={showSearch}
        onShowSearch={() => setShowSearch(v => !v)}
        searchValue={q}
        onSearchChange={setQ}
        user={user}
        onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
        onLogoutClick={async () => { await supabase.auth.signOut(); }}
      />

      {/* Login/Registrierung Modal */}
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl relative w-full max-w-sm mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => { setShowLogin(false); setShowRegister(false); }}
              aria-label="Dialog schließen"
            >
              ×
            </button>
            {showLogin && (
              <LoginForm onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />
            )}
            {showRegister && (
              <RegisterForm onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
            )}
          </div>
        </div>
      )}

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
            badge={n.badge}
            club={n.club}
            sources={n.sources}
            social_embed={n.social_embed}
          />
        ))}
      </section>
    </main>
  );
}
