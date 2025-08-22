import React from 'react';
// import { translations } from '@/lib/translations'; // entfernt, da ungenutzt
import { useLocale } from '@/lib/useLocale';
import { FaFutbol } from 'react-icons/fa';
import Image from 'next/image';

interface Club {
    id: string;
    name: string;
    logo_url?: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
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
    const t = { allClubs: locale === 'en' ? 'All clubs' : 'Alle Vereine', search: locale === 'en' ? 'Search news' : 'News durchsuchen', login: 'Login', logout: 'Logout' };
    const [open, setOpen] = React.useState(false);
    // Vereine alphabetisch sortieren
    const sortedClubs = [...clubs].sort((a, b) => a.name.localeCompare(b.name, locale === 'en' ? 'en' : 'de'));

    // Hilfsfunktion für Farbstile
    function getClubColors(club: Club) {
        // Fallbacks für Farben
        const primary = club.color_primary_hex || '#22c55e'; // Tailwind green-500
        const secondary = club.color_secondary_hex || '#166534'; // Tailwind green-800
        return { primary, secondary };
    }
    return (
        <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-green-950 via-gray-950 to-green-900 shadow-2xl border-b border-green-800" role="banner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-10 py-4 max-w-7xl mx-auto gap-3 sm:gap-0">
                <div className="flex items-center gap-4 justify-between sm:justify-start w-full sm:w-auto">
                    <FaFutbol className="text-green-400 text-3xl drop-shadow animate-bounce-slow" />
                    <span className="font-extrabold text-3xl tracking-tight text-green-200 font-sans select-none" style={{ letterSpacing: '0.04em', fontFamily: 'Montserrat, Arial, sans-serif' }}>KaderUpdate</span>
                    <span className="ml-3 text-sm text-green-500 font-bold uppercase tracking-widest hidden sm:inline">.com & .de</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full sm:w-auto mt-3 sm:mt-0">
                    <label htmlFor="club-select" className="sr-only">{locale === 'en' ? 'Select club' : 'Verein auswählen'}</label>
                    <div className="relative w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <button
                                type="button"
                                className="bg-gray-800 border border-green-600 rounded-2xl p-4 text-white focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:border-green-400 transition-all text-lg min-w-[220px] shadow-xl hover:border-green-400 hover:bg-gray-900 w-full sm:w-auto font-bold pr-14 flex items-center gap-3"
                                aria-haspopup="listbox"
                                aria-expanded={open}
                                tabIndex={0}
                                onClick={() => setOpen(v => !v)}
                            >
                                {selectedClub && clubs.find(c => c.id === selectedClub)?.logo_url ? (
                                    <Image src={clubs.find(c => c.id === selectedClub)?.logo_url || ''} alt="Club Logo" width={38} height={38} className="w-10 h-10 rounded-full object-contain mr-3" loading="lazy" />
                                ) : (
                                    <FaFutbol className="text-green-400 text-2xl mr-3" />
                                )}
                                <span className="truncate flex-1 text-left text-lg font-bold">{selectedClub ? clubs.find(c => c.id === selectedClub)?.name : t.allClubs}</span>
                                <span className="pointer-events-none text-green-400 text-3xl drop-shadow-lg ml-3">▼</span>
                            </button>
                            {/* Dropdown-Overlay */}
                            {open && (
                                <div className="absolute z-50 left-0 mt-2 w-full max-h-96 overflow-auto bg-gray-900 border border-green-700 rounded-2xl shadow-2xl animate-fadein p-3">
                                    <ul className="flex flex-col gap-2" role="listbox">
                                        <li
                                            className={`px-5 py-3 cursor-pointer hover:bg-green-900/40 rounded-xl flex items-center gap-3 text-lg font-bold transition-all border border-transparent ${!selectedClub ? 'bg-green-800/30 border-green-500' : ''}`}
                                            onClick={() => { onClubChange(''); setOpen(false); }}
                                            role="option"
                                            aria-selected={!selectedClub}
                                        >
                                            <FaFutbol className="text-green-400 text-2xl" />
                                            <span>{t.allClubs}</span>
                                        </li>
                                        {/* Trennlinie */}
                                        <li className="col-span-full my-1 border-b border-green-800"></li>
                                        {sortedClubs.map(c => {
                                            const { primary, secondary } = getClubColors(c);
                                            return (
                                                <li
                                                    key={c.id}
                                                    className={`px-5 py-3 cursor-pointer rounded-xl flex items-center gap-3 text-lg font-semibold transition-all border-2 ${selectedClub === c.id ? '' : 'border-transparent'} ${selectedClub === c.id ? '' : 'hover:shadow-lg'} `}
                                                    style={{
                                                        borderColor: selectedClub === c.id ? primary : 'transparent',
                                                        background: selectedClub === c.id ? `${primary}22` : undefined,
                                                        boxShadow: selectedClub === c.id ? `0 0 0 2px ${primary}55` : undefined,
                                                    }}
                                                    onClick={() => { onClubChange(c.id); setOpen(false); }}
                                                    role="option"
                                                    aria-selected={selectedClub === c.id}
                                                >
                                                    {/* Farbbalken */}
                                                    <span style={{ background: primary, width: 6, height: 38, borderRadius: 4, marginRight: 8, display: 'inline-block' }}></span>
                                                    {c.logo_url ? (
                                                        <Image src={c.logo_url} alt={c.name} width={38} height={38} className="w-10 h-10 rounded-full object-contain border-2" style={{ borderColor: secondary }} loading="lazy" />
                                                    ) : (
                                                        <FaFutbol className="text-2xl" style={{ color: primary }} />
                                                    )}
                                                    <span style={{ color: primary }}>{c.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <label className="sr-only" htmlFor="news-search">{locale === 'en' ? 'Search news' : 'News durchsuchen'}</label>
                    <input
                        id="news-search"
                        value={searchValue}
                        onChange={e => onSearchChange(e.target.value)}
                        placeholder={t.search}
                        className="bg-gray-800 border border-green-600 rounded-xl p-3 sm:p-3 text-white flex-1 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:border-green-400 transition-all mt-0 text-base shadow-lg hover:border-green-400 hover:bg-gray-900 w-full sm:w-[200px] focus:outline-none touch-manipulation"
                        aria-label={locale === 'en' ? 'Search news' : 'News durchsuchen'}
                        tabIndex={0}
                        style={{ minHeight: '52px' }}
                    />
                </div>
                <div className="flex gap-3 sm:gap-6 items-center justify-start sm:justify-end mt-3 sm:mt-0 w-full sm:w-auto">
                    {user ? (
                        <>
                            <span className="text-lg text-green-400 font-semibold flex items-center gap-2 max-w-[180px] sm:max-w-xs truncate whitespace-nowrap overflow-hidden"><FaFutbol className="inline text-green-500" />{user.email}</span>
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
                            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 sm:px-5 sm:py-3 rounded-xl shadow-lg transition-all font-bold border border-green-700 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 touch-manipulation min-h-[48px] min-w-[48px]"
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
