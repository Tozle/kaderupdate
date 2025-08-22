
import React from 'react';
import Image from 'next/image';
import { Badge, BadgeType } from './Badge';
import { XEmbed } from './XEmbed';
import { FaFutbol } from 'react-icons/fa';


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
    sources: Source[];
    social_embed?: string;
}


const NewsCard: React.FC<NewsCardProps> = ({ title, summary, badge, club, sources, social_embed }) => {
    return (
        <article className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-gray-800 hover:border-green-500 hover:shadow-green-700/30 transition-all hover:scale-[1.025] group" tabIndex={0} aria-label={`News: ${title}`}>
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-1">
                {/* Club-Logo mit Fallback und optimiertem Laden */}
                {club.logo_url ? (
                    <Image
                        src={club.logo_url}
                        alt={`Logo von ${club.name}`}
                        width={44}
                        height={44}
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-700 object-contain border-2 border-green-700 shadow-md group-hover:border-green-400"
                        style={{ objectFit: 'contain' }}
                        loading="lazy"
                        priority={false}
                    />
                ) : (
                    <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-700 flex items-center justify-center text-xl sm:text-2xl text-green-500 border-2 border-green-700 shadow-md" aria-label="Kein Logo"><FaFutbol /></span>
                )}
                <span className="font-extrabold text-lg sm:text-xl tracking-wide drop-shadow ml-0 xs:ml-2 text-white font-sans">{club.name}</span>
                <span className="xs:ml-auto mt-1 xs:mt-0"><Badge type={badge} /></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight drop-shadow text-white mb-1 font-sans group-hover:text-green-400 transition-colors">
                {title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-2 font-medium">{summary}</p>
            {/* Social Embed */}
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-950 my-2">
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-400 mt-2">
                <span>
                    <span className="font-semibold text-green-500">Quellen:</span> {sources.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && ', '}
                            <a href={s.url} className="underline text-green-400 hover:text-green-300 transition-all font-semibold" target="_blank" rel="noopener noreferrer">{s.name}</a>
                        </React.Fragment>
                    ))}
                </span>
            </div>
        </article>
    );
};

export default NewsCard;
