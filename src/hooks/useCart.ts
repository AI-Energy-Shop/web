import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import CartOperation from '@/graphql/cart';
import { useToast } from './useToast';
import useMe from './useMe';
import { CART_WINDOW_TIMEOUT } from '@/constant/cart';
import { setCart, setShowCartWindow } from '@/store/features/cart';
import { Cart, removeCart, WarehouseLocation } from '@/store/features/cart';
import { CreateCartMutation } from '@/lib/gql/graphql';
import { removeCartItem } from '@/app/actions/cart';
const useCart = () => {
  const { token } = useMe();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const cartData = useSelector((state: RootState) => state.cart);
  const cartsData = useSelector((state: RootState) => state.cart.carts);
  const isShowCartWindow = useSelector(
    (state: RootState) => state.cart.showCartWindow
  );

  const [carts, setCarts] = useState<Cart[]>([]);
  const [warehouse, setWarehouse] = useState<WarehouseLocation>();
  const [paymentStep, setPaymentStep] = useState<number>(0);
  const [showCartWindow, setShowCartWindowState] = useState<boolean>(false);

  const [addToCart] = useMutation<CreateCartMutation>(
    CartOperation.Mutation.createCart,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      onCompleted: (data) => {
        console.log(data);

        dispatch(
          setCart({
            id: data?.createCart?.item?.id || '',
            name: data?.createCart?.item?.title || '',
            model: data?.createCart?.item?.model || '',
            price: data?.createCart?.item?.price || 0,
            image: data?.createCart?.item?.image || '',
            quantity: Number(data?.createCart?.item?.quantity) || 0,
            odoo_product_id: data?.createCart?.item?.odoo_product_id || '',
          })
        );

        dispatch(setShowCartWindow(true));
        setTimeout(() => {
          dispatch(setShowCartWindow(false));
        }, CART_WINDOW_TIMEOUT);
      },
      onError: (error) => {
        if (error) {
          toast({
            title: error?.message,
            variant: 'destructive',
          });
          return;
        }
      },
    }
  );

  // const [removeItemFromCart] = useMutation(
  //   CartOperation.Mutation.removeFromCart,
  //   {
  //     context: {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //     onCompleted: (data) => {
  //       console.log(data);
  //       if (data.deleteCartItem && data.deleteCartItem.documentId) {
  //         dispatch(removeCart({ id: data.deleteCartItem?.documentId }));
  //       }
  //     },
  //   }
  // );

  const removeItemFromCart = async (id?: string) => {
    if (!id) {
      toast({
        title: 'No item to remove',
        variant: 'destructive',
      });
      return;
    }

    const res = await removeCartItem(id);

    console.log(res);
  };

  useEffect(() => {
    setShowCartWindowState(isShowCartWindow);
    return () => {
      setShowCartWindowState(false);
    };
  }, [isShowCartWindow]);

  useEffect(() => {
    if (cartsData) {
      setCarts(cartsData);
    }
    return () => {
      setCarts(cartsData);
    };
  }, [cartsData]);

  useEffect(() => {
    if (cartData) {
      setPaymentStep(cartData.paymentStep);
      setWarehouse(cartData.warehouseLocation);
    }
    return () => {
      setPaymentStep(0);
    };
  }, [cartData]);

  return {
    warehouse,
    carts,
    paymentStep,
    showCartWindow,
    addToCart,
    removeItemFromCart,
  };
};

export default useCart;
