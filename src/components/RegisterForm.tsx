import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaUserPlus, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

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
                <form onSubmit={handleRegister} className="bg-gray-950 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 max-w-sm mx-auto mt-16 border border-gray-800">
                    <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2"><FaUserPlus className="inline" /> Registrieren</h2>
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
                        <FaUserPlus /> {loading ? 'Registrieren…' : 'Registrieren'}
                    </button>
                    {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                    {success && (
                        <div className="text-green-400 text-sm text-center">
                            <FaEnvelope className="inline mr-1" /> Wir haben dir soeben eine E-Mail geschickt.<br/>
                            Bitte bestätige deine Adresse und logge dich anschließend ein.<br/>
                            <span className="text-green-300">Du wirst gleich zum Login weitergeleitet…</span>
                        </div>
                    )}
                    {!success && (
                        <div className="text-sm text-gray-400 mt-2 text-center">
                            Bereits registriert?{' '}
                            <button type="button" className="underline text-green-400 hover:text-green-300 font-semibold" onClick={onSwitchToLogin} disabled={loading}>
                                <FaSignInAlt className="inline mr-1" /> Zum Login
                            </button>
                        </div>
                    )}
                </form>
            );
}
