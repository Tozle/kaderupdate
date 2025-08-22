// Platzhalter für Kader-Komponente
export default function Kader({ players }: { players: { id: string, name: string, position: string, number?: number }[] }) {
  return (
    <section className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Kader</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {players.map(p => (
          <div key={p.id} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow border border-green-900">
            <span className="text-lg font-semibold text-white flex-1">{p.name}</span>
            <span className="text-green-400 font-mono text-base">{p.position}</span>
            {p.number && <span className="text-gray-400 ml-2">#{p.number}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
