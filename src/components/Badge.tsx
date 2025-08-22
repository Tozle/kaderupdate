import React from 'react';

export type BadgeType = '' | 'Bestätigt' | 'Gut belegt' | 'Gerücht';

interface BadgeProps {
  type: BadgeType;
}

const badgeStyles: Record<BadgeType, string> = {
  '': 'bg-gray-500/40 text-gray-100',
  'Bestätigt': 'bg-green-600/80 text-green-100',
  'Gut belegt': 'bg-yellow-600/80 text-yellow-100',
  'Gerücht': 'bg-red-700/80 text-red-100',
};

export const Badge: React.FC<BadgeProps> = ({ type }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${badgeStyles[type]}`}>
    {type}
  </span>
);
