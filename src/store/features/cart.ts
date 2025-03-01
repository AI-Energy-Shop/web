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
  id: string;
  address: {
    city: string;
    street: string;
    suburb: string;
    state_territory: string;
    postcode: string;
  };
}

export interface ShippingAddress {
  id: string;
  company: string;
  street: string;
  suburb: string;
  state_territory: string;
  postcode: string;
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
  warehouseLocation: {
    id: '0',
    address: {
      city: 'Sydney',
      street: '24/32-38 Belmore Rd',
      suburb: 'Punchbowl',
      state_territory: 'NSW',
      postcode: '2000',
    },
  },
  shippingAddress: {
    id: '0',
    company: 'Aes',
    street: '24/32-38 Belmore Rd',
    suburb: 'Punchbowl',
    state_territory: 'NSW',
    postcode: '2000',
  },
  deliveryOptions: {
    id: '0',
    title: 'TNT Standard Shipping',
    description: '3-5 Business Days',
    price: 39.47,
  },
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
    setPaymentStep: (state, { payload }: { payload: number; type: string }) => {
      state.paymentStep = payload;
    },
  },
});

export const { setCart, removeCart, setPaymentStep, setCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
