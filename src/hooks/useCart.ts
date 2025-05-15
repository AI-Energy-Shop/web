import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { useToast } from './useToast';
import { CART_WINDOW_TIMEOUT } from '@/constant/cart';
import {
  Cart,
  setCart,
  setPaymentStep as setPaymentStepData,
  setShowCartWindow,
} from '@/store/features/cart';
import {
  addToCartAction,
  removeItemFromCartAction,
  updateCartItemAction,
} from '@/app/actions/cart';
import { ShippingOptions } from '@/constant/shipping';
import { SHIPPING_OPTIONS } from '@/constant/shipping';
import { removeCart } from '@/store/features/cart';
import { useEffect, useState } from 'react';

const useCart = () => {
  const date = new Date();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [shippingOptions, setShippingOptions] =
    useState<ShippingOptions>(SHIPPING_OPTIONS);
  const cartsData = useAppSelector((state) => state.cart.carts);
  const paymentStepData = useAppSelector(
    (state: RootState) => state.cart.paymentStep
  );
  const warehouse = useAppSelector(
    (state: RootState) => state.cart.warehouseLocation
  );
  const showCartWindow = useAppSelector(
    (state: RootState) => state.cart.showCartWindow
  );

  const [carts, setCartsData] = useState<Cart[]>([]);
  const [paymentStep, setPaymenStepData] = useState<number>(1);

  useEffect(() => {
    setCartsData(cartsData);
  }, [cartsData]);

  useEffect(() => {
    setPaymenStepData(paymentStepData);
  }, [paymentStepData]);

  const isCartNeededManualQuote = cartsData.some((cart) => false);

  const addToCart = async (data: {
    product: string;
    quantity: number;
    user: string;
  }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const res = await addToCartAction(formData);
    if (res.error) {
      console.log(res.error);
      toast({
        title: res.error,
        variant: 'destructive',
      });
      return;
    }

    if (res.data) {
      const { createCart } = res.data;
      dispatch(
        setCart({
          documentId: createCart?.documentId || '',
          product: createCart?.product,
          quantity: createCart?.quantity || 0,
        })
      );
      dispatch(setShowCartWindow(true));
      setTimeout(() => {
        dispatch(setShowCartWindow(false));
      }, CART_WINDOW_TIMEOUT);
    }
  };

  const updateCartItem = async (data: {
    cartId: string;
    product: string;
    quantity: number;
  }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const res = await updateCartItemAction(formData);
    if (res.error) {
      console.log(res.error);
      toast({
        title: res.error,
        variant: 'destructive',
      });
      return;
    }

    dispatch(
      setCart({
        documentId: res?.data?.updateCart?.documentId || '',
        product: res?.data?.updateCart?.product,
        quantity: res?.data?.updateCart?.quantity || 0,
      })
    );

    dispatch(setShowCartWindow(true));
    setTimeout(() => {
      dispatch(setShowCartWindow(false));
    }, CART_WINDOW_TIMEOUT);
  };

  const removeItemFromCart = async (documentId: string) => {
    const res = await removeItemFromCartAction(documentId);
    if (res.error) {
      toast({
        title: res.error,
        variant: 'destructive',
      });
      return;
    }

    if (res.data) {
      const { deleteCart } = res.data;
      dispatch(removeCart({ id: deleteCart?.documentId || '' }));
    }
  };

  const handleShippingMethodClick = (index: number) => {
    setShippingOptions(
      shippingOptions.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  const handleContinueClick = () => {
    dispatch(setPaymentStepData(3));
  };

  const handleEditClick = () => {
    dispatch(setPaymentStepData(2));
  };

  return {
    date,
    warehouse,
    carts,
    paymentStep,
    showCartWindow,
    shippingOptions,
    isCartNeededManualQuote,
    handleEditClick,
    handleShippingMethodClick,
    handleContinueClick,
    addToCart,
    removeItemFromCart,
    updateCartItem,
  };
};

export default useCart;
