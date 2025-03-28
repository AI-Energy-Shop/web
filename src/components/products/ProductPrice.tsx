'use client';
import { formatCurrency } from '@/utils/currency';
import { muktaVaani } from '@/app/font';
import useMe from '@/hooks/useMe';
import Image from 'next/image';
import { ProductQuery } from '@/lib/gql/graphql';

interface ProductPriceProps {
  product: ProductQuery['product'];
}

const ProductPrice: React.FC<ProductPriceProps> = ({ product }) => {
  const { me } = useMe();

  const priceList = product?.price_lists?.map((price) => ({
    documentId: price?.documentId,
    price: price?.price ?? undefined,
    sale_price: price?.sale_price ?? undefined,
    min_quantity: price?.min_quantity ?? undefined,
    max_quantity: price?.max_quantity ?? undefined,
    user_level: price?.user_level ?? undefined,
  }));

  const price = priceList?.find(
    (price) => price?.user_level === me?.account_detail?.level
  );

  const salePrice = price?.sale_price;
  const regularPrice = price?.price;

  if (!me) {
    return null;
  }

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
        <div className="w-24 h-8 md:hidden">
          {product?.brand?.image?.url && (
            <Image
              width={128}
              height={48}
              loading="lazy"
              src={`${product?.brand?.image?.url}`}
              className="object-contain object-center w-full h-full"
              alt={`${product?.brand?.image?.alternativeText}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
