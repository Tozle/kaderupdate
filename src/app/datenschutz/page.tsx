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
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
                <div className="bg-gray-900/90 rounded-3xl shadow-2xl p-8 max-w-xl w-full border-4 border-green-700 flex flex-col items-center">
                    <h1 className="text-3xl font-extrabold mb-4 text-green-400 text-center drop-shadow">{i18n.title[locale] || i18n.title.de}</h1>
                    <p className="text-base text-gray-200 text-center mb-4">{i18n.content[locale] || i18n.content.de}</p>
                    <p className="mt-6 text-xs text-gray-500 text-center">{i18n.demo[locale] || i18n.demo.de}</p>
                </div>
                <LegalFooter />
            </main>
        </>
    );
}
