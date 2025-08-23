import LegalFooter from '@/components/LegalFooter';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';
import Link from 'next/link';

const i18n: {
    title: Record<string, string>;
    metaDesc: Record<string, string>;
    content: Record<string, string>;
    demo: Record<string, string>;
} = {
    title: { de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    metaDesc: {
        de: 'Datenschutzerklärung für KaderUpdate.',
        en: 'Privacy policy for KaderUpdate.'
    },
    content: {
        de: 'Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Deine Daten werden im Rahmen der gesetzlichen Vorschriften geschützt.',
        en: 'We take the protection of your personal data very seriously. Your data is protected in accordance with legal regulations.'
    },
    demo: {
        de: 'Dies ist eine Demo-Datenschutzerklärung. Bitte mit echten Inhalten ersetzen!',
        en: 'This is a demo privacy policy. Please replace with real content!'
    }
};

export default function DatenschutzPage() {
    const locale = useLocale();
    return (
        <>
            <Head>
                <title>{i18n.title[locale] || i18n.title.de} | KaderUpdate</title>
                <meta name="description" content={i18n.metaDesc[locale] || i18n.metaDesc.de} />
            </Head>
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 px-2">
                <div className="absolute left-0 top-0 mt-6 ml-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-base font-medium bg-white/80 dark:bg-gray-900/80 rounded-xl px-4 py-2 shadow border border-gray-200 dark:border-gray-800 transition-all">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                        {locale === 'en' ? 'Back' : 'Zurück'}
                    </Link>
                </div>
                <section className="bg-white/90 dark:bg-gray-950/90 rounded-3xl shadow-lg p-7 sm:p-12 max-w-xl w-full flex flex-col items-center border border-gray-200 dark:border-gray-800 mt-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-green-500 text-center tracking-tight">{i18n.title[locale] || i18n.title.de}</h1>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 text-center mb-4 sm:mb-6 leading-relaxed">{i18n.content[locale] || i18n.content.de}</p>
                    <p className="mt-4 sm:mt-8 text-xs sm:text-sm text-gray-400 text-center italic">{i18n.demo[locale] || i18n.demo.de}</p>
                </section>
                {/* Footer wird global über das Layout eingebunden */}
            </main>
        </>
    );
}
