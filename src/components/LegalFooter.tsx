import Link from 'next/link';

export default function LegalFooter() {
    return (
        <footer className="w-full text-center text-xs text-gray-500 py-4 border-t border-gray-800 mt-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-transparent">
            <div className="flex gap-4 items-center justify-center flex-wrap">
                <Link href="/impressum" className="hover:underline focus:underline px-1 py-0.5 rounded transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:underline focus:underline px-1 py-0.5 rounded transition-colors">Datenschutz</Link>
            </div>
            <span className="mx-2 select-none">© {new Date().getFullYear()} <span className="font-semibold">KaderUpdate</span></span>
        </footer>
    );
}
