'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { formatCurrency } from '@/utils/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import { CartsQuery } from '@/lib/gql/graphql';
import useProductPricing from '@/hooks/useProductPricing';

interface CartItemProps {
  item: CartsQuery['carts'][number];
  userLevel?: string;
  warehouseLocation?: string;
  onAddQuant: (id: string) => void;
  onReduceQuant: (id: string) => void;
  onRemove: (id: string) => void;
  onChange: (id: string, value: string) => void;
}

type InventoryType = {
  melbourne: number;
  sydney: number;
  brisbane: number;
  documentId: string;
  __typename: string;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  userLevel,
  warehouseLocation,
  onRemove,
  onChange,
  onAddQuant,
  onReduceQuant,
}) => {
  const itemTitle = item?.product?.name;
  const itemModel = item?.product?.model;
  const currentInputQuantity = item?.quantity || 0;
  const itemImage = item?.product?.images?.at(0)?.url;
  const currentProductStocksQuantity = Number(
    item?.product?.inventory?.[warehouseLocation as keyof InventoryType] || 0
  );
  const [localInputQuantity, setLocalInputQuantity] = useState<number | string>(
    currentProductStocksQuantity
  );

  const priceList = item?.product?.price_lists || [];

  const { displayPrice } = useProductPricing(
    priceList,
    userLevel,
    currentInputQuantity
  );

  const isInStock = currentProductStocksQuantity > 0;
  const isExceedQuantity = currentInputQuantity > currentProductStocksQuantity;

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // prevent set this value to NaN
    if (isNaN(parseInt(value))) {
      setLocalInputQuantity('');
    } else {
      setLocalInputQuantity(parseInt(value));
    }
    onChange(id, value);
  };
  return (
    <div className={`space-y-4 ${!isInStock && 'border-2 border-red-500'}`}>
      <div
        className={`${isInStock ? 'hidden' : 'bg-red-500'} font-thin text-sm text-white p-2`}
      >
        Currently not available in this location. Please change location or
        delete the item before going to proceed.
      </div>
      <div className="flex">
        <Button
          size="icon"
          variant="ghost"
          className="hidden md:block md:self-center"
          onClick={() => onRemove(item?.documentId || '')}
        >
          <Trash2 className="w-5 h-5 mx-auto" color="red" />
        </Button>
        <div className="relative flex-1 overflow-hidden">
          <Image
            priority
            alt="picture"
            width={100}
            height={100}
            src={itemImage || '/no-product-image.jpg'}
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
        <div className="flex-1">
          <p
            className={`text-[10px] ${isInStock ? 'text-green-700' : 'text-red-500'}`}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'} (
            {currentProductStocksQuantity})
          </p>
          <h1 className="text-[14px] font-bold">{itemTitle}</h1>
          <p className="font-thin text-[14px]">{itemModel}</p>
        </div>
        <div className="flex-1 self-center">
          <h2>{formatCurrency(displayPrice, 'AUD')}</h2>
          <p className="text-[12px]">ex.GST</p>
        </div>
        <div>
          <p
            className={`font-semibold text-xs text-red-500 md:text-sm ${isExceedQuantity ? 'block' : 'hidden'}`}
          >
            Quantity exceeded.
          </p>
          <div className="hidden md:block md:flex-1 md:border md:rounded-md ">
            <div className="text-center bg-gray-300">QTY</div>
            <div className="flex items-end h-auto">
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="bg-gray-200 rounded-none "
                onClick={() => onReduceQuant(item?.documentId || '')}
                disabled={!isInStock}
              >
                <Minus />
              </Button>
              <Input
                type="text"
                name="quantity"
                value={localInputQuantity}
                onChange={(e) => handleChange(item?.documentId || '', e)}
                className="rounded-none z-10 text-center border-none focus:border-none focus:outline-none focus:ring-0"
              />
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="bg-gray-200 rounded-none"
                onClick={() => onAddQuant(item?.documentId || '')}
                disabled={!isInStock}
              >
                <Plus />
              </Button>
            </div>
            <div className="text-center">
              <p>
                {formatCurrency(
                  Number(displayPrice * currentInputQuantity),
                  'AUD'
                )}
              </p>
              <p className="text-[12px]">ex.GST</p>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="self-center md:hidden"
          onClick={() => onRemove(item?.documentId || '')}
        >
          <Trash2 className="w-5 h-5" color="red" />
        </Button>
      </div>
      {/* MOBILE */}
      <div className="flex border border-black md:hidden">
        <div className="flex-2 text-center bg-gray-300 place-content-center place-items-center">
          QTY
        </div>
        <div className="flex-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={!isInStock}
            onClick={() => onReduceQuant(item?.documentId || '')}
            type="button"
            className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
          >
            <Minus />
          </Button>
        </div>
        <Input
          name="quantity"
          value={localInputQuantity}
          disabled={!isInStock}
          className="flex-2 rounded-none text-center h-12"
          onChange={(e) => handleChange(item?.documentId || '', e)}
        />
        <div className="flex-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={!isInStock}
            onClick={() => onAddQuant(item?.documentId || '')}
            type="button"
            className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
          >
            <Plus />
          </Button>
        </div>
        <div className="flex-3 text-right pr-2">
          <p>
            {formatCurrency(Number(displayPrice * currentInputQuantity), 'AUD')}
          </p>
          <p className="text-[14px]">ex.GST</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
