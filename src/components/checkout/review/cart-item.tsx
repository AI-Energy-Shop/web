'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { formatCurrency } from '@/utils/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartsQuery } from '@/lib/gql/graphql';
import useProductPricing from '@/hooks/useProductPricing';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartsQuery['carts'][number];
  userLevel?: string;
  warehouseLocation?: string;
  onAddQuant: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onReduceQuant: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRemove: (id: string) => void;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
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

  const { displayPrice } = useProductPricing(
    item?.product?.price_lists || [],
    userLevel,
    currentInputQuantity
  );

  const isInStock = currentProductStocksQuantity > 0;
  const isExceedQuantity = currentInputQuantity >= currentProductStocksQuantity;

  return (
    <div className={`space-y-4 ${!isInStock && 'border-2 border-red-500'}`}>
      <div
        className={`${isInStock ? 'hidden' : 'bg-red-500'} font-thin text-sm text-white p-2`}
      >
        Currently not available in this location. Please change location or
        delete the item before going to proceed.
      </div>
      {/* DESKTOP */}
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
            className={cn(
              'font-semibold text-xs text-red-500 md:text-sm',
              isExceedQuantity ? 'block' : 'hidden'
            )}
          >
            Must not exceed the stock quantity.
          </p>
          <div className="hidden md:block md:flex-1 md:border md:rounded-md ">
            <div className="text-center bg-gray-300">QTY</div>
            <div className="flex items-end h-auto">
              <Button
                size="icon"
                variant="ghost"
                type="button"
                name="decrement"
                data-id={item?.documentId}
                className="bg-gray-200 rounded-none "
                onClick={(e) => onReduceQuant(e)}
                disabled={!isInStock}
              >
                <Minus />
              </Button>
              <Input
                type="text"
                name="quantity"
                placeholder={`${currentInputQuantity}`}
                onChange={(e) => onChange(item?.documentId || '', e)}
                className="rounded-none z-10 text-center border-none focus:border-none focus:outline-none focus:ring-0"
              />
              <Button
                size="icon"
                variant="ghost"
                type="button"
                name="increment"
                data-id={item?.documentId}
                className="bg-gray-200 rounded-none"
                onClick={(e) => onAddQuant(e)}
                disabled={!isInStock || isExceedQuantity}
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
            onClick={(e) => onReduceQuant(e)}
            type="button"
            data-id={item?.documentId}
            className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
          >
            <Minus />
          </Button>
        </div>
        <Input
          name="quantity"
          data-id={item}
          value={currentInputQuantity}
          disabled={!isInStock}
          className="flex-2 rounded-none text-center h-12"
          onChange={(e) => onChange(item?.documentId || '', e)}
        />
        <div className="flex-1">
          <Button
            size="icon"
            variant="ghost"
            disabled={!isInStock}
            onClick={(e) => onAddQuant(e)}
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
