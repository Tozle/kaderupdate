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
            className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col gap-5 transition-all hover:scale-[1.025] group focus-within:scale-[1.025] outline-none ring-0"
            style={{
                border: `2px solid ${primary}`,
                boxShadow: `0 0 0 2px ${primary}33, 0 8px 32px 0 ${secondary}22`,
            }}
            tabIndex={0}
            aria-label={`News: ${title}`}
        >
            <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6 mb-2">
                {/* Club-Logo mit Fallback und optimiertem Laden */}
                {club.logo_url ? (
                    <Link href={`/club/${club.id}`} tabIndex={-1} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>
                        <Image
                            src={club.logo_url}
                            alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                            width={56}
                            height={56}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-700 object-contain border-2 shadow-lg group-hover:border-green-400 group-focus-within:border-green-400 transition-all"
                            style={{ objectFit: 'contain', borderColor: secondary }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </Link>
                ) : (
                    <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-700 flex items-center justify-center text-3xl sm:text-4xl border-2 shadow-lg" style={{ color: primary, borderColor: secondary }} aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <Link href={`/club/${club.id}`} className="font-extrabold text-2xl sm:text-3xl tracking-wide drop-shadow ml-0 xs:ml-2 font-sans flex-1 truncate hover:underline focus:underline" style={{ color: primary }} aria-label={locale === 'en' ? `Go to ${club.name}` : `Zu ${club.name}`}>{club.name}</Link>
                <span className="xs:ml-auto mt-1 xs:mt-0 flex items-center gap-3">
                    <Badge type={badge} style={{ background: primary, color: '#fff', borderColor: secondary }} />
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow mb-1 font-sans group-hover:opacity-80 group-focus-within:opacity-80 transition-colors" style={{ color: primary }}>
                {title}
            </h2>
            <p className="text-gray-200 text-base sm:text-lg mb-3 font-medium leading-relaxed max-w-3xl">
                {summary}
            </p>
            {/* Social Embed */}
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: secondary, background: '#18181b' }}>
                    <XEmbed url={social_embed} />
                </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-400 mt-3">
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
