'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import CartItems from './CartItems';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RootState } from '@/store/store';
import { Textarea } from '../ui/textarea';
import { Check, FilePenLine } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Cart } from '@/store/features/cart';
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import {
  setPaymentStep,
  setCartQuantity,
  removeCart,
} from '@/store/features/cart';

interface ReviewItemsProps {}

const ReviewItems: React.FC<ReviewItemsProps> = () => {
  const dispatch = useDispatch();
  const paymentStep = useSelector((state: RootState) => state.cart.paymentStep);
  const carts = useSelector((state: RootState) => state.cart.carts);
  const [data, setData] = useState<Cart[]>([]);
  const [step, setStep] = useState<number>(0);

  const handleEditClick = () => {
    dispatch(setPaymentStep(1));
  };

  const handleLocationChange = (value: string) => {
    // Handle location change
  };

  const handleContinueClick = () => {
    if (data.length === 0) return;
    dispatch(setPaymentStep(step + 1));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const cart = data.find((cart) => cart.id === id);
    if (cart) {
      dispatch(setCartQuantity({ id, quantity: parseInt(e.target.value) }));
    }
  };

  const handleReduceQuant = (id: string) => {
    const cart = data.find((cart) => cart.id === id);
    if (cart) {
      cart.quantity <= 1
        ? dispatch(removeCart({ id }))
        : dispatch(setCartQuantity({ id, quantity: cart.quantity - 1 }));
    }
  };

  const handleAddQuant = (id: string) => {
    const cart = data.find((cart) => cart.id === id);
    if (cart) {
      dispatch(setCartQuantity({ id, quantity: cart.quantity + 1 }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeCart({ id }));
  };

  useEffect(() => {
    setData(carts);
    setStep(paymentStep);
  }, [carts, paymentStep]);

  const renderHeader = () => (
    <div className="bg-yellow-aes-yellow py-3">
      <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
        <h1 className="text-lg font-bold">Review Items</h1>
        {step > 1 && (
          <>
            <span className="bg-green-500 rounded-full p-0.5">
              <Check className="w-4 h-4" />
            </span>
            <div
              onClick={handleEditClick}
              className="absolute cursor-pointer right-0 md:right-4 flex items-center gap-x-1 top-1/2 transform -translate-y-1/2"
            >
              <span className="font-thin underline">Edit</span>
              <span>
                <FilePenLine className="w-5 h-5" strokeWidth={1.5} />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderCartItems = () => {
    if (data.length === 0) return null;
    return (
      <CartItems
        data={data}
        onChange={handleChange}
        onReduceQuant={handleReduceQuant}
        onAddQuant={handleAddQuant}
        onRemove={handleRemove}
      />
    );
  };

  const renderLocationSelection = () => (
    <div className="max-sm:space-y-4 md:px-12 md:flex md:items-center md:justify-between">
      <h1 className="font-semibold">Selected Location:</h1>
      <Select onValueChange={handleLocationChange}>
        <SelectTrigger className="w-full md:w-8/12">
          <SelectValue placeholder={WAREHOUSE_LOCATIONS[0].title} />
        </SelectTrigger>
        <SelectContent>
          {WAREHOUSE_LOCATIONS.map((location) => (
            <SelectItem key={location.id} value={location.id.toString()}>
              {location.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderVoucherCode = () => (
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
  );

  const renderButton = () => (
    <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 lg:py-4">
      <Button
        disabled={data.length === 0}
        className="mx-auto px-12 block rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90"
        onClick={handleContinueClick}
      >
        Continue to Shipping
      </Button>
    </div>
  );

  console.log('Review Items Step', step);
  return (
    <section className="w-full h-auto">
      {renderHeader()}
      <div className="bg-white">
        <div className={`space-y-4 pt-4 ${step === 1 ? 'block' : 'hidden'}`}>
          {renderLocationSelection()}
          {renderCartItems()}
          {renderVoucherCode()}
          {renderButton()}
        </div>
      </div>
    </section>
  );
};

export default ReviewItems;
