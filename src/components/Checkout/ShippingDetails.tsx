'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  Check,
  FilePenLine,
  MoveRight,
  Truck,
  Warehouse,
} from 'lucide-react';
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

type ShippingOptions = {
  id: number;
  title: string;
  value: string;
  active: boolean;
  icon: JSX.Element;
}[];

const SHIPPING_OPTIONS: ShippingOptions = [
  {
    id: 0,
    title: 'Delivery',
    value: 'delivery',
    active: true,
    icon: <Truck className="w-10 h-10 mx-auto" strokeWidth={1} />,
  },
  {
    id: 1,
    title: 'Pick Up',
    value: 'pick_up',
    active: false,
    icon: <Warehouse className="w-10 h-10 mx-auto" strokeWidth={1} />,
  },
];

interface ShippingDetailsProps {
  date: Date;
  stepper: number;
  shippingAddresses: any[];
  deliveryOptions: any[];
  onEdit: (index: number) => void;
  onClickContinue: () => void;
  onDeliveryOptionChange: (id: string) => void;
  onShippingOptionChange: (id: string) => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  date,
  stepper,
  shippingAddresses,
  deliveryOptions,
  onEdit,
  setDate,
  onClickContinue,
  onDeliveryOptionChange,
  onShippingOptionChange,
}) => {
  const [shippingOptions, setShippingOptions] =
    useState<ShippingOptions>(SHIPPING_OPTIONS);

  const handleShippingOptionsClick = (index: number) =>
    setShippingOptions(
      shippingOptions.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );

  return (
    <section className="lg:mb-4">
      <div className="bg-pink-darker-pink py-3">
        <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
          <h1 className="text-lg font-bold">Shipping</h1>
          {stepper > 2 && (
            <span className="bg-green-500 rounded-full p-0.5">
              <Check className="w-4 h-4" />
            </span>
          )}
          {stepper > 2 && (
            <div
              onClick={() => onEdit(2)}
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
      <div className={`bg-white ${stepper < 2 ? 'hidden' : 'block'}`}>
        {stepper === 2 && (
          <div className="ae-mobile-container pt-4 space-y-4">
            <div className="flex justify-center items-center px-4 gap-x-4">
              {shippingOptions.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleShippingOptionsClick(index)}
                  className={`basis-1/3 p-0.5 rounded-2xl cursor-pointer ${item.active ? 'gradient-effect' : 'bg-black opacity-50'}`}
                >
                  <div className="bg-white rounded-2xl text-center p-2">
                    {item.icon}
                    <h1 className=" font-bold">{item.title}</h1>
                  </div>
                </div>
              ))}
            </div>

            {shippingOptions.map((item) => {
              if (item.value === 'delivery' && item.active) {
                return (
                  <React.Fragment key={item.id}>
                    {/* Shipping Address */}
                    <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
                      <div className="flex items-center justify-between">
                        <h1 className="font-bold text-blue-navy-blue">
                          Ship To:
                        </h1>
                        <div className="flex items-center gap-x-1 relative border-b border-black">
                          <p className="text-[12px]">Change Address</p>
                          <MoveRight className="w-4" />
                        </div>
                      </div>
                      {shippingAddresses.map((item) => {
                        if (item.active === true) {
                          return (
                            <div key={item.id}>
                              <h1 className="font-bold">{item.title}</h1>
                              <h1>
                                {item.address.street}, {item.address.suburb},{' '}
                                {item.address.state_territory}{' '}
                                {item.address.postcode}
                              </h1>
                              <h1>
                                {item.user.firstName} {item.user.lastName} -{' '}
                                {item.user.phone}
                              </h1>
                              <h1>Warehouse</h1>
                            </div>
                          );
                        }
                      })}
                    </div>

                    {/* Delivery Options */}
                    <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
                      <h1 className="font-bold">Delivery Options:</h1>

                      <RadioGroup onValueChange={onDeliveryOptionChange}>
                        {deliveryOptions.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center space-x-2 border-b border-b-gray-300"
                            >
                              <RadioGroupItem
                                value={`${item.id}`}
                                id={`${item.id}`}
                              />
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
                          <RadioGroupItem value="4" id="4" />
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
                                        {date
                                          ? formatDate(date)
                                          : 'Select date'}
                                      </span>
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={date}
                                      onSelect={(e) => setDate(e!)}
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

                    {/* Delivery Notes */}
                    <div className="md:px-12 pb-4">
                      <h1 className="font-bold">Delivery Notes</h1>
                      <Textarea />
                    </div>
                  </React.Fragment>
                );
              }

              if (item.value === 'pick_up' && item.active) {
                return (
                  <React.Fragment key={item.id}>
                    {/* Pick Up Address */}
                    <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
                      <div className="flex items-center justify-between">
                        <h1 className="font-bold text-blue-navy-blue">
                          Pick From:
                        </h1>
                        <Dialog>
                          <DialogTrigger>
                            <div className="flex items-center gap-x-1 relative border-b border-black">
                              <p className="text-[12px]">Change Address</p>
                              <MoveRight className="w-4" />
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Choose Pick up location</DialogTitle>
                            </DialogHeader>
                            <div>
                              <RadioGroup
                                defaultValue="option-one"
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="option-one"
                                    id="option-one"
                                  />
                                  <Label htmlFor="option-one">
                                    Melbourne, VIC
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="option-two"
                                    id="option-two"
                                  />
                                  <Label htmlFor="option-two">
                                    Sydney, NSW
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="option-three"
                                    id="option-three"
                                  />
                                  <Label htmlFor="option-three">
                                    Brisbane, QLD
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div>
                        <h1 className="font-bold">
                          AI Energy Shop - Sydney Warehouse
                        </h1>
                        <h1>24/32-38 Belmore Rd, Punchbowl NSW</h1>
                      </div>
                    </div>

                    {/* Delivery Options */}
                    <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
                      <div>
                        <h1 className="font-bold">Delivery Options:</h1>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                'w-fit justify-start gap-2 px-2 font-normal hover:bg-transparent',
                                !date && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="h-5 w-5 " />
                              <span className="text-lg underline">
                                {date ? formatDate(date) : 'Select date'}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(e) => setDate(e!)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <h1 className="font-bold">Estimated Arrival Time:</h1>
                        <div className="p-2 flex flex-wrap justify-center gap-2">
                          <div className="gradient-effect p-0.5">
                            <p className="bg-white p-2">7:30am - 9am</p>
                          </div>
                          <div className="bg-black p-0.5">
                            <p className="bg-white p-2">9am - 11am</p>
                          </div>
                          <div className="bg-black p-0.5">
                            <p className="bg-white p-2">11am - 1pm</p>
                          </div>
                          <div className="bg-black p-0.5">
                            <p className="bg-white p-2">1pm - 3pm</p>
                          </div>
                          <div className="bg-black p-0.5">
                            <p className="bg-white p-2">3pm - 5pm</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[14px] text-center">
                        NOTE: Order must be confirmed before pickup. Please
                        allow 2-3 hours after confirmation for the order to be
                        ready for pick up.
                      </p>
                    </div>

                    {/* Delivery Notes */}
                    <div className="md:px-12 pb-4">
                      <h1 className="font-bold">Delivery Notes</h1>
                      <Textarea />
                    </div>
                  </React.Fragment>
                );
              }
            })}

            <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 lg:py-4 ">
              <Button
                className="mx-auto px-12 block rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90"
                onClick={onClickContinue}
              >
                Continue to Shipping
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShippingDetails;
