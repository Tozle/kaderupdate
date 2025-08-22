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
    // Card-Akzentfarbe: Clubfarbe oder Default
    const accentBg = club?.color_primary_hex || '#e5e7eb';
    const accentText = club?.color_secondary_hex || '#222';
    return (
        <article
            className="relative rounded-3xl p-7 flex flex-col gap-4 transition-all hover:scale-[1.005] group focus-within:scale-[1.005] outline-none ring-0 border max-w-2xl mx-auto bg-white/80 dark:bg-gray-950/80 border-gray-200 dark:border-gray-800 hover:border-green-400 shadow-sm backdrop-blur-xl"
            tabIndex={0}
            aria-label={`News: ${title}`}
            style={{ boxShadow: `0 1px 8px 0 #e5e7eb55` }}
        >
            <div className="flex flex-row items-center gap-4 mb-1">
                {club.logo_url ? (
                    <Link href={`/club/${club.id}`} tabIndex={-1} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>
                        <Image
                            src={club.logo_url}
                            alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full bg-white object-contain border-2 border-gray-200 dark:border-gray-700"
                            style={{ objectFit: 'contain', background: '#fff' }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </Link>
                ) : (
                    <span className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl border border-gray-300 dark:border-gray-700" aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <Link
                    href={`/club/${club.id}`}
                    className="font-semibold text-lg flex-1 truncate hover:underline focus:underline text-gray-700 dark:text-gray-200"
                    aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}
                >
                    {club.name}
                </Link>
                <Badge type={badge} style={{ background: club?.color_primary_hex || '#e5e7eb', color: club?.color_secondary_hex || '#222', borderColor: club?.color_primary_hex || '#e5e7eb', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.01em', boxShadow: 'none', padding: '0.3em 1em', borderRadius: '1em' }} />
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-1 group-hover:opacity-80 group-focus-within:opacity-80 transition-colors text-gray-800 dark:text-gray-100">
                {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-1 font-normal leading-relaxed max-w-2xl">
                {summary}
            </p>
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80">
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
                <span>
                    <span className="font-semibold" style={{ color: club?.color_primary_hex || '#bdbdbd' }}>{locale === 'en' ? 'Sources:' : 'Quellen:'}</span> {sources.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && ', '}
                            <a href={s.url} className="underline underline-offset-2" style={{ color: club?.color_primary_hex || '#bdbdbd' }} target="_blank" rel="noopener noreferrer">{s.name}</a>
                        </React.Fragment>
                    ))}
                </span>
            </div>
            <span className="absolute left-0 top-0 h-2 w-full rounded-t-3xl" style={{ background: club?.color_primary_hex || '#e5e7eb', opacity: 0.08 }} />
        </article>
    );
};

export default NewsCard;
