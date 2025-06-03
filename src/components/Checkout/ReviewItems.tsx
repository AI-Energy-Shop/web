'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import { setPaymentStep } from '@/store/features/cart';
import { Check, FilePenLine } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import ModalWrapper from './ModalWrapper';
import React, { useEffect, useRef, useState } from 'react';
import useCart from '@/hooks/useCart';
import { Button } from '../ui/button';
import CartItems from './CartItems';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useCheckout } from '@/hooks/useCheckout';
import { useAppDispatch } from '@/store/hooks';

interface ReviewItemsProps {}

const ReviewItems: React.FC<ReviewItemsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {
    carts,
    paymentStep,
    removeItemFromCart,
    updateApolloClientCartData,
    updateCartItem,
  } = useCart({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toRemoveItemId, setToRemoveItemId] = useState<string | undefined>(
    undefined
  );
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_DELAY = 1500;
  const { warehouseLocation, setWarehouseLocation, orderNotes, setOrderNotes } =
    useCheckout();

  const checkIfProductLocationQuantityIsOkToProceed = () => {
    const productWithNoStockInCurrentLocation = carts.find((cartItem) => {
      return (
        (cartItem?.product?.inventory?.[
          warehouseLocation?.name.toLowerCase() as keyof typeof cartItem.product.inventory
        ] || 0) < 1
      );
    });

    return !!productWithNoStockInCurrentLocation;
  };

  useEffect(() => {
    dispatch(setPaymentStep(1));

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfCartQuantityIsExceeded = () => {
    const isThereExceededCart = carts?.some((cart) => {
      const productLocationInventory =
        cart?.product?.inventory?.[
          warehouseLocation?.name as keyof typeof cart.product.inventory
        ];
      return cart?.quantity! > productLocationInventory;
    });

    return isThereExceededCart;
  };

  const handleEditClick = () => {
    dispatch(setPaymentStep(1));
  };

  const handleLocationChange = (value: string) => {
    const productLocation = WAREHOUSE_LOCATIONS.find(
      (location) => location.id === Number(value)
    );
    setWarehouseLocation(productLocation!);
  };

  const handleContinueClick = () => {
    if (carts.length === 0) return;
    dispatch(setPaymentStep(paymentStep + 1));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const cart = carts.find((cart) => cart?.documentId === id);
    if (cart) {
      const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);

      updateApolloClientCartData(cart.documentId, value);

      // debounce functionality to delay network request when the value change so fast
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        await updateCartItem({
          variables: { documentId: cart.documentId, data: { quantity: value } },
        });
      }, DEBOUNCE_DELAY);
    }
  };

  const handleReduceQuant = (id: string) => {
    const cart = carts.find((cart) => cart?.documentId === id);
    if (cart) {
      if (cart.quantity <= 1) {
        setShowModal(!showModal);
        setToRemoveItemId(id);
      } else {
        updateApolloClientCartData(cart.documentId, cart.quantity - 1);

        // debounce functionality to delay network request when the value change so fast
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(async () => {
          await updateCartItem({
            variables: {
              documentId: cart.documentId,
              data: { quantity: cart.quantity - 1 },
            },
          });
        }, DEBOUNCE_DELAY);
      }
    }
  };

  const handleAddQuant = (id: string) => {
    const cart = carts.find((cart) => cart?.documentId === id);
    if (cart) {
      updateApolloClientCartData(cart.documentId, cart.quantity + 1);

      // debounce functionality to delay network request when the value change so fast
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        await updateCartItem({
          variables: {
            documentId: cart.documentId,
            data: { quantity: cart.quantity + 1 },
          },
        });
      }, DEBOUNCE_DELAY);
    }
  };

  const handleRemove = (id: string) => {
    setShowModal(!showModal);
    setToRemoveItemId(id);
  };

  const handleConfirmRemove = () => {
    if (!toRemoveItemId) return;
    removeItemFromCart(toRemoveItemId);
    setShowModal(false);
  };

  const renderHeader = () => (
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
        <Textarea
          className="min-h-9 h-9"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      </div>
    </div>
  );

  const renderButton = () => (
    <div className="ae-mobile-container px-2 mt-4 lg:bg-white lg:-mt-4 py-4">
      <Button
        disabled={
          carts.length === 0 ||
          checkIfProductLocationQuantityIsOkToProceed() ||
          checkIfCartQuantityIsExceeded()
        }
        className="mx-auto px-12 block rounded-2xl bg-pink-darker-pink hover:bg-pink-darker-pink/90"
        onClick={handleContinueClick}
      >
        Continue to Shipping
      </Button>
    </div>
  );

  return (
    <section className="w-full h-auto">
      {renderHeader()}
      <div className="bg-white">
        <div
          className={cn(
            `space-y-4 pt-4 ${paymentStep === 1 ? 'block' : 'hidden'}`
          )}
        >
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
          <CartItems
            data={carts}
            onChange={handleChange}
            onReduceQuant={handleReduceQuant}
            onAddQuant={handleAddQuant}
            onRemove={handleRemove}
          />
          {renderVoucherCode()}
          {renderButton()}
        </div>
      </div>
      <ModalWrapper
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleConfirmRemove()}
        title="Remove Item"
        description="You are about to remove this item from your cart."
        message="Are you sure you want to remove this item from your cart?"
      />
    </section>
  );
};

export default ReviewItems;
