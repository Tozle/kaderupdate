import { useEffect, useState } from 'react';

export default function CookieNotice() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('cookie-accepted')) setVisible(true);
    }, []);
    if (!visible) return null;
    return (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-200 p-4 z-50 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-green-700 shadow-2xl animate-slideInUp">
            <span className="text-xs sm:text-sm text-gray-300 text-center">
                Diese Website verwendet Cookies für ein besseres Nutzererlebnis. Mit der Nutzung akzeptierst du unsere{' '}
                <a href="/datenschutz" className="underline underline-offset-2 decoration-green-500 text-green-400 hover:text-green-300 focus:text-green-300 focus:outline-none transition-colors">Datenschutzerklärung</a>.
            </span>
            <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-lg ml-0 sm:ml-2 mt-2 sm:mt-0 shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-400 min-w-[44px] min-h-[44px]"
                onClick={() => { localStorage.setItem('cookie-accepted', '1'); setVisible(false); }}
                tabIndex={0}
            >
                Verstanden
            </button>
        </div>
    );
}
