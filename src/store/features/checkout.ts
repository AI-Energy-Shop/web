// store/reviewSlice.ts
import {
  PICK_UP_ESTIMATED_ARRIVAL_TIME,
  WAREHOUSE_LOCATIONS,
} from '@/constant/shipping';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from './cart';
import { getPickUpOptionsBestTimeSlots } from '@/utils/pickUpOptionsBestTimeSlot';

export type ShippingType = 'delivery' | 'pickup';
export type PaymentMethod = 'creditcard' | 'banktransfer' | 'accountcredit';

export type DeliveryOptions = {
  type: 'auto' | 'manual';
  date: Date | string | undefined;
};
export type PickUpOptions = {
  estimatedArrivalTime: string;
  date: Date | undefined;
};

export type WarehouseLocation = {
  id: number;
  title: string;
  name: string;
};

export type UserDeliveryAddress = {
  odoo_address_id: number;
  title: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
};

type CheckoutState = {
  items: Cart[];
  warehouseLocation: WarehouseLocation;
  voucherCode: string;
  orderNotes: string;
  shippingType: ShippingType;
  deliveryNotes: string;
  pickUpNotes: string;
  userDeliveryAddress: UserDeliveryAddress | null;
  paymentMethod: PaymentMethod;
  deliveryOptions: DeliveryOptions | null;
  pickupOptions: PickUpOptions | null;
};

const NOW = new Date();

const initialState: CheckoutState = {
  items: [],
  warehouseLocation: WAREHOUSE_LOCATIONS[0],
  deliveryOptions: null,
  pickupOptions: {
    date: NOW,
    estimatedArrivalTime: getPickUpOptionsBestTimeSlots(
      NOW,
      PICK_UP_ESTIMATED_ARRIVAL_TIME
    ),
  },
  voucherCode: '',
  orderNotes: '',
  deliveryNotes: '',
  pickUpNotes: '',
  shippingType: 'delivery',
  userDeliveryAddress: null,
  paymentMethod: 'creditcard',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDeliveryNotes(state, action: PayloadAction<string>) {
      state.deliveryNotes = action.payload;
    },
    setDeliveryOptions(state, action: PayloadAction<DeliveryOptions | null>) {
      state.deliveryOptions = action.payload;
    },
    setPickUpOptions(state, action: PayloadAction<PickUpOptions | null>) {
      state.pickupOptions = action.payload;
    },
    setPickUpNotes(state, action: PayloadAction<string>) {
      state.pickUpNotes = action.payload;
    },
    setItems(state, action: PayloadAction<Cart[]>) {
      state.items = action.payload;
    },
    setSelectedLocation(state, action: PayloadAction<WarehouseLocation>) {
      state.warehouseLocation = action.payload;
    },
    setVoucherCode(state, action: PayloadAction<string>) {
      state.voucherCode = action.payload;
    },
    setOrderNotes(state, action: PayloadAction<string>) {
      state.orderNotes = action.payload;
    },
    setShippingType(state, action: PayloadAction<ShippingType>) {
      state.shippingType = action.payload;
    },
    setUserDeliveryDetails(state, action: PayloadAction<UserDeliveryAddress>) {
      state.userDeliveryAddress = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    resetReview(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setItems,
  setSelectedLocation,
  setVoucherCode,
  setOrderNotes,
  setShippingType,
  setUserDeliveryDetails,
  setPaymentMethod,
  resetReview,
  setPickUpNotes,
  setDeliveryNotes,
  setDeliveryOptions,
  setPickUpOptions,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
