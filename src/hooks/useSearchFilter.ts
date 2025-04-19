import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import PRODUCT_OPERATION from '@/graphql/products';

const useSearchFilter = () => {
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [searchProducts, { data: searchData }] = useLazyQuery(PRODUCT_OPERATION.Query.products);

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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQueryInput(value);
    debouncedSearch(value);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(!isSearchFocused);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return {
    searchQueryInput,
    isSearchFocused,
    searchData,
    handleInputChange,
    handleSearchFocus,
    handleSearchBlur,
  };
};

export default useSearchFilter;
