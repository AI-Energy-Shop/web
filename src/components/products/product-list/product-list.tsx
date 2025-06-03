'use client';

import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import ProductListSkeleton from './product-list-skeleton';
import ProductPagination from './product-pagination';
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import { INITIAL_PAGE_SIZE } from '@/constant';
import React, { Suspense } from 'react';
import ProductCard from './product-card';
import useCartV2 from '@/hooks/useCartV2';
import { useAppSelector } from '@/store/store';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: GetStoreProductQuery['getStoreProduct'][] | null;
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
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
      <ProductPagination page={page} pageSize={pageSize} />
    </Suspense>
  );
};

export default ProductsList;
