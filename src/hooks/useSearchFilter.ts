'use client';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import PRODUCT_OPERATION from '@/graphql/products';
import { ProductQuery } from '@/lib/gql/graphql';
import { useRouter, usePathname } from 'next/navigation';
import useSearchSuggestions from './useSearchSuggestion';

const useSearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');
  const [searchProducts, { data: searchData, loading }] = useLazyQuery(
    PRODUCT_OPERATION.Query.products,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const { suggestions, getSuggestions, addRecentSearch } =
    useSearchSuggestions();

  // Debounced search function
  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm) {
      const searchWords = searchTerm
        .trim()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);

      if (searchWords.length > 0) {
        const wordFilters = searchWords.map((word: string) => ({
          or: [
            {
              name: { contains: word },
            },
            {
              model: { contains: word },
            },
            {
              product_type: { in: word.split(' ') },
            },
            {
              categories: {
                or: [
                  {
                    title: { contains: word },
                  },
                  {
                    slug: { contains: word },
                  },
                ],
              },
            },
            {
              brand: { name: { contains: word } },
            },
          ],
        }));

        searchProducts({
          variables: {
            filters: {
              or: wordFilters,
            },
          },
        });
      }
    }
  }, 100); // 500ms delay

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (pathname.includes('search')) {
        router.push(`/search?search=${value}`);
      }
      setSearchQueryInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch, pathname, router]
  );

  const handleSearchFocus = () => {
    setIsSearchFocused(!isSearchFocused);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSearchInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsSearchFocused(false);
      router.push(`/search?search=${searchQueryInput}`);
      addRecentSearch(searchQueryInput);
    }
  };

  const handleSearchResultClick = (product: ProductQuery['product']) => {
    setIsSearchFocused(false);
    setSearchQueryInput('');
    addRecentSearch(product?.name || '');
    router.push(`/products/${product?.name}`, { scroll: false });
  };

  const handleViewAllSearchResultsClick = () => {
    setSearchQueryInput('');
    router.push(`/search?search=${searchQueryInput}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any);
    addRecentSearch(suggestion);
  };

  // Update suggestions when input changes
  useEffect(() => {
    getSuggestions(searchQueryInput);
  }, [searchQueryInput]);

  return {
    searchQueryInput,
    isSearchFocused,
    searchData,
    loading,
    suggestions,
    handleSuggestionClick,
    handleSearchBlur,
    handleInputChange,
    handleSearchFocus,
    handleSearchResultClick,
    handleSearchInputEnter,
    handleViewAllSearchResultsClick,
  };
};

export default useSearchFilter;

