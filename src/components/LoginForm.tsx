import { useState, useRef, useEffect } from 'react';
import { FaSignInAlt, FaEnvelope, FaLock, FaUndo, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
// ...existing code...
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';

export default function LoginForm({ onSwitchToRegister, onSuccess }: { onSwitchToRegister?: () => void, onSuccess?: () => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const locale = useLocale();
    const t = translations[locale] || translations['de'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showReset, setShowReset] = useState(false);
    // resetSent und resetError entfernt, da nicht verwendet

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
        // resetError/resetSent entfernt
        if (!email) {
            emailRef.current?.focus();
            return;
        }
        await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        // resetError/resetSent entfernt
    };

    if (showReset) {
        return (
            <form onSubmit={handleReset} className="bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 p-7 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 max-w-sm mx-auto border border-green-600/20 mt-10 animate-fadeIn">
                <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2 justify-center"><FaUndo className="inline" />{locale === 'en' ? 'Reset password' : 'Passwort zurücksetzen'}</h2>
                <div className="flex items-center gap-2 w-full">
                    <FaEnvelope className="text-gray-400" />
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        className="input flex-1 min-h-[48px] w-full text-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-6 text-lg"
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
                <div className="flex items-center gap-2 w-full">
                    <FaEnvelope className="text-green-400 text-2xl" />
                    <label htmlFor="login-email" className="sr-only">{locale === 'en' ? 'E-mail' : 'E-Mail'}</label>
                    <input
                        id="login-email"
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        className="input flex-1 min-h-[48px] w-full text-lg"
                        required
                        autoFocus
                        disabled={loading}
                        aria-label={locale === 'en' ? 'E-mail' : 'E-Mail'}
                        aria-required="true"
                        aria-invalid={!!error}
                    />
                </div>
                <div className="flex items-center gap-2 w-full relative group">
                    <FaLock className="text-green-400 text-2xl" />
                    <label htmlFor="login-password" className="sr-only">{locale === 'en' ? 'Password' : 'Passwort'}</label>
                    <input
                        id="login-password"
                        ref={passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={locale === 'en' ? 'Password' : 'Passwort'}
                        className="input flex-1 min-h-[48px] w-full text-lg"
                        required
                        disabled={loading}
                        aria-label={locale === 'en' ? 'Password' : 'Passwort'}
                        aria-required="true"
                        aria-invalid={!!error}
                    />
                    <button
                        type="button"
                        tabIndex={0}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? (locale === 'en' ? 'Hide password' : 'Passwort verbergen') : (locale === 'en' ? 'Show password' : 'Passwort anzeigen')}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <button
                    type="submit"
                    className={`btn w-full flex items-center justify-center gap-2 text-lg ${loading ? 'animate-pulse' : ''}`}
                    disabled={loading}
                    aria-label={locale === 'en' ? 'Login' : 'Einloggen'}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                            {locale === 'en' ? 'Logging in…' : 'Einloggen…'}
                        </span>
                    ) : (
                        <>
                            <FaSignInAlt className="inline-block mr-2 -mt-1 text-xl" />
                            {t.login}
                        </>
                    )}
                </button>
                {error && <div className="text-red-400 text-sm text-center mt-2 mb-1 px-2 animate-fadeIn" role="alert" aria-live="assertive" id="login-error">{error}</div>}
                <div className="flex flex-col gap-1 mt-1 text-xs items-center">
                    <a
                        className="text-green-300 hover:text-green-100 underline cursor-pointer font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                        onClick={onSwitchToRegister}
                        tabIndex={0}
                        role="button"
                        aria-label={locale === 'en' ? 'Register' : 'Registrieren'}
                    >
                        {locale === 'en' ? 'Register' : 'Registrieren'}
                    </a>
                    <a
                        className="text-gray-400 hover:text-green-300 underline cursor-pointer font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                        onClick={() => setShowReset(true)}
                        tabIndex={0}
                        role="button"
                        aria-label={locale === 'en' ? 'Forgot password?' : 'Passwort vergessen?'}
                    >
                        {locale === 'en' ? 'Forgot password?' : 'Passwort vergessen?'}
                    </a>
                </div>
            </div>
            {success && <div className="text-green-400 text-sm text-center animate-fadeIn mt-1 animate-fadeIn" role="status" aria-live="polite">{locale === 'en' ? 'Login successful!' : 'Login erfolgreich!'}</div>}
        </form>
    );
}
