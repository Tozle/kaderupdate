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
            <main className="max-w-2xl mx-auto p-6 text-gray-200">
                <h1 className="text-2xl font-bold mb-4">{i18n.title[locale] || i18n.title.de}</h1>
                <p>{i18n.content[locale] || i18n.content.de}</p>
                <p className="mt-6 text-xs text-gray-500">{i18n.demo[locale] || i18n.demo.de}</p>
                <LegalFooter />
            </main>
        </>
    );
}
