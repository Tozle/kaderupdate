import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ClubDetailPage({ params }: { params: { id: string } }) {
  const { data: club, error } = await supabase
    .from('clubs')
    .select('id, name, logo_url, color_primary_hex, color_secondary_hex')
    .eq('id', params.id)
    .single();

  if (error || !club) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col items-center border-4" style={{ borderColor: club.color_primary_hex || '#22c55e' }}>
        {club.logo_url && (
          <Image src={club.logo_url} alt={club.name} width={96} height={96} className="w-24 h-24 rounded-full object-contain mb-4 border-4" style={{ borderColor: club.color_secondary_hex || '#166534' }} />
        )}
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: club.color_primary_hex || '#22c55e' }}>{club.name}</h1>
        <div className="flex gap-4 mb-4">
          <span className="w-8 h-8 rounded-full" style={{ background: club.color_primary_hex || '#22c55e', display: 'inline-block' }}></span>
          <span className="w-8 h-8 rounded-full" style={{ background: club.color_secondary_hex || '#166534', display: 'inline-block' }}></span>
        </div>
        <div className="w-full text-center text-lg text-gray-300 mb-4">Kader, Statistiken und Social-Feed folgen hier!</div>
        <a href="/" className="mt-4 inline-block text-green-400 underline hover:text-green-300 transition">Zurück zur Übersicht</a>
      </div>
    </main>
  );
}
