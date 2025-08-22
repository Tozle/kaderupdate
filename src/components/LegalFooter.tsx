import Link from 'next/link';

export default function LegalFooter() {
  return (
    <footer className="w-full text-center text-xs text-gray-500 py-6 bg-gray-950 border-t border-gray-800 mt-8">
      <Link href="/impressum" className="underline hover:text-green-400 mx-2">Impressum</Link>
      <Link href="/datenschutz" className="underline hover:text-green-400 mx-2">Datenschutz</Link>
      <span className="mx-2">© {new Date().getFullYear()} KaderUpdate</span>
    </footer>
  );
}
