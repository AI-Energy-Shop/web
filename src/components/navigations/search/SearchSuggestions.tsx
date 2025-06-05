import React from 'react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
}) => (
  <div className="w-full lg:w-1/3 lg:h-full overflow-y-auto border-b lg:border-b-0 lg:border-r">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className="cursor-pointer hover:bg-gray-50 transition-colors p-4"
        onClick={() => onSuggestionClick(suggestion)}
      >
        <p className="text-sm text-gray-900">{suggestion}</p>
      </div>
    ))}
  </div>
);

export default SearchSuggestions;
