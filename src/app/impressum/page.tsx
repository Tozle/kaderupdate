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
    de: `Angaben gemäß § 5 TMG:<br />Max Mustermann<br />Musterstraße 1<br />12345 Musterstadt<br />E-Mail: info@kaderupdate.com`,
    en: `Information according to § 5 TMG:<br />Max Mustermann<br />Musterstraße 1<br />12345 Musterstadt<br />E-Mail: info@kaderupdate.com`
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
      <main className="max-w-2xl mx-auto p-6 text-gray-200">
        <h1 className="text-2xl font-bold mb-4">{i18n.title[locale] || i18n.title.de}</h1>
        <p dangerouslySetInnerHTML={{ __html: i18n.content[locale] || i18n.content.de }} />
        <p className="mt-6 text-xs text-gray-500">{i18n.demo[locale] || i18n.demo.de}</p>
        <LegalFooter />
      </main>
    </>
  );
}
