import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Registrieren</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-Mail"
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
        required
        autoFocus
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Passwort"
        className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Registrieren…' : 'Registrieren'}
      </button>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      {success && <div className="text-green-400 text-sm">Bitte bestätige deine E-Mail-Adresse!</div>}
      <div className="text-sm text-gray-400 mt-2 text-center">
        Bereits registriert?{' '}
        <button type="button" className="underline text-blue-400 hover:text-blue-300" onClick={onSwitchToLogin}>
          Zum Login
        </button>
      </div>
    </form>
  );
}
