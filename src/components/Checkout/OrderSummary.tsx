import React from 'react';
interface OrderSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  cardSubCharge: number;
  gst: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryCharge,
  cardSubCharge,
  gst,
  total,
}) => {
  return (
    <div className="bg-white ml-8">
      <h1 className="p-2 text-xl font-black text-white bg-black">
        Order Summary
      </h1>

      <div className="px-2 space-y-2 py-4">
        <div>
          <h1 className="font-semibold">Selected Location:</h1>
          <h2>Sydney</h2>
          <p className="text-xs">24/32-38 Belmore Rd, Punchbowl NSW </p>
        </div>
        <div className="h-0.5 w-full bg-yellow-aes-yellow" />
        <div>
          <h1 className="font-semibold">Shipping:</h1>
          <h2 className="text-sm">
            Fake Company Installs 123 Fake St, Springfield, NSW 2345
          </h2>
          <p className="text-xs">TNT Standard Shipping (3-4 Business Days)</p>
        </div>
        <div className="h-0.5 w-full bg-pink-lighter-pink" />

        <div className="flex justify-between items-center">
          <h1>Sub-total (ex. GST)</h1>
          <p>${subtotal}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1>Delivery</h1>
          <p>${deliveryCharge}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1>Card Surcharge (1.2%)</h1>
          <p>${cardSubCharge}</p>
        </div>

        <div className="h-0.5 w-full bg-blue-navy-blue" />

        <div className="flex justify-between items-center">
          <h1>GST</h1>
          <p>${gst}</p>
        </div>

        <div className="h-0.5 w-full bg-blue-navy-blue" />

        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            Total <span className="font-normal text-xs">(inc. GST)</span>
          </h1>
          <p className="font-bold">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
