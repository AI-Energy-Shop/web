'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Check, FilePenLine, MoveRight } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { DELIVERY_OPTIONS } from '@/constant/shipping';
import Link from 'next/link';
import useMe from '@/hooks/useMe';
import useCart from '@/hooks/useCart';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';
import { useCheckoutSelector, useCheckoutDispatch } from '@/hooks/useCheckout';
import PickUpLocationModal from './PickUpLocationModal';
import {
  setShippingType,
  setPickUpNotes,
  setDeliveryNotes,
} from '@/store/features/checkout';

interface ShippingDetailsProps {
  checkoutUserData: GetCheckoutUserDataQuery;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  checkoutUserData,
}) => {
  const { user } = useMe();
  const {
    paymentStep,
    shippingOptions,
    date,
    handleShippingMethodClick,
    handleContinueClick,
    handleEditClick,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const checkoutDispatch = useCheckoutDispatch();

  const userCurrentAddress =
    checkoutUserData?.usersPermissionsUser?.addresses?.find(
      (address) => address?.isActive === true
    );

  const currentPickUpLocation = useCheckoutSelector(
    (state) => state.checkout.pickupDetails
  );

  const pickUpNotes = useCheckoutSelector(
    (state) => state.checkout.pickUpNotes
  );

  const deliveryNotes = useCheckoutSelector(
    (state) => state.checkout.deliveryNotes
  );

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
              checkoutDispatch(setShippingType(item.value));
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
          <h1 className="font-bold text-sm text-red-500">Pls Select Address</h1>
        )}
      </div>
    );
  };

  const renderPickUpAddress = () => {
    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
        <PickUpLocationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-blue-navy-blue">Pick Up From:</h1>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex user-select-none items-center gap-x-1 relative border-b border-black cursor-pointer"
          >
            <p className="text-[12px]">Change Address</p>
            <MoveRight className="w-4" />
          </div>
        </div>
        <div>
          <h1 className="text-sm font-bold">
            AI EneryShop - {currentPickUpLocation?.name.toUpperCase()} Warehouse
          </h1>
          <h2 className="text-sm">{currentPickUpLocation?.title}</h2>
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
      <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
        <h1 className="font-bold">Delivery Options:</h1>
        <RadioGroup onValueChange={() => {}}>
          {DELIVERY_OPTIONS.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center space-x-2 border-b border-b-gray-300"
              >
                <RadioGroupItem value={`${item.id}`} id={`${item.id}`} />
                <Label htmlFor={`${item.id}`}>
                  <div>
                    <p>
                      {item.prefix}
                      {item.price} ex. GST
                    </p>
                    <p>
                      {item.label} ({item.eta})
                    </p>
                  </div>
                </Label>
              </div>
            );
          })}

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="4" disabled />
            <Label htmlFor="4">
              <div>
                <p>TBC - Request delivery on specified date</p>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-fit justify-start gap-2 px-2 font-normal hover:bg-transparent',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg text-muted-foreground">
                          {/* {date ? formatDate(date) : 'Select date'} */}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={() => {}}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    );
  };

  const renderDeliveryNotes = () => {
    return (
      <div className="md:px-12 pb-4">
        <h1 className="font-bold">Delivery Notes</h1>
        <Textarea
          value={deliveryNotes}
          onChange={(e) => checkoutDispatch(setDeliveryNotes(e.target.value))}
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
          onChange={(e) => checkoutDispatch(setPickUpNotes(e.target.value))}
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
