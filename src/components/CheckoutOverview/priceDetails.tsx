'use client';

import useCart from '@/hooks/useCart';
import useMe from '@/hooks/useMe';
import { formatCurrency, getCartTotals } from '@/utils/cart';

function PriceDetails() {
  const orderSummary = {
    subtotal: 123,
    shipping: 12,
    tax: 123,
    total: 123,
    discountCode: '',
    discountAmount: 123,
  };

  const { user } = useMe();
  const { carts } = useCart();
  const { subtotal, totalGst, total } = getCartTotals(carts, 0.0, 0.0, {
    userLevel: user?.account_detail?.level,
  });

  const subTotalDisplay = formatCurrency(subtotal, 'AUD');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-medium text-gray-900 mb-4">Price Details</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{subTotalDisplay}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            ${orderSummary.shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="text-gray-900">${orderSummary.tax.toFixed(2)}</span>
        </div>

        {orderSummary.discountAmount && orderSummary.discountCode && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({orderSummary.discountCode})</span>
            <span>-${orderSummary.discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-medium">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">
            ${orderSummary.total.toFixed(2)}
          </span>
        </div>
      </div>

      {!orderSummary.discountAmount && (
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
            <button className="px-4 py-2 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceDetails;
