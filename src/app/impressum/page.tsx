import LegalFooter from '@/components/LegalFooter';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';

const i18n: {
    title: Record<string, string>;
    metaDesc: Record<string, string>;
    content: Record<string, string>;
    demo: Record<string, string>;
} = {
    title: { de: 'Impressum', en: 'Imprint' },
    metaDesc: {
        de: 'Impressum und rechtliche Angaben für KaderUpdate.',
        en: 'Imprint and legal information for KaderUpdate.'
    },
    content: {
    de: `Angaben gemäß § 5 TMG:<br />Max Mustermann<br />Musterstraße 1<br />12345 Musterstadt<br />E-Mail: info@kaderupdate`,
    en: `Information according to § 5 TMG:<br />Max Mustermann<br />Musterstraße 1<br />12345 Musterstadt<br />E-Mail: info@kaderupdate`
    },
    demo: {
        de: 'Dies ist ein Demo-Impressum. Bitte mit echten Daten ersetzen!',
        en: 'This is a demo imprint. Please replace with real data!'
    }
};

export default function ImpressumPage() {
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
                    <div className="text-base text-gray-200 text-center mb-4" dangerouslySetInnerHTML={{ __html: i18n.content[locale] || i18n.content.de }} />
                    <p className="mt-6 text-xs text-gray-500 text-center">{i18n.demo[locale] || i18n.demo.de}</p>
                </div>
                <LegalFooter />
            </main>
        </>
    );
}
