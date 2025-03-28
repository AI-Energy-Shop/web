'use client';
import React from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { formatCurrency } from '@/utils/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemCardProps {
  id: string;
  image?: string;
  title?: string;
  model?: string;
  price: number;
  quantity?: number;
  gst?: string;
  onAddQuant: (id: string) => void;
  onReduceQuant: (id: string) => void;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  image,
  title,
  model,
  price,
  quantity = 0,
  gst,
  onChange,
  onAddQuant,
  onReduceQuant,
  onRemove,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex ">
        <Button
          size="icon"
          variant="ghost"
          className="hidden md:block md:self-center"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="w-5 h-5 mx-auto" color="red" />
        </Button>
        <div className="relative flex-1 overflow-hidden">
          <Image
            priority
            alt="picture"
            width={100}
            height={100}
            src={image || '/no-product-image.jpg'}
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-green-700">In Stock (22)</p>
          <h1 className="text-[14px] font-bold">{title}</h1>
          <p className="font-thin text-[14px]">{model}</p>
        </div>
        <div className="flex-1 self-center">
          <h2>{gst}</h2>
          <p className="text-[12px]">ex.GST</p>
        </div>
        <div className="hidden md:block md:flex-1 md:border md:rounded-md md:h-full">
          <div className="text-center bg-gray-300">QTY</div>
          <div className="flex items-end h-7">
            <Button
              size="icon"
              variant="ghost"
              className="bg-gray-200 rounded-none w-full h-full "
              onClick={() => onReduceQuant(id)}
            >
              <Minus />
            </Button>
            <Input
              className="h-full rounded-none z-10 text-center"
              type="text"
              name="cart-item-quantity"
              value={quantity}
              onChange={(e) => onChange(id, e)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="bg-gray-200 rounded-none w-full h-full "
              onClick={() => onAddQuant(id)}
            >
              <Plus />
            </Button>
          </div>
          <div className="text-center">
            <p>{formatCurrency(Number(price * quantity), 'USD')}</p>
            <p className="text-[12px]">ex.GST</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="self-center md:hidden"
          onClick={() => onRemove(id)}
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
            className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
            onClick={() => onReduceQuant(id)}
          >
            <Minus />
          </Button>
        </div>
        <Input
          className="flex-2 rounded-none text-center h-12"
          value={quantity}
          onChange={(e) => onChange(id, e)}
        />
        <div className="flex-1">
          <Button
            size="icon"
            variant="ghost"
            className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
            onClick={() => onAddQuant(id)}
          >
            <Plus />
          </Button>
        </div>
        <div className="flex-3 text-right pr-2">
          <p>{formatCurrency(Number(price * quantity), 'USD')}</p>
          <p className="text-[14px]">ex.GST</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
