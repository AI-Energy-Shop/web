import React from 'react';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
  onFocus,
  onKeyDown,
}) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    className="border focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-5"
  />
);

export default SearchInput;
