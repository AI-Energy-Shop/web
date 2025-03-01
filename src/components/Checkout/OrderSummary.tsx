'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Me } from '@/store/features/me';
import {
  WarehouseLocation,
  ShippingAddress,
  DeliveryOption,
  Cart,
} from '@/store/features/cart';
import { formatCurrency } from '@/utils/currency';
import { getCartTotals } from '@/utils/cart';
interface OrderSummaryProps {
  // shippingDetails: any;
  // subtotal?: string;
  // cardSubCharge?: string;
  // shippingFee?: string;
  // gst?: string;
  // total?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const [user, setUser] = useState<Me | undefined>(undefined);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [warehouse, setWarehouse] = useState<WarehouseLocation | undefined>(
    undefined
  );
  const [delivery, setDeliveryOptions] = useState<DeliveryOption | undefined>(
    undefined
  );
  const me = useSelector((state: RootState) => state.me.me);
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const warehouseLocation = useSelector(
    (state: RootState) => state.cart.warehouseLocation
  );
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingAddress
  );
  const deliveryOptions = useSelector(
    (state: RootState) => state.cart.deliveryOptions
  );

  useEffect(() => {
    if (me) {
      setUser(me);
    }
    if (warehouseLocation) {
      setWarehouse(warehouseLocation);
    }
    if (deliveryOptions) {
      setDeliveryOptions(deliveryOptions);
    }
    if (cartItems) {
      setCarts(cartItems);
    }
  }, [me, warehouseLocation, shippingAddress, deliveryOptions, cartItems]);

  // shippingFee={formatCurrency(deliveryFee, 'USD')}
  // cardSubCharge={formatCurrency(
  //   shippingDetails?.paymentOption?.price || 0.0,
  //   'USD'
  // )}
  // gst={formatCurrency(totalGst, 'USD')}
  // subtotal={formatCurrency(subtotal, 'USD')}
  // total={formatCurrency(total, 'USD')}

  const { subtotal, totalGst, total } = getCartTotals(
    carts,
    deliveryOptions?.price,
    0.0
  );

  const renderSelectedWarehouseLocation = () => {
    return (
      <div>
        <h1 className="font-bold">Selected Location:</h1>
        <h2 className="font-semibold">{warehouse?.address.city}</h2>
        <p className="text-xs">
          <span className="mx-1 text-sm">{warehouse?.address.street},</span>
          <span className="mx-1 text-sm">{warehouse?.address.suburb},</span>
          <span className="mx-1 text-sm">
            {warehouse?.address.state_territory},
          </span>
          <span className="mx-1 text-sm">{warehouse?.address.postcode}</span>
        </p>
      </div>
    );
  };

  const renderShippingAddress = () => {
    return (
      <div>
        <h1 className="font-semibold">Shipping:</h1>
        <h2 className="text-sm">
          {user?.shipping_addresses?.map((address) => {
            if (address.isActive) {
              return (
                <span key={address.id}>
                  <span className="block font-semibold">{address.company}</span>
                  <span className="mr-1 text-sm">{address.street},</span>
                  <span className="mx-1 text-sm">{address.suburb},</span>
                  <span className="mx-1 text-sm">
                    {address.state_territory}
                  </span>
                  <span className="mx-1 text-sm">{address.postcode}</span>
                </span>
              );
            }
          })}
        </h2>
        <p className="text-xs italic">
          <span className="mr-1 font-thin">{delivery?.title}</span>
          <span className="mx-1 font-thin">({delivery?.description})</span>
        </p>
      </div>
    );
  };

  const renderSubTotal = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Sub-total (ex. GST)</h1>
        <p>{subtotal}</p>
      </div>
    );
  };

  const renderDeliveryPrice = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Delivery</h1>
        <p>{formatCurrency(deliveryOptions?.price, 'USD')}</p>
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
