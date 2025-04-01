'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
};

export default ReduxProvider;
