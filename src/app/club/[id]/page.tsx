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
    const { data: club, error } = await supabase
        .from('clubs')
        .select('id, name, logo_url, color_primary_hex, color_secondary_hex')
        .eq('id', params.id)
        .single();

    if (error || !club) return notFound();

    // Demo-Daten für Kader
    const demoPlayers = [
        { id: '1', name: 'Max Mustermann', position: 'Torwart', number: 1 },
        { id: '2', name: 'John Doe', position: 'Abwehr', number: 4 },
        { id: '3', name: 'Jane Smith', position: 'Mittelfeld', number: 8 },
        { id: '4', name: 'Alex Müller', position: 'Sturm', number: 9 },
    ];

    // Demo-Daten für Statistiken
    const demoStats = [
        { label: 'Tabellenplatz', value: 3 },
        { label: 'Punkte', value: 42 },
        { label: 'Tore', value: 38 },
        { label: 'Gegentore', value: 21 },
        { label: 'Letztes Spiel', value: '2:1 vs. FC Beispiel' },
    ];

    // Demo-Embeds für Social-Feed
    const demoEmbeds = [
        { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { url: 'https://www.youtube.com/embed/3tmd-ClpJxA' },
    ];

    return <ClubDetailClient club={club} demoPlayers={demoPlayers} demoStats={demoStats} demoEmbeds={demoEmbeds} />;
}
