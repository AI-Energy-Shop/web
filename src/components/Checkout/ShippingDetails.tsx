'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Check, FilePenLine, MoveRight } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PICK_UP_ESTIMATED_ARRIVAL_TIME } from '@/constant/shipping';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';
import { useCheckout } from '@/hooks/useCheckout';
import { ShippingType } from '@/store/features/checkout';
import { isButtonClickable } from './isButtonClickable';
import useCalculateDeliveryPricing from '@/hooks/useCalculateDeliveryPricing';
import LoadingSpinner from '../loading-spinner';
import ShippingOptionCard from './ShippingOptionCard';

interface ShippingDetailsProps {
  checkoutUserData: GetCheckoutUserDataQuery;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  checkoutUserData,
}) => {
  const {
    paymentStep,
    shippingOptions,
    handleShippingMethodClick,
    handleContinueClick,
    handleEditClick,
    isCartNeededManualQuote,
    carts,
  } = useCart({});

  const {
    warehouseLocation,
    pickUpNotes,
    deliveryNotes,
    pickUpOptions,
    shippingType,
    deliveryOptions,
    setDeliveryOptions,
    setShippingType,
    setPickUpNotes,
    setDeliveryNotes,
    setPickUpOptions,
    setShippingAddress,
    setCard,
  } = useCheckout();
  const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>(
    undefined
  );
  const [pickUpDate, setPickUpDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [shippingDeliveryOptions, setShippingDeliveryOptions] = React.useState<
    string | undefined
  >(undefined);

  const userCurrentAddress =
    checkoutUserData?.usersPermissionsUser?.addresses?.find(
      (address) => address?.isActive === true
    );

  const isUserHasDefaultAddress =
    checkoutUserData?.usersPermissionsUser?.addresses?.some(
      (address) => address?.isActive === true
    );

  const { data, isLoading, error } = useCalculateDeliveryPricing(
    userCurrentAddress?.city || '',
    userCurrentAddress?.zip_code || '',
    carts
  );

  const defaultCreditCard =
    checkoutUserData?.usersPermissionsUser?.creditCards?.find(
      (card) => card?.isDefault
    );

  useEffect(() => {
    setCard({
      brand: defaultCreditCard?.brand || '',
      expMonth: defaultCreditCard?.expMonth || '',
      expYear: defaultCreditCard?.expYear || '',
      last4Char: defaultCreditCard?.last4Char || '',
      stripePaymentMethodID: defaultCreditCard?.stripePaymentMethodID || '',
      isDefault: defaultCreditCard?.isDefault || true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    defaultCreditCard?.brand,
    defaultCreditCard?.expMonth,
    defaultCreditCard?.expYear,
    defaultCreditCard?.isDefault,
    defaultCreditCard?.last4Char,
    defaultCreditCard?.stripePaymentMethodID,
  ]);

  const notAbleToProceedToPayment = () => {
    let isTrue = false;

    if (!isUserHasDefaultAddress) {
      isTrue = true;
    }

    if (!Boolean(shippingType)) {
      isTrue = true;
    }

    if (shippingType === 'delivery' && !deliveryOptions) {
      isTrue = true;
    }

    if (
      shippingType === 'delivery' &&
      deliveryOptions?.type === 'manual' &&
      !deliveryOptions?.date
    ) {
      isTrue = true;
    }

    if (
      shippingType === 'delivery' &&
      deliveryOptions?.type === 'auto' &&
      !deliveryOptions?.macshipData
    ) {
      isTrue = true;
    }

    if (shippingType === 'pickup' && !pickUpOptions?.date) {
      isTrue = true;
    }

    return isTrue;
  };

  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  useEffect(() => {
    setShippingAddress({
      title: userCurrentAddress?.title || '',
      city: userCurrentAddress?.city || '',
      country: userCurrentAddress?.country || '',
      odoo_address_id: userCurrentAddress?.odoo_address_id || '',
      state: userCurrentAddress?.state || '',
      street1: userCurrentAddress?.street1 || '',
      street2: userCurrentAddress?.street2 || '',
      zip_code: userCurrentAddress?.zip_code || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = () => {
    return (
      <div className="bg-pink-darker-pink py-3">
        <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
          <h1 className="text-lg font-bold">Shipping</h1>
          {paymentStep > 2 && (
            <span className="bg-green-500 rounded-full p-0.5">
              <Check className="w-4 h-4" />
            </span>
          )}
          {paymentStep > 2 && (
            <div
              onClick={handleEditClick}
              className="absolute cursor-pointer right-0 md:right-4 flex items-center gap-x-1 top-1/2 transform -translate-y-1/2"
            >
              <span className="font-thin underline">Edit</span>
              <span>
                <FilePenLine className="w-5 h-5" strokeWidth={1.5} />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDeliveryMethodOptions = () => {
    return (
      <div className="flex justify-center items-center px-4 gap-x-4">
        {shippingOptions.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              handleShippingMethodClick(index);
              setShippingType(item.value as ShippingType);
            }}
            className={`basis-1/3 p-0.5 rounded-2xl cursor-pointer ${item.active ? 'gradient-effect' : 'bg-black opacity-50'}`}
          >
            <div className="bg-white rounded-2xl text-center p-2">
              <DynamicIcon
                name={item.icon.type}
                size={item.icon.size}
                className={item.icon.className}
                strokeWidth={item.icon.strokeWidth}
              />
              <h1 className=" font-bold">{item.title}</h1>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderShippingAddress = () => {
    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-blue-navy-blue">Ship To:</h1>
          <Link
            href={`/address`}
            className="flex user-select-none items-center gap-x-1 relative border-b border-black"
          >
            <p className="text-[12px]">Change Address</p>
            <MoveRight className="w-4" />
          </Link>
        </div>
        {userCurrentAddress ? (
          <div className="text-xs">
            <h1 className="font-bold">{userCurrentAddress?.title}</h1>
            <h2>{userCurrentAddress?.street1}</h2>
            <h2>{userCurrentAddress?.street2}</h2>
            <h2>
              {userCurrentAddress?.city}, {userCurrentAddress?.state}{' '}
              {userCurrentAddress?.zip_code}
            </h2>
            <h2>{userCurrentAddress?.country}</h2>
          </div>
        ) : (
          <h1 className="font-bold text-sm text-red-500">
            Please select an address
          </h1>
        )}
      </div>
    );
  };

  const renderPickUpAddress = () => {
    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-blue-navy-blue">Pick Up From:</h1>
        </div>
        <div>
          <h1 className="text-sm font-bold">
            AI EneryShop - {warehouseLocation?.name.toUpperCase()} Warehouse
          </h1>
          <h2 className="text-sm">{warehouseLocation?.title}</h2>
        </div>
      </div>
    );
  };

  const renderPickUpAddressOrShippingAddress = (value: string) => {
    if (value === 'delivery') {
      return renderShippingAddress();
    }

    if (value === 'pickup') {
      return renderPickUpAddress();
    }
  };

  const renderDeliveryOptions = () => {
    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12 space-y-2">
        <h1 className="font-bold">Delivery Options:</h1>

        <div className="relative max-h-96 overflow-y-scroll space-y-2">
          {isCartNeededManualQuote && (
            <div className="absolute w-full h-full bg-pink-darker-pink flex flex-col justify-center items-center text-center text-white z-10">
              <h1 className="font-bold text-xl">Soonest Available Delivery</h1>
              <p className="text-xs">
                some of your product needed to manually quoted
              </p>
              <p className="font-semibold">
                (or you can choose specific date below)
              </p>
            </div>
          )}

          {data?.map((route) => (
            <ShippingOptionCard
              key={`${route.requestId}-${route.carrierService.id}`}
              route={route}
              shippingDeliveryOptions={shippingDeliveryOptions}
              setShippingDeliveryOptions={setShippingDeliveryOptions}
              setDeliveryDate={setDeliveryDate}
            />
          ))}

          {data.length === 0 && !isLoading && !error && (
            <p className="text-center text-sm font-bold">
              There is no available pricing
            </p>
          )}

          {isLoading && <LoadingSpinner />}
          {error && (
            <p className="text-center text-sm text-red-500 font-bold">
              {error}
            </p>
          )}
        </div>

        <div
          className={`flex items-center space-x-2 px-2 ${shippingDeliveryOptions === 'manual' && 'border-2 border-purple-purp-aes rounded-lg'}`}
        >
          <div>
            <p className="font-bold text-sm">
              TBC - Request delivery on specified date
            </p>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-fit justify-start gap-2 px-2 font-normal hover:bg-transparent',
                      !deliveryDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg text-muted-foreground">
                      {deliveryDate ? formatDate(deliveryDate) : 'Select date'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deliveryDate}
                    onSelect={(e) => {
                      setDeliveryDate(e);
                      setShippingType('delivery');
                      setDeliveryOptions({
                        type: 'manual',
                        date: e?.toISOString(),
                        macshipData: null,
                      });
                    }}
                    initialFocus
                    disabled={{ before: TODAY }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderPickUpOptions = () => {
    return (
      <div className="border border-blue-navy-blue rounded-xl space-y-2 p-2 md:mx-12">
        <div>
          <h1 className="font-bold">Planned Pickup Date</h1>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-fit justify-start gap-2 px-2 font-normal hover:bg-transparent',
                    !pickUpDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-semibold">
                    {pickUpDate ? formatDate(pickUpDate) : 'Select date'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickUpDate}
                  onSelect={(date) => {
                    setPickUpDate(date);
                    setPickUpOptions({
                      date: date?.toISOString(),
                      estimatedArrivalTime:
                        pickUpOptions?.estimatedArrivalTime!,
                    });
                    setShippingType('pickup');
                  }}
                  initialFocus
                  disabled={{ before: TODAY }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold">Estimated Arrival Time</h1>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {PICK_UP_ESTIMATED_ARRIVAL_TIME.map((time) => {
              const isButtonAllowedToClick = isButtonClickable(
                pickUpDate!,
                time.date
              );

              return (
                <div
                  key={time.id}
                  className={`p-[2px] w-fit ${pickUpOptions?.estimatedArrivalTime === time.value ? 'gradient-effect' : 'border border-black'}
                  ${isButtonAllowedToClick ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}`}
                  onClick={() => {
                    if (!isButtonAllowedToClick) return;

                    setPickUpOptions({
                      date: pickUpDate?.toISOString(),
                      estimatedArrivalTime: time.value,
                    });
                  }}
                >
                  <Button className="bg-white hover:bg-white text-black rounded-none shadow-none pointer-events-none">
                    {time.value}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center font-light text-sm">
          NOTE: Order must be confirmed before pickup. Please allow 2-3 hours
          after confirmation for the order to be ready for pick up.
        </p>
      </div>
    );
  };

  const renderDeliveryNotes = () => {
    return (
      <div className="md:px-12 pb-4">
        <h1 className="font-bold">Delivery Notes</h1>
        <Textarea
          value={deliveryNotes}
          onChange={(e) => setDeliveryNotes(e.target.value)}
        />
      </div>
    );
  };

  const renderPickUpNotes = () => {
    return (
      <div className="md:px-12 pb-4">
        <h1 className="font-bold">PickUp Notes</h1>
        <Textarea
          value={pickUpNotes}
          onChange={(e) => setPickUpNotes(e.target.value)}
        />
      </div>
    );
  };

  return (
    <section className="w-full h-auto">
      {renderHeader()}
      <div className="bg-white">
        <div
          className={cn(
            `space-y-4 pt-4 ${paymentStep === 2 ? 'block' : 'hidden'}`
          )}
        >
          {renderDeliveryMethodOptions()}
          {shippingOptions?.map((item) => {
            if (item.active) {
              return (
                <React.Fragment key={item.id}>
                  {renderPickUpAddressOrShippingAddress(item.value)}
                  {item.value === 'delivery' && renderDeliveryOptions()}
                  {item.value === 'pickup' && renderPickUpOptions()}
                  {item.value === 'delivery'
                    ? renderDeliveryNotes()
                    : renderPickUpNotes()}
                </React.Fragment>
              );
            }
          })}

          <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 py-4">
            <Button
              onClick={handleContinueClick}
              disabled={notAbleToProceedToPayment()}
              className="mx-auto px-12 block rounded-2xl bg-blue-navy-blue hover:bg-blue-navy-blue/90"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingDetails;
