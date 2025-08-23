import Image from "next/image";
import React from 'react';
import type { User } from '@supabase/supabase-js';
import { useLocale } from '@/lib/useLocale';


interface Club {
    id: string;
    name: string;
    logo_url?: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
    rank?: number;
}
interface TopbarFilterProps {
    user: User | null;
    clubs: Club[];
    selectedClub: Club | null;
    onSelectClub: (club: Club | null) => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

const TopbarFilter: React.FC<TopbarFilterProps> = ({ user, clubs, selectedClub, onSelectClub, onLoginClick, onLogoutClick }) => {
    const locale = useLocale();
    // KEIN Dropdown mehr, sondern horizontale, swipebare Button-Leiste
    return (
        <header className="w-full flex flex-col items-center justify-center mt-2 mb-8">
            <nav className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex flex-row gap-2 sm:gap-3 px-2 py-2 min-w-fit" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <button
                        className={`flex flex-col items-center justify-center w-24 h-16 sm:w-28 sm:h-20 p-2 rounded-xl border border-green-200 dark:border-green-700 shadow hover:scale-105 transition ${!selectedClub ? 'ring-2 ring-green-400' : ''}`}
                        style={{ background: '#fff', color: '#22c55e' }}
                        onClick={() => onSelectClub(null)}
                    >
                        <span className="w-8 h-8 mb-1 rounded-full bg-white flex items-center justify-center text-green-400 text-lg font-bold border border-green-300">★</span>
                        <span className="text-xs font-bold text-center leading-tight">{locale === 'en' ? 'All clubs' : 'Alle Vereine'}</span>
                    </button>
                    {clubs
                        .sort((a, b) => {
                            if (a.rank == null && b.rank == null) return 0;
                            if (a.rank == null) return 1;
                            if (b.rank == null) return -1;
                            return a.rank - b.rank;
                        })
                        .map(club => (
                            <button
                                key={club.id}
                                className={`flex flex-col items-center justify-center w-24 h-16 sm:w-28 sm:h-20 p-2 rounded-xl border border-green-200 dark:border-green-700 shadow hover:scale-105 transition ${selectedClub?.id === club.id ? 'ring-2 ring-green-400' : ''}`}
                                style={{
                                    background: club.color_primary_hex || undefined,
                                    color: club.color_secondary_hex || undefined
                                }}
                                onClick={() => {
                                    console.log('Club selected:', club);
                                    onSelectClub(club);
                                }}
                            >
                                {club.logo_url && (
                                    <Image src={club.logo_url} alt={club.name} width={32} height={32} className="w-8 h-8 mb-1 rounded-full object-contain bg-white" />
                                )}
                                <span className="text-xs font-bold text-center leading-tight" style={{ color: club.color_secondary_hex || undefined }}>{club.name}</span>
                            </button>
                        ))}
                </div>
            </nav>
            <div className="flex flex-row gap-2 items-center mt-4">
                {user ? (
                    <button
                        className="btn"
                        onClick={onLogoutClick}
                        aria-label={locale === 'en' ? 'Logout' : 'Abmelden'}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="btn"
                        onClick={onLoginClick}
                        aria-label={locale === 'en' ? 'Login' : 'Anmelden'}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};
export default TopbarFilter;
