import React from 'react';
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

interface ShippingDetailsProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  onClickContinue: () => void;
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  isShippingDelivery: boolean;
  setIsShippingDelivery: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  date,
  setDate,
  stepper,
  radioValue,
  setRadioValue,
  isShippingDelivery,
  setStepper,
  onClickContinue,
  setIsShippingDelivery,
}) => {
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
              onClick={() => setStepper(2)}
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
        {stepper === 2 ? (
          <div className="ae-mobile-container pt-4 space-y-4">
            <div className="flex justify-center items-center px-4 gap-x-4">
              <div
                onClick={(e) => setIsShippingDelivery(true)}
                className={`basis-1/3 p-0.5 rounded-2xl cursor-pointer ${isShippingDelivery ? 'gradient-effect' : 'bg-black opacity-50'}`}
              >
                <div className="bg-white rounded-2xl text-center p-2">
                  <Truck className="w-10 h-10 mx-auto" strokeWidth={1} />
                  <h1 className=" font-bold">Delivery</h1>
                </div>
              </div>
              <div
                onClick={(e) => setIsShippingDelivery(false)}
                className={`basis-1/3 p-0.5 rounded-2xl cursor-pointer ${isShippingDelivery ? 'bg-black opacity-50' : 'gradient-effect'}`}
              >
                <div className="bg-white rounded-2xl text-center p-2">
                  <Warehouse className="w-10 h-10 mx-auto" strokeWidth={1} />
                  <h1 className=" font-bold">Pick Up</h1>
                </div>
              </div>
            </div>
            {isShippingDelivery ? (
              <>
                <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12">
                  <div className="flex items-center justify-between">
                    <h1 className="font-bold text-blue-navy-blue">Ship To:</h1>
                    <div className="flex items-center gap-x-1 relative border-b border-black">
                      <p className="text-[12px]">Change Address</p>
                      <MoveRight className="w-4" />
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold">Fake Company Installs</h1>
                    <h1>123 Fake St, Springfield, NSW 2345</h1>
                    <h1>Frank Grimes - 0444 444 441</h1>
                    <h1>Warehouse</h1>
                  </div>
                </div>

                <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
                  <h1 className="font-bold">Delivery Options:</h1>

                  <RadioGroup
                    defaultValue={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <div className="flex items-center space-x-2 border-b border-b-gray-300">
                      <RadioGroupItem value="1" id="1" />
                      <Label htmlFor="1">
                        <div>
                          <p>$39.47 ex. GST</p>
                          <p>TNT Standard Shipping (3-4 Business Days)</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border-b border-b-gray-300">
                      <RadioGroupItem value="2" id="2" />
                      <Label htmlFor="2">
                        <div>
                          <p>$73.60 ex. GST</p>
                          <p>TNT Express Shipping (1-2 Business Days)</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border-b border-b-gray-300">
                      <RadioGroupItem value="3" id="3" />
                      <Label htmlFor="3">
                        <div>
                          <p>$90.01 ex. GST</p>
                          <p>Hi-Trans High Priority Next Day Shipping</p>
                          <p>(1 Business Day)</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="4" />
                      <Label htmlFor="4">
                        <div>
                          <p>TBC - Request delivery on specified date</p>
                          <div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={radioValue !== '4'}
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

                <div className="md:px-12 pb-4">
                  <h1 className="font-bold">Delivery Notes</h1>
                  <Textarea />
                </div>
              </>
            ) : (
              <>
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
                              <Label htmlFor="option-one">Melbourne, VIC</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="option-two"
                                id="option-two"
                              />
                              <Label htmlFor="option-two">Sydney, NSW</Label>
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
                    NOTE: Order must be confirmed before pickup. Please allow
                    2-3 hours after confirmation for the order to be ready for
                    pick up.
                  </p>
                </div>
                <div className="md:px-12 pb-4">
                  <h1 className="font-bold">Delivery Notes</h1>
                  <Textarea />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="ae-mobile-container ae-non-mobile-container px-2 opacity-50 lg:hidden">
            <h1>Delivery:</h1>
            <h2>Unit 34/49 McArthurs Rd,</h2>
            <h2>Altona North VIC 3025</h2>
            <h2>TNT Standard Shipping (3-4 Business Days)</h2>
          </div>
        )}
      </div>

      {stepper === 2 && (
        <div className="my-4 ">
          <div className="bg-white ae-mobile-container py-2 lg:hidden mx-10">
            <div className="px-2">
              <div className="flex items-center justify-between border-b border-b-gray-400">
                <h1>Sub-total(ex.GST)</h1>
                <p>$3,270.60</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-gray-400">
                <h1>Delivery</h1>
                <p>$39.47</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-gray-600">
                <h1>GST</h1>
                <p>$331.01</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="font-bold">Total</span>
                  <span>(inc.GST)</span>
                </div>
                <p className="font-bold">$3,597.66</p>
              </div>
            </div>
          </div>
          <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 lg:pb-4">
            <Button
              className="block mx-auto px-12 rounded-2xl bg-blue-navy-blue hover:bg-blue-navy-blue/90"
              onClick={onClickContinue}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShippingDetails;
