import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from './middleware/storage-middleware';
import checkoutReducer from './features/checkout';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products';
import cartReducer from './features/cart';
import { combineReducers } from 'redux';
import meReducer from './features/me';

const ONE_DAY = 60 * 60 * 24;
const ONE_MONTH = 60 * 60 * 24 * 30;

const rootReducer = combineReducers({
  me: meReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  products: productsReducer,
});

const checkExistingPersistence = () => {
  if (typeof window === 'undefined') return false; // Server-side check

  try {
    const persistedString = localStorage.getItem('persist:root');
    const expirationTime = localStorage.getItem('persist:root:expiration');

    if (!persistedString || !expirationTime) return false;

    // Check if data has expired
    if (Date.now() > parseInt(expirationTime, 10)) {
      // Clear expired data
      localStorage.removeItem('persist:root');
      localStorage.removeItem('persist:root:expiration');
      return false;
    }

    const persistedData = JSON.parse(persistedString);
    return !!persistedData.me;
  } catch (error) {
    console.error('Error checking persistence:', error);
    return false;
  }
};

// Create a function to get persist config based on remember me state
export const getPersistConfig = () => ({
  key: 'root',
  storage,
  whitelist: ['me'],
});

// Initial persist config (default to not persisting)
const initialPersistConfig = getPersistConfig();

const persistedReducer = persistReducer(initialPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Function to update persistence based on remember me
export const updatePersistence = async (rememberMe?: boolean) => {
  try {
    persistor.pause();
    persistor.purge();

    // Set expiration timestamp based on shouldPersist value
    const expirationTime = rememberMe ? ONE_MONTH : ONE_DAY;
    localStorage.setItem(
      'persist:root:expiration',
      (Date.now() + expirationTime * 1000).toString()
    );

    if (rememberMe) {
      checkExistingPersistence();
      const newConfig = getPersistConfig();
      const newPersistedReducer = persistReducer(newConfig, rootReducer);
      store.replaceReducer(newPersistedReducer);
      persistor.persist();
    }
  } catch (error) {
    console.error('Error updating persistence:', error);
  }
};

export const removePersistence = () => {
  persistor.pause();
  persistor.purge();
  localStorage.removeItem('persist:root');
  localStorage.removeItem('persist:root:expiration');
};
