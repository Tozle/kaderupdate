"use client";
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Kader = dynamic(() => import('./kader'), { ssr: false });
const ClubStats = dynamic(() => import('./stats'), { ssr: false });
const ClubSocialFeed = dynamic(() => import('./social'), { ssr: false });

interface Club {
    id: string;
    name: string;
    logo_url?: string;
    color_primary_hex?: string;
    color_secondary_hex?: string;
}
interface Player { id: string; name: string; position: string; number: number; }
interface Stat { label: string; value: string | number; }
interface Embed { url: string; }
interface ClubDetailClientProps {
    club: Club;
    demoPlayers: Player[];
    demoStats: Stat[];
    demoEmbeds: Embed[];
}

export default function ClubDetailClient({ club, demoPlayers, demoStats, demoEmbeds }: ClubDetailClientProps) {
    const primary = club.color_primary_hex || '#22c55e';
    const secondary = club.color_secondary_hex || '#166534';
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-col items-center justify-center p-8">
            <div
                className="rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col items-center border-4"
                style={{ background: primary, borderColor: secondary }}
            >
                {club.logo_url && (
                    <Image src={club.logo_url} alt={club.name} width={96} height={96} className="w-24 h-24 rounded-full object-contain mb-4 border-4" style={{ borderColor: secondary }} />
                )}
                <h1 className="text-3xl font-extrabold mb-2" style={{ color: secondary }}>{club.name}</h1>
                <div className="flex gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full" style={{ background: primary, display: 'inline-block', border: `2px solid ${secondary}` }}></span>
                    <span className="w-8 h-8 rounded-full" style={{ background: secondary, display: 'inline-block', border: `2px solid ${primary}` }}></span>
                </div>
                <Kader players={demoPlayers} />
                <ClubStats stats={demoStats} />
                <ClubSocialFeed embeds={demoEmbeds} />
                <Link href="/" className="mt-8 inline-block underline hover:text-green-300 transition" style={{ color: secondary }}>
                    Zurück zur Übersicht
                </Link>
            </div>
        </main>
    );
}
