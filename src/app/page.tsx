"use client";
// Clientseitiger Timer: Triggert alle 10 Minuten die Sync-API (nur Demo, nicht für Produktion!)
function useOpenLigaDBSync() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/openligadb-sync", { method: "POST" });
    }, 10 * 60 * 1000); // alle 10 Minuten
    return () => clearInterval(interval);
  }, []);
}
import CookieNoticeClient from "@/components/CookieNoticeClient";

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';

import Head from 'next/head';
import Image from 'next/image';

import { useNextOrLastMatchdayFixtures } from '@/lib/useNextOrLastMatchdayFixtures';


import TopbarFilter from '@/components/TopbarFilter';
import NewsCard from '@/components/NewsCard';
import type { News } from '@/types/news';

type Player = {
  id: string;
  slug?: string;
  first_name?: string;
  last_name?: string;
  name: string;
  position_group: string;
  shirt_number?: number;
  nation_code?: string;
  birthdate?: string;
  status?: string;
  status_note?: string;
  image_url?: string;
};
import { useMemo } from 'react';

type Club = { id: string; name: string; logo_url?: string; color_primary_hex?: string; color_secondary_hex?: string; players_table?: string; rank?: number; city?: string; stadium_name?: string; code?: string; founded?: number };
export default function Home() {
  useOpenLigaDBSync();
  const [news, setNews] = useState<News[]>([]);
  const [newsPage] = useState(0);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsEnd, setNewsEnd] = useState(false);
  // observerRef entfernt, da nicht verwendet
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [kader, setKader] = useState<Player[]>([]);


  const { fixtures: matchdayFixtures, matchday: matchdayNumber } = useNextOrLastMatchdayFixtures();
  useEffect(() => {
    if (selectedClub && selectedClub.players_table) {
      console.log('Lade Spieler aus Tabelle:', selectedClub.players_table);
      supabase.from(selectedClub.players_table).select('*').then(({ data }) => {
        console.log('Geladene Spieler:', data);
        setKader(data || []);
      });
    } else {
      setKader([]);
    }
  }, [selectedClub]);
  const [search] = useState('');
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
    // Clubs laden (inkl. Farben, Tabellenplatz & players_table)
    supabase
      .from('clubs')
      .select('id, name, logo_url, color_primary_hex, color_secondary_hex, rank, city, stadium_name, code, founded, players_table')
      .limit(20)
      .then(({ data }) => {
        if (data) {
          // Nach Tabellenplatz sortieren (kleinster Wert = Top)
          setClubs(data.sort((a, b) => {
            if (a.rank == null && b.rank == null) return 0;
            if (a.rank == null) return 1;
            if (b.rank == null) return -1;
            return a.rank - b.rank;
          }));
        }
      });
  }, []);

  // Infinite Scroll: News paginiert laden
  const loadNews = useCallback(async (page = 0) => {
    setNewsLoading(true);
    const { data } = await supabase
      .from('news')
      .select('*, club:club_id(id, name, logo_url, color_primary_hex, color_secondary_hex, rank)')
      .order('timestamp', { ascending: false })
      .range(page * 20, page * 20 + 19);
    if (data && data.length > 0) {
      console.log('Loaded news:', data);
      setNews(prev => page === 0 ? data : [...prev, ...data]);
      if (data.length < 20) setNewsEnd(true);
    } else {
      setNewsEnd(true);
    }
    setNewsLoading(false);
  }, []);

  useEffect(() => {
    loadNews(newsPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsPage]);

  // Intersection Observer für Infinite Scroll
  useEffect(() => {
    if (newsEnd || newsLoading) return;
    // observer entfernt, daher keine Beobachtung nötig
    return undefined;
  }, [newsEnd, newsLoading]);

  const filteredNews = useMemo(() => {
    if (selectedClub) {
      console.log('SelectedClub:', selectedClub);
      news.forEach(n => {
        console.log('News club:', n.club, 'News title:', n.title);
      });
    }
    return news.filter(n =>
      (!selectedClub || n.club?.id === selectedClub.id) &&
      (!search || n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase()))
    );
  }, [news, selectedClub, search]);

  return (
    <>
      <Head>
        <title>KaderUpdate | {t.allClubs}</title>
        <meta name="description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta property="og:title" content={`KaderUpdate | ${t.allClubs}`} />
        <meta property="og:description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaderupdate/" />
        <meta property="og:image" content="/kaderupdate-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`KaderUpdate | ${t.allClubs}`} />
        <meta name="twitter:description" content={locale === 'en' ? 'All football news, rumors and squad updates for the Bundesliga.' : 'Alle Fußball-News, Gerüchte und Kader-Updates zur Bundesliga.'} />
        <meta name="twitter:image" content="/kaderupdate-og.png" />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col items-center transition-all">
        {/* TopbarFilter prominent, mittig, mit Abstand nach oben */}

        <div className="w-full flex flex-col items-center justify-center pt-8 pb-2">
          <TopbarFilter
            user={user}
            clubs={clubs}
            selectedClub={selectedClub}
            onSelectClub={setSelectedClub}
            onLoginClick={() => { setShowLogin(true); setShowRegister(false); }}
            onLogoutClick={async () => { await supabase.auth.signOut(); }}
          />
        </div>

        {/* Club-Info-Panel */}
        {selectedClub ? (
          <div>
            <div
              className="w-full max-w-2xl mx-auto mb-3 flex flex-row items-center gap-4 p-4 rounded-2xl shadow-xl border-2"
              style={{
                background: selectedClub.color_primary_hex || '#fff',
                color: selectedClub.color_secondary_hex || '#222',
                borderColor: selectedClub.color_secondary_hex || '#22c55e',
              }}
            >
              {selectedClub.logo_url && (
                <Image src={selectedClub.logo_url} alt={selectedClub.name} width={56} height={56} className="w-14 h-14 rounded-full object-contain bg-white border border-gray-200 mr-2" />
              )}
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xl font-extrabold leading-tight">{selectedClub.name}</span>
                <div className="flex flex-row flex-wrap gap-2 mt-1">
                  {selectedClub.code && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">{selectedClub.code}</span>
                  )}
                  {selectedClub.rank && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">Platz: {selectedClub.rank}</span>
                  )}
                  {selectedClub.founded && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">Gegründet: {selectedClub.founded}</span>
                  )}
                  {selectedClub.city && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">{selectedClub.city}</span>
                  )}
                  {selectedClub.stadium_name && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">{selectedClub.stadium_name}</span>
                  )}
                  {selectedClub.players_table && (
                    <span className="text-xs font-mono bg-black/10 px-2 py-0.5 rounded">Kader: {selectedClub.players_table.replace('players_', '')}</span>
                  )}
                </div>
                <div className="flex flex-row gap-2 mt-2 items-center">
                  {selectedClub.color_primary_hex && (
                    <span className="w-5 h-5 rounded-full border border-black/20 inline-block" style={{ background: selectedClub.color_primary_hex }} title="Hauptfarbe"></span>
                  )}
                  {selectedClub.color_secondary_hex && (
                    <span className="w-5 h-5 rounded-full border border-black/20 inline-block" style={{ background: selectedClub.color_secondary_hex }} title="Zweitfarbe"></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          matchdayFixtures.length > 0 && (
            <div className="w-full max-w-3xl mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-900/90 via-green-800/95 to-gray-950/95 border-2 border-green-400 shadow-2xl flex flex-col items-center animate-fadeIn">
              <h2 className="text-2xl font-extrabold text-green-300 drop-shadow-lg mb-4">{`Spieltag ${matchdayNumber}`}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {matchdayFixtures.map(fix => (
                  <div key={fix.id} className="bg-gray-900/80 rounded-xl p-4 flex items-center gap-4 shadow border border-green-900">
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-green-300 bg-green-950/60 px-2 py-0.5 rounded shadow">
                          {fix.competition_id ? 'Wettbewerb' : ''}
                        </span>
                        <span className="text-xs font-mono text-gray-300">{fix.kickoff_at ? new Date(fix.kickoff_at).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' }) : 'TBA'}</span>
                      </div>
                      <span className="text-base font-semibold truncate">
                        {fix.home_club?.name || '—'}
                        <span className="mx-2 font-bold">vs</span>
                        {fix.away_club?.name || '—'}
                      </span>
                      {(fix.home_club?.stadium_name || fix.away_club?.stadium_name) && (
                        <span className="text-xs text-gray-400 mt-1 truncate">
                          {fix.home_club?.stadium_name || fix.away_club?.stadium_name}
                        </span>
                      )}
                    </div>
                    {/* Logos und Score */}
                    <div className="flex flex-row items-center gap-2 min-w-[120px]">
                      {fix.home_club?.logo_url ? (
                        <Image src={fix.home_club.logo_url} alt={fix.home_club.name} width={48} height={48} className="w-12 h-12 rounded-full object-contain bg-white border-2 border-green-700 shadow" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-green-900 flex items-center justify-center text-gray-500">?</div>
                      )}
                      <div className="flex flex-col items-center mx-2">
                        <span className="text-xl font-bold">
                          {fix.home_score !== null && fix.away_score !== null
                            ? `${fix.home_score} : ${fix.away_score}`
                            : ':'}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{fix.status}</span>
                      </div>
                      {fix.away_club?.logo_url ? (
                        <Image src={fix.away_club.logo_url} alt={fix.away_club.name} width={48} height={48} className="w-12 h-12 rounded-full object-contain bg-white border-2 border-green-700 shadow" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-green-900 flex items-center justify-center text-gray-500">?</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* Kader-Bonus-Panel */}
        {selectedClub && kader.length > 0 && (
          <div className="w-full max-w-3xl mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-900/80 via-green-800/90 to-gray-950/90 border-2 border-green-400 shadow-2xl flex flex-col items-center animate-fadeIn">
            <div className="flex items-center gap-4 mb-4">
              {selectedClub.logo_url && (
                <Image src={selectedClub.logo_url} alt={selectedClub.name} width={56} height={56} className="w-14 h-14 rounded-full object-contain bg-white border-2 border-green-400" />
              )}
              <h2 className="text-2xl font-extrabold text-green-300 drop-shadow-lg">{selectedClub.name} – Kader</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {kader.slice(0, 6).map(p => (
                <div key={p.id} className="bg-gray-900/80 rounded-xl p-4 flex items-center gap-4 shadow border border-green-900">
                  {p.image_url && (
                    <Image src={p.image_url} alt={p.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-green-700" />
                  )}
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-white">{p.name}</div>
                    <div className="text-gray-400 text-sm">
                      {p.first_name && <span>{p.first_name} </span>}
                      {p.last_name && <span>{p.last_name}</span>}
                      {p.birthdate && <span> · {new Date(p.birthdate).toLocaleDateString()} </span>}
                      {p.nation_code && <span> · <span className="font-mono">{p.nation_code}</span></span>}
                    </div>
                    <div className="text-green-400 font-mono text-base mt-1">{p.position_group}</div>
                    {p.status && <div className="text-xs text-yellow-400 mt-1">Status: {p.status}</div>}
                    {p.status_note && <div className="text-xs text-gray-300 mt-1 italic">{p.status_note}</div>}
                  </div>
                  {p.shirt_number && <span className="text-gray-400 ml-2 text-lg font-bold">#{p.shirt_number}</span>}
                </div>
              ))}
            </div>
            {kader.length > 6 && (
              <a href={`/club/${selectedClub.id}`} className="mt-4 text-green-300 underline hover:text-green-100 font-bold">Kompletten Kader anzeigen →</a>
            )}
          </div>
        )}
        <main className="main-content w-full max-w-4xl px-2 sm:px-8 py-10 sm:py-16 rounded-[2.5rem] bg-white/80 dark:bg-gray-950/80 shadow-lg border border-gray-200 dark:border-gray-800 mt-0 backdrop-blur-xl transition-all flex flex-col gap-0">
          {/* Login/Registrierung Modal */}
          {(showLogin || showRegister) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-0 transition-opacity animate-fadeIn" role="dialog" aria-modal="true">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="bg-white/90 dark:bg-gray-950/95 p-8 sm:p-12 rounded-3xl shadow-xl border border-green-600/10 relative transform transition-all duration-300 animate-scaleIn modal backdrop-blur-2xl">
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
                      <LoginForm
                        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
                        onSuccess={() => setShowLogin(false)}
                      />
                    )}
                    {showRegister && (
                      <RegisterForm onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <section className="w-full grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 mt-0">
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
            <div className="h-12 flex items-center justify-center w-full">
              {newsLoading && <span className="text-gray-400 animate-pulse">{locale === 'en' ? 'Loading more news…' : 'Weitere News werden geladen…'}</span>}
              {newsEnd && <span className="text-gray-400">{locale === 'en' ? 'No more news.' : 'Keine weiteren News.'}</span>}
            </div>
          </section>
        </main>
        <CookieNoticeClient />
      </div>
    </>
  );
}

