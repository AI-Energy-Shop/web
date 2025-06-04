'use client';

import { useCheckout } from '@/hooks/useCheckout';
import { ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { useState } from 'react';

export const paymentDetails = {
  type: 'credit_card',
  lastFourDigits: '4242',
  cardType: 'Visa',
  expiryDate: '05/28',
};

function PaymentMethod() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { card } = useCheckout();
  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const renderPaymentIcon = () => {
    // You can add more logic if supporting PayPal or others later
    return <CreditCard size={20} className="text-blue-600" />;
  };

  const renderPaymentInfo = () => (
    <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-medium text-blue-800">
            {card?.brand}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              •••• •••• •••• {card?.last4Char}
            </p>
            <p className="text-sm text-gray-600">
              Expires {card?.expMonth}/{card?.expYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

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
              {card?.brand} ending in {card?.last4Char}
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
