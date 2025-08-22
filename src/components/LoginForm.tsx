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
            <form onSubmit={handleReset} className="bg-white/95 p-6 rounded-xl shadow flex flex-col gap-4 max-w-sm mx-auto mt-16 border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2"><FaUndo className="inline" />{locale === 'en' ? 'Reset password' : 'Passwort zurücksetzen'}</h2>
                <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 border border-gray-200">
                    <FaEnvelope className="text-gray-400" />
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        className="bg-transparent border-none rounded px-2 py-1 text-gray-800 flex-1 focus:ring-2 focus:ring-gray-400 transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded mt-2 disabled:opacity-60 flex items-center justify-center gap-2 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[40px] min-w-[40px] px-4"
                    disabled={loading}
                >
                    {loading ? (locale === 'en' ? 'Sending link…' : 'Sende Link…') : <><FaEnvelope />{locale === 'en' ? 'Send password reset link' : 'Passwort-Reset Link senden'}</>}
                </button>
                {resetError && <div className="text-red-500 text-xs text-center">{resetError}</div>}
                {resetSent && <div className="text-green-600 text-xs text-center">{locale === 'en' ? 'Password reset e-mail sent!' : 'E-Mail zum Zurücksetzen gesendet!'}</div>}
                <div className="text-xs text-gray-400 mt-2 text-center">
                    <button type="button" className="underline text-gray-700 hover:text-black font-medium" onClick={() => setShowReset(false)}>
                        <FaSignInAlt className="inline mr-1" />{locale === 'en' ? 'Back to login' : 'Zurück zum Login'}
                    </button>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleLogin} className="bg-white/95 p-5 sm:p-6 rounded-xl shadow flex flex-col gap-4 max-w-md w-full mx-auto mt-16 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2"><FaSignInAlt className="inline" />{t.login}</h2>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 border border-gray-200 w-full">
                <FaEnvelope className="text-gray-400" />
                <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                    className="bg-transparent border-none rounded px-2 py-2 text-gray-800 flex-1 focus:ring-2 focus:ring-gray-400 transition-all min-h-[40px] w-full"
                    required
                    autoFocus
                    disabled={loading}
                />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 border border-gray-200 w-full">
                <FaLock className="text-gray-400" />
                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={locale === 'en' ? 'Password' : 'Passwort'}
                    className="bg-transparent border-none rounded px-2 py-2 text-gray-800 flex-1 focus:ring-2 focus:ring-gray-400 transition-all min-h-[40px] w-full"
                    required
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className={`bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded mt-2 disabled:opacity-60 flex items-center justify-center gap-2 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[40px] min-w-[40px] px-4 ${loading ? 'animate-pulse' : ''}`}
                disabled={loading}
            >
                {loading && <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin"></span>}
                <FaSignInAlt /> {loading ? (locale === 'en' ? 'Logging in…' : 'Einloggen…') : t.login}
            </button>
            <button
                type="button"
                className="text-xs underline text-gray-700 hover:text-black mt-1 self-end font-medium"
                onClick={() => setShowReset(true)}
                disabled={loading}
            >
                {locale === 'en' ? 'Forgot password?' : 'Passwort vergessen?'}
            </button>
            {error && <div className="text-red-500 text-xs text-center" role="alert" aria-live="assertive">{error}</div>}
            {success && <div className="text-green-600 text-xs text-center" role="status" aria-live="polite">{locale === 'en' ? 'Login successful!' : 'Login erfolgreich!'}</div>}
            <div className="text-xs text-gray-400 mt-2 text-center">
                {locale === 'en' ? "Don't have an account?" : 'Noch kein Account?'}{' '}
                <button type="button" className="underline text-gray-700 hover:text-black font-medium" onClick={onSwitchToRegister} disabled={loading}>
                    {locale === 'en' ? 'Register now' : 'Jetzt registrieren'}
                </button>
            </div>
        </form>
    );
}
