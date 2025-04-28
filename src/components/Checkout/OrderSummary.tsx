'use client';
import React from 'react';
import { formatCurrency } from '@/utils/currency';
import { getCartTotals } from '@/utils/cart';
import { roundToTwoDecimals } from '@/utils/rountTwoDecimals';
import useCart from '@/hooks/useCart';
import useMe from '@/hooks/useMe';

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const { user } = useMe();
  const { carts, warehouse, shippingOptions } = useCart();
  const { subtotal, totalGst, total } = getCartTotals(carts, 0.0, 0.0);

  const renderSelectedWarehouseLocation = () => {
    return (
      <div>
        <h1 className="font-bold">Selected Location:</h1>
        <h2 className="font-semibold italic">{warehouse?.address?.city}</h2>
        <p className="text-xs">
          <span className="mx-1 text-sm">{warehouse?.address?.street1},</span>
          <span className="mx-1 text-sm">{warehouse?.address?.city},</span>
          <span className="mx-1 text-sm">{warehouse?.address?.state},</span>
          <span className="mx-1 text-sm">{warehouse?.address?.zipCode}</span>
        </p>
      </div>
    );
  };

  const renderShippingAddress = () => {
    return (
      <div>
        <h1 className="font-semibold">Shipping:</h1>
        <h2 className="text-sm">
          <span className="block font-semibold italic">
            {user?.business_name}
          </span>
          {user?.account_detail?.shipping_addresses?.map?.((address, index) => {
            if (address.isActive) {
              return (
                <span key={index} className="mr-1 text-sm">
                  {`${address.street1}, ${address.street2}, ${address.city}, ${address.state}, ${address.zipCode}`}
                </span>
              );
            }
          })}
        </h2>
        {shippingOptions &&
          shippingOptions.map((option) => {
            if (option.active) {
              return (
                <p key={option.id} className="text-xs italic">
                  <span className="mr-1 font-thin">
                    {option?.title} ({option?.value})
                  </span>
                </p>
              );
            }
          })}
      </div>
    );
  };

  const renderSubTotal = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Sub-total (ex. GST)</h1>
        <p>{roundToTwoDecimals(subtotal)}</p>
      </div>
    );
  };

  const renderDeliveryPrice = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Delivery</h1>
        <p>{formatCurrency(0, 'USD')}</p>
      </div>
    );
  };

  const renderCardSubCharge = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Card Surcharge (1.2%)</h1>
        {/* <p>{cardSubCharge}</p> */}
      </div>
    );
  };

  const renderTotalGst = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>GST</h1>
        <p>{totalGst.toFixed(2)}</p>
      </div>
    );
  };

  const renderTotal = () => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="font-bold">
          Total <span className="font-normal text-xs">(inc. GST)</span>
        </h1>
        <p className="font-bold">{total.toFixed(2)}</p>
      </div>
    );
  };

  return (
    <div className="bg-white ml-8">
      <h1 className="p-2 text-xl font-black text-white bg-black">
        Order Summary
      </h1>
      <div className="px-2 space-y-2 py-4">
        {renderSelectedWarehouseLocation()}
        <div className="h-0.5 w-full bg-yellow-aes-yellow" />
        {renderShippingAddress()}
        <div className="border-line h-0.5 w-full bg-pink-lighter-pink" />
        {renderSubTotal()}
        {renderDeliveryPrice()}
        {renderCardSubCharge()}
        <div className="border-line h-0.5 w-full bg-blue-navy-blue" />
        {renderTotalGst()}
        <div className="border-line h-0.5 w-full bg-blue-navy-blue" />
        {renderTotal()}
      </div>
    </div>
  );
};

export default OrderSummary;
