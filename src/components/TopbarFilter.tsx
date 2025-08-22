import React from 'react';

interface Club {
    id: string;
    name: string;
}

// BadgeType entfernt, da Badge-Filter entfernt wurde
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
    <header className="flex flex-col md:flex-row md:items-center gap-4 py-4">
        <div className="flex gap-4 w-full md:w-auto items-center">
            <select
                value={selectedClub}
                onChange={e => onClubChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white flex-1 focus:ring-2 focus:ring-blue-500 transition-all mt-2 md:mt-0"
                autoFocus
                aria-label="News durchsuchen"
            />
        </div>
        <div className="flex gap-4 items-center mt-4 md:mt-0 md:ml-auto">
            {user ? (
                <>
                    <span className="text-sm text-gray-300">{user.email}</span>
                    <button
                        onClick={onLogoutClick}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition-all font-semibold"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button
                    onClick={onLoginClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all font-semibold"
                >
                    Login
                </button>
            )}
        </div>
    </header>
);
