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
}

const initialState: InitialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
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
    removeCart: (
      state,
      { payload }: { payload: { id: string }; type: string }
    ) => {
      state.carts = state.carts.filter((cart) => cart.id !== payload.id);
    },
  },
});

export const { setCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
