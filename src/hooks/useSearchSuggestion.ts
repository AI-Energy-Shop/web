// src/hooks/useSearchSuggestions.ts
'use client';
import { useState, useEffect } from 'react';

// Add your popular/static suggestions here
const POPULAR_SUGGESTIONS = [
  'Solar Panel',
  'Inverter',
  'Battery',
  'Solar System',
  'Solar Inverter',
  'Battery Storage',
  'Solar Battery',
  'Power Inverter',
  'Solar Power',
  'Energy Storage',
];

const useSearchSuggestions = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setRecentSearches((prev) => {
      // Remove the search term if it already exists
      const filtered = prev.filter((term) => term !== searchTerm);
      // Add the new search term at the beginning
      const updated = [searchTerm, ...filtered];
      // Keep only the last 5 searches
      return updated.slice(0, 5);
    });
  };

  const getSuggestions = (input: string) => {
    if (!input.trim()) {
      // Show both recent and popular suggestions if input is empty
      setSuggestions([...recentSearches, ...POPULAR_SUGGESTIONS]);
      return;
    }

    const inputLower = input.toLowerCase();

    // Filter both recent and popular suggestions
    const filteredSuggestions = [
      ...recentSearches,
      ...POPULAR_SUGGESTIONS,
    ].filter((term) => term.toLowerCase().includes(inputLower));

    // Remove duplicates and limit to 10 suggestions
    const uniqueSuggestions = Array.from(new Set(filteredSuggestions)).slice(
      0,
      10
    );
    setSuggestions(uniqueSuggestions);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return {
    suggestions,
    recentSearches,
    addRecentSearch,
    getSuggestions,
    clearRecentSearches,
  };
};

export default useSearchSuggestions;
