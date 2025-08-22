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
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-16 px-4">
                <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center border border-gray-200">
                    <h1 className="text-4xl font-extrabold mb-6 text-green-700 text-center drop-shadow-lg tracking-tight">{i18n.title[locale] || i18n.title.de}</h1>
                    <p className="text-lg text-gray-800 text-center mb-6 leading-relaxed">{i18n.content[locale] || i18n.content.de}</p>
                    <p className="mt-8 text-sm text-gray-400 text-center italic">{i18n.demo[locale] || i18n.demo.de}</p>
                </div>
                <div className="mt-10 w-full max-w-2xl">
                  <LegalFooter />
                </div>
            </main>
        </>
    );
}
