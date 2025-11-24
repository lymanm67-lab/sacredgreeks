import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'quick-actions-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(new Set(parsed));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      // Save to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const isFavorite = (id: string) => favorites.has(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
