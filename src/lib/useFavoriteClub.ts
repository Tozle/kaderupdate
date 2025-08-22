// Favoriten-Feature: User kann Lieblingsverein speichern (Client-Only Demo)
import { useState, useEffect } from 'react';

export function useFavoriteClub() {
    const [favorite, setFavorite] = useState<string | null>(null);
    useEffect(() => {
        setFavorite(localStorage.getItem('favoriteClub'));
    }, []);
    const saveFavorite = (clubId: string) => {
        setFavorite(clubId);
        localStorage.setItem('favoriteClub', clubId);
    };
    return { favorite, saveFavorite };
}
