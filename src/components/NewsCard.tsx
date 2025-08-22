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
    const accentBg = club?.color_primary_hex || '#22c55e';
    const accentText = club?.color_secondary_hex || '#222';
    return (
        <article
            className="relative rounded-3xl p-8 flex flex-col gap-5 transition-all hover:scale-[1.01] group focus-within:scale-[1.01] outline-none ring-0 border max-w-2xl mx-auto bg-white/90 dark:bg-gray-950/90 border-gray-200 dark:border-gray-800 hover:border-green-500 shadow-lg backdrop-blur-xl"
            tabIndex={0}
            aria-label={`News: ${title}`}
            style={{ boxShadow: `0 2px 16px 0 ${accentBg}22` }}
        >
            <div className="flex flex-row items-center gap-5 mb-2">
                {club.logo_url ? (
                    <Link href={`/club/${club.id}`} tabIndex={-1} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>
                        <Image
                            src={club.logo_url}
                            alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded-full bg-white object-contain border-2 border-gray-200 dark:border-gray-700 shadow"
                            style={{ objectFit: 'contain', background: '#fff' }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </Link>
                ) : (
                    <span className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl border border-gray-300 dark:border-gray-700" aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <Link
                    href={`/club/${club.id}`}
                    className="font-bold text-2xl flex-1 truncate hover:underline focus:underline"
                    aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}
                    style={{ color: accentBg }}
                >
                    {club.name}
                </Link>
                <Badge type={badge} style={{ background: accentBg, color: accentText, borderColor: accentBg, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.01em', boxShadow: `0 1px 6px ${accentBg}33`, padding: '0.4em 1.1em', borderRadius: '1.2em' }} />
            </div>
            <h2 className="text-3xl font-extrabold leading-tight mb-1 group-hover:opacity-80 group-focus-within:opacity-80 transition-colors text-gray-900 dark:text-gray-100">
                {title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2 font-normal leading-relaxed max-w-2xl">
                {summary}
            </p>
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>
                    <span className="font-semibold" style={{ color: accentBg }}>{locale === 'en' ? 'Sources:' : 'Quellen:'}</span> {sources.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && ', '}
                            <a href={s.url} className="underline underline-offset-2" style={{ color: accentBg }} target="_blank" rel="noopener noreferrer">{s.name}</a>
                        </React.Fragment>
                    ))}
                </span>
            </div>
            <span className="absolute left-0 top-0 h-2 w-full rounded-t-3xl" style={{ background: accentBg, opacity: 0.13 }} />
        </article>
    );
};

export default NewsCard;
