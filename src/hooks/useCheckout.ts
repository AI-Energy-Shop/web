import { Cart } from '@/store/features/cart';
import {
  setSelectedLocation,
  setShippingType as setShippingTypeFromSlice,
  ShippingType,
  WarehouseLocation,
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

export const useCheckout = () => {
  const dispatch = useAppDispatch();

  //Query
  const warehouseLocation = useAppSelector(
    (state) => state.checkout.warehouseLocation
  );

  const pickUpNotes = useAppSelector((state) => state.checkout.pickUpNotes);

  const deliveryNotes = useAppSelector((state) => state.checkout.deliveryNotes);

  const pickUpOptions = useAppSelector((state) => state.checkout.pickupOptions);

  const shippingType = useAppSelector((state) => state.checkout.shippingType);

  const paymentMethod = useAppSelector((state) => state.checkout.paymentMethod);

  const deliveryOptions = useAppSelector(
    (state) => state.checkout.deliveryOptions
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

  const setDeliveryNotes = (deliveryNotes: string) =>
    dispatch(setDeliveryNotesFromSlice(deliveryNotes));

  const setPickUpNotes = (pickUpNotes: string) =>
    dispatch(setPickUpNotesFromSlice(pickUpNotes));

  const setPickUpOptions = (pickUpOptions: PickUpOptions) =>
    dispatch(setPickUpOptionsFromSlice(pickUpOptions));

  const setPaymentMethod = (paymentMethod: PaymentMethod) =>
    dispatch(setPaymentMethodFromSlice(paymentMethod));

  const setItems = (cart: Cart[]) => {
    dispatch(setItemsMethodFromSlice(cart));
  };

  return {
    warehouseLocation,
    pickUpNotes,
    deliveryNotes,
    pickUpOptions,
    shippingType,
    paymentMethod,
    deliveryOptions,
    allCheckoutState,
    setWarehouseLocation,
    setShippingType,
    setDeliveryOptions,
    setDeliveryNotes,
    setPickUpNotes,
    setPickUpOptions,
    setPaymentMethod,
    setItems,
  };
};
