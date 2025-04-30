'use client';
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import useSearchFilter from '@/hooks/useSearchFilter';
import SearchResult from './SearchResult';

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
    <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-8">
      <div className="border border-gray-300 rounded-md">
        <div className="items-center justify-center w-full px-4 py-1 hidden lg:flex">
          <Search className="h-4 w-4 text-muted-foreground mr-1" />
          <Input
            placeholder="Search"
            value={searchQueryInput}
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
            onKeyDown={handleSearchInputEnter}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      {searchData?.products && isSearchFocused && searchQueryInput && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] mt-1 z-40">
          <SearchResult
            isFocused={isSearchFocused}
            searchData={searchData}
            searchQueryInput={searchQueryInput}
            handleBlur={handleSearchBlur}
            handleFocus={handleSearchFocus}
            handleClick={handleSearchResultClick}
            handleInputChange={handleInputChange}
            onViewAllResult={handleViewAllSearchResultsClick}
          />
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
