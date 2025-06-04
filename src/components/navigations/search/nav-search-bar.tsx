import React, { useRef, useEffect } from 'react';
import useSearchFilter from '@/hooks/useSearchFilter';
import SearchInput from './SearchInput';
import SearchSuggestions from './SearchSuggestions';
import SearchResults from './SearchResults';

const NavSearchBar = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const {
    loading,
    searchData,
    isSearchFocused,
    searchQueryInput,
    suggestions,
    handleSuggestionClick,
    handleSearchBlur,
    handleInputChange,
    handleSearchFocus,
    handleSearchResultClick,
    handleSearchInputEnter,
    handleViewAllSearchResultsClick,
  } = useSearchFilter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        handleSearchBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleSearchBlur]);

  return (
    <div className="relative w-full">
      <div
        ref={searchContainerRef}
        className="relative flex-1 border focus:outline-none overflow-hidden rounded-full z-100"
      >
        <SearchInput
          value={searchQueryInput}
          placeholder="Search Products"
          onChange={handleInputChange}
          onFocus={handleSearchFocus}
          onKeyDown={handleSearchInputEnter}
        />
      </div>
      {isSearchFocused && searchQueryInput.length > 0 && (
        <div className="absolute w-full z-[100] bg-white shadow-lg border border-gray-200">
          <div className="flex flex-col h-[500px]">
            <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
              <SearchSuggestions
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
              <SearchResults
                loading={loading}
                products={searchData?.products}
                onResultClick={handleSearchResultClick}
                onViewAll={handleViewAllSearchResultsClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
