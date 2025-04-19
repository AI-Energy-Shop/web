import meReducer from './features/me';
import { combineReducers, createStore } from 'redux';
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
  whitelist: ['me', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = createStore(persistedReducer);
export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
