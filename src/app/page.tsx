"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';


import { TopbarFilter } from '@/components/TopbarFilter';
import NewsCard from '@/components/NewsCard';

type Club = { id: string; name: string; logo_url?: string; color_primary_hex?: string; color_secondary_hex?: string };
type Source = { id: string; name: string; type: string; url?: string; trust_level?: number };
export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<string>('');
  const [search, setSearch] = useState('');
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
    // Clubs laden
    supabase.from('clubs').select('id, name, logo_url').then(({ data }) => {
      if (data) setClubs(data);
    });
    // News laden
    supabase.from('news').select('*, club:club(id, name, logo_url)').order('timestamp', { ascending: false }).then(({ data }) => {
      if (data) setNews(data);
    });
  }, []);

  const filteredNews = news.filter(n =>
    (!selectedClub || n.club?.id === selectedClub) &&
    (!search || n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Head>
        <title>KaderUpdate | {t.allClubs}</title>
        <meta name="description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta property="og:title" content={`KaderUpdate | ${t.allClubs}`} />
        <meta property="og:description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaderupdate/" />
        <meta property="og:image" content="/vercel.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`KaderUpdate | ${t.allClubs}`} />
        <meta name="twitter:description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta name="twitter:image" content="/vercel.svg" />
      </Head>
      <main className="main-content">

        <TopbarFilter
          user={user}
          clubs={clubs}
          selectedClub={selectedClub}
          onSelectClub={setSelectedClub}
          search={search}
          onSearch={setSearch}
          onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
          onLogoutClick={async () => { await supabase.auth.signOut(); }}
        />

        {/* Login/Registrierung Modal */}
        {(showLogin || showRegister) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-0 transition-opacity animate-fadeIn" role="dialog" aria-modal="true">
            <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800 relative w-full max-w-xs sm:max-w-sm mx-auto transform transition-all duration-300 animate-scaleIn modal">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl sm:text-2xl p-2 sm:p-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
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

        <section className="w-full grid gap-6">
          {filteredNews.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <span className="text-lg text-gray-400">{t.newsNotFound}</span>
            </div>
          )}
          {filteredNews.map(n => (
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

