'use client';
import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import useSearchFilter from '@/hooks/useSearchFilter';
import SearchResult from './search-result';
import { Button } from '@/components/ui/button';

const NavSearchBar = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const {
    searchData,
    isSearchFocused,
    searchQueryInput,
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
        <div className="w-full">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Products"
              className="text-xs w-full h-8 px-2 pr-10 text-gray-700 bg-white focus:outline-none"
              value={searchQueryInput}
              onChange={handleInputChange}
              onKeyDown={handleSearchInputEnter}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <Button
              type="submit"
              className="absolute -right-0 flex items-center justify-center w-10 h-10 text-white bg-[#820045] rounded-full "
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      {searchQueryInput.length > 0 && (
        <div className="absolute w-full z-[100]">
          <SearchResult
            suggestions={[]}
            isFocused={isSearchFocused}
            searchData={searchData}
            searchQueryInput={searchQueryInput}
            handleBlur={handleSearchBlur}
            handleFocus={handleSearchFocus}
            handleClick={handleSearchResultClick}
            handleInputChange={handleInputChange}
            onViewAllResult={handleViewAllSearchResultsClick}
            handleSuggestionClick={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
