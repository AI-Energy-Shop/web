'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';
import React, { useEffect } from 'react';
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import { setPaymentStep } from '@/store/features/cart';
import { Check, FilePenLine } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/store/store';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import CartItems from './cart-items';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { CartsQuery } from '@/lib/gql/graphql';
import { setSelectedWarehouseLocation } from '@/store/features/me';
import { setSelectedLocation } from '@/store/features/checkout';

type ToRemoveItemId = string | undefined;
type DebounceTimer = NodeJS.Timeout | null;
type InventoryType = {
  melbourne: number;
  sydney: number;
  brisbane: number;
  documentId: string;
  __typename: string;
};

const Reviews = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.cart.carts);
  const warehouseLocation = useAppSelector(
    (state) => state.me.me?.account_detail?.warehouseLocation?.name
  );
  const paymentStep = useAppSelector((state) => state.cart.paymentStep);
  const LocationSelector: React.FC = () => (
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

  const Header: React.FC = () => (
    <div className="bg-yellow-aes-yellow py-3">
      <div className="ae-mobile-container px-2 md:px-12 text-white flex items-center gap-x-2 relative">
        <h1 className="text-lg font-bold">Review Items</h1>
        {paymentStep > 1 && (
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

  const VoucherCode: React.FC = () => (
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

  const handleEditClick = () => {
    dispatch(setPaymentStep(1));
  };

  const handleLocationChange = (value: string) => {
    const selectedWarehouseLocation = WAREHOUSE_LOCATIONS.find(
      (location) => location.id === Number(value)
    );
    if (selectedWarehouseLocation) {
      dispatch(setSelectedLocation(selectedWarehouseLocation));
      dispatch(setSelectedWarehouseLocation(selectedWarehouseLocation));
    }
  };

  const handleContinueClick = () => {
    dispatch(setPaymentStep(paymentStep + 1));
  };

  const checkLocationForItemNoStock = (carts: CartsQuery['carts']) => {
    const isThereItemNoStock = carts?.some((cart) => {
      const productLocationInventory =
        cart?.product?.inventory?.[warehouseLocation as keyof InventoryType];

      return (cart?.quantity || 0) > (Number(productLocationInventory) || 0);
    });
    return isThereItemNoStock;
  };

  const isUnableContinue =
    carts.length === 0 || checkLocationForItemNoStock(carts);

  const ContinueButton: React.FC = () => (
    <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 py-4">
      <Button
        disabled={isUnableContinue}
        className="mx-auto px-12 block rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90"
        onClick={handleContinueClick}
      >
        Continue to Shipping
      </Button>
    </div>
  );

  return (
    <section className="w-full h-auto">
      <Header />
      <div className="bg-white">
        <div
          className={cn(
            'space-y-4 pt-4',
            paymentStep === 1 ? 'block' : 'hidden'
          )}
        >
          <LocationSelector />
          <CartItems />
          <VoucherCode />
          <ContinueButton />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
