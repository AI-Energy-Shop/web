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

const rootReducer = combineReducers({
  me: meReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  products: productsReducer,
});

// Check if we have existing persisted data
const checkExistingPersistence = () => {
  if (typeof window === 'undefined') return false; // Server-side check

  try {
    const persistedString = localStorage.getItem('persist:root');
    if (!persistedString) return false;

    const persistedData = JSON.parse(persistedString);
    // Check if we have any persisted data for me or cart
    return !!(persistedData.me || persistedData.cart);
  } catch (error) {
    console.error('Error checking persistence:', error);
    return false;
  }
};

// Create a function to get persist config based on remember me state
export const getPersistConfig = (shouldPersist: boolean) => ({
  key: 'root',
  storage,
  whitelist: shouldPersist ? ['me', 'cart'] : [],
});

// Initial persist config (default to not persisting)
const initialPersistConfig = getPersistConfig(checkExistingPersistence());

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
export const updatePersistence = async (shouldPersist: boolean) => {
  try {
    // First pause the persistor
    persistor.pause();
    // Then purge the storage
    persistor.purge();

    if (shouldPersist) {
      // If we should persist, update the config and persist
      const newConfig = getPersistConfig(true);
      // Recreate the persisted reducer with new config
      const newPersistedReducer = persistReducer(newConfig, rootReducer);
      // Update the store's reducer
      store.replaceReducer(newPersistedReducer);
      // Start persisting again
      persistor.persist();
    }
  } catch (error) {
    console.error('Error updating persistence:', error);
  }
};
