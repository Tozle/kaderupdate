import React from 'react';

interface Club {
    id: string;
    name: string;
}

type BadgeType = 'Bestätigt' | 'Gut belegt' | 'Gerücht' | '';
interface TopbarFilterProps {
    clubs: Club[];
    selectedClub: string;
    onClubChange: (club: string) => void;
    selectedBadge: BadgeType;
    onBadgeChange: (badge: BadgeType) => void;
    showSearch: boolean;
    onShowSearch: () => void;
    searchValue: string;
    onSearchChange: (q: string) => void;
}

export const TopbarFilter: React.FC<TopbarFilterProps> = ({
    clubs,
    selectedClub,
    onClubChange,
    selectedBadge,
    onBadgeChange,
    showSearch,
    onShowSearch,
    searchValue,
    onSearchChange,
}) => (
    <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur shadow-lg p-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-6 border-b border-gray-800">
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
            <select
                value={selectedBadge}
                onChange={e => onBadgeChange(e.target.value as BadgeType)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 transition-all"
            >
                <option value="">Alle Badges</option>
                <option value="Bestätigt">Bestätigt</option>
                <option value="Gut belegt">Gut belegt</option>
                <option value="Gerücht">Gerücht</option>
            </select>
            <button
                onClick={onShowSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all font-semibold"
            >
                Suche
            </button>
        </div>
        {showSearch && (
            <>
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
            </>
        )}
    </header>
);
