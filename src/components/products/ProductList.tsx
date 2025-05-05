'use client';
import React from 'react';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import useMe from '@/hooks/useMe';
import useCart from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: ProductsQuery['products'];
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
  const { carts, warehouse, addToCart, updateCartItem } = useCart();
  const { user } = useMe();
  const { toast } = useToast();

  // const stocks =
  //   product?.inventories.find((inventory) => inventory?.name === warehouse?.address?.city)
  //     ?.quantity || 0;

  // const itemPrice = product?.price_lists?.find(
  //   (price) => price?.user_level === user?.account_detail?.level
  // );

  // const salePrice = itemPrice?.sale_price;
  // const regularPrice = itemPrice?.price;

  // // More explicit price calculation
  // const productPrice = salePrice || regularPrice || 0;

  // // More explicit price calculation
  // const productPrice = salePrice || regularPrice || 0;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.map((product) => {
          return (
            <ProductCard
              key={product?.documentId}
              product={product}
              productPrice={0}
              salePrice={0}
              regularPrice={0}
              stocks={0}
              itemPrice={0}
            />
          );
        })}
      </div>
      <ProductPagination page={page} pageSize={pageSize} />
    </>
  );
};

export default ProductsList;
