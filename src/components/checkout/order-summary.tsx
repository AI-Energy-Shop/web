'use client';
import React from 'react';
import { formatCurrency } from '@/utils/currency';
import { getCartTotals } from '@/utils/cart';
import useMe from '@/hooks/useMe';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';
import { useCheckout } from '@/hooks/useCheckout';
import { formatDate } from '../../utils/formatDate';
import { useAppSelector } from '@/store/hooks';

interface OrderSummaryProps {
  checkoutUserData: GetCheckoutUserDataQuery;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ checkoutUserData }) => {
  const carts = useAppSelector((state) => state.cart.carts);  
  const { user } = useMe();

  const { 
    warehouseLocation, 
    shippingType, 
    deliveryOptions, 
    pickUpOptions, 
    paymentMethod
  } = useCheckout();

  const { 
    subTotal, 
    gst, 
    total, 
    cardSurcharge
  } = getCartTotals(carts);

  const userAddress = checkoutUserData.usersPermissionsUser?.addresses.find(
    (address) => address?.isActive === true
  );

  const deliveryDetails = () => (
    <>
      {deliveryOptions?.type === 'manual' && (
        <>
          <span>Request Delivery</span>
          {' - '}
          <span>({formatDate(deliveryOptions.date?.toString() || '')})</span>
        </>
      )}

      {deliveryOptions?.type === 'auto' && (
        <>
          <span>
            {deliveryOptions?.macshipData?.displayData.carrierDisplayName}
          </span>
          {' - '}
          <span>
            ({formatDate(deliveryOptions?.macshipData?.displayData.eta || '')})
          </span>
        </>
      )}
    </>
  );

  const pickUpDetails = () => (
    <>
      <span>
        {formatDate(pickUpOptions?.date?.toString() || '')} (
        {pickUpOptions?.estimatedArrivalTime})
      </span>
    </>
  );

  const WarehouseLocation: React.FC = () => {
    return (
      <div>
        <h1 className="font-bold">Selected Location:</h1>

        <h2 className="font-semibold italic">
          {warehouseLocation.name[0].toUpperCase() +
            warehouseLocation.name.slice(1)}
        </h2>
        <p className="text-xs">
          <span className="mx-1 text-sm">
            {warehouseLocation.address.unit}{' '}
            {warehouseLocation.address.street + ','}
          </span>
          <span className="mx-1 text-sm">
            {warehouseLocation.name[0].toUpperCase() +
              warehouseLocation.name.slice(1) +
              ','}
          </span>
          <span className="mx-1 text-sm">
            {warehouseLocation.address.state + ','}
          </span>
          <span className="mx-1 text-sm">
            {warehouseLocation.address.postcode}
          </span>
        </p>
      </div>
    );
  };

  const ShippingAddress: React.FC = () => {
    return (
      <div>
        <h1 className="font-semibold">Shipping:</h1>
        <h2 className="text-sm">
          <span className="block font-semibold italic">
            {user?.business_name}
          </span>

          <span>
            {userAddress?.street1 + ', '} {userAddress?.street2 + ', '}
            {userAddress?.city + ', '} {userAddress?.state + ', '}
            {userAddress?.zip_code}
          </span>
        </h2>
        {shippingType ? (
          <div className="text-xs italic">
            {shippingType[0].toUpperCase() + shippingType.slice(1)}(
            {shippingType === 'delivery' && deliveryDetails()}
            {shippingType === 'pickup' && pickUpDetails()})
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  const SubTotal: React.FC = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Sub-total (ex. GST)</h1>
        <p>{formatCurrency(subTotal, 'AUD')}</p>
      </div>
    );
  };

  const DeliveryPrice: React.FC = () => {

    if(!shippingType) {
      return (
        <div className="flex justify-between items-center">
          <h1>Delivery</h1>
          <p>TBC</p>
        </div>
      )
    }

    if(shippingType === 'pickup') {
      return (
        <div className="flex justify-between items-center">
          <h1>Delivery</h1>
          <p>-</p>
        </div>
      )
    }

    if(shippingType === 'delivery') {
      return (
        <div className="flex justify-between items-center">
        <h1>Delivery</h1>
        <p>{deliveryOptions ? (
          formatCurrency(cardSurcharge, 'USD')
        ) : (
          'TBC'
        )}</p>
      </div>
      )
    }

    return null;
  };

  const CardSubCharge: React.FC = () => {
    if(!paymentMethod || 
      paymentMethod && paymentMethod !== 'credit_card'
    ) {
      return null;
    }
    return (
      <div className="flex justify-between items-center">
        <h1>Card Surcharge (1.2%)</h1>
        <p>{formatCurrency(cardSurcharge, 'AUD')}</p>
      </div>
    );
  };

  const TotalGst: React.FC = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>GST</h1>
        <p>{formatCurrency(gst, 'AUD')}</p>
      </div>
    );
  };

  const Total: React.FC = () => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="font-bold">
          Total <span className="font-normal text-xs">(inc. GST)</span>
        </h1>
        <p className="font-bold">{formatCurrency(total, 'AUD')}</p>
      </div>
    );
  };

  return (
    <div className="bg-white ml-8">
      <h1 className="p-2 text-xl font-black text-white bg-black">
        Order Summary
      </h1>
      <div className="px-2 space-y-2 py-4">
        <WarehouseLocation />
        <div className="h-0.5 w-full bg-yellow-aes-yellow" />
        <ShippingAddress />
        <div className="border-line h-0.5 w-full bg-pink-lighter-pink" />
        <SubTotal />
        <DeliveryPrice />
        <CardSubCharge />
        <div className="border-line h-0.5 w-full bg-blue-navy-blue" />
        <TotalGst />
        <div className="border-line h-0.5 w-full bg-blue-navy-blue" />
        <Total />
      </div>
    </div>
  );
};

export default OrderSummary;
