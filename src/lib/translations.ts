// Beispiel für Übersetzungen (de/en)
export const translations: Record<string, {
    login: string;
    register: string;
    logout: string;
    search: string;
    allClubs: string;
    newsNotFound: string;
    loading: string;
    error: string;
}> = {
    de: {
        login: 'Login',
        register: 'Registrieren',
        logout: 'Logout',
        search: 'Suche...',
        allClubs: 'Alle Vereine',
        newsNotFound: 'Keine News gefunden.',
        loading: 'News werden geladen…',
        error: 'Fehler beim Laden der News',
    },
    en: {
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        search: 'Search...',
        allClubs: 'All clubs',
        newsNotFound: 'No news found.',
        loading: 'Loading news…',
        error: 'Error loading news',
    },
};
