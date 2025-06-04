'use client';
import React from 'react';
import { formatCurrency } from '@/utils/currency';
import { getCartTotals } from '@/utils/cart';
import useCartV2 from '@/hooks/useCartV2';
import useMe from '@/hooks/useMe';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';
import { useCheckout } from '@/hooks/useCheckout';
import { formatDate } from '../../utils/formatDate';

interface OrderSummaryProps {
  checkoutUserData: GetCheckoutUserDataQuery;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ checkoutUserData }) => {
  const { carts } = useCartV2();
  const { user } = useMe();
  const { subTotal, gst, total } = getCartTotals(carts);

  const { warehouseLocation, shippingType, deliveryOptions, pickUpOptions } =
    useCheckout();

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

  const renderSelectedWarehouseLocation = () => {
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

  const renderShippingAddress = () => {
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

  const renderSubTotal = () => {
    return (
      <div className="flex justify-between items-center">
        <h1>Sub-total (ex. GST)</h1>
        <p>{formatCurrency(subTotal, 'AUD')}</p>
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
        <p>{formatCurrency(gst, 'AUD')}</p>
      </div>
    );
  };

  const renderTotal = () => {
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
