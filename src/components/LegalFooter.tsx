
export default function LegalFooter() {
    return (
        <footer className="w-full flex flex-col items-center justify-center text-xs text-gray-400 py-8 mt-16 rounded-2xl bg-gradient-to-br from-gray-950/80 via-gray-900/90 to-gray-950/80 shadow-lg border border-green-600/10 max-w-2xl mx-auto">
            <div className="flex gap-4 items-center justify-center flex-wrap">
                <a href="/impressum" className="underline hover:text-green-400 transition">Impressum</a>
                <span>·</span>
                <a href="/datenschutz" className="underline hover:text-green-400 transition">Datenschutz</a>
            </div>
            <span className="mb-1">&copy; {new Date().getFullYear()} KaderUpdate</span>
        </footer>
    );
}
