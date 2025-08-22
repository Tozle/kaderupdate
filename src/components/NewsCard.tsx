import React from 'react';
import { Badge, BadgeType } from './Badge';

interface Club {
  id: string;
  name: string;
  logo_url?: string;
}

interface Source {
  id: string;
  name: string;
  type: string;
  url?: string;
  trust_level?: number;
}

export interface NewsCardProps {
  title: string;
  summary: string;
  badge: BadgeType;
  club: Club;
  timestamp: string;
  sources: Source[];
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, summary, badge, club, timestamp, sources }) => (
  <article className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-800 hover:border-blue-500 transition-all hover:scale-[1.02]">
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={club.logo_url} alt={club.name} className="w-10 h-10 object-contain rounded-full border-2 border-gray-700 shadow" />
      <span className="font-bold text-lg tracking-wide drop-shadow">{club.name}</span>
      <span className="ml-auto"><Badge type={badge} /></span>
    </div>
    <h2 className="text-xl font-extrabold leading-tight drop-shadow mb-1">{title}</h2>
    <p className="text-gray-300 text-base mb-2">{summary}</p>
    <div className="flex items-center gap-3 text-xs text-gray-400">
      <span className="bg-gray-800/70 px-2 py-1 rounded shadow">{new Date(timestamp).toLocaleString()}</span>
      <span>
        Quellen: {sources.map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && ', '}
            <a href={s.url} className="underline text-blue-400 hover:text-blue-300 transition-all" target="_blank" rel="noopener noreferrer">{s.name}</a>
          </React.Fragment>
        ))}
      </span>
    </div>
  </article>
);
