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
        <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-xl">
            <div className="mx-auto max-w-5xl px-4 py-3 mt-2 rounded-2xl shadow-2xl border border-green-600/20 bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-gray-900/90 flex flex-row items-center justify-between gap-2 flex-wrap">
                <span className="font-extrabold text-2xl tracking-tight text-[var(--accent)] font-sans select-none drop-shadow-lg" style={{ letterSpacing: '0.03em', fontFamily: 'var(--font-geist-sans, Montserrat, Arial, sans-serif)' }}>KaderUpdate</span>
                <div className="flex items-center gap-2 flex-1 justify-center">
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[160px] pr-8"
                            value={selectedClub}
                            onChange={e => onSelectClub(e.target.value)}
                            style={selectedClub ? {
                                background: clubs.find(c => c.id === selectedClub)?.color_primary_hex || '#18181b',
                                color: clubs.find(c => c.id === selectedClub)?.color_secondary_hex || '#fff',
                                fontWeight: 700
                            } : {}}
                        >
                            <option value="">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</option>
                            {clubs.map(club => (
                                <option
                                    key={club.id}
                                    value={club.id}
                                    style={{
                                        background: club.color_primary_hex || '#18181b',
                                        color: club.color_secondary_hex || '#fff',
                                        fontWeight: 700
                                    }}
                                >
                                    {club.name}
                                </option>
                            ))}
                        </select>
                        {selectedClub && clubs.find(c => c.id === selectedClub)?.logo_url && (
                            <img
                                src={clubs.find(c => c.id === selectedClub)?.logo_url}
                                alt="Club Logo"
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-700 bg-white object-contain pointer-events-none"
                                style={{ zIndex: 2 }}
                            />
                        )}
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                    </div>
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
                            style={{ color: '#fff' }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
