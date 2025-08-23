import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import ClubDetailClient from './ClubDetailClient';
// Dummy-Funktion, damit Next.js die Typen generiert
export async function generateStaticParams() {
    // Dummy-Parameter, damit Next.js die Typen generiert
    return [{ id: 'dummy' }];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ClubDetailPage(props: any) {
    const { params } = props;
    // Club inkl. players_table laden
    const { data: club, error } = await supabase
        .from('clubs')
        .select('id, name, logo_url, color_primary_hex, color_secondary_hex, players_table')
        .eq('id', params.id)
        .single();

    if (error || !club) return notFound();

    // Spieler dynamisch aus der richtigen Tabelle laden
    let players = [];
    if (club.players_table) {
        const { data: playerData } = await supabase.from(club.players_table).select('*');
        players = playerData || [];
    }

    // Demo-Daten für Statistiken (kann später dynamisch gemacht werden)
    const demoStats = [
        { label: 'Tabellenplatz', value: 3 },
        { label: 'Punkte', value: 42 },
        { label: 'Tore', value: 38 },
        { label: 'Gegentore', value: 21 },
        { label: 'Letztes Spiel', value: '2:1 vs. FC Beispiel' },
    ];

    // Demo-Embeds für Social-Feed (kann später dynamisch gemacht werden)
    const demoEmbeds = [
        { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { url: 'https://www.youtube.com/embed/3tmd-ClpJxA' },
    ];

    return <ClubDetailClient club={club} demoPlayers={players} demoStats={demoStats} demoEmbeds={demoEmbeds} />;
}
