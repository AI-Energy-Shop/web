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

  return {
    warehouseLocation,
    pickUpNotes,
    deliveryNotes,
    pickUpOptions,
    setWarehouseLocation,
    setShippingType,
    setDeliveryOptions,
    setDeliveryNotes,
    setPickUpNotes,
    setPickUpOptions,
  };
};
