// Platzhalter für Social-Feed-Komponente
export default function ClubSocialFeed({ embeds }: { embeds: { url: string }[] }) {
    return (
        <section className="w-full mt-8">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Social-Feed</h2>
            <div className="flex flex-col gap-6">
                {embeds.map((e, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-4 shadow border border-green-900">
                        <iframe src={e.url} className="w-full h-64 rounded-lg border-none" title={`Social Embed ${i + 1}`}></iframe>
                    </div>
                ))}
            </div>
        </section>
    );
}
