import LegalFooter from '../components/LegalFooter';
// ...existing code...
export default function DatenschutzPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Datenschutzerklärung</h1>
      <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Deine Daten werden im Rahmen der gesetzlichen Vorschriften geschützt.</p>
      <p className="mt-6 text-xs text-gray-500">Dies ist eine Demo-Datenschutzerklärung. Bitte mit echten Inhalten ersetzen!</p>
      <LegalFooter />
    </main>
  );
}
