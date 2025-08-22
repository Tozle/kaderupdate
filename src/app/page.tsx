"use client";
import CookieNoticeClient from "@/components/CookieNoticeClient";
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
import type { News } from '@/types/news';

type Club = { id: string; name: string; logo_url?: string; color_primary_hex?: string; color_secondary_hex?: string };
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
    // Clubs laden (inkl. Farben)
    supabase
      .from('clubs')
      .select('id, name, logo_url, color_primary_hex, color_secondary_hex')
      .then(({ data }) => {
        if (data) setClubs(data);
      });
    // News laden (korrekte Join-Syntax, falls FK club_id)
    supabase
      .from('news')
      .select('*, club:club_id(*)')
      .order('timestamp', { ascending: false })
      .then(({ data }) => {
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
      <main className="main-content max-w-4xl mx-auto px-2 sm:px-8 py-8 sm:py-16 rounded-[2.5rem] bg-white/70 dark:bg-gray-950/80 shadow-2xl border border-green-600/10 mt-8 backdrop-blur-xl transition-all">
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
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
              <div className="bg-white/90 dark:bg-gray-950/95 p-8 sm:p-10 rounded-3xl shadow-2xl border-2 border-green-600/30 relative transform transition-all duration-300 animate-scaleIn modal backdrop-blur-xl">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-green-500 text-2xl sm:text-2xl p-2 sm:p-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 bg-gray-200/60 dark:bg-gray-800/60 hover:bg-gray-200/90 dark:hover:bg-gray-800/90 shadow"
                  onClick={() => { setShowLogin(false); setShowRegister(false); }}
                  aria-label={locale === 'en' ? 'Close dialog' : 'Dialog schließen'}
                  tabIndex={0}
                  style={{ transition: 'all 0.15s' }}
                >
                  ×
                </button>
                <div className="flex flex-col gap-2 animate-fadeIn">
                  {showLogin && (
                    <LoginForm onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />
                  )}
                  {showRegister && (
                    <RegisterForm onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <section className="w-full grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2">
          {filteredNews.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 animate-fadeIn">
              <div className="mb-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="38" fill="#f3f4f6" stroke="#22c55e" strokeWidth="3" />
                  <path d="M25 40h30M40 25v30" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.newsNotFound}</span>
              <span className="text-base text-gray-500">{locale === 'en' ? 'Try another club or search term.' : 'Versuche einen anderen Verein oder Suchbegriff.'}</span>
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
              social_embed={n.socialEmbed}
            />
          ))}
        </section>
      </main>
      <CookieNoticeClient />
    </>
  );
}

