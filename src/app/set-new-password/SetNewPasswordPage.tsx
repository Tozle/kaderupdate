"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
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
    const localeRaw = useLocale();
    const locale: 'de' | 'en' = localeRaw === 'en' ? 'en' : 'de';

    // i18n-Strings für diese Seite
    const i18n = {
        title: {
            de: 'Neues Passwort setzen',
            en: 'Set New Password',
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
            de: 'Kein Token gefunden.',
            en: 'No token found.',
        },
        errorGeneric: {
            de: 'Fehler beim Setzen des Passworts.',
            en: 'Error setting password.',
        },
        success: {
            de: 'Passwort erfolgreich gesetzt!',
            en: 'Password set successfully!',
        },
    };

    // ...restlicher Code...
    return <div>Set New Password Page</div>;
}
