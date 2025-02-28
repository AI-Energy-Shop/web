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

export interface InitialState {
  carts: Cart[];
  paymentStep: number;
}

const initialState: InitialState = {
  carts: [],
  paymentStep: 1,
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
