'use client';

import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useCheckout } from '@/hooks/useCheckout';
import { createOrder } from '@/app/actions/orders';
import useCart from '@/hooks/useCart';
import useMe from '@/hooks/useMe';

function PlaceOrder() {
  const { allCheckoutState, resetCheckout, warehouseLocation } = useCheckout();
  const { carts } = useCart({});
  const { user } = useMe();

  console.log({ allCheckoutState });

  const lineItems = carts.map((item) => {
    const price = item?.product?.price_lists?.find(
      (price) =>
        // TODO ROI STATIC USER_LEVEL
        price?.user_level === 'MID_SIZED' &&
        !price?.min_quantity &&
        !price?.max_quantity
    );

    const productPriceBaseOnTable = item?.product?.price_lists.find(
      (price) =>
        (price?.min_quantity ?? Infinity) <= item.quantity &&
        (price?.max_quantity ?? -Infinity) >= item.quantity
    );

    const productPrice =
      productPriceBaseOnTable?.comparePrice ||
      productPriceBaseOnTable?.price ||
      price?.comparePrice ||
      price?.price ||
      0;

    return {
      line: {
        quantity: item?.quantity!,
        title: item?.product?.name!,
        odoo_product_id: item?.product?.odoo_product_id!,
        model: item?.product?.model,
        image: item?.product?.images[0]?.url || '',
        productID: item?.product?.documentId,
        price: productPrice,
      },
    };
  });

  const handleSubmitOrder = async () => {
    await createOrder({ checkoutState: allCheckoutState, lineItems });
  };

  return (
    <div>
      <Button
        onClick={handleSubmitOrder}
        className="w-full mb-4
       py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        Place Order
      </Button>

      <Link href="/cart">
        <Button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center">
          <ArrowLeft size={16} className="mr-2" />
          Return to Cart
        </Button>
      </Link>
    </div>
  );
}

export default PlaceOrder;
