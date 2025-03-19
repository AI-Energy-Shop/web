'use client';
import React, { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  DELIVERY_OPTIONS,
  SHIPPING_OPTIONS,
  ShippingOptions,
} from '@/constant/shipping';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { type ShippingAddress } from '@/store/features/me';
import { setPaymentStep } from '@/store/features/cart';
interface ShippingDetailsProps {}

const ShippingDetails: React.FC<ShippingDetailsProps> = () => {
  const date = new Date();
  const dispatch = useDispatch();
  const stepper = useSelector((state: RootState) => state.cart.paymentStep);
  const shipping = useSelector(
    (state: RootState) => state.me.me?.account_detail?.shipping_addresses
  );
  const [shippingOptions, setShippingOptions] =
    useState<ShippingOptions>(SHIPPING_OPTIONS);
  const [shippingAddress, setShippingAddress] = useState<
    ShippingAddress[] | undefined
  >(undefined);

  const [step, setStep] = useState<number>(0);

  const handleShippingMethodClick = (index: number) => {
    console.log('Shipping Options', index);
    setShippingOptions(
      shippingOptions.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  const handleContinueClick = () => {
    dispatch(setPaymentStep(3));
  };

  const handleEditClick = () => {
    dispatch(setPaymentStep(2));
  };

  const renderHeader = () => {
    return (
      <div className="bg-pink-darker-pink py-3">
        <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
          <h1 className="text-lg font-bold">Shipping</h1>
          {step > 2 && (
            <span className="bg-green-500 rounded-full p-0.5">
              <Check className="w-4 h-4" />
            </span>
          )}
          {step > 2 && (
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
            onClick={() => handleShippingMethodClick(index)}
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

  const renderShippingAddress = (value: string) => {
    const item = shippingAddress?.find((item) => item.isActive);

    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-blue-navy-blue">
            {value === 'delivery' ? 'Ship To:' : 'Pick Up From:'}
          </h1>
          <Link
            href={`/shipping-addresses`}
            className="flex user-select-none items-center gap-x-1 relative border-b border-black"
          >
            <p className="text-[12px]">Change Address</p>
            <MoveRight className="w-4" />
          </Link>
        </div>

        {item?.isActive && (
          <div>
            <h1 className="font-bold">{item.company}</h1>
            <h1>
              {item.street1}, {item.street2}, {item.city}, {item.state}{' '}
              {item.zipCode}
            </h1>
            <h1>
              {item.name?.first_name} {item.name?.last_name} - {item.phone}
            </h1>
            <h1>Warehouse</h1>
          </div>
        )}
      </div>
    );
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
                          {date ? formatDate(date) : 'Select date'}
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
        <Textarea />
      </div>
    );
  };

  useEffect(() => {
    setShippingAddress(shipping);
    setStep(stepper);
  }, [shipping, stepper]);

  return (
    <section className="w-full h-auto">
      {renderHeader()}
      <div className="bg-white">
        <div className={`space-y-4 pt-4 ${step === 2 ? 'block' : 'hidden'}`}>
          {renderDeliveryMethodOptions()}
          {shippingOptions?.map((item) => {
            if (item.active) {
              return (
                <React.Fragment key={item.id}>
                  {renderShippingAddress(item.value)}
                  {item.value === 'delivery' && renderDeliveryOptions()}
                  {item.value === 'delivery' && renderDeliveryNotes()}
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
