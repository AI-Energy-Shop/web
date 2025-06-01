import { UsersPermissionsUserQuery } from '@/lib/gql/graphql';
import { createSlice } from '@reduxjs/toolkit';
import { CartsQuery } from '@/lib/gql/graphql';

export type CartProductType = NonNullable<
  NonNullable<
    NonNullable<
      UsersPermissionsUserQuery['usersPermissionsUser']
    >['carts'][number]
  >['product']
>;

export interface WarehouseLocation {
  address?: {
    city?: string;
    street1?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface ShippingAddress {
  id: string;
  company: string;
  city: string;
  street1: string;
  street2: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface DeliveryOption {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface InitialState {
  carts: CartsQuery['carts'];
  paymentStep: number;
  warehouseLocation?: WarehouseLocation;
  shippingAddress?: ShippingAddress;
  deliveryOptions?: DeliveryOption;
  showCartWindow: boolean;
}

const initialState: InitialState = {
  carts: [],
  paymentStep: 1,
  warehouseLocation: undefined,
  shippingAddress: undefined,
  deliveryOptions: undefined,
  showCartWindow: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    setShowCartWindow: (state, action) => {
      state.showCartWindow = action.payload;
    },
    setWarehouseLocation: (state, action) => {
      state.warehouseLocation = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setPaymentStep: (state, action) => {
      state.paymentStep = action.payload;
    },
    removeCartsData: (state) => {
      state = initialState;
    },
  },
});

export const {
  setCarts,
  setPaymentStep,
  setWarehouseLocation,
  removeCartsData,
  setShowCartWindow,
} = cartSlice.actions;

export default cartSlice.reducer;
