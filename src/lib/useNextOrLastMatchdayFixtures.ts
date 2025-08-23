import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Fixture } from './useNextFixture';

export function useNextOrLastMatchdayFixtures() {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [matchday, setMatchday] = useState<number | null>(null);
    useEffect(() => {
        const now = new Date().toISOString();
        // 1. Finde die kleinste zukünftige matchday_number
        supabase
            .from('fixtures')
            .select('matchday_number')
            .gte('kickoff_at', now)
            .order('matchday_number', { ascending: true })
            .limit(1)
            .then(({ data }) => {
                if (data && data.length > 0) {
                    setMatchday(data[0].matchday_number);
                } else {
                    // Wenn kein zukünftiger Spieltag, dann den größten vergangenen nehmen
                    supabase
                        .from('fixtures')
                        .select('matchday_number')
                        .lt('kickoff_at', now)
                        .order('matchday_number', { ascending: false })
                        .limit(1)
                        .then(({ data }) => {
                            setMatchday(data?.[0]?.matchday_number || null);
                        });
                }
            });
    }, []);

    useEffect(() => {
        if (matchday == null) return;
        // Hole alle Spiele dieses Spieltags
        supabase
            .from('fixtures')
            .select('*, home_club:home_club_id(id, name, logo_url, code, stadium_name), away_club:away_club_id(id, name, logo_url, code, stadium_name)')
            .eq('matchday_number', matchday)
            .order('kickoff_at', { ascending: true })
            .then(({ data }) => {
                setFixtures(data || []);
            });
    }, [matchday]);

    return { fixtures, matchday };
}
