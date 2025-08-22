import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginForm({ onSwitchToRegister }: { onSwitchToRegister?: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [resetError, setResetError] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showReset) {
            emailRef.current?.focus();
        } else {
            emailRef.current?.focus();
        }
    }, [showReset]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message === 'Invalid login credentials' ? 'E-Mail oder Passwort falsch.' : error.message);
            setSuccess(false);
            passwordRef.current?.focus();
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError(null);
        setResetSent(false);
        if (!email) {
            setResetError('Bitte gib deine E-Mail-Adresse ein.');
            emailRef.current?.focus();
            return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        if (error) setResetError(error.message);
        else setResetSent(true);
    };

    if (showReset) {
        return (
            <form onSubmit={handleReset} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm mx-auto mt-12">
                <h2 className="text-xl font-bold mb-2">Passwort zurücksetzen</h2>
                <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-Mail"
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? 'Sende Link…' : 'Passwort-Reset Link senden'}
                </button>
                {resetError && <div className="text-red-400 text-sm">{resetError}</div>}
                {resetSent && <div className="text-green-400 text-sm">E-Mail zum Zurücksetzen gesendet!</div>}
                <div className="text-sm text-gray-400 mt-2 text-center">
                    <button type="button" className="underline text-blue-400 hover:text-blue-300" onClick={() => setShowReset(false)}>
                        Zurück zum Login
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm mx-auto mt-12">
            <h2 className="text-xl font-bold mb-2">Login</h2>
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
                {loading ? 'Einloggen…' : 'Login'}
            </button>
            <button
                type="button"
                className="text-xs underline text-blue-400 hover:text-blue-300 mt-1 self-end"
                onClick={() => setShowReset(true)}
                disabled={loading}
            >
                Passwort vergessen?
            </button>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">Login erfolgreich!</div>}
            <div className="text-sm text-gray-400 mt-2 text-center">
                Noch kein Account?{' '}
                <button type="button" className="underline text-blue-400 hover:text-blue-300" onClick={onSwitchToRegister} disabled={loading}>
                    Jetzt registrieren
                </button>
            </div>
        </form>
    );
}
