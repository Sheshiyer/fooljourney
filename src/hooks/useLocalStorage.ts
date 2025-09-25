import { useState, useEffect } from 'react';
import type { UserState, BlogEntry } from '../types';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof globalThis === 'undefined' || !globalThis.localStorage) {
      return initialValue;
    }
    try {
      const item = globalThis.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
        globalThis.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useUserState() {
  const [userState, setUserState] = useLocalStorage<UserState>('fooljourney-user-state', {
    darkMode: true,
    activeEntry: null,
    discoveredSecrets: [],
    mousePosition: { x: 0, y: 0 },
    konamiProgress: 0,
    breathActive: false,
    timeDilationActive: false,
    portalActive: false,
    pillarNames: ['', '', '']
  });

  return [userState, setUserState] as const;
}

export function useBlogEntries() {
  const [blogEntries, setBlogEntries] = useLocalStorage<BlogEntry[]>('fooljourney-blog-entries', []);
  
  const addEntry = (entry: Omit<BlogEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    setBlogEntries((prev: BlogEntry[]) => [...prev, { 
      ...entry, 
      id: Date.now().toString(), 
      createdAt: Date.now(), 
      updatedAt: Date.now() 
    }]);
  };
  
  const updateEntry = (id: string, updates: Partial<BlogEntry>) => {
    setBlogEntries((prev: BlogEntry[]) => 
      prev.map(entry => entry.id === id ? { ...entry, ...updates, updatedAt: Date.now() } : entry)
    );
  };
  
  const deleteEntry = (id: string) => {
    setBlogEntries((prev: BlogEntry[]) => prev.filter(entry => entry.id !== id));
  };
  
  return { blogEntries, addEntry, updateEntry, deleteEntry };
}