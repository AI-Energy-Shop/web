'use client';
import React from 'react';
import BulkPrices from './bulk-prices';
import ProductPrice from './product-price';
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import ProductAddToCartButton from './product-add-to-cart-button';
import ShopProductStockQuantities from './shop-product-stock-quantities';
import { useAppSelector } from '@/store/store';
import { useForm } from 'react-hook-form';
import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import useCartV2 from '@/hooks/useCartV2';

interface SingleProductDetailsProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const SingleProductDetails: React.FC<SingleProductDetailsProps> = ({
  product,
}) => {
  const me = useAppSelector((state) => state.me.me);
  const userLevel = me?.account_detail?.level;
  const warehouse = me?.account_detail?.warehouseLocation?.name;
  const { carts, addToCartItem, updateCartItem } = useCartV2();

  const form = useForm<AddToCartFormData>({
    defaultValues: {
      id: product?.documentId,
      quantity: 0,
    },
  });

  const priceList =
    product?.price_lists
      ?.map((price) => ({
        documentId: price?.documentId,
        price: price?.price ?? 0,
        comparePrice: price?.comparePrice ?? 0,
        min_quantity: price?.min_quantity ?? 0,
        max_quantity: price?.max_quantity ?? 0,
        user_level: price?.user_level ?? '',
      }))
      .sort((a, b) => a.min_quantity - b.min_quantity) || [];

  const currentInputQuantity = form.watch('quantity') || 0;
  const stocks =
    Number(product?.inventory?.[warehouse as keyof typeof product.inventory]) ||
    0;

  const isDecrementDisabled = currentInputQuantity === 0;
  const isIncrementDisabled = stocks <= currentInputQuantity;

  // Helper function to find user-specific pricing based on quantity and user level
  const findUserPricing = () => {
    return priceList?.find((priceItem) => {
      const { min_quantity = 0, max_quantity = 0, user_level } = priceItem;

      return (
        user_level === userLevel &&
        currentInputQuantity >= min_quantity &&
        (max_quantity === 0 || currentInputQuantity <= max_quantity)
      );
    });
  };

  // Helper function to find default pricing
  const findDefaultPricing = () => {
    return priceList?.find((priceItem) => priceItem?.user_level === 'default');
  };

  // Determine which pricing to display
  const userSpecificPricing = findUserPricing();
  const defaultPricing = findDefaultPricing();
  const displayPricing = userSpecificPricing || defaultPricing;

  // Helper function to get the main price to display
  const getDisplayPrice = (priceData: typeof displayPricing) => {
    return priceData?.price || priceData?.comparePrice || 0;
  };

  const handleSubmit = (onValid: AddToCartFormData) => {
    const cartItem = carts.find(
      (cart) => cart?.product?.documentId === onValid?.id
    );

    if (cartItem) {
      updateCartItem({
        variables: {
          documentId: cartItem?.documentId,
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

    form.reset();
  };

  return (
    <div className="md:basis-[51.75%] md:max-w-[51.75%]">
      {me && (
        <ProductPrice
          brandImage={product?.brand?.image}
          price={getDisplayPrice(displayPricing)}
          comparePrice={displayPricing?.comparePrice}
        />
      )}
      <BulkPrices priceList={priceList} />
      <ShopProductStockQuantities inventory={product?.inventory} />
      {userLevel ? (
        <ProductAddToCartButton
          form={form}
          stocks={stocks}
          handleSubmit={handleSubmit}
          productId={product?.documentId}
          isIncrementDisabled={isIncrementDisabled}
          isDecrementDisabled={isDecrementDisabled}
          productPrice={getDisplayPrice(displayPricing) * currentInputQuantity}
        />
      ) : (
        <div className="w-full h-20 flex justify-center items-center">
          <span className="text-sm row-span-1 text-[#1b1b3b]">
            Login to view price
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleProductDetails;
