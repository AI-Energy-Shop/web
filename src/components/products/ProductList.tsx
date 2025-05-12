'use client';
import ProductListSkeleton from './ProductListSkeleton';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import React, { useEffect, useState } from 'react';
import { INITIAL_PAGE_SIZE } from '@/constant';
import { useToast } from '@/hooks/useToast';
import ProductCard from './ProductCard';
import useMe from '@/hooks/useMe';
import useCart from '@/hooks/useCart';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: ProductsQuery['products'];
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
  const { warehouse, addToCart, carts, updateCartItem } = useCart();
  const { user } = useMe();
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: { id: string; quantity: number }) => {
    if (data.quantity === 0 || data.quantity === null) {
      toast({
        title: 'Quantity cannot be 0',
        variant: 'destructive',
      });
      return;
    }
    const cartItem = carts.find(
      (cart) => cart?.product?.documentId === data.id
    );

    if (cartItem && cartItem?.product) {
      updateCartItem({
        cartId: cartItem.documentId,
        product: cartItem.product.documentId,
        quantity: cartItem.quantity + data.quantity,
      });
      return;
    }
    await addToCart({
      product: data.id,
      quantity: data.quantity,
      user: user?.id || '',
    });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <ProductListSkeleton entryCount={INITIAL_PAGE_SIZE} />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.map((product) => {
          const stocks = product?.inventories.find(
            (inventory) => inventory?.name === warehouse?.address?.city
          );

          const itemPrice = product?.price_lists?.find(
            (price) => price?.user_level === user?.account_detail?.level
          );
          const salePrice = itemPrice?.sale_price || 0;
          const regularPrice = itemPrice?.price || 0;
          const productPrice = salePrice || regularPrice || 0;

          return (
            <ProductCard
              key={product?.documentId}
              product={product}
              itemPrice={itemPrice}
              productPrice={productPrice}
              stocks={stocks?.quantity || 0}
              userID={user?.id || ''}
              onSubmit={onSubmit}
            />
          );
        })}
      </div>
      <ProductPagination page={page} pageSize={pageSize} />
    </>
  );
};

export default ProductsList;
