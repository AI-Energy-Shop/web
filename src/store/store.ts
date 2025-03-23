import meReducer from './features/me';
import cartReducer from './features/cart';
import {
  cookieMiddleware,
  PRELOADED_STATE,
} from './middleware/cookieMiddleware';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    me: meReducer,
    cart: cartReducer,
  },
  preloadedState: PRELOADED_STATE,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cookieMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
