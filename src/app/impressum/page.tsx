import LegalFooter from '../components/LegalFooter';
// ...existing code...
export default function ImpressumPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>
      <p>Angaben gemäß § 5 TMG:<br />
      Max Mustermann<br />
      Musterstraße 1<br />
      12345 Musterstadt<br />
      E-Mail: info@kaderupdate.com</p>
      <p className="mt-6 text-xs text-gray-500">Dies ist ein Demo-Impressum. Bitte mit echten Daten ersetzen!</p>
      <LegalFooter />
    </main>
  );
}
