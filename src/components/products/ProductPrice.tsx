'use client';
import { formatCurrency } from '@/utils/currency';
import { muktaVaani } from '@/app/font';
import useMe from '@/hooks/useMe';

interface ProductPriceProps {
  priceList?: {
    documentId?: string;
    price?: number;
    sale_price?: number;
    min_quantity?: number;
    max_quantity?: number;
    user_level?: string;
  }[];
}

function ProductPrice({ priceList }: ProductPriceProps) {
  const { me } = useMe();

  const price = priceList?.find(
    (price) => price?.user_level === me?.account_detail?.level
  );

  const salePrice = price?.sale_price;
  const regularPrice = price?.price;

  return (
    <div
      className={`${muktaVaani.className} ae-mobile-container mx-auto max-md:px-4 pb-4`}
    >
      <div className="flex justify-between">
        <div className="leading-6">
          <h2 className="text-gray-500 line-through font-light md:text-[28px]">
            {regularPrice ? formatCurrency(regularPrice, 'USD') : ''}
          </h2>
          <h1 className="font-medium md:mt-1">
            <span className=" text-[40px]">
              {salePrice
                ? formatCurrency(salePrice, 'USD')
                : formatCurrency(regularPrice, 'USD')}
            </span>
            <span className="max-md:text-[12px] max-md:block">ex.GST</span>
          </h1>
        </div>
        <div className="w-24 bg-red-500 h-8 md:hidden"></div>
      </div>
    </div>
  );
}

export default ProductPrice;
