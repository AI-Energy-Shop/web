import {
  PICK_UP_ESTIMATED_ARRIVAL_TIME,
  WAREHOUSE_LOCATIONS,
} from '@/constant/shipping';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from './cart';
import { getPickUpOptionsBestTimeSlots } from '@/components/Checkout/pickUpOptionsBestTimeSlot';
import { Enum_Order_Paymentmethod } from '@/lib/gql/graphql';

export type ShippingType = 'delivery' | 'pickup' | null;
export type PaymentMethod =
  | Enum_Order_Paymentmethod.AccountCredit
  | Enum_Order_Paymentmethod.BankTransfer
  | Enum_Order_Paymentmethod.CreditCard
  | undefined;

export type MacshipData = {
  companyId: number;
  carrierId: number;
  carrierServiceId: number;
  carrierAccountId: number;
  companyCarrierAccountId: number;
  dgsDeclaration: boolean;
  displayData: {
    carrierDisplayName: string;
    carrierServiceDisplayName: string;
    eta: string;
    totalWeight: number;
    totalSellBeforeTax: string;
    totalTaxSellPrice: string;
    totalSellPrice: string;
  };
} | null;

export type DeliveryOptions = {
  type: 'auto' | 'manual';
  date: Date | undefined;
  macshipData: MacshipData;
};
export type PickUpOptions = {
  estimatedArrivalTime: string;
  date: Date | undefined;
};

export type WarehouseLocation = {
  id: number;
  title: string;
  name: string;
  address: {
    unit: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
};

export type ShippingAddress = {
  odoo_address_id: number;
  title: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
};

export type CheckoutState = {
  items: Cart[];
  warehouseLocation: WarehouseLocation;
  voucherCode: string;
  orderNotes: string;
  shippingType: ShippingType;
  deliveryNotes: string;
  pickUpNotes: string;
  shippingAddress: ShippingAddress | null;
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
  shippingType: null,
  shippingAddress: null,
  paymentMethod: undefined,
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
    setUserDeliveryDetails(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
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
