// store/reviewSlice.ts
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from './cart';

type ShippingType = string;
type PaymentMethod = 'creditcard' | 'banktransfer' | 'accountcredit';

export type WarehouseLocation = {
  id: number;
  title: string;
  name: string;
};

interface CheckoutState {
  items: Cart[];
  selectedLocation: WarehouseLocation;
  voucherCode: string;
  orderNotes: string;
  shippingType: ShippingType;
  deliveryNotes: string;
  pickUpNotes: string;
  deliveryDetails: number | null;
  pickupDetails: WarehouseLocation | null;
  paymentMethod: PaymentMethod;
  shippingDate: string;
}

const initialState: CheckoutState = {
  items: [],
  selectedLocation: WAREHOUSE_LOCATIONS[0],
  shippingDate: '',
  voucherCode: '',
  orderNotes: '',
  deliveryNotes: '',
  pickUpNotes: '',
  shippingType: 'delivery',
  deliveryDetails: null,
  pickupDetails: WAREHOUSE_LOCATIONS[0],
  paymentMethod: 'creditcard',
};

const checkoutSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setDeliveryNotes(state, action: PayloadAction<string>) {
      state.deliveryNotes = action.payload;
    },
    setPickUpNotes(state, action: PayloadAction<string>) {
      state.pickUpNotes = action.payload;
    },
    setItems(state, action: PayloadAction<Cart[]>) {
      state.items = action.payload;
    },
    setSelectedLocation(state, action: PayloadAction<WarehouseLocation>) {
      state.selectedLocation = action.payload;
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
    setDeliveryDetails(state, action: PayloadAction<number>) {
      state.deliveryDetails = action.payload;
    },
    setPickupDetails(state, action: PayloadAction<WarehouseLocation>) {
      state.pickupDetails = action.payload;
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
  setDeliveryDetails,
  setPickupDetails,
  setPaymentMethod,
  resetReview,
  setPickUpNotes,
  setDeliveryNotes,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
