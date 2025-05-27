import { CartsQuery } from '@/lib/gql/graphql';
import {
  setSelectedLocation,
  setShippingType as setShippingTypeFromSlice,
  ShippingType,
  WarehouseLocation,
  setShippingAddress as setShippingAddressFromSlice,
  ShippingAddress,
  setDeliveryOptions as setDeliveryOptionsFromSlice,
  DeliveryOptions,
  setDeliveryNotes as setDeliveryNotesFromSlice,
  setPickUpNotes as setPickUpNotesFromSlice,
  PickUpOptions,
  setPickUpOptions as setPickUpOptionsFromSlice,
  PaymentMethod,
  setPaymentMethod as setPaymentMethodFromSlice,
  setItems as setItemsMethodFromSlice,
} from '@/store/features/checkout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

export const useCheckout = () => {
  const dispatch = useAppDispatch();

  //Query
  const warehouseLocation = useAppSelector(
    (state) => state.checkout.warehouseLocation
  );

  const pickUpNotes = useAppSelector((state) => state.checkout.pickUpNotes);

  const deliveryNotes = useAppSelector((state) => state.checkout.deliveryNotes);

  const pickUpOptions = useAppSelector((state) => state.checkout.pickupOptions);

  const shippingTypeFromStore = useAppSelector(
    (state) => state.checkout.shippingType
  );

  const paymentMethod = useAppSelector((state) => state.checkout.paymentMethod);

  const deliveryOptions = useAppSelector(
    (state) => state.checkout.deliveryOptions
  );

  const shippingAddress = useAppSelector(
    (state) => state.checkout.shippingAddress
  );

  const allCheckoutState = useAppSelector((state) => state.checkout);

  //Actions
  const setWarehouseLocation = (warehouse: WarehouseLocation) =>
    dispatch(setSelectedLocation(warehouse));

  const setShippingType = (shipping: ShippingType) =>
    dispatch(setShippingTypeFromSlice(shipping));

  const setDeliveryOptions = (deliveryOptions: DeliveryOptions) => {
    dispatch(setDeliveryOptionsFromSlice(deliveryOptions));
  };

  const setShippingAddress = (shippingAddress: ShippingAddress) => {
    dispatch(setShippingAddressFromSlice(shippingAddress));
  };

  const setDeliveryNotes = (deliveryNotes: string) =>
    dispatch(setDeliveryNotesFromSlice(deliveryNotes));

  const setPickUpNotes = (pickUpNotes: string) =>
    dispatch(setPickUpNotesFromSlice(pickUpNotes));

  const setPickUpOptions = (pickUpOptions: PickUpOptions) =>
    dispatch(setPickUpOptionsFromSlice(pickUpOptions));

  const setPaymentMethod = (paymentMethod: PaymentMethod) =>
    dispatch(setPaymentMethodFromSlice(paymentMethod));

  const setItems = (cart: CartsQuery['carts']) => {
    dispatch(setItemsMethodFromSlice(cart));
  };

  const [shippingType, setShippingTypes] = useState<ShippingType>(null);

  useEffect(() => {
    setShippingTypes(shippingTypeFromStore);
  }, [shippingTypeFromStore]);

  return {
    warehouseLocation,
    pickUpNotes,
    deliveryNotes,
    pickUpOptions,
    shippingType,
    paymentMethod,
    deliveryOptions,
    allCheckoutState,
    shippingAddress,
    setWarehouseLocation,
    setShippingType,
    setShippingAddress,
    setDeliveryOptions,
    setDeliveryNotes,
    setPickUpNotes,
    setPickUpOptions,
    setPaymentMethod,
    setItems,
  };
};
