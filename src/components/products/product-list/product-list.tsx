'use client';

import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import { usePathname, useSearchParams } from 'next/navigation';
import ProductListSkeleton from './product-list-skeleton';
import { GetStoreProductsQuery } from '@/lib/gql/graphql';
import ProductPagination from './product-pagination';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { useAppSelector } from '@/store/store';
import SortOption from '../options/SortOption';
import useCartV2 from '@/hooks/useCartV2';
import ProductCard from './product-card';
import React, { Suspense } from 'react';
import Link from 'next/link';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: GetStoreProductsQuery['products'];
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { carts, addToCartItem, updateCartItem } = useCartV2();
  const me = useAppSelector((state) => state.me.me);
  const warehouse = me?.account_detail?.warehouseLocation?.name;
  const userLevel = me?.account_detail?.level;
  const isLoggedIn = Boolean(me);

  const handleSubmit = (onValid: AddToCartFormData) => {
    const cartItem = carts.find(
      (cart) => cart?.product?.documentId === onValid?.id
    );
    if (cartItem) {
      updateCartItem({
        variables: {
          documentId: cartItem?.documentId || '',
          data: {
            quantity: cartItem?.quantity + onValid?.quantity,
          },
        },
      });
    } else {
      addToCartItem({
        variables: {
          data: {
            product: onValid?.id,
            quantity: onValid?.quantity,
            user: me?.id,
          },
        },
      });
    }
  };

  return (
    <Suspense fallback={<ProductListSkeleton entryCount={INITIAL_PAGE_SIZE} />}>
      <>
        <div className="hidden md:flex justify-end items-center gap-2 px-4 py-2">
          <SortOption />
          <div>({data?.length}) products</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {data
            ?.filter((product) => product?.releasedAt)
            .map((product) => {
              return (
                <ProductCard
                  product={product}
                  isLoggedIn={isLoggedIn}
                  onSubmit={handleSubmit}
                  key={product?.documentId}
                  warehouse={warehouse || ''}
                  userLevel={userLevel || ''}
                />
              );
            })}
        </div>
        {data && data?.length > 0 && (
          <ProductPagination page={page} pageSize={pageSize} />
        )}

        {pathname.startsWith('/search') && (
          <div className="flex justify-center items-center">
            <div className="p-5">
              {data?.length === 0 && (
                <>
                  <p className="text-xl font-semibold text-center text-black">
                    No Result Found for "{searchParams?.get('search')}"
                  </p>
                  <Link href="/" className="text-xs underline">
                    Browse our full range of products &rarr;{' '}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </>
    </Suspense>
  );
};

export default ProductsList;
