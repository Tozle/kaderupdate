import React from 'react';

export type BadgeType = '' | 'Bestätigt' | 'Gut belegt' | 'Gerücht';

interface BadgeProps {
    type: BadgeType;
}

const badgeStyles: Record<BadgeType, string> = {
    '': 'bg-gray-600/60 text-gray-100 border border-gray-400',
    'Bestätigt': 'bg-green-600/90 text-green-100 border border-green-400',
    'Gut belegt': 'bg-yellow-500/90 text-yellow-50 border border-yellow-300',
    'Gerücht': 'bg-red-700/90 text-red-100 border border-red-400',
};

export const Badge: React.FC<BadgeProps> = ({ type }) => (
    <span
        className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 hover:shadow-green-400/30 ${badgeStyles[type]}`}
        tabIndex={0}
    >
        {type}
    </span>
);
