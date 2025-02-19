import { firaSans } from '@/app/font';
import { Separator } from '@radix-ui/react-select';
import React from 'react';
import PickupLocation from './PickupLocation';
import ProductQuantity from './ProductQuantity';
import { Button } from '../ui/button';

interface AddToCartProps {
  id?: string | null;
  productData: any;
  pickLocation: any;
  productTitle?: string;
  image?: string;
  odooProductId?: string;
  referenceId?: string;
  token?: string;
  priceList?: {
    id?: string;
    price?: number;
    sale_price?: number;
    min_quantity?: number;
    max_quantity?: number;
    user_level?: string;
  }[];
}

const AddToCart = ({
  id,
  productData,
  pickLocation,
  priceList,
  image,
  productTitle,
  odooProductId,
  referenceId,
  token,
}: AddToCartProps) => {
  const productPrice = priceList?.find(
    (price: any) => price?.user_level === 'SMALL'
  );

  const price = productPrice?.sale_price
    ? productPrice?.sale_price
    : productPrice?.price || 0;
  return (
    <div className="bg-yellow-light-yellow max-md:px-4 md:bg-white md:mt-6">
      <div className="ae-mobile-container mx-auto">
        <PickupLocation productData={productData} pickLocation={pickLocation} />
        <Separator className="bg-purple-purp-aes mb-4 mt-1 md:hidden" />
        <div className="ae-mobile-container mx-auto text-center max-md:px-2 md:mt-6 md:py-2 md:flex md:justify-between">
          <ProductQuantity price={price} />
          <Button
            type="submit"
            className={`${firaSans.className} max-md:mt-3 max-md:mb-5 w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold md:basis-[57.98%] text-[20px] md:text-[28px] md:rounded-lg md:h-16`}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
