'use client';
import { Input } from '@/components/ui/input';
import useSearchFilter from '@/hooks/useSearchFilter';
import React from 'react';

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const {
    searchQueryInput,
    handleInputChange,
    handleSearchFocus,
    handleSearchInputEnter,
  } = useSearchFilter();

  return (
    <Input
      placeholder={placeholder}
      value={searchQueryInput}
      onChange={handleInputChange}
      onFocus={handleSearchFocus}
      onKeyDown={handleSearchInputEnter}
      className="border focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-5"
    />
  );
};

export default SearchInput;
