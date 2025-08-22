"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SetNewPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const accessToken = searchParams.get('access_token');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        if (!accessToken) {
            setError('Kein Zugangstoken gefunden. Bitte nutze den Link aus deiner E-Mail.');
            setLoading(false);
            return;
        }
        const { error } = await supabase.auth.updateUser({ password });
        if (error) setError(error.message);
        else {
            setSuccess(true);
            setTimeout(() => router.push('/'), 2000);
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
            <form onSubmit={handleSetPassword} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm w-full">
                <h2 className="text-xl font-bold mb-2">Neues Passwort setzen</h2>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Neues Passwort"
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    required
                    autoFocus
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? 'Setze Passwort…' : 'Passwort setzen'}
                </button>
                {error && <div className="text-red-400 text-sm">{error}</div>}
                {success && <div className="text-green-400 text-sm">Passwort erfolgreich gesetzt! Du wirst weitergeleitet…</div>}
            </form>
        </main>
    );
}
