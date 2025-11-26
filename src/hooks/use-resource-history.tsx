import { useState, useEffect } from 'react';

interface ViewedResource {
  title: string;
  url: string;
  category: string;
  viewedAt: string;
}

const STORAGE_KEY = 'resource-viewing-history';
const MAX_HISTORY_ITEMS = 10;

export const useResourceHistory = () => {
  const [history, setHistory] = useState<ViewedResource[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse resource history:', e);
      }
    }
  }, []);

  const addToHistory = (resource: Omit<ViewedResource, 'viewedAt'>) => {
    const newHistory = [
      { ...resource, viewedAt: new Date().toISOString() },
      ...history.filter(item => item.url !== resource.url)
    ].slice(0, MAX_HISTORY_ITEMS);
    
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    clearHistory,
  };
};
