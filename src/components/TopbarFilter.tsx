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
        <header className="sticky top-0 z-30 w-full bg-gray-950 border-b border-gray-800" role="banner">
            <div className="flex flex-row items-center justify-between px-4 py-2 max-w-5xl mx-auto">
                <span className="font-bold text-xl tracking-tight text-green-300 font-sans select-none" style={{ letterSpacing: '0.03em', fontFamily: 'Montserrat, Arial, sans-serif' }}>KaderUpdate</span>
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
