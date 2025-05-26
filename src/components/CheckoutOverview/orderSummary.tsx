'use client';

import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 249.99,
    quantity: 1,
    image: '',
  },
  {
    id: '2',
    name: 'Smartphone Fast Charger',
    price: 39.99,
    quantity: 2,
    image: '',
  },
];

function OrderSummary() {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Package size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Order Summary</h3>
            <p className="text-sm text-gray-500">
              {mockProducts.length} item{mockProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">
            {expanded ? 'Hide details' : 'Show details'}
          </span>
          {expanded ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 animate-fadeIn">
          <div className="space-y-4 mt-2">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex space-x-4">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h4>
                  <div className="flex mt-1 text-sm text-gray-500">
                    <span>Qty: {product.quantity}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
