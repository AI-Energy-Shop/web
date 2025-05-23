'use client';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

persistStore(store);
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
