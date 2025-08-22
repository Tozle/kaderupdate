
import React from 'react';
import Image from 'next/image';
import { Badge, BadgeType } from './Badge';
import { XEmbed } from './XEmbed';
import { FaFutbol } from 'react-icons/fa';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';


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
    const locale = useLocale();
    const t = translations[locale] || translations['de'];
    // Micro-Interaction: Favoriten-Herz (Demo, localStorage)
    const [fav, setFav] = React.useState(false);
    React.useEffect(() => {
        setFav(localStorage.getItem(`fav-${club.id}`) === '1');
    }, [club.id]);
    const toggleFav = () => {
        const newFav = !fav;
        setFav(newFav);
        localStorage.setItem(`fav-${club.id}`, newFav ? '1' : '0');
    };
    return (
        <article
            className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 border border-gray-800 hover:border-green-500 hover:shadow-green-500/30 focus-within:shadow-green-400/40 transition-all hover:scale-[1.025] group focus-within:scale-[1.025] focus-within:border-green-400 outline-none ring-0 focus-within:ring-2 focus-within:ring-green-400"
            tabIndex={0}
            aria-label={`News: ${title}`}
        >
            <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6 mb-2">
                {/* Club-Logo mit Fallback und optimiertem Laden */}
                {club.logo_url ? (
                    <Image
                        src={club.logo_url}
                        alt={locale === 'en' ? `Logo of ${club.name}` : `Logo von ${club.name}`}
                        width={56}
                        height={56}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-700 object-contain border-2 border-green-600 shadow-lg group-hover:border-green-400 group-focus-within:border-green-400 transition-all"
                        style={{ objectFit: 'contain' }}
                        loading="lazy"
                        priority={false}
                    />
                ) : (
                    <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-700 flex items-center justify-center text-3xl sm:text-4xl text-green-500 border-2 border-green-600 shadow-lg" aria-label={locale === 'en' ? 'No logo' : 'Kein Logo'}><FaFutbol /></span>
                )}
                <span className="font-extrabold text-2xl sm:text-3xl tracking-wide drop-shadow ml-0 xs:ml-2 text-white font-sans flex-1 truncate">
                    {club.name}
                </span>
                <span className="xs:ml-auto mt-1 xs:mt-0 flex items-center gap-3">
                    <button
                        aria-label={fav ? (locale === 'en' ? 'Remove from favorites' : 'Aus Favoriten entfernen') : (locale === 'en' ? 'Mark as favorite' : 'Als Favorit markieren')}
                        onClick={toggleFav}
                        className={`transition-all text-3xl ${fav ? 'text-pink-500 scale-125' : 'text-gray-400 hover:text-pink-400'} focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full bg-gray-800/70 p-2 shadow-md`}
                        style={{ filter: fav ? 'drop-shadow(0 0 8px #f472b6)' : undefined }}
                        tabIndex={0}
                    >
                        <svg viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                    <Badge type={badge} />
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow text-white mb-1 font-sans group-hover:text-green-400 group-focus-within:text-green-400 transition-colors">
                {title}
            </h2>
            <p className="text-gray-200 text-base sm:text-lg mb-3 font-medium leading-relaxed max-w-3xl">
                {summary}
            </p>
            {/* Social Embed */}
            {typeof social_embed === 'string' && social_embed.length > 0 && (
                <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-950 my-2">
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
