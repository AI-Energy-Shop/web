'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/currency';
import AddToCartButton from './AddToCartButton';
import { GetProductQuery } from '@/lib/gql/graphql';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ProductCard: React.FC<GetProductQuery['getProduct']> = (props) => {
  const me = useSelector((state: RootState) => state.me.me);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (me) {
      setIsLoggedIn(true);
    }
  }, [me]);

  const salePrice =
    props?.price_list?.find((price) => price?.user_level === 'SMALL')
      ?.sale_price || 0;
  const currentPrice =
    salePrice > 0
      ? salePrice
      : props?.price_list?.find((price) => price?.user_level === 'SMALL')
          ?.price || 0;

  const inventory =
    props?.inventories.find((inventory) => inventory?.location === 'Warehouse')
      ?.quantity || 0;

  const renderPriceAndStock = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      return (
        <div className="grid grid-cols-1 my-3">
          <span className="text-sm row-span-1 text-[#1b1b3b]">
            Login to view price
          </span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 grid-rows-3">
        <span className="text-sm text-gray-400 line-through row-span-1">
          {salePrice
            ? formatCurrency(props?.price_list?.[0]?.price || 0, 'AUD')
            : null}
        </span>
        <p className="text-md font-bold row-span-1 block h-auto">
          {formatCurrency(currentPrice, 'AUD')}{' '}
          <span className="text-xs font-normal">ex.GST</span>
        </p>
        <span
          className={cn(
            `${inventory > 0 ? 'text-green-900' : 'text-red-900'} text-sm  row-span-1`
          )}
        >
          {inventory > 0 ? (
            <span className="text-green-900">In Stock ({inventory})</span>
          ) : (
            <span className="text-red-900">Out of Stock</span>
          )}
        </span>
      </div>
    );
  };

  const productLink = `/products/${props?.category?.toLowerCase()?.replaceAll(' ', '-')}/${props?.documentId}`;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={productLink}>
        <div className="flex flex-col gap-2">
          {/* IMAGE */}
          <div className="aspect-[3/4] relative bg-[#e6e6e6]">
            <Image
              src={props?.images[0]?.url || ''}
              alt={props?.images[0]?.name || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
            />
          </div>
          {/* NAME AND MODEL */}
          <div className="flex flex-col justify-between">
            <h3 className="font-medium text-sm mb-1 text-pretty">
              <span>{props?.name}</span>
            </h3>
            <p className="text-sm font-thin italic">{props?.model}</p>
          </div>
          {/* PRICE AND STOCK */}
          {renderPriceAndStock(isLoggedIn)}
        </div>
      </Link>
      <AddToCartButton
        id={props?.documentId || ''}
        name={props?.name || ''}
        currentPrice={currentPrice}
        odoo_product_id={props?.model || ''}
        model={props?.model || ''}
        image={props?.images[0]?.url || ''}
        inventory={inventory}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default ProductCard;
