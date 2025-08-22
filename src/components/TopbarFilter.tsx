import Image from "next/image";
import React from 'react';
import type { User } from '@supabase/supabase-js';
import { useLocale } from '@/lib/useLocale';

// ...existing code...

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
    return (
        <header className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-7 px-0 sm:px-2">
            <div className="flex-1 w-full flex flex-row items-center gap-3 bg-white/80 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm px-4 py-2">
                <div className="relative w-40 min-w-[120px]">
                    <select
                        className="appearance-none w-full bg-transparent border-none pr-8 pl-3 py-2 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        value={selectedClub?.id || ''}
                        onChange={e => onSelectClub(clubs.find(c => c.id === e.target.value) || null)}
                        aria-label={locale === 'en' ? 'Select club' : 'Verein auswählen'}
                    >
                        <option value="">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</option>
                        {clubs.map(club => (
                            <option key={club.id} value={club.id}>{club.name}</option>
                        ))}
                    </select>
                    {selectedClub && clubs.find(c => c.id === selectedClub.id)?.logo_url && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 bg-white object-contain pointer-events-none shadow" style={{ zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <Image
                                src={clubs.find(c => c.id === selectedClub.id)?.logo_url || ''}
                                alt="Club Logo"
                                width={28}
                                height={28}
                                style={{ objectFit: 'contain', width: 28, height: 28 }}
                                priority={false}
                            />
                        </span>
                    )}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg">▼</span>
                </div>
                <input
                    type="text"
                    className="flex-1 bg-transparent border-none outline-none text-base text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 px-2"
                    placeholder={locale === 'en' ? 'Search...' : 'Suche...'}
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                    aria-label={locale === 'en' ? 'Search' : 'Suche'}
                />
            </div>
            <div className="flex flex-row gap-2 items-center">
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
