import { createSlice } from '@reduxjs/toolkit';

export interface Cart {
  documentId: string;
  item: {
    productID: string;
    name: string;
    model: string;
    price: number;
    quantity: number;
    image: string;
    odoo_product_id: string;
  };
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
    setCart: (state, { payload }: { payload: Cart; type: string }) => {
      if (payload) {
        const existingCartItem = state.carts.find(
          (cart) => cart.item.model === payload.item.model
        );

        if (existingCartItem) {
          existingCartItem.item.quantity = payload.item.quantity; // if cart item already exists, update the quantity
        } else {
          state.carts?.push(payload);
        }
      }
    },
    setCarts: (state, { payload }: { payload: Cart[]; type: string }) => {
      state.carts = payload;
    },
    removeCart: (
      state,
      { payload }: { payload: { id: string }; type: string }
    ) => {
      state.carts = state.carts.filter(
        (cart) => cart.documentId !== payload.id
      );
    },
    clearCart: (state) => {
      state.carts = [];
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
    setShowCartWindow: (
      state,
      { payload }: { payload: boolean; type: string }
    ) => {
      state.showCartWindow = payload;
    },
  },
});

export const {
  setCart,
  setCarts,
  removeCart,
  setPaymentStep,
  setWarehouseLocation,
  setShowCartWindow,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
