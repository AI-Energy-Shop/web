import { CartItemType } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <Image
          src={'/no-product-image.jpg'}
          alt={item.name}
          width={100}
          height={100}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">
            Reference ID: {item.referenceId}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center border rounded-md">
          <button
            // onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1">{item.quantity}</span>
          <button
            // onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            // onClick={() => onRemove(item.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
