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
    const accentText = club?.color_secondary_hex || '#fff';
    return (
        <article
            className="relative rounded-3xl shadow-xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.015] group focus-within:scale-[1.015] outline-none ring-0 border max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border-gray-800 hover:border-green-500"
            tabIndex={0}
            aria-label={`News: ${title}`}
            style={{ boxShadow: `0 4px 32px 0 ${accentBg}33` }}
        >
            <div className="flex flex-row items-center gap-4 mb-2">
                {club.logo_url ? (
                    <Link href={`/club/${club.id}`} tabIndex={-1} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>
                        <Image
                            src={club.logo_url}
                            alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full bg-gray-700 object-contain border-2 border-white shadow-md"
                            style={{ objectFit: 'contain', background: '#fff' }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </Link>
                ) : (
                    <span className="w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center text-2xl border border-gray-700" aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <Link
                    href={`/club/${club.id}`}
                    className="font-bold text-xl flex-1 truncate hover:underline focus:underline"
                    aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}
                    style={{ color: accentBg }}
                >
                    {club.name}
                </Link>
                <Badge type={badge} style={{ background: accentBg, color: accentText, borderColor: accentBg, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', boxShadow: `0 1px 6px ${accentBg}33` }} />
            </div>
            <h2 className="text-2xl font-extrabold leading-tight mb-1 group-hover:opacity-80 group-focus-within:opacity-80 transition-colors" style={{ color: accentText }}>
                {title}
            </h2>
            <p className="text-gray-300 text-base mb-2 font-normal leading-relaxed max-w-2xl">
                {summary}
            </p>
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-lg overflow-hidden border border-[var(--card-border)] bg-gray-900">
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-row flex-wrap items-center gap-2 text-xs text-gray-400 mt-2">
                <span>
                    <span className="font-semibold" style={{ color: accentBg }}>{locale === 'en' ? 'Sources:' : 'Quellen:'}</span> {sources.map((s, i) => (
                        <React.Fragment key={s.id}>
                            {i > 0 && ', '}
                            <a href={s.url} className="underline underline-offset-2" style={{ color: accentBg }} target="_blank" rel="noopener noreferrer">{s.name}</a>
                        </React.Fragment>
                    ))}
                </span>
            </div>
            <span className="absolute left-0 top-0 h-2 w-full rounded-t-3xl" style={{ background: accentBg, opacity: 0.18 }} />
        </article>
    );
};

export default NewsCard;
