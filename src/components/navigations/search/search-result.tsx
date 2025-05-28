'use client';
import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductsQuery, ProductQuery } from '@/lib/gql/graphql';

interface SearchResultProps {
  isFocused: boolean;
  searchQueryInput: string;
  searchData?: ProductsQuery;
  handleFocus: () => void;
  handleBlur: () => void;
  onViewAllResult: () => void;
  handleClick: (product: ProductQuery['product']) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;
  suggestions: string[];
}

const SearchResult = ({
  searchQueryInput,
  searchData,
  isFocused,
  handleBlur,
  handleClick,
  handleInputChange,
  handleSuggestionClick,
  onViewAllResult,
  suggestions,
}: SearchResultProps) => {
  const pathname = usePathname();

  return (
    <div
      className="bg-white shadow-lg border border-gray-200"
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

        <div className="bg-white h-full w-full flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
          {/* Suggestions Column */}
          <div className="w-full lg:w-1/3 lg:h-full  overflow-y-auto border-b lg:border-b-0 lg:border-r">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-50 transition-colors p-4"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <p className="text-sm text-gray-900">{suggestion}</p>
              </div>
            ))}
          </div>

          {/* Divider for mobile */}
          <div className="block lg:hidden border-b" />

          {/* Products Column */}
          <div className="w-full lg:w-2/3 flex-1 overflow-y-auto bg-white">
            {searchData && searchData?.products?.length > 0 ? (
              searchData?.products?.map?.((item) => (
                <div
                  key={item?.documentId}
                  onClick={() => handleClick(item)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
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
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {searchData && searchData?.products?.length > 0 && (
          <div className="p-4 border-t mt-auto bg-white">
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
