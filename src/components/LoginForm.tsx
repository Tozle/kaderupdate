import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSignInAlt, FaEnvelope, FaLock, FaUndo } from 'react-icons/fa';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';

export default function LoginForm({ onSwitchToRegister, onSuccess }: { onSwitchToRegister?: () => void, onSuccess?: () => void }) {
    const locale = useLocale();
    const t = translations[locale] || translations['de'];
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
        emailRef.current?.focus();
    }, [showReset]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message === 'Invalid login credentials'
                ? (locale === 'en' ? 'E-mail or password incorrect.' : 'E-Mail oder Passwort falsch.')
                : error.message);
            setSuccess(false);
            passwordRef.current?.focus();
        } else {
            setSuccess(true);
            if (onSuccess) setTimeout(onSuccess, 600); // nach kurzem Feedback Modal schließen
        }
        setLoading(false);
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError(null);
        setResetSent(false);
        if (!email) {
            setResetError(locale === 'en' ? 'Please enter your e-mail address.' : 'Bitte gib deine E-Mail-Adresse ein.');
            emailRef.current?.focus();
            return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        if (error) setResetError(error.message);
        else setResetSent(true);
    };

    if (showReset) {
        return (
            <form onSubmit={handleReset} className="bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 p-7 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 max-w-sm mx-auto border border-green-600/20 mt-10 animate-fadeIn">
                <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2 justify-center"><FaUndo className="inline" />{locale === 'en' ? 'Reset password' : 'Passwort zurücksetzen'}</h2>
                <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 w-full">
                    <FaEnvelope className="text-gray-400" />
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        className="bg-transparent border-none rounded px-2 py-2 text-gray-200 flex-1 focus:ring-2 focus:ring-green-500 transition-all min-h-[48px] w-full text-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition border border-green-700 hover:border-green-400 min-h-[48px] min-w-[48px] px-6 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? (locale === 'en' ? 'Sending link…' : 'Sende Link…') : <><FaEnvelope />{locale === 'en' ? 'Send password reset link' : 'Passwort-Reset Link senden'}</>}
                </button>
            </form>
        );
    }

    return (
    <form onSubmit={handleLogin} className="bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col gap-5 max-w-lg w-full mx-auto border border-green-400/20 mt-10 animate-fadeIn backdrop-blur-2xl">
            <h2 className="text-2xl font-extrabold mb-4 text-green-400 flex items-center gap-2 justify-center drop-shadow-lg tracking-tight"><FaSignInAlt className="inline" />{t.login}</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 bg-gray-900/80 rounded-xl px-4 py-2 border border-gray-800 w-full">
                    <FaEnvelope className="text-green-400 text-xl" />
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        className="bg-transparent border-none rounded px-2 py-2 text-gray-200 flex-1 focus:ring-2 focus:ring-green-500 transition-all min-h-[48px] w-full text-lg placeholder-gray-400"
                        required
                        autoFocus
                        disabled={loading}
                    />
                </div>
                <div className="flex items-center gap-2 bg-gray-900/80 rounded-xl px-4 py-2 border border-gray-800 w-full">
                    <FaLock className="text-green-400 text-xl" />
                    <input
                        ref={passwordRef}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={locale === 'en' ? 'Password' : 'Passwort'}
                        className="bg-transparent border-none rounded px-2 py-2 text-gray-200 flex-1 focus:ring-2 focus:ring-green-500 transition-all min-h-[48px] w-full text-lg placeholder-gray-400"
                        required
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
                <button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 py-1.5 px-2 rounded-md border-2 border-green-400 bg-transparent text-green-500 dark:text-green-300 font-semibold text-sm hover:bg-green-50 dark:hover:bg-green-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60 ${loading ? 'animate-pulse' : ''}`}
                    disabled={loading}
                >
                    <FaSignInAlt className="text-base" /> {loading ? (locale === 'en' ? 'Logging in…' : 'Einloggen…') : t.login}
                </button>
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-1.5 px-2 rounded-md border-2 border-gray-400 dark:border-gray-600 bg-transparent text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-all focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60"
                    onClick={onSwitchToRegister}
                    disabled={loading}
                >
                    <FaSignInAlt className="text-base" /> {locale === 'en' ? 'Register' : 'Registrieren'}
                </button>
                <button
                    type="button"
                    className="w-full py-1 px-2 rounded-md bg-transparent text-green-400 hover:text-green-600 text-xs font-semibold mt-1 focus:outline-none"
                    onClick={() => setShowReset(true)}
                    disabled={loading}
                >
                    {locale === 'en' ? 'Forgot password?' : 'Passwort vergessen?'}
                </button>
            </div>
            {error && <div className="text-red-400 text-sm text-center mt-1" role="alert" aria-live="assertive">{error}</div>}
            {success && <div className="text-green-400 text-sm text-center animate-fadeIn mt-1" role="status" aria-live="polite">{locale === 'en' ? 'Login successful!' : 'Login erfolgreich!'}</div>}
            <div className="text-xs text-gray-400 mt-3 text-center border-t border-gray-800 pt-3">
                {locale === 'en' ? "Don't have an account?" : 'Noch kein Account?'}{' '}
                <button type="button" className="underline text-green-400 hover:text-green-200 font-bold" onClick={onSwitchToRegister} disabled={loading}>
                    {locale === 'en' ? 'Register now' : 'Jetzt registrieren'}
                </button>
            </div>
        </form>
    );
}
