'use client';

import { configureStore, Middleware } from '@reduxjs/toolkit';
import meReducer from './features/me';
import cartReducer from './features/cart';
import Cookies from 'js-cookie';

// Custom middleware to save state to cookies
const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Save me and cart state to cookies
  Cookies.set(
    'reduxState',
    JSON.stringify({
      me: state.me,
      cart: state.cart,
    }),
    { expires: 60 * 60 * 12 }
  ); // Expires in 12 hours

  return result;
};

// Get initial state from cookies
const preloadedState = {
  me: Cookies.get('reduxState')
    ? JSON.parse(Cookies.get('reduxState')!).me
    : undefined,
  cart: Cookies.get('reduxState')
    ? JSON.parse(Cookies.get('reduxState')!).cart
    : undefined,
};

export const store = configureStore({
  reducer: {
    me: meReducer,
    cart: cartReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
