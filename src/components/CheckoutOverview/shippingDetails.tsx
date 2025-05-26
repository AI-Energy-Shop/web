'use client';

import { ChevronDown, ChevronUp, Truck } from 'lucide-react';
import React, { useState } from 'react';

export const address = {
  firstName: 'Jane',
  lastName: 'Smith',
  addressLine1: '123 Main Street',
  addressLine2: 'Apt 4B',
  city: 'San Francisco',
  state: 'CA',
  postalCode: '94105',
  country: 'United States',
};

export const shippingMethod = {
  id: 'express',
  name: 'Express Shipping',
  description: '2-3 Business Days',
  price: 14.99,
  estimatedDelivery: 'May 15 - May 17, 2025',
};

function ShippingDetails() {
  const [expanded, setExpanded] = useState<boolean>(false);

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
            <Truck size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Shipping Information</h3>
            <p className="text-sm text-gray-500">{shippingMethod.name}</p>
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
          <div className="grid md:grid-cols-2 gap-6 mt-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Delivery Method
              </h4>
              <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {shippingMethod.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {shippingMethod.description}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated delivery: {shippingMethod.estimatedDelivery}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${shippingMethod.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingDetails;
