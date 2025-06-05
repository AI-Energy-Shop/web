import {
  PICK_UP_ESTIMATED_ARRIVAL_TIME,
  WAREHOUSE_LOCATIONS,
} from '@/constant/shipping';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPickUpOptionsBestTimeSlots } from '@/utils/pickUpOptionsBestTimeSlot';
import {
  Enum_Order_Paymentmethod,
  Enum_Order_Shippingtype,
} from '@/lib/gql/graphql';

export type ShippingType =
  | Enum_Order_Shippingtype.Pickup
  | Enum_Order_Shippingtype.Delivery
  | null;

export type PaymentMethod =
  | Enum_Order_Paymentmethod.AccountCredit
  | Enum_Order_Paymentmethod.BankTransfer
  | Enum_Order_Paymentmethod.CreditCard
  | undefined;

export type Card = {
  brand: string;
  expMonth: string;
  expYear: string;
  last4Char: string;
  stripePaymentMethodID: string;
  isDefault: boolean;
};

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
  date: string | undefined;
  macshipData: MacshipData;
};
export type PickUpOptions = {
  estimatedArrivalTime: string;
  date: string | undefined;
};

export type WarehouseLocation = {
  id: number;
  title: string;
  name: string;
  address: {
    city: string;
    unit: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
};

export type ShippingAddress = {
  odoo_address_id: string;
  title: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
};

export type CheckoutState = {
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
  card: Card | null;
};

const NOW = new Date();

const initialState: CheckoutState = {
  warehouseLocation: WAREHOUSE_LOCATIONS[0],
  deliveryOptions: null,
  pickupOptions: {
    date: NOW.toISOString(),
    estimatedArrivalTime: getPickUpOptionsBestTimeSlots(
      NOW.toISOString(),
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
  card: null,
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
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    setUserDeliveryDetails(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    setCard(state, action: PayloadAction<Card>) {
      state.card = action.payload;
    },
    resetCheckout(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSelectedLocation,
  setVoucherCode,
  setOrderNotes,
  setShippingType,
  setShippingAddress,
  setUserDeliveryDetails,
  setPaymentMethod,
  resetCheckout,
  setPickUpNotes,
  setDeliveryNotes,
  setDeliveryOptions,
  setPickUpOptions,
  setCard,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
