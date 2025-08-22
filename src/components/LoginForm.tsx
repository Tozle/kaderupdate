import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSignInAlt, FaEnvelope, FaLock, FaUndo } from 'react-icons/fa';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';

export default function LoginForm({ onSwitchToRegister }: { onSwitchToRegister?: () => void }) {
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
                {resetError && <div className="text-red-400 text-base text-center">{resetError}</div>}
                {resetSent && <div className="text-green-400 text-base text-center">{locale === 'en' ? 'Password reset e-mail sent!' : 'E-Mail zum Zurücksetzen gesendet!'}</div>}
                <div className="text-sm text-gray-400 mt-2 text-center">
                    <button type="button" className="underline text-green-400 hover:text-green-200 font-bold" onClick={() => setShowReset(false)}>
                        <FaSignInAlt className="inline mr-1" />{locale === 'en' ? 'Back to login' : 'Zurück zum Login'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleLogin} className="bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 p-7 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 max-w-md w-full mx-auto border border-green-600/20 mt-10 animate-fadeIn">
            <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2 justify-center"><FaSignInAlt className="inline" />{t.login}</h2>
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
                    autoFocus
                    disabled={loading}
                />
            </div>
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 w-full">
                <FaLock className="text-gray-400" />
                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={locale === 'en' ? 'Password' : 'Passwort'}
                    className="bg-transparent border-none rounded px-2 py-2 text-gray-200 flex-1 focus:ring-2 focus:ring-green-500 transition-all min-h-[48px] w-full text-lg"
                    required
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition border border-green-700 hover:border-green-400 min-h-[48px] min-w-[48px] px-6 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 ${loading ? 'animate-pulse' : ''}`}
                disabled={loading}
            >
                {loading && <span className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>}
                <FaSignInAlt /> {loading ? (locale === 'en' ? 'Logging in…' : 'Einloggen…') : t.login}
            </button>
            <button
                type="button"
                className="text-sm underline text-green-400 hover:text-green-200 mt-1 self-end font-bold transition"
                onClick={() => setShowReset(true)}
                disabled={loading}
            >
                {locale === 'en' ? 'Forgot password?' : 'Passwort vergessen?'}
            </button>
            {error && <div className="text-red-400 text-base text-center" role="alert" aria-live="assertive">{error}</div>}
            {success && <div className="text-green-400 text-base text-center" role="status" aria-live="polite">{locale === 'en' ? 'Login successful!' : 'Login erfolgreich!'}</div>}
            <div className="text-sm text-gray-400 mt-2 text-center">
                {locale === 'en' ? "Don't have an account?" : 'Noch kein Account?'}{' '}
                <button type="button" className="underline text-green-400 hover:text-green-200 font-bold" onClick={onSwitchToRegister} disabled={loading}>
                    {locale === 'en' ? 'Register now' : 'Jetzt registrieren'}
                </button>
            </div>
        </form>
    );
}
