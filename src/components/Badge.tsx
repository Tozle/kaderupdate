import React from 'react';

export type BadgeType = '' | 'Bestätigt' | 'Gut belegt' | 'Gerücht';

interface BadgeProps {
    type: BadgeType;
    style?: React.CSSProperties;
}

const badgeStyles: Record<BadgeType, string> = {
    '': 'bg-gray-100 text-gray-600 border border-gray-300',
    'Bestätigt': 'bg-green-100 text-green-700 border border-green-200',
    'Gut belegt': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'Gerücht': 'bg-red-100 text-red-700 border border-red-200',
};

export const Badge: React.FC<BadgeProps> = ({ type, style }) => (
    <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeStyles[type]}`}
        style={style}
    >
        {type}
    </span>
);
