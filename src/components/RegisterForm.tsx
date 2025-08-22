import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaUserPlus, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';

export default function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin?: () => void }) {
    const locale = useLocale();
    const t = translations[locale] || translations['de'];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            setError(locale === 'en' ? 'Please fill in all fields.' : 'Bitte fülle alle Felder aus.');
            setLoading(false);
            return;
        }
        // Einfache E-Mail-Validierung
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setError(locale === 'en' ? 'Please enter a valid email address.' : 'Bitte gib eine gültige E-Mail-Adresse ein.');
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            setError(locale === 'en' ? 'Password must be at least 8 characters.' : 'Das Passwort muss mindestens 8 Zeichen haben.');
            setLoading(false);
            return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message.includes('rate limit') ? (locale === 'en' ? 'Too many attempts. Please try again later.' : 'Zu viele Versuche. Bitte später erneut versuchen.') : error.message);
            passwordRef.current?.focus();
        } else {
            setSuccess(true);
            setTimeout(() => {
                if (onSwitchToLogin) onSwitchToLogin();
            }, 4000);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleRegister} className="bg-gradient-to-br from-gray-950/90 via-gray-900/95 to-gray-950/90 p-7 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 max-w-md w-full mx-auto border border-green-600/20 mt-10 animate-fadeIn">
            <h2 className="text-2xl font-extrabold mb-2 text-green-400 flex items-center gap-2 justify-center"><FaUserPlus className="inline" />{t.register}</h2>
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
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 relative w-full">
                <FaLock className="text-gray-400" />
                <input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={locale === 'en' ? 'Password' : 'Passwort'}
                    className="bg-transparent border-none rounded px-2 py-2 text-gray-200 flex-1 focus:ring-2 focus:ring-green-500 transition-all pr-10 min-h-[48px] w-full text-lg"
                    required
                    disabled={loading}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 focus:outline-none"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? (locale === 'en' ? 'Hide password' : 'Passwort verbergen') : (locale === 'en' ? 'Show password' : 'Passwort anzeigen')}
                >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                </button>
            </div>
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition border border-green-700 hover:border-green-400 min-h-[48px] min-w-[48px] px-6 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                disabled={loading}
            >
                {loading && <span className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>}
                <FaUserPlus /> {loading ? (locale === 'en' ? 'Registering…' : 'Registrieren…') : t.register}
            </button>
            {error && <div className="text-red-400 text-base text-center" role="alert" aria-live="assertive">{error}</div>}
            {success && (
                <div className="text-green-400 text-base text-center font-semibold p-4 bg-green-900/30 rounded-xl border border-green-700 mt-2 animate-pulse" role="status" aria-live="polite">
                    <FaEnvelope className="inline mr-1" />
                    {locale === 'en'
                        ? 'We just sent you an e-mail. Please confirm your address and then log in.'
                        : 'Wir haben dir soeben eine E-Mail geschickt. Bitte bestätige deine Adresse und logge dich anschließend ein.'}
                    <br />
                    <span className="text-green-300 block mt-1">{locale === 'en' ? 'Check your spam folder if you do not see the mail.' : 'Schau auch im Spam-Ordner nach, falls du keine Mail findest.'}</span>
                    <span className="text-green-200 block mt-1">{locale === 'en' ? 'You will be redirected to login…' : 'Du wirst gleich zum Login weitergeleitet…'}</span>
                </div>
            )}
            {!success && (
                <div className="text-sm text-gray-400 mt-2 text-center">
                    {locale === 'en' ? 'Already registered?' : 'Bereits registriert?'}{' '}
                    <button type="button" className="underline text-green-400 hover:text-green-200 font-bold" onClick={onSwitchToLogin} disabled={loading}>
                        <FaSignInAlt className="inline mr-1" />{locale === 'en' ? 'To login' : 'Zum Login'}
                    </button>
                </div>
            )}
        </form>
    );
}
