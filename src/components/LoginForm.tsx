import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSignInAlt, FaEnvelope, FaLock, FaUndo } from 'react-icons/fa';

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
            <form onSubmit={handleReset} className="bg-gray-950 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 max-w-sm mx-auto mt-16 border border-gray-800">
                <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2"><FaUndo className="inline" /> Passwort zurücksetzen</h2>
                <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 border border-gray-700">
                    <FaEnvelope className="text-green-500" />
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-Mail"
                        className="bg-transparent border-none outline-none text-white flex-1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg mt-2 disabled:opacity-60 flex items-center justify-center gap-2 text-lg shadow"
                    disabled={loading}
                >
                    {loading ? 'Sende Link…' : <><FaEnvelope /> Passwort-Reset Link senden</>}
                </button>
                {resetError && <div className="text-red-400 text-sm text-center">{resetError}</div>}
                {resetSent && <div className="text-green-400 text-sm text-center">E-Mail zum Zurücksetzen gesendet!</div>}
                <div className="text-sm text-gray-400 mt-2 text-center">
                    <button type="button" className="underline text-green-400 hover:text-green-300 font-semibold" onClick={() => setShowReset(false)}>
                        <FaSignInAlt className="inline mr-1" /> Zurück zum Login
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleLogin} className="bg-gray-950 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 max-w-sm mx-auto mt-16 border border-gray-800">
            <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2"><FaSignInAlt className="inline" /> Login</h2>
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 border border-gray-700">
                <FaEnvelope className="text-green-500" />
                <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="E-Mail"
                    className="bg-transparent border-none outline-none text-white flex-1"
                    required
                    autoFocus
                    disabled={loading}
                />
            </div>
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 border border-gray-700">
                <FaLock className="text-green-500" />
                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passwort"
                    className="bg-transparent border-none outline-none text-white flex-1"
                    required
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg mt-2 disabled:opacity-60 flex items-center justify-center gap-2 text-lg shadow"
                disabled={loading}
            >
                {loading && <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin"></span>}
                <FaSignInAlt /> {loading ? 'Einloggen…' : 'Login'}
            </button>
            <button
                type="button"
                className="text-xs underline text-green-400 hover:text-green-300 mt-1 self-end font-semibold"
                onClick={() => setShowReset(true)}
                disabled={loading}
            >
                Passwort vergessen?
            </button>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            {success && <div className="text-green-400 text-sm text-center">Login erfolgreich!</div>}
            <div className="text-sm text-gray-400 mt-2 text-center">
                Noch kein Account?{' '}
                <button type="button" className="underline text-green-400 hover:text-green-300 font-semibold" onClick={onSwitchToRegister} disabled={loading}>
                    Jetzt registrieren
                </button>
            </div>
        </form>
    );
}
