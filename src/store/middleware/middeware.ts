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
    const expiringDate = new Date(Date.now() + 60 * 60 * 12 * 1000); // expire for 12 hours

    const state = {
      me: store.getState().me,
      cart: store.getState().cart,
    };

    jsCookie.set('reduxState', JSON.stringify(state), {
      expires: expiringDate,
    });

    const cookieState =
      jsCookie.get('reduxState') && JSON.parse(jsCookie.get('reduxState')!);

    console.log('cookieState', cookieState);
    return cookieState;
  };

const parseCookie = (cookie: string) => {
  return cookie ? JSON.parse(cookie) : {};
};

const me = parseCookie(jsCookie.get('reduxState') || '{}').me;
const cart = parseCookie(jsCookie.get('reduxState') || '{}').cart;

export const PRELOADED_STATE = {
  me,
  cart,
};
