import React from 'react';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';
import { FaFutbol } from 'react-icons/fa';
import Image from 'next/image';

interface Club {
    id: string;
    name: string;
    logo_url?: string;
}

import type { User } from '@supabase/supabase-js';
interface TopbarFilterProps {
    clubs: Club[];
    selectedClub: string;
    onClubChange: (club: string) => void;
    searchValue: string;
    onSearchChange: (q: string) => void;
    user?: User | null;
    onLoginClick?: () => void;
    onLogoutClick?: () => void;
}

export const TopbarFilter: React.FC<TopbarFilterProps> = ({
    clubs,
    selectedClub,
    onClubChange,
    searchValue,
    onSearchChange,
    user,
    onLoginClick,
    onLogoutClick,
}) => {
    const locale = useLocale();
    const t = translations[locale] || translations['de'];
    return (
        <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-green-950 via-gray-950 to-green-900 shadow-2xl border-b border-green-800" role="banner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 sm:px-6 py-4 max-w-7xl mx-auto gap-3 sm:gap-0">
                <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <FaFutbol className="text-green-400 text-3xl drop-shadow animate-bounce-slow" />
                    <span className="font-extrabold text-3xl tracking-tight text-green-200 font-sans select-none" style={{ letterSpacing: '0.04em', fontFamily: 'Montserrat, Arial, sans-serif' }}>KaderUpdate</span>
                    <span className="ml-3 text-sm text-green-500 font-bold uppercase tracking-widest hidden sm:inline">.com & .de</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full sm:w-auto">
                    <label htmlFor="club-select" className="sr-only">{locale === 'en' ? 'Select club' : 'Verein auswählen'}</label>
                    <div className="relative w-full sm:w-auto">
                        <select
                            id="club-select"
                            value={selectedClub}
                            onChange={e => onClubChange(e.target.value)}
                            className="bg-gray-800 border border-green-600 rounded-xl p-3 sm:p-3 text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all text-base min-w-[160px] shadow-lg hover:border-green-400 hover:bg-gray-900 w-full sm:w-auto focus:outline-none touch-manipulation font-semibold pr-12"
                            aria-label={locale === 'en' ? 'Select club' : 'Verein auswählen'}
                            style={{ minHeight: '52px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
                        >
                            <option value="">{t.allClubs}</option>
                            {clubs.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-2xl drop-shadow-lg">
                            ▼
                        </span>
                        {/* Club-Logo Preview (selected) */}
                        {selectedClub && clubs.find(c => c.id === selectedClub && c.logo_url) && (
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-700 border-2 border-green-500 shadow-lg flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                                <Image
                                    src={clubs.find(c => c.id === selectedClub)?.logo_url || ''}
                                    alt="Club Logo"
                                    width={36}
                                    height={36}
                                    className="w-9 h-9 rounded-full object-contain"
                                    priority={false}
                                />
                            </span>
                        )}
                    </div>
                    <label className="sr-only" htmlFor="news-search">{locale === 'en' ? 'Search news' : 'News durchsuchen'}</label>
                    <input
                        id="news-search"
                        value={searchValue}
                        onChange={e => onSearchChange(e.target.value)}
                        placeholder={t.search}
                        className="bg-gray-800 border border-green-600 rounded-xl p-3 sm:p-3 text-white flex-1 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all mt-0 text-base shadow-lg hover:border-green-400 hover:bg-gray-900 w-full sm:w-[200px] focus:outline-none touch-manipulation"
                        aria-label={locale === 'en' ? 'Search news' : 'News durchsuchen'}
                        tabIndex={0}
                        style={{ minHeight: '52px' }}
                    />
                </div>
                <div className="flex gap-3 sm:gap-6 items-center justify-center sm:justify-end mt-3 sm:mt-0">
                    {user ? (
                        <>
                            <span className="text-lg text-green-400 font-semibold flex items-center gap-2"><FaFutbol className="inline text-green-500" />{user.email}</span>
                            <button
                                onClick={onLogoutClick}
                                className="bg-gray-800 hover:bg-red-700 text-white px-7 py-3 sm:px-5 sm:py-3 rounded-xl shadow-lg transition-all font-bold border border-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 touch-manipulation min-h-[48px] min-w-[48px]"
                                aria-label={locale === 'en' ? 'Logout' : 'Logout'}
                            >
                                {t.logout}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 sm:px-5 sm:py-3 rounded-xl shadow-lg transition-all font-bold border border-green-700 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 touch-manipulation min-h-[48px] min-w-[48px]"
                            aria-label={locale === 'en' ? 'Login' : 'Login'}
                        >
                            {t.login}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
