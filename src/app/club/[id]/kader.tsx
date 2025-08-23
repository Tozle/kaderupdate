// Platzhalter für Kader-Komponente
import Image from 'next/image';
export default function Kader({ players }: {
    players: {
        id: string,
        slug?: string,
        first_name?: string,
        last_name?: string,
        name: string,
        position_group: string,
        shirt_number?: number,
        nation_code?: string,
        birthdate?: string,
        status?: string,
        status_note?: string,
        image_url?: string
    }[]
}) {
    return (
        <section className="w-full mt-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Kader</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {players.map(p => (
                    <div key={p.id} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow border border-green-900">
                        {p.image_url && (
                            <Image src={p.image_url} alt={p.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover border-2 border-green-700" />
                        )}
                        <div className="flex-1">
                            <div className="text-lg font-semibold text-white">{p.name}</div>
                            <div className="text-gray-400 text-sm">
                                {p.first_name && <span>{p.first_name} </span>}
                                {p.last_name && <span>{p.last_name}</span>}
                                {p.birthdate && <span> · {new Date(p.birthdate).toLocaleDateString()} </span>}
                                {p.nation_code && <span> · <span className="font-mono">{p.nation_code}</span></span>}
                            </div>
                            <div className="text-green-400 font-mono text-base mt-1">{p.position_group}</div>
                            {p.status && <div className="text-xs text-yellow-400 mt-1">Status: {p.status}</div>}
                            {p.status_note && <div className="text-xs text-gray-300 mt-1 italic">{p.status_note}</div>}
                        </div>
                        {p.shirt_number && <span className="text-gray-400 ml-2 text-lg font-bold">#{p.shirt_number}</span>}
                    </div>
                ))}
            </div>
        </section>
    );
}
