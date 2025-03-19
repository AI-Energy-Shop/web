import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { Cart, WarehouseLocation } from '@/store/features/cart';

const useCart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  const cartsData = useSelector((state: RootState) => state.cart.carts);
  const isShowCartWindow = useSelector(
    (state: RootState) => state.cart.showCartWindow
  );

  const [carts, setCarts] = useState<Cart[]>([]);
  const [warehouse, setWarehouse] = useState<WarehouseLocation>();
  const [paymentStep, setPaymentStep] = useState<number>(0);
  const [showCartWindow, setShowCartWindow] = useState<boolean>(false);

  useEffect(() => {
    console.log('showCartWindow', isShowCartWindow);
    setShowCartWindow(isShowCartWindow);
    // return () => {
    //   setShowCartWindow(false);
    // };
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
  };
};

export default useCart;
