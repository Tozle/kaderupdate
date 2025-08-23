import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Fixture } from './useNextFixture';

export function useNextGlobalFixture() {
    const [fixture, setFixture] = useState<Fixture | null>(null);
    useEffect(() => {
        const now = new Date().toISOString();
        supabase
            .from('fixtures')
            .select('*, home_club:home_club_id(id, name, logo_url, code, stadium_name), away_club:away_club_id(id, name, logo_url, code, stadium_name)')
            .gte('kickoff_at', now)
            .order('kickoff_at', { ascending: true })
            .limit(1)
            .then(({ data }) => {
                setFixture(data?.[0] || null);
            });
    }, []);
    return fixture;
}
