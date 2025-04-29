'use client';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import PRODUCT_OPERATION from '@/graphql/products';
import { ProductQuery } from '@/lib/gql/graphql';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchQueryInput } from '@/store/features/products';

const useSearchFilter = () => {
  const router = useRouter();
  // const searchQueryInput = useAppSelector((state) => state.products.searchQueryInput);
  const dispatch = useAppDispatch();
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');
  const [searchProducts, { data: searchData }] = useLazyQuery(
    PRODUCT_OPERATION.Query.products
  );

  // Debounced search function
  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm) {
      searchProducts({
        variables: {
          filters: {
            or: [
              {
                name: { contains: searchTerm },
              },
              {
                model: { contains: searchTerm },
              },
              {
                categories: {
                  or: [
                    {
                      title: { contains: searchTerm },
                    },
                    {
                      slug: { contains: searchTerm },
                    },
                  ],
                },
              },
              {
                brand: { name: { in: [searchTerm] } },
              },
            ],
          },
        },
      });
    }
  }, 500); // 500ms delay

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchQueryInput(value);
      // dispatch(setSearchQueryInput(value));
      debouncedSearch(value);
    },
    [debouncedSearch]
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
    }
  };

  const handleSearchResultClick = (product: ProductQuery['product']) => {
    setIsSearchFocused(false);
    setSearchQueryInput('');
    router.push(`/products/${product?.name}`, { scroll: false });
  };

  return {
    searchQueryInput,
    isSearchFocused,
    searchData,
    handleSearchBlur,
    handleInputChange,
    handleSearchFocus,
    handleSearchResultClick,
    handleSearchInputEnter,
  };
};

export default useSearchFilter;
