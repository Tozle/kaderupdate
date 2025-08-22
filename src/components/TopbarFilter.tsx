import React from 'react';
import type { User } from '@supabase/supabase-js';
import { useLocale } from '@/lib/useLocale';

interface Club {
    id: string;
    name: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
}

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
    useLocale(); // falls später gebraucht, aktuell keine Übersetzung
    return (
        <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-green-950 via-gray-950 to-green-900 shadow-2xl border-b border-green-800" role="banner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-10 py-4 max-w-7xl mx-auto gap-3 sm:gap-0">
                <div className="flex items-center gap-4 justify-between sm:justify-start w-full sm:w-auto">
                    <span className="font-extrabold text-3xl tracking-tight text-green-200 font-sans select-none" style={{ letterSpacing: '0.04em', fontFamily: 'Montserrat, Arial, sans-serif' }}>KaderUpdate</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full sm:w-auto mt-3 sm:mt-0">
                    {/* Club-Auswahl */}
                    <label htmlFor="club-select" className="sr-only">Verein auswählen</label>
                    <select
                        id="club-select"
                        value={selectedClub}
                        onChange={e => onClubChange(e.target.value)}
                        className="bg-gray-800 border border-green-600 rounded-xl p-3 text-white focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:border-green-400 transition-all text-base shadow-lg hover:border-green-400 hover:bg-gray-900 w-full sm:w-[200px] focus:outline-none"
                    >
                        <option value="">Alle Vereine</option>
                        {clubs.map(c => (
                            <option
                                key={c.id}
                                value={c.id}
                                style={c.color_primary_hex && c.color_secondary_hex ? {
                                    background: c.color_primary_hex,
                                    color: c.color_secondary_hex,
                                } : {}}
                            >
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {/* Suche nur anzeigen, wenn Clubs geladen oder Suche aktiv */}
                    {(clubs.length > 0 || searchValue) && (
                        <>
                            <label className="sr-only" htmlFor="club-search">Suchen</label>
                            <input
                                id="club-search"
                                value={searchValue}
                                onChange={e => onSearchChange(e.target.value)}
                                placeholder="Suchen..."
                                className="bg-gray-800 border border-green-600 rounded-full px-4 py-1 text-white flex-1 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:border-green-400 transition-all mt-0 text-base shadow hover:shadow-lg hover:border-green-400 hover:bg-gray-900 w-full sm:w-[60px] focus:w-[180px] focus:py-3 focus:px-6 focus:outline-none duration-200"
                                tabIndex={0}
                                style={{ minHeight: '28px' }}
                            />
                        </>
                    )}
                </div>
                <div className="flex gap-3 sm:gap-6 items-center justify-start sm:justify-end mt-3 sm:mt-0 w-full sm:w-auto">
                    {user ? (
                        <>
                            <span className="text-lg text-green-400 font-semibold flex items-center gap-2 max-w-[180px] sm:max-w-xs truncate whitespace-nowrap overflow-hidden">{user.email}</span>
                            <button
                                onClick={onLogoutClick}
                                className="bg-gray-800 hover:bg-red-700 text-white px-7 py-3 sm:px-5 sm:py-3 rounded-xl shadow-lg transition-all font-bold border border-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 touch-manipulation min-h-[48px] min-w-[48px]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 sm:px-5 sm:py-3 rounded-xl shadow-lg transition-all font-bold border border-green-700 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 touch-manipulation min-h-[48px] min-w-[48px]"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
