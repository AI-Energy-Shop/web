import React from 'react';
import Image from 'next/image';
import { ProductsQuery } from '@/lib/gql/graphql';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
interface SearchResultProps {
  searchQueryInput: string;
  searchData?: ProductsQuery;
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}
const SearchResult = ({ searchQueryInput, searchData, isFocused, handleBlur }: SearchResultProps) => {
  return (
    <div
      onBlur={handleBlur}
      className={`search-result ${isFocused && searchQueryInput ? 'translate-y-[calc(100%)]' : 'translate-y-[-100%]'} z-40 absolute h-[550px] w-full left-0 bg-white shadow-md border`}
    >
      <div className="max-w-[1200px] mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between my-2 p-2">
          <div className="text-sm font-bold">Search Results: {searchData?.products?.length} results found</div>
          <div className="text-sm text-gray-500"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 gap-2">
          {!searchData && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}
          {searchData?.products?.map?.((item) => {
            const category = item?.categories.at(0);
            const brand = item?.brand;

            return (
              <Link href={`/products/${category?.slug}/${brand?.url}/${item?.documentId}`} key={item?.documentId}>
                <div key={item?.documentId} className="flex items-center gap-2 p-2 border-b">
                  <Image
                    src={item?.images.at(0)?.url ?? ''}
                    alt={item?.images.at(0)?.alternativeText ?? ''}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] object-contain"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-bold">{item?.name}</div>
                    <div className="text-sm text-gray-500">{item?.model}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
