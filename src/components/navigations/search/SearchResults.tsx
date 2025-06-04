import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GetStoreProductsQuery, ProductQuery } from '@/lib/gql/graphql';

interface SearchResultsProps {
  loading: boolean;
  products?: GetStoreProductsQuery['products'];
  onResultClick: (product: ProductQuery['product']) => void;
  onViewAll: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  products,
  onResultClick,
  onViewAll,
}) => (
  <div className="w-full lg:w-2/3 flex-1 overflow-y-auto bg-white">
    {loading ? (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    ) : products && products.length > 0 ? (
      products.map((item) => (
        <div
          key={item?.documentId}
          onClick={() => onResultClick(item)}
          className="cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4 p-4 border-b">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={item?.images.at(0)?.url ?? '/no-product-image.jpg'}
                alt={item?.images.at(0)?.alternativeText ?? ''}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item?.name}
              </h4>
              <p className="text-sm text-gray-500 truncate">{item?.model}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex items-center justify-center w-full h-full text-gray-500">
        No products found
      </div>
    )}
    {products && products.length > 0 && (
      <div className="p-4 border-t mt-auto bg-white">
        <div onClick={onViewAll}>
          <Button className="w-full">View All Results</Button>
        </div>
      </div>
    )}
  </div>
);

export default SearchResults;
