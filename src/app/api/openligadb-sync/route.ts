import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const OPENLIGADB_API = "https://api.openligadb.de/getmatchdata/bl1";

function mapStatus(status: string): "scheduled" | "in_progress" | "finished" {
    if (status === "LIVE") return "in_progress";
    if (status === "FINISHED") return "finished";
    return "scheduled";
}

async function getClubIdByName(name: string): Promise<string | null> {
    const { data } = await supabase
        .from("v_club_by_name")
        .select("id")
        .or(`offizieller_name.eq.${name},alias.eq.${name}`)
        .limit(1);
    return data?.[0]?.id ?? null;
}

export async function POST() {
    const res = await fetch(OPENLIGADB_API);
    const matches = await res.json();
    let updated = 0;

    for (const match of matches) {
        const fullTime = (match.matchResults as Array<{ resultTypeID: number; pointsTeam1: number | null; pointsTeam2: number | null }>).find(r => r.resultTypeID === 2);
        const home_score = fullTime?.pointsTeam1 ?? null;
        const away_score = fullTime?.pointsTeam2 ?? null;
        const status = mapStatus(match.matchIsFinished ? "FINISHED" : (match.matchIsLive ? "LIVE" : "SCHEDULED"));
        const home_club_id = await getClubIdByName(match.team1.teamName);
        const away_club_id = await getClubIdByName(match.team2.teamName);

        const { error } = await supabase
            .from("fixtures")
            .upsert({
                external_source: "openligadb",
                external_id: String(match.matchID),
                last_synced_at: new Date().toISOString(),
                kickoff_at: match.matchDateTimeUTC,
                home_score,
                away_score,
                status,
                home_club_id,
                away_club_id,
                matchday_number: match.group.orderID,
            }, { onConflict: "external_source,external_id" });
        if (!error) updated++;
    }

    return NextResponse.json({ updated });
}
