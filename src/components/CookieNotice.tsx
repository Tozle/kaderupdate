"use client";
import { useEffect, useState } from 'react';

export default function CookieNotice({ onAccept }: { onAccept: () => void }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('cookie-accepted')) setVisible(true);
    }, []);
    if (!visible) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 text-gray-200 px-7 py-5 rounded-2xl shadow-2xl border border-green-600/20 flex flex-col sm:flex-row items-center gap-4 max-w-xl w-full animate-fadeIn">
            <span className="flex-1 text-base leading-relaxed">Diese Website verwendet Cookies, um bestmögliche Funktionalität zu bieten. <a href="/datenschutz" className="underline hover:text-green-400 transition">Mehr erfahren</a></span>
            <button
                onClick={onAccept}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow font-bold border border-green-700 hover:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 text-base transition"
            >
                Ok
            </button>
        </div>
    );
}
