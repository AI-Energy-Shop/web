'use client';
import Image from 'next/image';
import Logo from '../../../../public/images/logo/AES-Logomark_750px-M.png';
import {
  CalendarIcon,
  ChevronLeft,
  Minus,
  MoveRight,
  Plus,
  Trash2,
  Truck,
  Warehouse,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SampleImage from '../../../../public/images/background/eCactus-Promo-Banner-Mobile.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from '@/components/ui/calendar';

function CheckoutPage() {
  const arr = 4;
  const [date, setDate] = useState<Date>(new Date());
  const [radioValue, setRadioValue] = useState<string>('1');

  return (
    <main className="bg-yellow-light-yellow pb-96">
      <header className="bg-white">
        <section className="h-28 relative ae-mobile-container">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
            <Image
              width={40}
              height={40}
              src={Logo}
              alt="ai energy shop"
              className="w-auto h-auto block mx-auto"
            />
            <p className="text-[10px] text-purple-purp-aes font-black tracking-widest">
              AI ENERGY SHOP
            </p>
          </div>
          <div className="text-[14px] absolute left-0 top-2 flex items-center gap-x-1 border border-black py-2 pr-2 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
            <div>
              <p>Continue</p>
              <p>Shopping</p>
            </div>
          </div>

          <div className="absolute h-0.5 w-full bottom-5 left-0 bg-gradient-to-r from-yellow-aes-yellow via-pink-lighter-pink to-blue-navy-blue">
            <div className="relative">
              <span className="absolute bg-yellow-aes-yellow h-5 w-5 rounded-full -top-2 left-0" />
              <span className="absolute bg-pink-lighter-pink h-5 w-5 rounded-full -top-2 left-1/2 transform -translate-x-1/2 " />
              <span className="absolute bg-blue-navy-blue h-5 w-5 rounded-full -top-2 right-0" />
            </div>
          </div>
        </section>
      </header>

      <h1 className="text-xl font-bold ae-mobile-container py-4">Checkout</h1>

      {/* <section>
        <div className="bg-yellow-aes-yellow py-3">
          <h1 className="text-lg font-bold ae-mobile-container px-2 text-white">
            Review Items
          </h1>
        </div>
        <div className="bg-white py-4">
          <div className="ae-mobile-container space-y-4">
            <h1 className="font-semibold">Selected Location:</h1>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  className="tex"
                  placeholder="Sydney(24/32-38 Belmore Rd, Punchbowl NSW)"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-8 pt-8">
              {new Array(arr).fill(0).map((item, index) => {
                return (
                  <div key={index} className="space-y-4">
                    <div className="flex gap-x-1">
                      <div className="relative h-24 flex-1">
                        <Image
                          src={SampleImage}
                          alt="picture"
                          fill
                          className="object-contain object-top"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-green-700">
                          In Stock (22)
                        </p>
                        <h1 className="text-[14px] font-bold">
                          Solplanet 5kW S-G2 Series Single Phase Inverter
                        </h1>
                        <p className="font-thin text-[14px]">ASW5000-S-G2</p>
                      </div>
                      <div className="flex-1 self-center">
                        <h2>$1,000.20</h2>
                        <p className="text-[12px]">ex.GST</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="self-center"
                      >
                        <Trash2 className="w-5 h-5" color="red" />
                      </Button>
                    </div>
                    <div className="flex border border-black">
                      <div className="flex-2 text-center bg-gray-300 place-content-center place-items-center">
                        QTY
                      </div>
                      <div className="flex-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
                        >
                          <Minus />
                        </Button>
                      </div>
                      <div className="flex-2 text-center place-content-center place-items-center">
                        2
                      </div>
                      <div className="flex-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-gray-200 rounded-none w-full h-full border-x border-x-black"
                        >
                          <Plus />
                        </Button>
                      </div>
                      <div className="flex-3 text-right pr-2">
                        <p>$2,000.40</p>
                        <p className="text-[14px]">ex.GST</p>
                      </div>
                    </div>
                    {arr !== index + 1 && (
                      <div className="h-0.5 w-full bg-purple-purp-aes" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-0.5 w-full bg-black" />

            <div className="px-2 flex items-center gap-x-4">
              <h1>Voucher Code:</h1>
              <div className="flex-1 flex">
                <Input className="rounded-none border border-blue-navy-blue" />
                <Button className="bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-none">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <div className="bg-pink-darker-pink py-3">
          <h1 className="text-lg font-bold ae-mobile-container px-2 text-white">
            Shipping
          </h1>
        </div>
        <div className="bg-white py-4">
          <div className="ae-mobile-container space-y-4">
            <div className="flex px-4 gap-x-4">
              <div className="basis-1/2 gradient-effect p-0.5 rounded-2xl">
                <div className="bg-white rounded-2xl text-center p-2">
                  <Truck className="w-10 h-10 mx-auto" strokeWidth={1} />
                  <h1 className=" font-bold">Delivery</h1>
                </div>
              </div>
              <div className="basis-1/2 bg-black p-0.5 rounded-2xl">
                <div className="bg-white rounded-2xl text-center p-2">
                  <Warehouse className="w-10 h-10 mx-auto" strokeWidth={1} />
                  <h1 className=" font-bold">Pick Up</h1>
                </div>
              </div>
            </div>
            <div className="border border-blue-navy-blue rounded-xl p-2">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-blue-navy-blue">Ship To:</h1>
                <div className="flex items-center gap-x-1 relative">
                  <p className="text-[12px]">Change Address</p>
                  <MoveRight className="w-4" />
                  <div className="absolute bottom-1 right-0 h-[1px] w-[105px] bg-black" />
                </div>
              </div>
              <h1 className="font-bold">Fake Company Installs</h1>
              <h1>123 Fake St, Springfield, NSW 2345</h1>
              <h1>Frank Grimes - 0444 444 441</h1>
              <h1>Warehouse</h1>
            </div>

            <div className="border border-blue-navy-blue rounded-xl p-2">
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
          </div>
        </div>
      </section>

      {/* <section>
        <div className="bg-white ae-mobile-container py-2">
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

        <div className="ae-mobile-container px-2 mt-4">
          <Button className="w-full rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90">
            Continue to Shipping
          </Button>
        </div>
      </section> */}
    </main>
  );
}

export default CheckoutPage;
