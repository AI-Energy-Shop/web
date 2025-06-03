'use client';
import { muktaVaani } from '@/app/font';
import Image from 'next/image';
import { formatCurrency } from '@/utils/currency';

interface ProductPriceProps {
  brandImage:
    | {
        __typename?: 'UploadFile';
        documentId: string;
        name: string;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
        mime: string;
        url: string;
      }
    | null
    | undefined;
  price?: number;
  comparePrice?: number;
}

// Helper component for displaying price information
const PriceDisplay: React.FC<{
  price: number;
  comparePrice?: number;
}> = ({ price, comparePrice }) => (
  <>
    <h2 className="text-gray-500 line-through font-light md:text-[28px]">
      {comparePrice ? formatCurrency(comparePrice, 'USD') : ''}
    </h2>
    <h1 className="font-medium md:mt-1">
      <span className="text-[40px]">{formatCurrency(price, 'USD')}</span>
      <span className="max-md:text-[12px] max-md:block">ex.GST</span>
    </h1>
  </>
);

const ProductPrice: React.FC<ProductPriceProps> = ({
  brandImage,
  price,
  comparePrice,
}) => {
  return (
    <div
      className={`${muktaVaani.className} ae-mobile-container mx-auto max-md:px-4 pb-4`}
    >
      <div className="flex justify-between">
        <div className="leading-6">
          {price && <PriceDisplay price={price} comparePrice={comparePrice} />}
        </div>

        {/* Brand image - mobile only */}
        <div className="w-24 h-8 md:hidden">
          {brandImage?.url && (
            <Image
              width={128}
              height={48}
              loading="lazy"
              src={brandImage.url}
              className="object-contain object-center w-full h-full"
              alt={brandImage.alternativeText || 'Brand logo'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
