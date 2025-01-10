import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Check, FilePenLine } from 'lucide-react';
import React from 'react';
import { Textarea } from '../ui/textarea';
import CartItems from './CartItems';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ReviewItemsProps {
  cartItems: any[];
  stepper: number;
  // voucherDetails: { voucherCode: string; orderNotes: string };
  onClickContinue: () => void;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewItems = ({
  cartItems,
  stepper,
  setStepper,
  onClickContinue,
}: ReviewItemsProps) => {
  return (
    <section className="lg:mb-4">
      <div className="bg-yellow-aes-yellow py-3">
        <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
          <h1 className="text-  lg font-bold ">Review Items</h1>
          {stepper > 1 && (
            <span className="bg-green-500 rounded-full p-0.5">
              <Check className="w-4 h-4" />
            </span>
          )}
          {stepper > 1 && (
            <div
              onClick={() => setStepper(1)}
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
      <div className="bg-white">
        {stepper === 1 ? (
          <div className="ae-mobile-container space-y-4 pt-4">
            <div className="max-sm:space-y-4 md:px-12 md:flex md:items-center md:justify-between">
              <h1 className="font-semibold">Selected Location:</h1>
              <Select>
                <SelectTrigger className="w-full md:w-8/12">
                  <SelectValue placeholder="Sydney(24/32-38 Belmore Rd, Punchbowl NSW)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CartItems data={cartItems} />

            <div className="space-y-4 pb-4 lg:border md:mx-10 lg:flex lg:px-2 lg:pb-4">
              <div className="h-0.5 w-full bg-black lg:hidden" />
              <div className="px-2 flex items-center gap-x-4 lg:block lg:flex-1">
                <h1>Voucher Code:</h1>
                <div className="flex-1 flex">
                  <Input className="rounded-none border border-blue-navy-blue" />
                  <Button className="bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-none">
                    Apply
                  </Button>
                </div>
              </div>
              <div className="h-0.5 w-full bg-black lg:hidden" />
              <div className="lg:flex-1">
                <h1 className="font-bold">Order Notes</h1>
                <Textarea className="min-h-9 h-9" />
              </div>
            </div>
          </div>
        ) : (
          <div className="ae-mobile-container ae-non-mobile-container px-2 opacity-50 lg:hidden">
            <h1 className="font-bold">Selected Location:</h1>
            <p>
              Sydney{' '}
              <span className="text-[12px]">
                (24/32-38 Belmore Rd, Punchbowl NSW)
              </span>
            </p>
          </div>
        )}
      </div>
      {stepper === 1 && (
        <div className="my-4">
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
    </section>
  );
};

export default ReviewItems;
