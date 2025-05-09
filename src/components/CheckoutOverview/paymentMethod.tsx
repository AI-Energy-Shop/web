'use client';

import { Banknote, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { useState } from 'react';

export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 249.99,
    quantity: 1,
    image:
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Smartphone Fast Charger',
    price: 39.99,
    quantity: 2,
    image:
      'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const mockAddress = {
  firstName: 'Jane',
  lastName: 'Smith',
  addressLine1: '123 Main Street',
  addressLine2: 'Apt 4B',
  city: 'San Francisco',
  state: 'CA',
  postalCode: '94105',
  country: 'United States',
};

export const mockShippingMethod = {
  id: 'express',
  name: 'Express Shipping',
  description: '2-3 Business Days',
  price: 14.99,
  estimatedDelivery: 'May 15 - May 17, 2025',
};

export const paymentDetails = {
  type: 'credit_card',
  lastFourDigits: '4242',
  cardType: 'Visa',
  expiryDate: '05/28',
};

function PaymentMethod() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const renderPaymentIcon = () => {
    switch (paymentDetails.type) {
      case 'paypal':
        return <Banknote />;
      default:
        return <CreditCard size={20} className="text-blue-600" />;
    }
  };

  const renderPaymentInfo = () => {
    switch (paymentDetails.type) {
      case 'credit_card':
        return (
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-medium text-blue-800">
                  {paymentDetails.cardType}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    •••• •••• •••• {paymentDetails.lastFourDigits}
                  </p>
                  <p className="text-sm text-gray-600">
                    Expires {paymentDetails.expiryDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            {renderPaymentIcon()}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Payment Method</h3>
            <p className="text-sm text-gray-500">
              {paymentDetails.type === 'credit_card'
                ? `${paymentDetails.cardType} ending in ${paymentDetails.lastFourDigits}`
                : 'PayPal'}
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
          <div className="mt-2">{renderPaymentInfo()}</div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
