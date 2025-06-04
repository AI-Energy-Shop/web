import { SetStateAction, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // shadcn icons (or lucide-react)
import { Button } from '../ui/button';
import { Routes } from '@/lib/routes.types';
import { formatDate } from '../../utils/formatDate';
import { useCheckout } from '@/hooks/useCheckout';
import { Enum_Order_Shippingtype } from '@/lib/gql/graphql';

interface ShippingOptionCardProps {
  route: Routes;
  shippingDeliveryOptions: string | undefined;
  setShippingDeliveryOptions: React.Dispatch<
    SetStateAction<string | undefined>
  >;
  setDeliveryDate: React.Dispatch<SetStateAction<Date | undefined>>;
}

export default function ShippingOptionCard({
  route,
  shippingDeliveryOptions,
  setShippingDeliveryOptions,
  setDeliveryDate,
}: ShippingOptionCardProps) {
  const [open, setOpen] = useState(false);
  const { setShippingType, setDeliveryOptions, deliveryOptions } =
    useCheckout();
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div
      className={`flex flex-col gap-2 p-4 border-2 rounded-xl shadow-sm hover:shadow-md transition bg-white ${shippingDeliveryOptions === `${route.requestId}-${route.carrierService.id}` && deliveryOptions?.macshipData && 'border-purple-purp-aes'}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-gray-800">
            {route.carrier.displayName}
          </div>
          <div className="text-sm text-gray-500">
            {route.carrierService.displayName}
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={toggleOpen}>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-700">Est. Delivery:</span>{' '}
          {formatDate(route.despatchOptions[0].etaLocal)}
        </div>
        <div>
          <span className="font-medium text-gray-700">Weight:</span>{' '}
          {route.totalWeight}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700 transition-all">
        {open && (
          <div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                ${route.consignmentTotal.totalSellBeforeTax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>
                ${route.consignmentTotal.totalTaxSellPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 mt-2 border-t">
          <span className="text-base font-bold text-gray-800">Total</span>
          <span className="text-base font-bold text-blue-navy-blue">
            ${route.consignmentTotal.totalSellPrice.toFixed(2)}
          </span>
        </div>

        {open && (
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setShippingDeliveryOptions(
                `${route.requestId}-${route.carrierService.id}`
              );
              setDeliveryDate(undefined);
              setShippingType(Enum_Order_Shippingtype.Delivery);
              setDeliveryOptions({
                type: 'auto',
                date: undefined,
                macshipData: {
                  carrierAccountId: route.carrierAccount.id,
                  carrierId: route.carrier.id,
                  carrierServiceId: route.carrierService.id,
                  companyCarrierAccountId: route.companyCarrierAccountId,
                  companyId: route.companyId,
                  dgsDeclaration: false,
                  displayData: {
                    carrierDisplayName: route.carrier.displayName,
                    carrierServiceDisplayName: route.carrierService.displayName,
                    eta: route.despatchOptions[0].etaLocal,
                    totalSellBeforeTax:
                      route.consignmentTotal.totalSellBeforeTax.toFixed(2),
                    totalSellPrice:
                      route.consignmentTotal.totalSellPrice.toFixed(2),
                    totalTaxSellPrice:
                      route.consignmentTotal.totalTaxSellPrice.toFixed(2),
                    totalWeight: route.totalWeight,
                  },
                },
              });
            }}
          >
            Select this Option
          </Button>
        )}
      </div>
    </div>
  );
}
