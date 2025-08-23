import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Club } from '@/types/club';

export type Fixture = {
    id: string;
    competition_id: string;
    season_id: string;
    matchday_id: string;
    matchday_number: number;
    match_number: number;
    home_club_id: string;
    away_club_id: string;
    date_text: string;
    kickoff_at: string;
    status: string;
    home_score: number | null;
    away_score: number | null;
    home_club?: Club;
    away_club?: Club;
};

export function useNextFixture(clubId: string | null) {
    const [fixture, setFixture] = useState<Fixture | null>(null);
    useEffect(() => {
        if (!clubId) return;
        const now = new Date().toISOString();
        supabase
            .from('fixtures')
            .select('*, home_club:home_club_id(id, name, logo_url, code), away_club:away_club_id(id, name, logo_url, code)')
            .or(`home_club_id.eq.${clubId},away_club_id.eq.${clubId}`)
            .gte('kickoff_at', now)
            .order('kickoff_at', { ascending: true })
            .limit(1)
            .then(({ data }) => {
                setFixture(data?.[0] || null);
            });
    }, [clubId]);
    return fixture;
}
