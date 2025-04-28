import { ProductQuery } from '@/lib/gql/graphql';
import { createSlice } from '@reduxjs/toolkit';

export interface Cart {
  documentId: string;
  quantity: number;
  product: ProductQuery['product'];
}

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
  carts: Cart[];
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
    setCart: (state, action) => {
      const existingCart = state.carts.find((cart) => cart.documentId === action.payload.documentId);
      if (!existingCart) {
        state.carts.push(action.payload);
      } else {
        existingCart.quantity = action.payload.quantity;
      }
    },
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter((cart) => cart.documentId !== action.payload.id);
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
      state.carts = [];
      state.paymentStep = 1;
      state.warehouseLocation = undefined;
      state.shippingAddress = undefined;
      state.deliveryOptions = undefined;
      state.showCartWindow = false;
    },
  },
});

export const {
  setCart,
  setCarts,
  removeCart,
  setPaymentStep,
  setWarehouseLocation,
  removeCartsData,
  setShowCartWindow,
} = cartSlice.actions;

export default cartSlice.reducer;
