"use client";
import { useEffect, useState } from 'react';

export default function CookieNotice() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('cookie-accepted')) setVisible(true);
    }, []);
    if (!visible) return null;
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 text-gray-700 p-3 z-50 flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-gray-200 shadow animate-slideInUp">
            <span className="text-xs sm:text-sm text-center">
                Diese Website verwendet Cookies für ein besseres Nutzererlebnis. Mit der Nutzung akzeptierst du unsere{' '}
                <a href="/datenschutz" className="underline hover:text-black focus:text-black transition-colors">Datenschutzerklärung</a>.
            </span>
            <button
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-1.5 rounded ml-0 sm:ml-3 mt-2 sm:mt-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                onClick={() => { localStorage.setItem('cookie-accepted', '1'); setVisible(false); }}
                tabIndex={0}
            >
                Verstanden
            </button>
        </div>
    );
}
