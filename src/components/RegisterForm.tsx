import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin?: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (success) {
            emailRef.current?.focus();
        }
    }, [success]);

        const handleRegister = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            setSuccess(false);
            if (!email || !password) {
                setError('Bitte fülle alle Felder aus.');
                setLoading(false);
                return;
            }
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
                passwordRef.current?.focus();
            } else {
                setSuccess(true);
                setTimeout(() => {
                    if (onSwitchToLogin) onSwitchToLogin();
                }, 2000);
            }
            setLoading(false);
        };

        return (
            <form onSubmit={handleRegister} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm mx-auto mt-6">
                <h2 className="text-xl font-bold mb-2">Registrieren</h2>
                <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-Mail"
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    required
                    autoFocus
                    disabled={loading}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passwort"
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    required
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading && <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin"></span>}
                    {loading ? 'Registrieren…' : 'Registrieren'}
                </button>
                {error && <div className="text-red-400 text-sm">{error}</div>}
                {success && (
                    <div className="text-green-400 text-sm text-center">
                        Wir haben dir soeben eine E-Mail geschickt. Bitte bestätige deine Adresse und logge dich anschließend ein.<br/>
                        Du wirst gleich zum Login weitergeleitet…
                    </div>
                )}
                {!success && (
                    <div className="text-sm text-gray-400 mt-2 text-center">
                        Bereits registriert?{' '}
                        <button type="button" className="underline text-blue-400 hover:text-blue-300" onClick={onSwitchToLogin} disabled={loading}>
                            Zum Login
                        </button>
                    </div>
                )}
            </form>
        );
}
