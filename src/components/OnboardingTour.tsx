import React from 'react';

const steps = [
  {
    title: 'Willkommen bei KaderUpdate!',
    text: 'Hier findest du alle News, Gerüchte und Kader-Updates zur Bundesliga. Die Seite ist schnell, modern und mobil optimiert.'
  },
  {
    title: 'Vereinsfilter & Suche',
    text: 'Nutze das Dropdown oben, um News zu deinem Lieblingsverein zu filtern. Mit der Suche findest du gezielt News zu Spielern, Themen oder Quellen.'
  },
  {
    title: 'Favoriten',
    text: 'Markiere News als Favorit (Herz-Icon) und filtere sie mit dem Stern-Button in der Topbar.'
  },
  {
    title: 'Club-Detailseiten',
    text: 'Klicke auf Vereinsnamen oder Logos, um Kader, Statistiken und Social-Feeds zu sehen.'
  },
  {
    title: 'Viel Spaß!',
    text: 'Du kannst diese Tour jederzeit schließen. Feedback und Feature-Wünsche sind willkommen!'
  }
];

export default function OnboardingTour({ onClose }: { onClose: () => void }) {
  const [step, setStep] = React.useState(0);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-700 p-8 max-w-md w-full mx-2 flex flex-col items-center animate-scaleIn">
        <h2 className="text-2xl font-bold text-green-400 mb-2 text-center">{steps[step].title}</h2>
        <p className="text-gray-200 text-lg mb-6 text-center">{steps[step].text}</p>
        <div className="flex gap-4 w-full justify-center">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="px-5 py-2 rounded bg-gray-800 text-green-300 font-bold border border-green-700 hover:bg-green-900 transition">Zurück</button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="px-5 py-2 rounded bg-green-600 text-white font-bold border border-green-700 hover:bg-green-700 transition">Weiter</button>
          ) : (
            <button onClick={onClose} className="px-5 py-2 rounded bg-green-600 text-white font-bold border border-green-700 hover:bg-green-700 transition">Tour beenden</button>
          )}
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500" aria-label="Tour schließen">×</button>
      </div>
    </div>
  );
}
