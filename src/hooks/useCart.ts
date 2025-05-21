import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { useToast } from './useToast';
import { CART_WINDOW_TIMEOUT } from '@/constant/cart';
import {
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
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { addToCartSchema } from '@/lib/validation-schema/add-to-cart-form';
import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import { useMutation, useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';

const useCart = () => {
  const date = new Date();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { data: cartData } = useQuery(CART_OPERATIONS.Query.carts, {
    fetchPolicy: 'no-cache',
  });

  const [addCartItem, { loading: addCartItemLoading }] = useMutation(
    CART_OPERATIONS.Mutation.createCart,
    {
      refetchQueries: [
        {
          query: CART_OPERATIONS.Query.carts,
        },
      ],
    }
  );

  const [deleteCartItem, { loading: deleteCartItemLoading }] = useMutation(
    CART_OPERATIONS.Mutation.deleteCart,
    {
      refetchQueries: [
        {
          query: CART_OPERATIONS.Query.carts,
        },
      ],
    }
  );

  const [updateCart, { loading: updateCartLoading }] = useMutation(
    CART_OPERATIONS.Mutation.updateCart,
    {
      refetchQueries: [
        {
          query: CART_OPERATIONS.Query.carts,
        },
      ],
    }
  );

  const [shippingOptions, setShippingOptions] =
    useState<ShippingOptions>(SHIPPING_OPTIONS);
  const paymentStep = useAppSelector(
    (state: RootState) => state.cart.paymentStep
  );

  const showCartWindow = useAppSelector(
    (state: RootState) => state.cart.showCartWindow
  );

  const warehouse = useAppSelector(
    (state: RootState) => state.checkout.warehouseLocation.name
  );

  // const isCartNeededManualQuote = props?.carts?.some((cart: any) => false);

  const form = useForm<AddToCartFormData>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      id: '',
      quantity: 0,
    },
  });

  const addToCart = async (data: { product: string; quantity: number }) => {
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
  };

  const removeItemFromCart = async (documentId: string) => {};

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

  const handleOnError = (errors: FieldErrors<AddToCartFormData>) => {
    console.log(errors);
  };

  const handleSubmit = async (onValid: AddToCartFormData) => {
    const stockQuantity = 0;
    if (stockQuantity <= 0) {
      toast({
        title: 'Out of Stock',
        variant: 'destructive',
      });
      return;
    }
    if (onValid.quantity <= 0) {
      toast({
        title: 'Quantity cannot be 0',
        variant: 'destructive',
      });
      return;
    }
    // const cartItem = carts.find(
    //   (cart) => cart.product?.documentId === onValid?.id
    // );
    // if (cartItem && cartItem?.product) {
    //   updateCartItem({
    //     cartId: cartItem.documentId,
    //     product: cartItem.product.documentId,
    //     quantity: cartItem.quantity + onValid.quantity,
    //   });
    //   return;
    // }
    await addToCart({
      product: onValid.id,
      quantity: onValid.quantity,
    });
  };

  const handleIncrement = () => {
    const quantity = form.getValues('quantity');
    form.setValue('quantity', quantity + 1);
  };

  const handleDecrement = () => {
    const quantity = form.getValues('quantity');
    form.setValue('quantity', quantity - 1);
  };

  return {
    date,
    warehouse,
    carts: cartData?.carts || [],
    paymentStep,
    showCartWindow,
    shippingOptions,
    isCartNeededManualQuote: false,
    form,
    handleIncrement,
    handleDecrement,
    handleSubmit,
    handleOnError,
    handleEditClick,
    handleShippingMethodClick,
    handleContinueClick,
    addToCart,
    removeItemFromCart,
    updateCartItem,
  };
};

export default useCart;
