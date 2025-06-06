import {
  setCarts,
  setShowCartWindow,
  setPaymentStep as setPaymentStepData,
} from '@/store/features/cart';
import {
  addToCartSchema,
  AddToCartFormData,
} from '@/lib/validation-schema/add-to-cart-form';
import { ShippingOptions } from '@/constant/shipping';
import { SHIPPING_OPTIONS } from '@/constant/shipping';
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldErrors, FieldValues } from 'react-hook-form';
import CART_OPERATIONS from '@/graphql/cart';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { CartsQuery } from '@/lib/gql/graphql';
import { useAppDispatch, useAppSelector, RootState } from '@/store/store';
import useMe from './useMe';

interface UseCartProps {
  productId?: string;
}

const useCart = (props?: UseCartProps) => {
  const date = new Date();
  const dispatch = useAppDispatch();
  const { user } = useMe();

  const client = useApolloClient();

  const {
    data: cartData,
    refetch,
    error,
  } = useQuery<CartsQuery>(CART_OPERATIONS.Query.carts, {
    fetchPolicy: 'network-only',
    refetchWritePolicy: 'merge',
    onCompleted: (data) => {
      // dispatch(setCarts(data.carts));
    },
    pollInterval: 1000 * 60 * 10, // 10 minutes
    skip: !user?.id, // Skip query if no user is logged in
  });

  const updateApolloClientCartData = (documentId: string, quantity: number) => {
    const data = client.readQuery({
      query: CART_OPERATIONS.Query.carts,
    });

    if (!data) return;

    const updatedCarts = data.carts.map((cart) =>
      cart?.documentId === documentId ? { ...cart, quantity } : cart
    );

    client.writeQuery({
      query: CART_OPERATIONS.Query.carts,
      data: { carts: updatedCarts },
    });
  };

  const deleteApolloClientCartData = (documentId: string) => {
    const data = client.readQuery({
      query: CART_OPERATIONS.Query.carts,
    });

    if (!data) return;

    const updatedCarts = data.carts.filter(
      (cart) => cart?.documentId !== documentId
    );

    client.writeQuery({
      query: CART_OPERATIONS.Query.carts,
      data: { carts: updatedCarts },
    });
  };

  const [addCartItem] = useMutation(CART_OPERATIONS.Mutation.createCart, {
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteCartItem] = useMutation(CART_OPERATIONS.Mutation.deleteCart, {
    refetchQueries: [
      {
        query: CART_OPERATIONS.Query.carts,
      },
    ],
  });

  const [updateCartItem] = useMutation(CART_OPERATIONS.Mutation.updateCart);

  const [shippingOptions, setShippingOptions] =
    useState<ShippingOptions>(SHIPPING_OPTIONS);

  const paymentStep = useAppSelector(
    (state: RootState) => state.cart.paymentStep
  );

  const showCartWindow = useAppSelector(
    (state: RootState) => state.cart.showCartWindow
  );

  const warehouse = useAppSelector(
    (state: RootState) => state.me.me?.account_detail?.warehouseLocation?.name
  );

  const form = useForm<AddToCartFormData>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      id: props?.productId || '',
      quantity: 0,
    },
  });

  const removeItemFromCart = async (documentId: string) => {
    deleteApolloClientCartData(documentId);
    await deleteCartItem({
      variables: {
        documentId,
      },
    });
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

  const handleOnError = (errors: FieldErrors<AddToCartFormData>) => {
    console.log(errors);
  };

  const handleSubmit = async (onValid: FieldValues) => {
    const cartItem = cartData?.carts.find(
      (cart) => cart?.product?.documentId === onValid.id
    );

    if (cartItem && cartItem?.product) {
      updateCartItem({
        variables: {
          documentId: cartItem.documentId,
          data: {
            quantity: cartItem.quantity + onValid.quantity,
          },
        },
      });

      // Show the notification
      // dispatch(setShowCartWindow(true));

      // // Hide the notification after 3 seconds
      // setTimeout(() => {
      //   dispatch(setShowCartWindow(false));
      // }, 3000);

      // Reset the form
      form.reset();
      return;
    }

    addCartItem({
      variables: {
        data: {
          product: onValid.id,
          user: user?.id,
          quantity: onValid.quantity,
        },
      },
    });

    // Show the notification
    // dispatch(setShowCartWindow(true));

    // // Hide the notification after 3 seconds
    // setTimeout(() => {
    //   dispatch(setShowCartWindow(false));
    // }, 3000);

    // Reset the form
    form.reset();

    refetch();
  };

  const handleIncrement = () => {
    const quantity = form.getValues('quantity');
    form.setValue('quantity', quantity + 1);
  };

  const handleDecrement = () => {
    const quantity = form.getValues('quantity');
    form.setValue('quantity', quantity - 1);
  };

  useEffect(() => {
    if (cartData) {
      dispatch(setCarts(cartData.carts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  return {
    date,
    warehouse,
    carts: cartData?.carts || [],
    paymentStep,
    showCartWindow,
    shippingOptions,
    form,
    handleIncrement,
    handleDecrement,
    handleSubmit,
    handleOnError,
    handleEditClick,
    handleShippingMethodClick,
    handleContinueClick,
    removeItemFromCart,
    updateApolloClientCartData,
    updateCartItem,
  };
};

export default useCart;
