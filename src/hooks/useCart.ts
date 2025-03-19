import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { Cart, WarehouseLocation } from '@/store/features/cart';
import { useMutation } from '@apollo/client';
import CartOperation from '@/graphql/cart';
import { useToast } from './useToast';
import useMe from './useMe';
import { CART_WINDOW_TIMEOUT } from '@/constant/cart';
import { setCart, setShowCartWindow } from '@/store/features/cart';
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

  const [addToCart] = useMutation(CartOperation.Mutation.addToCart, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      console.log(data);
      dispatch(setShowCartWindow(true));
      setTimeout(() => {
        dispatch(setShowCartWindow(false));
      }, CART_WINDOW_TIMEOUT);

      dispatch(
        setCart({
          id: data?.addToCart?.item?.id || '',
          name: data?.addToCart?.item?.title || '',
          model: data?.addToCart?.item?.model || '',
          price: data?.addToCart?.item?.price || 0,
          image: data?.addToCart?.item?.image || '',
          quantity: Number(data?.addToCart?.item?.quantity) || 0,
          odoo_product_id: data?.addToCart?.item?.odoo_product_id || '',
        })
      );
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
  });

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
  };
};

export default useCart;
