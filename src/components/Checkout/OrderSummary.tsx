import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import React from 'react';
interface OrderSummaryProps {
  shippingDetails: any;
  subtotal?: string;
  cardSubCharge?: string;
  shippingFee?: string;
  gst?: string;
  total?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  shippingDetails,
  subtotal,
  cardSubCharge,
  shippingFee,
  gst,
  total,
}) => {
  const warehouseLocation = WAREHOUSE_LOCATIONS.find(
    (warehouse) => warehouse.id === shippingDetails.warehouseLocation
  );
  return (
    <div className="bg-white ml-8">
      <h1 className="p-2 text-xl font-black text-white bg-black">
        Order Summary
      </h1>

      <div className="px-2 space-y-2 py-4">
        {/* Selected Location */}
        <div>
          <h1 className="font-semibold">Selected Location:</h1>
          <h2>{shippingDetails?.companyName}</h2>
          <p className="text-xs">{warehouseLocation?.title} </p>
        </div>
        <div className="h-0.5 w-full bg-yellow-aes-yellow" />
        {/* Shipping */}
        <div>
          <h1 className="font-semibold">Shipping:</h1>
          <h2 className="text-sm">
            {shippingDetails?.companyName}{' '}
            {shippingDetails?.shippingAddress?.street}{' '}
            {shippingDetails?.shippingAddress?.suburb}{' '}
            {shippingDetails?.shippingAddress?.state}{' '}
            {shippingDetails?.shippingAddress?.postcode}
            {/* Fake Company Installs 123 Fake St, Springfield, NSW 2345 */}
          </h2>
          <p className="text-xs">
            {shippingDetails?.deliveryOptions
              ? `${shippingDetails?.deliveryOptions?.title} (${shippingDetails?.deliveryOptions?.eta})`
              : 'Please select delivery option'}
          </p>
        </div>
        <div className="h-0.5 w-full bg-pink-lighter-pink" />

        <div className="flex justify-between items-center">
          <h1>Sub-total (ex. GST)</h1>
          <p>{subtotal}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1>Delivery</h1>
          <p>{shippingFee}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1>Card Surcharge (1.2%)</h1>
          <p>{cardSubCharge}</p>
        </div>

        <div className="h-0.5 w-full bg-blue-navy-blue" />

        <div className="flex justify-between items-center">
          <h1>GST</h1>
          <p>{gst}</p>
        </div>

        <div className="h-0.5 w-full bg-blue-navy-blue" />

        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            Total <span className="font-normal text-xs">(inc. GST)</span>
          </h1>
          <p className="font-bold">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
