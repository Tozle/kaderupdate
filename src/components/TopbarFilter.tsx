import React from 'react';
import type { User } from '@supabase/supabase-js';
import { useLocale } from '@/lib/useLocale';

// ...existing code...

interface Club {
    id: string;
    name: string;
    logo_url?: string;
}

interface TopbarFilterProps {
    user?: User | null;
    clubs: Club[];
    selectedClub: string;
    onSelectClub: (id: string) => void;
    search: string;
    onSearch: (s: string) => void;
    onLoginClick?: () => void;
    onLogoutClick?: () => void;
}

export const TopbarFilter: React.FC<TopbarFilterProps> = ({
    user,
    clubs,
    selectedClub,
    onSelectClub,
    search,
    onSearch,
    onLoginClick,
    onLogoutClick,
}) => {
    const locale = useLocale();
    return (
        <header className="sticky top-0 z-40 w-full bg-[var(--header-bg)] border-b border-[var(--card-border)] shadow-lg backdrop-blur-md" role="banner">
            <div className="flex flex-row items-center justify-between px-4 py-3 max-w-5xl mx-auto gap-2 flex-wrap">
                <span className="font-extrabold text-2xl tracking-tight text-[var(--accent)] font-sans select-none drop-shadow-lg" style={{ letterSpacing: '0.03em', fontFamily: 'var(--font-geist-sans, Montserrat, Arial, sans-serif)' }}>KaderUpdate</span>
                <div className="flex items-center gap-2 flex-1 justify-center">
                    <select
                        className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px]"
                        value={selectedClub}
                        onChange={e => onSelectClub(e.target.value)}
                    >
                        <option value="">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</option>
                        {clubs.map(club => (
                            <option key={club.id} value={club.id}>{club.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[120px]"
                        placeholder={locale === 'en' ? 'Search...' : 'Suche...'}
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                        style={{ width: 160 }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <span className="text-sm text-green-400 font-medium truncate max-w-[120px]">{user.email}</span>
                            <button
                                onClick={onLogoutClick}
                                className="bg-gray-800 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow transition font-bold border border-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[36px] min-w-[36px] text-xs"
                                title="Logout"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow transition font-bold border border-green-700 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 min-h-[36px] min-w-[36px] text-xs"
                            title="Login"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
