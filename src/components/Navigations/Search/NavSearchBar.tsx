'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import useSearchFilter from '@/hooks/useSearchFilter';
import SearchResult from './SearchResult';
const NavSearchBar = () => {
  const {
    handleInputChange,
    searchQueryInput,
    searchData,
    isSearchFocused,
    handleSearchFocus,
    handleSearchBlur,
  } = useSearchFilter();

  return (
    <>
      <div className="border border-gray-300 rounded-md">
        <div className="items-center justify-center w-50 px-2 hidden lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQueryInput}
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <SearchResult
        handleFocus={handleSearchFocus}
        handleBlur={handleSearchBlur}
        isFocused={isSearchFocused}
        searchData={searchData}
        searchQueryInput={searchQueryInput}
      />
    </>
  );
};

export default NavSearchBar;
