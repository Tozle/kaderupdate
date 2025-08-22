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
            <div className="mx-auto max-w-4xl px-4 py-5 mt-2 rounded-[2rem] shadow-xl border border-green-600/10 bg-white/80 dark:bg-gray-950/80 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 flex-wrap backdrop-blur-xl">
                <span className="font-extrabold text-3xl tracking-tight text-green-600 font-sans select-none drop-shadow-lg" style={{ letterSpacing: '0.03em', fontFamily: 'var(--font-geist-sans, Montserrat, Arial, sans-serif)' }}>KaderUpdate</span>
                <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 justify-center w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <select
                            className="appearance-none bg-white/90 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[180px] pr-10 shadow-sm font-semibold transition-all"
                            value={selectedClub}
                            onChange={e => onSelectClub(e.target.value)}
                            style={selectedClub ? {
                                background: clubs.find(c => c.id === selectedClub)?.color_primary_hex || '#f3f4f6',
                                color: clubs.find(c => c.id === selectedClub)?.color_secondary_hex || '#222',
                                fontWeight: 700
                            } : {}}
                        >
                            <option value="">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</option>
                            {clubs.map(club => (
                                <option
                                    key={club.id}
                                    value={club.id}
                                    style={{
                                        background: club.color_primary_hex || '#f3f4f6',
                                        color: club.color_secondary_hex || '#222',
                                        fontWeight: 700
                                    }}
                                >
                                    {club.name}
                                </option>
                            ))}
                        </select>
                        {selectedClub && clubs.find(c => c.id === selectedClub)?.logo_url && (
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 bg-white object-contain pointer-events-none shadow" style={{ zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <Image
                                    src={clubs.find(c => c.id === selectedClub)?.logo_url || ''}
                                    alt="Club Logo"
                                    width={28}
                                    height={28}
                                    style={{ objectFit: 'contain', width: 28, height: 28 }}
                                    priority={false}
                                />
                            </span>
                        )}
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">▼</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            className="bg-white/90 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[140px] shadow-sm font-semibold transition-all pl-10"
                            placeholder={locale === 'en' ? 'Search...' : 'Suche...'}
                            value={search}
                            onChange={e => onSearch(e.target.value)}
                            style={{ width: 180 }}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                    {user ? (
                        <>
                            <span className="text-base text-green-600 font-semibold truncate max-w-[140px] bg-green-50 dark:bg-green-900/40 px-3 py-1 rounded-xl">{user.email}</span>
                            <button
                                onClick={onLogoutClick}
                                className="bg-gray-200 dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded-xl shadow font-bold border border-gray-300 dark:border-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[40px] min-w-[40px] text-base transition-all"
                                title="Logout"
                            >
                                <span className="hidden sm:inline">Logout</span>
                                <svg className="inline-block sm:ml-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" /><path d="M7 8v8" /></svg>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow font-bold border border-green-700 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 min-h-[40px] min-w-[40px] text-base transition-all"
                            title="Login"
                        >
                            <span className="hidden sm:inline">Login</span>
                            <svg className="inline-block sm:ml-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12H3m0 0l4-4m-4 4l4 4" /></svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
