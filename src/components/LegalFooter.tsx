
export default function LegalFooter() {
    return (
        <footer className="w-full flex flex-col items-center justify-center text-xs text-gray-400 py-6 mt-24 mb-4 border-t border-gray-800/60 bg-transparent">
            <div className="flex gap-3 items-center justify-center flex-wrap mb-1">
                <a href="/impressum" className="underline hover:text-green-400 transition">Impressum</a>
                <span className="opacity-60">·</span>
                <a href="/datenschutz" className="underline hover:text-green-400 transition">Datenschutz</a>
            </div>
            <span className="text-[11px] opacity-70">&copy; {new Date().getFullYear()} KaderUpdate</span>
        </footer>
    );
}
