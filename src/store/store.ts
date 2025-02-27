import { configureStore, Middleware } from '@reduxjs/toolkit';
import meReducer from './features/me';
import Cookies from 'js-cookie';

// Custom middleware to save state to cookies
const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Save me state to cookies
  Cookies.set(
    'reduxState',
    JSON.stringify({
      me: state.me,
    }),
    { expires: 7 }
  ); // Expires in 7 days

  return result;
};

// Get initial state from cookies
const preloadedState = {
  me: Cookies.get('reduxState')
    ? JSON.parse(Cookies.get('reduxState')!).me
    : undefined,
};

export const store = configureStore({
  reducer: {
    me: meReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
