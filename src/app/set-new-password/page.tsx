
import { Suspense } from "react";
import SetNewPasswordPage from "./SetNewPasswordPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Lädt...</div>}>
            <SetNewPasswordPage />
        </Suspense>
    );
}
            de: 'Kein Token gefunden. Bitte Link aus E-Mail nutzen.',
            en: 'No token found. Please use the link from your email.',
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
                <form onSubmit={handleSetPassword} className="bg-gray-950 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 max-w-sm mx-auto border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">{i18n.title[locale] || i18n.title['de']}</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={i18n.placeholder[locale] || i18n.placeholder['de']}
                        className="bg-gray-800 border border-green-600 rounded-lg px-4 py-2 text-white flex-1 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all shadow"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg mt-2 disabled:opacity-60 flex items-center justify-center gap-2 text-lg shadow transition-all focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[44px] min-w-[44px] px-5"
                        disabled={loading}
                    >
                        {loading ? i18n.loading[locale] || i18n.loading['de'] : i18n.submit[locale] || i18n.submit['de']}
                    </button>
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-center text-sm">{i18n.success[locale] || i18n.success['de']}</div>}
                </form>
            </main>
        </>
    );
}
