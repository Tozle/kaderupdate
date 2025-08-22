import Link from 'next/link';

export default function LegalFooter() {
    return (
        <footer className="w-full text-center text-xs sm:text-sm text-gray-400 py-8 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-t border-green-800 mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 shadow-inner">
            <div className="flex gap-2 sm:gap-4 items-center justify-center flex-wrap">
                <Link href="/impressum" className="underline underline-offset-2 decoration-green-500 hover:text-green-400 focus:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition-colors px-3 py-2 rounded">Impressum</Link>
                <Link href="/datenschutz" className="underline underline-offset-2 decoration-green-500 hover:text-green-400 focus:text-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition-colors px-3 py-2 rounded">Datenschutz</Link>
            </div>
            <span className="mx-2 text-gray-500 select-none">© {new Date().getFullYear()} <span className="font-bold text-green-400">KaderUpdate</span></span>
        </footer>
    );
}
