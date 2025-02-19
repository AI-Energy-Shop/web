'use client';
import { muktaVaani } from '@/app/font';
import { formatCurrency } from '@/utils/currency';
import BulkPrices from './BulkPrices';

interface ProductPriceProps {
  priceList?: {
    id?: string;
    price?: number;
    sale_price?: number;
    min_quantity?: number;
    max_quantity?: number;
    user_level?: string;
  }[];
}

function ProductPrice({ priceList }: ProductPriceProps) {
  const productPrice = priceList?.find(
    (price) => price?.user_level === 'SMALL'
  );

  // const initialCost = productPrice?.sale_price || productPrice?.price;

  // const [qty, setQty] = useState<number>(0);

  // const totalCost = initialCost! * qty;

  const bulkPrices = priceList?.filter((prices) => {
    if (prices.user_level === 'SMALL') {
      if (prices.min_quantity || prices.max_quantity) {
        return prices;
      }
    }
  });

  return (
    <div
      className={`${muktaVaani.className} ae-mobile-container mx-auto max-md:px-4 pb-4`}
    >
      <div className="flex justify-between">
        <div className="leading-6">
          <h2 className="text-gray-500 line-through font-light md:text-[28px]">
            {productPrice?.sale_price
              ? formatCurrency(productPrice?.price, 'AUD')
              : ''}
          </h2>
          <h1 className="font-medium md:mt-1">
            <span className=" text-[40px]">
              {productPrice?.sale_price
                ? formatCurrency(productPrice?.sale_price, 'AUD')
                : formatCurrency(productPrice?.price, 'AUD')}
            </span>
            <span className="max-md:text-[12px] max-md:block">ex.GST</span>
          </h1>
        </div>
        <div className="w-24 bg-red-500 h-8 md:hidden"></div>
      </div>

      <BulkPrices prices={bulkPrices} />
    </div>
  );
}

export default ProductPrice;
