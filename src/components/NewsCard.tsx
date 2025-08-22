
import React from 'react';
import { Badge, BadgeType } from './Badge';
import { XEmbed } from './XEmbed';


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

interface NewsCardProps {
    title: string;
    summary: string;
    badge: BadgeType;
    club: Club;
    timestamp: string;
    sources: Source[];
    social_embed?: string;
}


const NewsCard: React.FC<NewsCardProps> = ({ title, summary, badge, club, timestamp, sources, social_embed }) => {
    return (
        <article className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-800 hover:border-blue-500 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3">
                {/* Club-Logo mit Fallback und alt-Text */}
                {club.logo_url ? (
                    <img src={club.logo_url} alt={club.name + ' Logo'} className="w-7 h-7 rounded-full bg-gray-700 object-contain" />
                ) : (
                    <span className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400" aria-label="Kein Logo">?</span>
                )}
                <span className="font-bold text-lg tracking-wide drop-shadow ml-2">{club.name}</span>
                <span className="ml-auto"><Badge type={badge} /></span>
            </div>
            <h2 className="text-xl font-extrabold leading-tight drop-shadow mb-1">{title}</h2>
            <p className="text-gray-300 text-base mb-2">{summary}</p>
            {/* Social Embed */}
            {typeof social_embed === 'string' && social_embed.length > 0 && <XEmbed url={social_embed} />}
            <div className="flex items-center gap-3 text-xs text-gray-400">
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
};

export default NewsCard;
