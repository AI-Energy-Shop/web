import { Middleware } from '@reduxjs/toolkit';
import jsCookie from 'js-cookie';

export const cookieMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const result = next(action);

    if (action.type === 'me/logout') {
      jsCookie.remove('reduxState');
      return result;
    }

    // Save specific parts of the state to cookies after each action
    const state = store.getState();

    const expiringDate = new Date(Date.now() + 60 * 60 * 12 * 1000); // expire for 12 hours

    jsCookie.set(
      'reduxState',
      JSON.stringify({
        me: state.me,
        cart: state.cart,
      }),
      {
        expires: expiringDate,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      }
    );

    return result;
  };

const me = jsCookie.get('reduxState')
  ? JSON.parse(jsCookie.get('reduxState')!).me
  : undefined;
const cart = jsCookie.get('reduxState')
  ? JSON.parse(jsCookie.get('reduxState')!).cart
  : undefined;
// Get initial state from jsCookie
export const PRELOADED_STATE = {
  me: me,
  cart: cart,
};
