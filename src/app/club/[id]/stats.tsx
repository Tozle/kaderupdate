// Platzhalter für Statistiken-Komponente
export default function ClubStats({ stats }: { stats: { label: string, value: string | number }[] }) {
    return (
        <section className="w-full mt-8">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Statistiken</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow border border-green-900">
                        <span className="text-lg font-semibold text-white flex-1">{s.label}</span>
                        <span className="text-green-400 font-mono text-base">{s.value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
