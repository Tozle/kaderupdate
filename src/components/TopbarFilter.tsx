import React from 'react';
import { FaFutbol } from 'react-icons/fa';

interface Club {
    id: string;
    name: string;
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
}) => (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-green-900 via-gray-900 to-green-950 shadow-lg border-b border-green-800" role="banner">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 sm:px-4 py-3 max-w-7xl mx-auto gap-2 sm:gap-0">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
                <FaFutbol className="text-green-400 text-2xl drop-shadow animate-bounce-slow" />
                <span className="font-extrabold text-2xl tracking-tight text-green-200 font-sans select-none" style={{ letterSpacing: '0.04em', fontFamily: 'Montserrat, Arial, sans-serif' }}>KaderUpdate</span>
                <span className="ml-2 text-xs text-green-500 font-bold uppercase tracking-widest hidden sm:inline">.com & .de</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto">
                <label htmlFor="club-select" className="sr-only">Verein auswählen</label>
                <select
                    id="club-select"
                    value={selectedClub}
                    onChange={e => onClubChange(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base min-w-[140px] shadow hover:border-green-400 hover:bg-gray-900 w-full sm:w-auto"
                    aria-label="Verein auswählen"
                >
                    <option value="">Alle Vereine</option>
                    {clubs.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <label className="sr-only" htmlFor="news-search">News durchsuchen</label>
                <input
                    id="news-search"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Suche..."
                    className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white flex-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mt-0 text-base shadow hover:border-green-400 hover:bg-gray-900 w-full sm:w-[180px] focus:outline-none"
                    aria-label="News durchsuchen"
                    tabIndex={0}
                />
            </div>
            <div className="flex gap-2 sm:gap-4 items-center justify-center sm:justify-end mt-2 sm:mt-0">
                {user ? (
                    <>
                        <span className="text-base text-green-400 font-semibold flex items-center gap-2"><FaFutbol className="inline text-green-500" />{user.email}</span>
                        <button
                            onClick={onLogoutClick}
                            className="bg-gray-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition-all font-bold border border-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Logout"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-all font-bold border border-green-700 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Login"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    </header>
);
