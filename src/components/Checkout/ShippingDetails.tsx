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
  const shipping = useSelector((state: RootState) => state.me.me?.shipping_addresses);
  const [shippingOptions, setShippingOptions] = useState<ShippingOptions>(SHIPPING_OPTIONS);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress[] | undefined>(undefined);
  
  const [step, setStep] = useState<number>(0);
  
  const handleShippingMethodClick = (index: number) =>
    setShippingOptions(
      shippingOptions.map((item, i) => ({
        ...item,
        active: i === index,
      }))
  );

  const handleContinueClick = () => {
    dispatch(setPaymentStep(3))
  }

  const handleEditClick = () => {
    dispatch(setPaymentStep(2))
  }

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
    )
  }

  const renderDeliveryMethodOptions = () => {
    return (
      <div className="flex justify-center items-center px-4 gap-x-4">
        {SHIPPING_OPTIONS.map((item, index) => (
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
    )
  }

  const renderShippingAddress = (item: ShippingAddress) => {
    return (
      <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-blue-navy-blue">
            Ship To:
          </h1>
          <Link
            href={`/shipping-addresses`}
            className="flex user-select-none items-center gap-x-1 relative border-b border-black"
          >
            <p className="text-[12px]">Change Address</p>
            <MoveRight className="w-4" />
          </Link>
        </div>

        {item.isActive && (
          <div>
            <h1 className="font-bold">{item.company}</h1>
            <h1> 
              {item.street}, {item.suburb}, {item .state_territory} {item.postcode}
            </h1>
            <h1>
              {item.name?.first_name} {item.name?.last_name} - {item.phone}
            </h1>
            <h1>Warehouse</h1>
          </div>
        )}
      </div>
    )
  }

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
    )
  }

  const renderDeliveryNotes = () => {
    return (
      <div className="md:px-12 pb-4">
        <h1 className="font-bold">Delivery Notes</h1>
        <Textarea />
      </div>
    )
  }



  useEffect(() => {
    setShippingAddress(shipping)
    setStep(stepper)
  }, [shipping, stepper])



  console.log("Shipping Details Step",step);

  return (
    <section className="w-full h-auto">
      {renderHeader()}
      <div className="bg-white">
        <div className={`space-y-4 pt-4 ${step === 2 ? 'block' : 'hidden'}`}>
          {renderDeliveryMethodOptions()}

          {shippingAddress?.map((item) => {
            if (item.isActive) {
              return (
                <React.Fragment key={item.id}>
                  {renderShippingAddress(item)}

                  {renderDeliveryOptions()}

                  {renderDeliveryNotes()}
                </React.Fragment>
              );
            }

            if (item.isActive) {
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
                            onSelect={() => {}}
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
              onClick={handleContinueClick}
              className="mx-auto px-12 block rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90"
            >
              Continue to Shipping
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingDetails;
