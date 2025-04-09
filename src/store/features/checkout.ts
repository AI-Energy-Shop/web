// store/reviewSlice.ts
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ShippingType = 'delivery' | 'pickup';
type PaymentMethod = 'creditcard' | 'banktransfer' | 'accountcredit';

export type WarehouseLocation = {
  id: number;
  title: string;
  name: string;
};

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryDetails {
  shipTo: number | null;
  deliveryOptions: string | null;
  deliveryNotes: string | null;
}

interface PickupDetails {
  pickFrom: string | null;
  plannedPickupDate: string | null;
  pickupNotes: string | null;
}

interface CheckoutState {
  items: Product[];
  selectedLocation: WarehouseLocation;
  voucherCode: string;
  orderNotes: string;
  shippingType: ShippingType;
  delivery: DeliveryDetails | null;
  pickup: PickupDetails | null;
  paymentMethod: PaymentMethod;
}

const initialState: CheckoutState = {
  items: [],
  selectedLocation: WAREHOUSE_LOCATIONS[0],
  voucherCode: '',
  orderNotes: '',
  shippingType: 'delivery',
  delivery: {
    shipTo: null,
    deliveryOptions: null,
    deliveryNotes: null,
  },
  pickup: null,
  paymentMethod: 'creditcard',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
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
      if (action.payload === 'delivery') {
        state.delivery = {
          shipTo: null,
          deliveryOptions: null,
          deliveryNotes: null,
        };
        state.pickup = null;
      } else {
        state.pickup = {
          pickFrom: null,
          plannedPickupDate: null,
          pickupNotes: null,
        };
        state.delivery = null;
      }
    },
    setDeliveryDetails(state, action: PayloadAction<DeliveryDetails>) {
      if (state.shippingType === 'delivery') {
        state.delivery = action.payload;
      }
    },
    setPickupDetails(state, action: PayloadAction<PickupDetails>) {
      if (state.shippingType === 'pickup') {
        state.pickup = action.payload;
      }
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
} = reviewSlice.actions;

export default reviewSlice.reducer;
