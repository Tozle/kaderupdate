
"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { translations } from '@/lib/translations';
import { useLocale } from '@/lib/useLocale';
import Head from 'next/head';

export default function SetNewPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams() ?? new URLSearchParams();
    const accessToken = searchParams.get('access_token');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const locale = useLocale();
    const t = translations[locale] || translations['de'];

    // i18n-Strings für diese Seite
    const i18n: {
        title: Record<string, string>;
        placeholder: Record<string, string>;
        submit: Record<string, string>;
        loading: Record<string, string>;
        errorNoToken: Record<string, string>;
        success: Record<string, string>;
        metaDesc: Record<string, string>;
    } = {
        title: {
            de: 'Neues Passwort setzen',
            en: 'Set new password',
        },
        placeholder: {
            de: 'Neues Passwort',
            en: 'New password',
        },
        submit: {
            de: 'Passwort setzen',
            en: 'Set password',
        },
        loading: {
            de: 'Setze Passwort…',
            en: 'Setting password…',
        },
        errorNoToken: {
            de: 'Kein Zugangstoken gefunden. Bitte nutze den Link aus deiner E-Mail.',
            en: 'No access token found. Please use the link from your email.',
        },
        success: {
            de: 'Passwort erfolgreich gesetzt! Du wirst weitergeleitet…',
            en: 'Password set successfully! Redirecting…',
        },
        metaDesc: {
            de: 'Setze ein neues Passwort für deinen KaderUpdate-Account.',
            en: 'Set a new password for your KaderUpdate account.',
        },
    };

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        if (!accessToken) {
            setError(i18n.errorNoToken[locale] || i18n.errorNoToken['de']);
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
        <>
            <Head>
                <title>{i18n.title[locale] || i18n.title['de']} | KaderUpdate</title>
                <meta name="description" content={i18n.metaDesc[locale] || i18n.metaDesc['de']} />
            </Head>
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
                <form onSubmit={handleSetPassword} className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 max-w-sm w-full">
                    <h2 className="text-xl font-bold mb-2">{i18n.title[locale] || i18n.title['de']}</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={i18n.placeholder[locale] || i18n.placeholder['de']}
                        className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? i18n.loading[locale] || i18n.loading['de'] : i18n.submit[locale] || i18n.submit['de']}
                    </button>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    {success && <div className="text-green-400 text-sm">{i18n.success[locale] || i18n.success['de']}</div>}
                </form>
            </main>
        </>
    );
}
