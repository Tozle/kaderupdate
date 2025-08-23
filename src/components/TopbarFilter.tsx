import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { useLocale } from '@/lib/useLocale';


interface Club {
    id: string;
    name: string;
    logo_url?: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
}
interface TopbarFilterProps {
    user: User | null;
    clubs: Club[];
    selectedClub: Club | null;
    onSelectClub: (club: Club | null) => void;
    search: string;
    onSearch: (s: string) => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;

}

const TopbarFilter: React.FC<TopbarFilterProps> = ({ user, clubs, selectedClub, onSelectClub, search, onSearch, onLoginClick, onLogoutClick }) => {
    const locale = useLocale();
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Fokussiert das Suchfeld, wenn geöffnet
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    // Schließt Suche bei Klick außerhalb
    useEffect(() => {
        if (!showSearch) return;
        const handler = (e: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showSearch]);

    return (
        <header className="w-full flex flex-col items-center justify-center mt-2 mb-8">
            {!showSearch && (
                <div className="flex flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
                    <div className="relative flex flex-row items-center justify-center w-full focus-within:z-20">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center drop-shadow-xl transition-all duration-200 pointer-events-none group-logo"
                            style={{ pointerEvents: 'none' }}
                        >
                            {selectedClub && clubs.find(c => c.id === selectedClub.id)?.logo_url ? (
                                <Image
                                    src={clubs.find(c => c.id === selectedClub.id)?.logo_url || ''}
                                    alt="Club Logo"
                                    width={52}
                                    height={52}
                                    className="rounded-full border-2 border-green-400 bg-white shadow-lg hover:scale-105 transition-transform duration-200 group-focus-within:opacity-0 group-focus-within:scale-90"
                                    style={{ objectFit: 'contain', width: 52, height: 52 }}
                                    priority={false}
                                />
                            ) : (
                                <span className="w-13 h-13 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-2xl font-bold border-2 border-green-400 group-focus-within:opacity-0 group-focus-within:scale-90 transition-all duration-200">?</span>
                            )}
                        </span>
                        <select
                            className="appearance-none w-full pl-20 pr-14 py-5 rounded-3xl text-2xl font-extrabold text-gray-900 dark:text-gray-100 bg-white/80 dark:bg-gray-950/80 border-2 border-green-400 shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all cursor-pointer backdrop-blur-2xl hover:shadow-green-400/20 hover:border-green-500"
                            value={selectedClub?.id || ''}
                            onChange={e => onSelectClub(clubs.find(c => c.id === e.target.value) || null)}
                            aria-label={locale === 'en' ? 'Select club' : 'Verein auswählen'}
                            style={{ textAlignLast: 'center' }}
                        >
                            <option value="">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</option>
                            {clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-green-400 text-3xl transition-transform duration-200 group-hover:rotate-180">▼</span>
                    </div>
                    {/* Such-Icon */}
                    <button
                        className="ml-2 p-4 rounded-full bg-white/90 dark:bg-gray-900/90 border-2 border-green-400 shadow-lg hover:bg-green-100 hover:scale-110 transition-all text-green-600 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={() => setShowSearch(true)}
                        aria-label={locale === 'en' ? 'Open search' : 'Suche öffnen'}
                    >
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
                    </button>
                </div>
            )}
            {/* Overlay-Suche: ganz oben, Mannschaftsauswahl wird ausgeblendet */}
            {showSearch && (
                <div className="fixed inset-0 z-50 flex flex-col items-start justify-start bg-black/60 animate-fadeIn">
                    <div className="w-full flex flex-row items-center justify-center pt-8 pb-4">
                        <div className="relative w-full max-w-2xl mx-auto bg-white/95 dark:bg-gray-950/95 rounded-2xl shadow-2xl border-2 border-green-400 px-6 py-4 flex flex-row items-center gap-4 backdrop-blur-2xl">
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="flex-1 px-5 py-3 rounded-xl text-lg font-semibold text-gray-800 dark:text-gray-100 bg-white/90 dark:bg-gray-950/90 border-2 border-green-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all backdrop-blur-xl"
                                placeholder={locale === 'en' ? 'Search news or club...' : 'Suche News oder Verein...'}
                                value={search}
                                onChange={e => onSearch(e.target.value)}
                                aria-label={locale === 'en' ? 'Search' : 'Suche'}
                            />
                            <button
                                className="p-3 rounded-full bg-gray-200/90 dark:bg-gray-800/90 text-gray-500 hover:text-green-600 hover:bg-gray-200/100 dark:hover:bg-gray-800/100 focus:outline-none focus:ring-2 focus:ring-green-400 text-2xl shadow"
                                onClick={() => setShowSearch(false)}
                                aria-label={locale === 'en' ? 'Close search' : 'Suche schließen'}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-row gap-2 items-center mt-4">
                {user ? (
                    <button
                        className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold border border-gray-200 dark:border-gray-700 hover:bg-green-50 hover:text-green-600 transition-all"
                        onClick={onLogoutClick}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold border border-green-500 hover:bg-green-600 transition-all"
                        onClick={onLoginClick}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};
export default TopbarFilter;
