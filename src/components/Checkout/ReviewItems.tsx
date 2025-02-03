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
  warehouseLocation: any[];
  onChangeWarehouse: (e: string) => void;
  onClickContinue: () => void;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
  onEdit: (index: number) => void;
}

const ReviewItems = ({
  cartItems,
  stepper,
  warehouseLocation,
  onChangeWarehouse,
  onClickContinue,
  onChange,
  onReduceQuant,
  onAddQuant,
  onEdit,
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
              onClick={() => onEdit(1)}
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
        {stepper === 1 && (
          <div className="ae-mobile-container space-y-4 pt-4">
            <div className="max-sm:space-y-4 md:px-12 md:flex md:items-center md:justify-between">
              <h1 className="font-semibold">Selected Location:</h1>
              <Select onValueChange={onChangeWarehouse}>
                <SelectTrigger className="w-full md:w-8/12">
                  <SelectValue placeholder={warehouseLocation[0].title} />
                </SelectTrigger>
                <SelectContent>
                  {warehouseLocation.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <CartItems
              data={cartItems}
              onChange={onChange}
              onAddQuant={onAddQuant}
              onReduceQuant={onReduceQuant}
            />

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

export default ReviewItems;
