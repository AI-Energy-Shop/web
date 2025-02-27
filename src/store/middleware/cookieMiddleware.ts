import { Middleware } from '@reduxjs/toolkit';
import { setCookie } from '@/utils/cookies';

export const cookieMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save specific parts of the state to cookies after each action
  const state = store.getState();

  // Save me state
  if (state.me) {
    setCookie('me', JSON.stringify(state.me));
    if (state.me.token) {
      setCookie('token', state.me.token);
    }
  }

  // Save cart state
  if (state.cart) {
    setCookie('cart', JSON.stringify(state.cart));
  }

  return result;
};
