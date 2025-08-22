import { useEffect, useState } from 'react';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookie-accepted')) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-200 p-4 z-50 flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-green-700 shadow-lg">
      <span>Diese Website verwendet Cookies für ein besseres Nutzererlebnis. Mit der Nutzung akzeptierst du unsere <a href="/datenschutz" className="underline text-green-400 hover:text-green-300">Datenschutzerklärung</a>.</span>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg ml-2 mt-2 sm:mt-0"
        onClick={() => { localStorage.setItem('cookie-accepted', '1'); setVisible(false); }}
      >
        Verstanden
      </button>
    </div>
  );
}
