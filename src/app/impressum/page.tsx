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
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-2">
                <div className="bg-gray-900/95 rounded-2xl shadow-2xl p-6 sm:p-10 max-w-lg w-full flex flex-col items-center border border-green-700">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-green-400 text-center drop-shadow-lg tracking-tight">{i18n.title[locale] || i18n.title.de}</h1>
                    <div className="text-base sm:text-lg text-gray-200 text-center mb-4 sm:mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: i18n.content[locale] || i18n.content.de }} />
                    <p className="mt-4 sm:mt-8 text-xs sm:text-sm text-gray-400 text-center italic">{i18n.demo[locale] || i18n.demo.de}</p>
                </div>
                <div className="mt-6 sm:mt-10 w-full max-w-lg">
                    <LegalFooter />
                </div>
            </main>
        </>
    );
}
