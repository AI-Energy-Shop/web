'use client';

import { useCheckout } from '@/hooks/useCheckout';
import { ChevronDown, ChevronUp, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { formatDate } from '../Checkout/formatDate';

function ShippingDetails() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    deliveryOptions,
    shippingType,
    pickUpOptions,
    shippingAddress,
    warehouseLocation,
  } = useCheckout();

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const renderDeliveryDetails = () => {
    return (
      <>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Shipping Address
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{shippingAddress?.street1}</p>
            <p>{shippingAddress?.street2}</p>
            <p>
              {shippingAddress?.city}, {shippingAddress?.state}{' '}
              {shippingAddress?.zip_code}
            </p>
            <p>{shippingAddress?.country}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Delivery Method
          </h4>
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-start">
              {deliveryOptions?.type === 'auto' ? (
                <>
                  <div>
                    <p className="font-medium text-gray-900">
                      {
                        deliveryOptions?.macshipData?.displayData
                          ?.carrierServiceDisplayName
                      }
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      Estimated delivery:{' '}
                      {deliveryOptions?.macshipData?.displayData?.eta &&
                        formatDate(
                          deliveryOptions?.macshipData?.displayData?.eta
                        )}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${deliveryOptions?.macshipData?.displayData.totalSellPrice}
                  </span>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-gray-900">
                      Manual Quotation(Delivery)
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated delivery:{' '}
                      {deliveryOptions?.date
                        ? formatDate(deliveryOptions.date.toString())
                        : 'To Be Announced'}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">TBC</span>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPickUpDetails = () => {
    return (
      <>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Pickup Address
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              {warehouseLocation?.address.unit}{' '}
              {warehouseLocation?.address.street}
            </p>
            <p>
              {warehouseLocation?.address.suburb}{' '}
              {warehouseLocation?.address.postcode}
            </p>
            <p>{shippingAddress?.state}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Pickup Method
          </h4>
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">
                {pickUpOptions?.estimatedArrivalTime}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Pickup date:{' '}
                {pickUpOptions?.date &&
                  formatDate(pickUpOptions?.date?.toString())}
              </p>
            </div>
          </div>
        </div>
      </>
    );
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
            <p className="text-sm text-gray-500">
              {shippingType?.toLocaleUpperCase()}
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
          <div className="grid md:grid-cols-2 gap-6 mt-2">
            {shippingType === 'delivery' && renderDeliveryDetails()}
            {shippingType === 'pickup' && renderPickUpDetails()}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingDetails;

