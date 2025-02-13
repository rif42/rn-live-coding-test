import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@aqar_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
            if (storedFavorites) {
                const favoritesArray = JSON.parse(storedFavorites);
                setFavorites(new Set(favoritesArray));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFavorite = useCallback(async (id: number) => {
        try {
            const newFavorites = new Set(favorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            setFavorites(newFavorites);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    }, [favorites]);

    const isFavorite = useCallback((id: number) => favorites.has(id), [favorites]);

    return {
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite,
    };
};
