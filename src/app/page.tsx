"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';

import { TopbarFilter } from '@/components/TopbarFilter';
import NewsCard from '@/components/NewsCard';

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
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const locale = useLocale();
  const t = translations[locale] || translations['de'];
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const cached = sessionStorage.getItem('clubs');
    if (cached) {
      setClubs(JSON.parse(cached));
      return;
    }
    supabase
      .from('clubs')
      .select('id, name, logo_url')
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setClubs([]);
          console.error('Fehler beim Laden der Vereine:', error.message);
          return;
        }
        setClubs(data || []);
        if (data) sessionStorage.setItem('clubs', JSON.stringify(data));
      });
    return () => { isMounted = false; };
  }, []);

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
    <>
      <Head>
        <title>KaderUpdate | {t.allClubs}</title>
        <meta name="description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
        <TopbarFilter
          clubs={clubs}
          selectedClub={club}
          onClubChange={setClub}
          searchValue={q}
          onSearchChange={setQ}
          user={user}
          onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
          onLogoutClick={async () => { await supabase.auth.signOut(); }}
        />

        {/* Login/Registrierung Modal */}
        {(showLogin || showRegister) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-0 transition-opacity animate-fadeIn" role="dialog" aria-modal="true">
            <div className="bg-gray-900 p-4 sm:p-6 rounded-xl shadow-xl relative w-full max-w-xs sm:max-w-sm mx-auto transform transition-all duration-300 animate-scaleIn">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl sm:text-2xl p-1 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => { setShowLogin(false); setShowRegister(false); }}
                aria-label={locale === 'en' ? 'Close dialog' : 'Dialog schließen'}
                tabIndex={0}
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
          {loading && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span className="text-lg text-gray-300">{t.loading}</span>
            </div>
          )}
          {error && (
            <div className="col-span-full flex flex-col items-center justify-center py-12" role="alert">
              <svg className="h-10 w-10 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              <span className="text-lg text-red-400 font-semibold">{t.error}</span>
              <span className="text-gray-400 mt-2">{locale === 'en' ? 'Please try again later.' : 'Bitte versuche es später erneut.'}</span>
            </div>
          )}
          {!loading && !error && news.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="h-10 w-10 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 018 0v2M12 7a4 4 0 100 8 4 4 0 000-8z" /></svg>
              <span className="text-lg text-gray-400">{t.newsNotFound}</span>
              <span className="text-gray-500 mt-2">{locale === 'en' ? 'Try another club or search term.' : 'Probiere einen anderen Verein oder Suchbegriff.'}</span>
            </div>
          )}
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
    </>
  );
}
