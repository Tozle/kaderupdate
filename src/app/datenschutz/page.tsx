import LegalFooter from '@/components/LegalFooter';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';

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
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-2">
                <div className="bg-gray-900/95 rounded-2xl shadow-2xl p-6 sm:p-10 max-w-lg w-full flex flex-col items-center border border-green-700">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-green-400 text-center drop-shadow-lg tracking-tight">{i18n.title[locale] || i18n.title.de}</h1>
                    <p className="text-base sm:text-lg text-gray-200 text-center mb-4 sm:mb-6 leading-relaxed">{i18n.content[locale] || i18n.content.de}</p>
                    <p className="mt-4 sm:mt-8 text-xs sm:text-sm text-gray-400 text-center italic">{i18n.demo[locale] || i18n.demo.de}</p>
                </div>
                <div className="mt-6 sm:mt-10 w-full max-w-lg">
                    <LegalFooter />
                </div>
            </main>
        </>
    );
}
