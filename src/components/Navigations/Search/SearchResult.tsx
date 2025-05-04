import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { ProductsQuery, ProductQuery } from '@/lib/gql/graphql';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SearchResultProps {
  searchQueryInput: string;
  searchData?: ProductsQuery;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleClick: (product: ProductQuery['product']) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewAllResult: () => void;
}

const SearchResult = ({
  searchQueryInput,
  searchData,
  isFocused,
  handleBlur,
  handleClick,
  handleInputChange,
  onViewAllResult,
}: SearchResultProps) => {
  const pathname = usePathname();
  const isSearchPage = pathname === '/search';

  // Create suggestions based on the search query
  const suggestions = [
    `${searchQueryInput} single`,
    `${searchQueryInput} three`,
    `${searchQueryInput}`,
    `${searchQueryInput} hv`,
    `${searchQueryInput.charAt(0).toUpperCase() + searchQueryInput.slice(1)}`,
  ].filter((suggestion) => suggestion.trim() !== '');

  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic event to match the handleInputChange signature
    const syntheticEvent = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(syntheticEvent);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col h-[500px]">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">SUGGESTIONS</h3>
            <span className="text-xs text-gray-500">
              ({suggestions.length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">PRODUCTS</h3>
            <span className="text-xs text-gray-500">
              ({searchData?.products?.length || 0})
            </span>
          </div>
        </div>

        {!searchData && (
          <div className="flex items-center justify-center h-full p-8">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}

        <div className="flex flex-1 min-h-0">
          {/* Suggestions Column */}
          <div className="w-1/3 border-r overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-50 transition-colors p-4 border-b"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="text-sm text-gray-900">{suggestion}</p>
              </div>
            ))}
          </div>

          {/* Products Column */}
          <div className="w-2/3 overflow-y-auto">
            {searchData?.products?.map?.((item) => (
              <div
                key={item?.documentId}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleClick(item)}
              >
                <div className="flex items-center gap-4 p-4 border-b">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item?.images.at(0)?.url ?? ''}
                      alt={item?.images.at(0)?.alternativeText ?? ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item?.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {item?.model}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isSearchPage &&
          searchData?.products?.length &&
          searchData?.products?.length > 6 && (
            <div className="p-4 border-t mt-auto">
              <div onClick={onViewAllResult}>
                <Button className="w-full">View All Results</Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchResult;
