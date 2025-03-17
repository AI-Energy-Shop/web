import { createSlice } from '@reduxjs/toolkit';

export interface Cart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  odoo_product_id: string;
  model: string;
}

export interface WarehouseLocation {
  address: {
    city: string;
    street1: string;
    state: string;
    zipCode: string;
    country: string;
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
}

const initialState: InitialState = {
  carts: [],
  paymentStep: 1,
  warehouseLocation: undefined,
  shippingAddress: undefined,
  deliveryOptions: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, { payload }: { payload: Cart; type: string }) => {
      if (payload) {
        const existingCartItem = state.carts.find(
          (cart) => cart.model === payload.model
        );

        if (existingCartItem) {
          // if cart item already exists, update the quantity
          existingCartItem.quantity += payload.quantity;
        } else {
          state.carts?.push(payload);
        }
      }
    },
    setCartQuantity: (
      state,
      { payload }: { payload: { id: string; quantity: number }; type: string }
    ) => {
      const cart = state.carts.find((cart) => cart.id === payload.id);
      if (cart) {
        cart.quantity = payload.quantity;
      }
      return state;
    },
    removeCart: (
      state,
      { payload }: { payload: { id: string }; type: string }
    ) => {
      state.carts = state.carts.filter((cart) => cart.id !== payload.id);
    },
    setWarehouseLocation: (
      state,
      { payload }: { payload: WarehouseLocation; type: string }
    ) => {
      state.warehouseLocation = payload;
    },
    setPaymentStep: (state, { payload }: { payload: number; type: string }) => {
      state.paymentStep = payload;
    },
  },
});

export const {
  setCart,
  removeCart,
  setPaymentStep,
  setCartQuantity,
  setWarehouseLocation,
} = cartSlice.actions;

export default cartSlice.reducer;
