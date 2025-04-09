import meReducer from './features/me';
import { combineReducers } from 'redux';
import cartReducer from './features/cart';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from './middleware/storage-middleware';

const rootReducer = combineReducers({
  me: meReducer,
  cart: cartReducer,
});

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage,
  version: 6,
  whitelist: ['me', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
