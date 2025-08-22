import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, BadgeType } from './Badge';
import { XEmbed } from './XEmbed';
import { FaFutbol } from 'react-icons/fa';
// import { translations } from '@/lib/translations'; // entfernt, da ungenutzt
import { useLocale } from '@/lib/useLocale';


interface Club {
    id: string;
    name: string;
    logo_url?: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
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
    const locale = useLocale();
    // Favoriten-Logik entfernt
    // Farben aus Club holen (Fallbacks wie im Dropdown)
    const primary = club.color_primary_hex || '#22c55e';
    const secondary = club.color_secondary_hex || '#166534';
    return (
        <article
            className="bg-gray-950 rounded-xl shadow p-4 sm:p-6 flex flex-col gap-3 transition-all hover:scale-[1.01] group focus-within:scale-[1.01] outline-none ring-0 border border-gray-800"
            tabIndex={0}
            aria-label={`News: ${title}`}
        >
            <div className="flex flex-row items-center gap-3 mb-2">
                {club.logo_url ? (
                    <Link href={`/club/${club.id}`} tabIndex={-1} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>
                        <Image
                            src={club.logo_url}
                            alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full bg-gray-700 object-contain border border-gray-700"
                            style={{ objectFit: 'contain' }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </Link>
                ) : (
                    <span className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-2xl border border-gray-700" aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <Link href={`/club/${club.id}`} className="font-bold text-lg flex-1 truncate hover:underline focus:underline text-green-300" aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>{club.name}</Link>
                <Badge type={badge} style={{ background: '#22c55e', color: '#fff', borderColor: '#166534' }} />
            </div>
            <h2 className="text-lg font-bold leading-tight mb-1 text-green-200 group-hover:opacity-80 group-focus-within:opacity-80 transition-colors">
                {title}
            </h2>
            <p className="text-gray-300 text-sm mb-2 font-normal leading-relaxed max-w-2xl">
                {summary}
            </p>
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 text-xs text-gray-400 mt-2">
                <span>
                    <span className="font-semibold text-green-500">{locale === 'en' ? 'Sources:' : 'Quellen:'}</span> {sources.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && ', '}
                            <a href={s.url} className="underline underline-offset-2 decoration-green-500 text-green-400 hover:text-green-300 focus:text-green-300 transition-all font-semibold focus:outline-none" target="_blank" rel="noopener noreferrer">{s.name}</a>
                        </React.Fragment>
                    ))}
                </span>
            </div>
        </article>
    );
};

export default NewsCard;
